# Common UI/Button Interactions (Resonite)

This note documents component fields and ResoniteLink observations for the **Common UI/Button Interactions** category.

## Scope and method
- Sources: FrooxEngine assembly reflection (declared public fields) + ResoniteLink component instances.
- Test harness (ResoniteLink): attached components to `KokoaUixButton_0_Button` and wired to `KokoaButtonLab_Targets` ValueFields.
- Limitation: writing `UIX.Button.IsPressed` via ResoniteLink did **not** trigger any Button* components (ValueFields unchanged). Actual input press is required in-client.

## Setup (ResoniteLink lab)
- Button slot used: `KokoaUixButton_0_Button` (existing UIX button).
- Target slot: `KokoaButtonLab_Targets` under Root.
- Target ValueFields (field IDs for `IField<T>` bindings):
  - `ValueField<bool>`: `KokoaButtonLab_ValueBool` → `Value` id `Reso_23048`
  - `ValueField<int>`: `KokoaButtonLab_ValueInt` → `Value` id `Reso_23D56`
  - `ValueField<float>`: `KokoaButtonLab_ValueFloat` → `Value` id `Reso_23D5A`
  - `ValueField<string>`: `KokoaButtonLab_ValueString` → `Value` id `Reso_23D5E`
  - `ValueField<colorX>`: `KokoaButtonLab_ValueColor` → `Value` id `Reso_23D62`
  - `ValueField<Uri>`: `KokoaButtonLab_ValueUri` → `Value` id `Reso_23D66`

## Binding notes (ResoniteLink)
- For `SyncRef<IField<T>>` targets, use the **field id** of the target `ValueField<T>.Value` (not the component id).
- Generic type resolution failures (ResoniteLink parser):
  - `ButtonReferenceSet<Slot>` / `ButtonReferenceCycle<Slot>` → failed to resolve.
  - `ButtonReferenceSet<IWorldElement>` → failed to resolve.
  - `ValueField<VibratePreset>` (and `ValueField<FrooxEngine.VibratePreset>`) → failed to resolve.
  - Implication: create these via in-world component picker or use a different generic argument that resolves.

## Components (fields + intent)

### Common UI/Button Interactions
- **ButtonActionTrigger**
  - Fields: `OnPressed`, `OnPressing`, `OnReleased` (`SyncDelegate<Action>`).
  - Intent: call action delegates for press states.

- **ButtonDestroy**
  - Fields: `Target` (`SyncRef<IDestroyable>`), `FindObjectRoot` (`bool`).
  - Intent: destroy target (or object root if enabled) on press.

- **ButtonDynamicImpulseTrigger**
  - Fields: `Target` (`SyncRef<Slot>`), `ExcludeDisabled` (`bool`), event tag strings (`HoverEnterTag`, `HoverLeaveTag`, `HoverStayTag`, `PressedTag`, `PressingTag`, `ReleasedTag`).
  - Intent: emit dynamic impulse events to target slot with string tags.

- **ButtonDynamicImpulseTriggerWithReference<T>**
  - Fields: `Target` (`SyncRef<Slot>`), `ExcludeDisabled` (`bool`), event data (`HoverEnterData`, `HoverLeaveData`, `HoverStayData`, `PressedData`, `PressingData`, `ReleasedData`) of type `EventData<T>`.
  - Intent: emit dynamic impulse events carrying reference data.

- **ButtonDynamicImpulseTriggerWithValue<T>**
  - Fields: `Target` (`SyncRef<Slot>`), `ExcludeDisabled` (`bool`), event data (`...Data`) of type `EventData<T>`.
  - Intent: emit dynamic impulse events carrying value data.

- **ButtonEditColorX**
  - Fields: `Target` (`SyncRef<IField<colorX>>`), `Continuous`, `Alpha`, `HDR` (`bool`).
  - ResoniteLink wiring tested: bound `Target` to `ValueField<colorX>.Value`.
  - Intent: open color dialog and write color field.

- **ButtonEnumShift<T>**
  - Fields: `TargetValue` (`SyncRef<IField<E>>`), `ShiftDelta` (`int`).
  - Note: could not resolve `ValueField<VibratePreset>` via ResoniteLink; use in-world picker or another enum type.

- **ButtonHoverEventRelay**
  - Fields: `Target` (`SyncRef<Slot>`).
  - Intent: relay hover events to a target slot.

- **ButtonParentUnderUser**
  - Fields: `Root` (`SyncRef<Slot>`), `FindObjectRoot` (`bool`), `PreserveOriginalSpace` (`bool`), `UnparentWhenParented` (`bool`).
  - Intent: parent a slot under the local user (pin), optionally unparent on next press.

- **ButtonPressEventRelay**
  - Fields: `Target` (`SyncRef<Slot>`).
  - Intent: relay press events to a target slot.

