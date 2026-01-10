# Button Interactions samples

These samples are single ResoniteLink requests. Run them in order as needed.

## Notes

- Replace placeholder IDs (e.g. `KokoaButtonLab_Targets`, `KokoaUixButton_0_Button`, `Reso_23D56`) with your actual slot/component/field ids.
- For `SyncRef<IField<T>>`, bind the **field id** (e.g. `ValueField<int>.Value`), not the ValueField component id.
- Some generic components (e.g. `ButtonReferenceSet<Slot>`) may fail to resolve via ResoniteLink; add them in-world if needed.

## Suggested order

1. Create a target slot (`00_addSlot_button_lab_targets.json`).
2. Add ValueFields on that slot (`01_addComponent_valuefield_*.json`).
3. Add Button* components to a UIX button slot (`10_addComponent_button_*.json`).
4. Bind the Button* components (`20_updateComponent_button_*.json`).
