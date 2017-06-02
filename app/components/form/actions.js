export default function(dispatcher) {
    return {
        updateField(field, fieldProps) {
            dispatcher({
                type: 'FK_UPDATE_FIELD',
                payload: {
                    field: field,
                    fieldProps: fieldProps
                }
            });
        },
        touchField(field, fieldProps) {
            dispatcher({
                type: 'FK_TOUCH_FIELD',
                payload: {
                    field: field,
                    fieldProps: fieldProps
                }
            });
        },
        validateStep(step, validation) {
            dispatcher({
                type: 'FK_VALIDATE_STEP',
                payload: {
                    step: step,
                    validation: validation
                }
            });
        }
    }
}
