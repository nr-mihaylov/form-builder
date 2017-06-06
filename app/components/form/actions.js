export default function(dispatcher) {
    return {
        updateField(field, fieldProps) {
            dispatcher({
                type: 'UPDATE_FIELD',
                payload: {
                    field: field,
                    fieldProps: fieldProps
                }
            });
        },
        touchField(field, fieldProps) {
            dispatcher({
                type: 'TOUCH_FIELD',
                payload: {
                    field: field,
                    fieldProps: fieldProps
                }
            });
        },
        validateStep(step, validation) {
            dispatcher({
                type: 'VALIDATE_STEP',
                payload: {
                    step: step,
                    validation: validation
                }
            });
        },
        changeRoute(step, newRoute) {
            dispatcher({
                type: 'CHANGE_STEP',
                payload: {
                    step: step,
                    newRoute: newRoute
                }
            });
        },
        visitStep(step) {
            dispatcher({
                type: 'VISIT_STEP',
                payload: {
                    step: step
                }
            });
        }
    }
}
