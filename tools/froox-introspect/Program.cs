using System.Reflection;
using System.Runtime.Loader;

namespace FrooxIntrospect;

internal static class Program
{
    private sealed class FolderAssemblyLoadContext : AssemblyLoadContext
    {
        private readonly string folderPath;

        public FolderAssemblyLoadContext(string folderPath)
        {
            this.folderPath = folderPath;
        }

        protected override Assembly? Load(AssemblyName assemblyName)
        {
            var candidatePath = Path.Combine(folderPath, $"{assemblyName.Name}.dll");
            if (!File.Exists(candidatePath))
            {
                return null;
            }

            return LoadFromAssemblyPath(Path.GetFullPath(candidatePath));
        }
    }

    private static string? ReadArg(string[] args, string key)
    {
        for (var i = 0; i < args.Length; i++)
        {
            if (args[i] != key)
            {
                continue;
            }

            if (i + 1 >= args.Length)
            {
                throw new ArgumentException($"Missing value for {key}");
            }

            return args[i + 1];
        }

        return null;
    }

    private static IEnumerable<Type> GetLoadableTypes(Assembly assembly)
    {
        try
        {
            return assembly.GetTypes();
        }
        catch (ReflectionTypeLoadException ex)
        {
            return ex.Types.Where(t => t is not null)!;
        }
    }

    private static void PrintPublicFieldsAndProperties(Type type)
    {
        Console.WriteLine($"Type: {type.FullName}");

        var fields = type
            .GetFields(BindingFlags.Instance | BindingFlags.Public)
            .OrderBy(f => f.Name, StringComparer.Ordinal);

        Console.WriteLine("Public instance fields:");
        foreach (var field in fields)
        {
            Console.WriteLine($"- {field.Name}: {field.FieldType.FullName}");
        }

        var props = type
            .GetProperties(BindingFlags.Instance | BindingFlags.Public)
            .OrderBy(p => p.Name, StringComparer.Ordinal);

        Console.WriteLine("Public instance properties:");
        foreach (var prop in props)
        {
            Console.WriteLine($"- {prop.Name}: {prop.PropertyType.FullName}");
        }
    }

    private static Type? FindTextRendererType(params Assembly[] assemblies)
    {
        foreach (var assembly in assemblies)
        {
            foreach (var type in GetLoadableTypes(assembly))
            {
                if (type.FullName == "FrooxEngine.TextRenderer")
                {
                    return type;
                }
            }
        }

        return null;
    }

    private static void PrintEnumValues(string fullName, params Assembly[] assemblies)
    {
        var type = assemblies
            .SelectMany(GetLoadableTypes)
            .FirstOrDefault(t => t.FullName == fullName);

        if (type is null)
        {
            Console.WriteLine($"Enum not found: {fullName}");
            return;
        }

        if (!type.IsEnum)
        {
            Console.WriteLine($"Type is not enum: {fullName}");
            return;
        }

        Console.WriteLine($"Enum: {fullName}");
        foreach (var name in Enum.GetNames(type).OrderBy(n => n, StringComparer.Ordinal))
        {
            Console.WriteLine($"- {name}");
        }
    }

    private static void TryPrintFloat3Basis(params Assembly[] assemblies)
    {
        static bool HasBasis(Type type)
        {
            var names = new[] { "Forward", "Backward", "Up", "Down", "Right", "Left" };
            return names.All(n => type.GetMember(n, BindingFlags.Public | BindingFlags.Static).Length > 0);
        }

        var candidateTypes = assemblies
            .SelectMany(GetLoadableTypes)
            .Where(t => t.Name == "float3" || t.FullName?.EndsWith(".float3", StringComparison.Ordinal) == true)
            .ToList();

        var basisType = candidateTypes.FirstOrDefault(HasBasis);
        if (basisType is null)
        {
            Console.WriteLine("No float3 basis type found (Forward/Up/Right missing). Coordinate sign must be verified in-game.");
            return;
        }

        static object? ReadStatic(Type type, string memberName)
        {
            var prop = type.GetProperty(memberName, BindingFlags.Public | BindingFlags.Static);
            if (prop is not null)
            {
                return prop.GetValue(null);
            }

            var field = type.GetField(memberName, BindingFlags.Public | BindingFlags.Static);
            if (field is not null)
            {
                return field.GetValue(null);
            }

            return null;
        }

        Console.WriteLine($"float3 basis type: {basisType.FullName}");
        foreach (var name in new[] { "Forward", "Backward", "Up", "Down", "Right", "Left" })
        {
            Console.WriteLine($"- {name}: {ReadStatic(basisType, name)}");
        }
    }

    public static int Main(string[] args)
    {
        var folder = ReadArg(args, "--folder") ?? Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "..", "..", "..", "..", "Resonite"));

        var fullFolder = Path.GetFullPath(folder);
        var loadContext = new FolderAssemblyLoadContext(fullFolder);

        var froox = loadContext.LoadFromAssemblyPath(Path.Combine(fullFolder, "FrooxEngine.dll"));
        var elementsCore = loadContext.LoadFromAssemblyPath(Path.Combine(fullFolder, "Elements.Core.dll"));
        var elementsAssets = loadContext.LoadFromAssemblyPath(Path.Combine(fullFolder, "Elements.Assets.dll"));

        var textRendererType = FindTextRendererType(froox, elementsCore);
        if (textRendererType is null)
        {
            Console.Error.WriteLine("FrooxEngine.TextRenderer type not found.");
            return 2;
        }

        PrintPublicFieldsAndProperties(textRendererType);
        Console.WriteLine();
        TryPrintFloat3Basis(froox, elementsCore);
        Console.WriteLine();
        PrintEnumValues("Elements.Assets.TextHorizontalAlignment", elementsAssets, elementsCore, froox);
        PrintEnumValues("Elements.Assets.TextVerticalAlignment", elementsAssets, elementsCore, froox);
        PrintEnumValues("Elements.Assets.AlignmentMode", elementsAssets, elementsCore, froox);
        PrintEnumValues("Elements.Core.Alignment", elementsCore, elementsAssets, froox);
        return 0;
    }
}