- **ButtonReferenceCycle<T>**
  - Fields: `TargetReference` (`SyncRef<SyncRef<T>>`), `Targets` (`SyncRefList<T>`).
  - Note: ResoniteLink generic resolution failed for `Slot` and `IWorldElement` in this session.

- **ButtonReferenceSet<T>**
  - Fields: `TargetReference` (`SyncRef<SyncRef<T>>`), `SetReference` (`SyncRef<T>`).
  - Note: ResoniteLink generic resolution failed for `Slot` and `IWorldElement` in this session.

- **ButtonStringAppend**
  - Fields: `TargetString` (`SyncRef<IField<string>>`), `AppendString` (`string`), `AppendInFront` (`bool`).
  - ResoniteLink wiring tested: `TargetString` → `ValueField<string>.Value`.

- **ButtonStringErase**
  - Fields: `TargetString` (`SyncRef<IField<string>>`), `Count` (`int`), `EraseFromBeginning` (`bool`).
  - ResoniteLink wiring tested: `TargetString` → `ValueField<string>.Value`.

- **ButtonToggle**
  - Fields: `TargetValue` (`SyncRef<IField<bool>>`).
  - ResoniteLink wiring tested: `TargetValue` → `ValueField<bool>.Value`.

- **ButtonValueActionTrigger<T>**
  - Fields: `OnPressed`, `OnPressing`, `OnReleased` (`SyncDelegate<Action<T>>`), `Value` (`Sync<T>`).
  - ResoniteLink wiring tested: `Value` set to `0.5f` for `float`.

- **ButtonValueCycle<T>**
  - Fields: `TargetValue` (`SyncRef<IField<T>>`), `Values` (`SyncFieldList<T>`).
  - ResoniteLink wiring tested: `TargetValue` → `ValueField<int>.Value`, `Values` → `[0,1,2]`.

- **ButtonValueSet<T>**
  - Fields: `TargetValue` (`SyncRef<IField<T>>`), `SetValue` (`Sync<T>`).
  - ResoniteLink wiring tested: `TargetValue` → `ValueField<int>.Value`, `SetValue` → `7`.

- **ButtonValueShift<T>**
  - Fields: `TargetValue` (`SyncRef<IField<T>>`), `Delta`, `Min`, `Max` (`Sync<T>`), `WrapAround`, `MaxIsExclusive` (`bool`).
  - ResoniteLink wiring tested: `TargetValue` → `ValueField<float>.Value`, `Delta` 0.1, `Min` 0, `Max` 1, `WrapAround` true.

- **ButtonWorldLink**
  - Fields: `WorldLink` (`SyncRef<WorldLink>`), `LastOpened` (`SyncTime`).
  - Note: requires a `WorldLink` component/asset reference; not set via ResoniteLink in this session.

### Common UI/Button Interactions/Media
- **ButtonAudioClipPlayer**
  - Fields: `PressedClips`, `ReleasedClips`, `HoverEnterClips`, `HoverLeaveClips` (`SyncList<ClipData>`).
  - Intent: play random audio clip sets on events.

- **ButtonLoopSet**
  - Fields: `Playback` (`SyncRef<IPlayable>`), `OnPress` / `OnRelease` (`LoopSetOptions`).
  - Intent: set loop state on a playable when pressed/released.

- **ButtonPlaybackAction**
  - Fields: `Playback` (`SyncRef<IPlayable>`), `OnPress`, `OnRelease`, `OnHover`, `OnLeave` (`PlaybackAction`).
  - Intent: send playback actions to an `IPlayable`.

- **ButtonPlaybackSeeker**
  - Fields: `Playback` (`SyncRef<IPlayable>`), `Continuous` (`bool`), `Vertical` (`bool`).
  - Intent: seek in a playable by dragging along axis.

### Common UI/Button Interactions/Specialized
- **ButtonAudioDeviceSet**
  - Fields: `DeviceIndex` (`int`).
  - Intent: set audio device by index.

- **ButtonClipboardCopyText**
  - Fields: `Source` (`SyncRef<IField<string>>`).
  - Intent: copy string to clipboard on press.

- **ButtonOpenHome**
  - Fields: `GroupOwnerId` (`string`), `LastOpened` (`SyncTime`).
  - Intent: open home world for a group.

- **ButtonUserProfileIconSet**
  - Fields: `IsUpdating` (`RawOutput<bool>`).
  - Intent: update user profile icon; likely requires other linked user/profile data.

## Observations
- ResoniteLink can attach most non-generic button interaction components to a UIX.Button slot.
- Setting `UIX.Button.IsPressed` through ResoniteLink did **not** trigger any of the Button* components. This likely requires actual input events in the client.
- Generic reference variants (`ButtonReferenceSet<T>`, `ButtonReferenceCycle<T>`) failed to resolve with `Slot`/`IWorldElement` in ResoniteLink. Create via in-world component picker if needed.
