function tag(strings, ...values) {
    var str = strings.raw[0];
    var result = [];

    for(var index in str)
        if(str[index] !== '\n' && str[index] !== '\t' && str[index] !== ' ')
            result.push(str[index]);

    return result.join('');
}

const cfg = {
    id: 'OpretLejlighed',
    icon: 'icon-PeopleWithHouse',
    title: 'Lejlighed',
    currentStep: 'OpretLejlighed',
    nextStep: 'VaelgSkatteordning',
    nextStepAlternate: null,
    prevStep: null,
    fields: [
        {
            id: 'F1',
            label: 'Hvornår er lejligheden købt? (dd/mm/åååå)',
            type: 'DATE_WIDGET',
            defaultValue: 1481670000000,
            maxDate: 1483225100000,
            validationRules: [
                {
                    type: 'BOOL',
                    condition: '!=null',
                    msg: '!=empty',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'OpretLejlighed',
                            fieldId: 'F1'
                        }
                    ]
                }
            ]
        },
        {
            id: 'F2',
            label: 'Anskaffelsessum',
            type: 'CURRENCY_WIDGET',
            defaultValue: 1000000,
            validationRules: [
                {
                    type: 'BOOL',
                    condition: '!=null',
                    msg: '!=empty',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'OpretLejlighed',
                            fieldId: 'F2'
                        }
                    ]
                }
            ]
        },
        {
            id: 'F3',
            label: 'Forbedringer af lejlighed frem til 31.12.15',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            validationRules: []
        },
        {
            id: 'F4',
            label: 'Er 2016 første år med udlejning?',
            type: 'BINARY_WIDGET',
            defaultValue: true,
            validationRules: [
                {
                    type: 'BOOL',
                    condition: '!=null',
                    msg: '!=empty',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'OpretLejlighed',
                            fieldId: 'F4'
                        }
                    ]
                }
            ]
        },
        {
            id: 'F5',
            label: 'Har du en særskilt bankkonto i forbindelse med lejligheden?',
            type: 'BINARY_WIDGET',
            defaultValue: true,
            validationRules: [
                {
                    type: 'BOOL',
                    condition: '!=null',
                    msg: '!=empty',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'OpretLejlighed',
                            fieldId: 'F5'
                        }
                    ]
                }
            ]
        },
        {
            id: 'LABEL1',
            label: 'Leverer du som udlejer:',
            type: 'LABEL_WIDGET',
            defaultValue: null,
            validationRules: []
        },
        {
            id: 'F6',
            label: 'El',
            type: 'BINARY_WIDGET',
            defaultValue: true,
            validationRules: [
                {
                    type: 'BOOL',
                    condition: '!=null',
                    msg: '!=empty',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'OpretLejlighed',
                            fieldId: 'F6'
                        }
                    ]
                }
            ]
        },
        {
            id: 'F7',
            label: 'Vand',
            type: 'BINARY_WIDGET',
            defaultValue: true,
            validationRules: [
                {
                    type: 'BOOL',
                    condition: '!=null',
                    msg: '!=empty',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'OpretLejlighed',
                            fieldId: 'F7'
                        }
                    ]
                }
            ]
        },
        {
            id: 'F8',
            label: 'Varme',
            type: 'BINARY_WIDGET',
            defaultValue: true,
            validationRules: [
                {
                    type: 'BOOL',
                    condition: '!=null',
                    msg: '!=empty',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'OpretLejlighed',
                            fieldId: 'F8'
                        }
                    ]
                }
            ]
        }
    ]
}

module.exports = cfg;
