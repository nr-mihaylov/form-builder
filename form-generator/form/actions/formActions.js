export default function(plainConfig) {
    var cfg = plainConfig;
    return function(dispatcher) {
        return {
            initializeForm(cfg) {
                dispatcher({
                    type: 'INIT_FORM',
                    payload: {
                        formCfg: cfg
                    }
                });
            },
            updateField(field, fieldProps) {
                dispatcher({
                    type: 'UPDATE_FIELD',
                    payload: {
                        formId: cfg.id,
                        field: field,
                        fieldProps: fieldProps
                    }
                });
            },
            touchField(field, fieldProps) {
                dispatcher({
                    type: 'TOUCH_FIELD',
                    payload: {
                        formId: cfg.id,
                        field: field,
                        fieldProps: fieldProps
                    }
                });
            },
            validateStep(step, validation) {
                dispatcher({
                    type: 'VALIDATE_STEP',
                    payload: {
                        formId: cfg.id,
                        step: step,
                        validation: validation
                    }
                });
            },
            changeRoute(step, newRoute) {
                dispatcher({
                    type: 'CHANGE_STEP',
                    payload: {
                        formId: cfg.id,
                        step: step,
                        newRoute: newRoute
                    }
                });
            },
            visitStep(step) {
                dispatcher({
                    type: 'VISIT_STEP',
                    payload: {
                        formId: cfg.id,
                        step: step
                    }
                });
            }
        }
    }
}
