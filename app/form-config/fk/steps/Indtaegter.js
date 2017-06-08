function tag(strings, ...values) {
    var str = strings.raw[0];
    var result = [];

    for(var index in str)
        if(str[index] !== '\n' && str[index] !== '\t' && str[index] !== ' ')
            result.push(str[index]);

    return result.join('');
}

const cfg = {
    id: 'Indtaegter',
    icon: 'icon-PeopleWithHouse',
    title: 'Indtaegter',
    currentStep: 'Indtaegter',
    nextStep: 'Omkostninger',
    nextStepAlternate: null,
    prevStep: 'Spoergsmaal',
    prevStepAlternate: [
        {
            prevStep: 'Salgaflejlighed',
            conditions: [
                {
                    type: 'BOOL',
                    condition: '==true',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'Spoergsmaal',
                            fieldId: 'F3'
                        }
                    ]
                }
            ]
        }
    ],
    fields: [
        {
            id: 'F1',
            label: 'Husleje opkrævet i løbet af året eksl. Forbrug',
            type: 'CURRENCY_WIDGET',
            defaultValue: 184000,
            validationRules: []
        },
        {
            id: 'F2',
            label: 'Opkrævet for el',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            visibilityRules: [
                {
                    type: 'BOOL',
                    condition: '==true',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'OpretLejlighed',
                            fieldId: 'F6'
                        }
                    ]
                }
            ],
            validationRules: []
        },
        {
            id: 'F3',
            label: 'Opkrævet for vand',
            type: 'CURRENCY_WIDGET',
            defaultValue: 5000,
            visibilityRules: [
                {
                    type: 'BOOL',
                    condition: '==true',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'OpretLejlighed',
                            fieldId: 'F7'
                        }
                    ]
                }
            ],
            validationRules: []
        },
        {
            id: 'F4',
            label: 'Opkrævet for varme',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            visibilityRules: [
                {
                    type: 'BOOL',
                    condition: '==true',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'OpretLejlighed',
                            fieldId: 'F8'
                        }
                    ]
                }
            ],
            validationRules: []
        },
        {
            id: 'DIVIDER2',
            type: 'DIVIDER_WIDGET',
            validationRules: []
        },
        {
            id: 'F5',
            label: 'Indtægter i alt',
            type: 'FORMULA_WIDGET',
            formula: tag`
            Indtaegter:F1+
            (Indtaegter:F2*OpretLejlighed:F6)+
            (Indtaegter:F3*OpretLejlighed:F7)+
            (Indtaegter:F4*OpretLejlighed:F8)
            `,
            validationRules: []
        }
    ]
}

module.exports = cfg;
