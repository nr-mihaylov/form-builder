function tag(strings, ...values) {
    var str = strings.raw[0];
    var result = [];

    for(var index in str)
        if(str[index] !== '\n' && str[index] !== '\t' && str[index] !== ' ')
            result.push(str[index]);

    return result.join('');
}

const cfg = {
    id: 'Omkostninger',
    icon: 'icon-PeopleWithHouse',
    title: 'Omkostninger',
    currentStep: 'Omkostninger',
    nextStep: 'psofinal',
    nextStepAlternate: [
        {
            nextStep: 'vsofrfinal',
            conditions: [
                {
                    type: 'REGEX',
                    expression: 'VSO',
                    fieldRefs: [
                        {
                            alias: 'ARG',
                            stepId: 'VaelgSkatteordning',
                            fieldId: 'F1'
                        }
                    ]
                },
                {
                    type: 'BOOL',
                    condition: '==true',
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
            nextStep: 'vsoflfinal',
            conditions: [
                {
                    type: 'REGEX',
                    expression: 'VSO',
                    fieldRefs: [
                        {
                            alias: 'ARG',
                            stepId: 'VaelgSkatteordning',
                            fieldId: 'F1'
                        }
                    ]
                },
                {
                    type: 'BOOL',
                    condition: '==false',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'OpretLejlighed',
                            fieldId: 'F4'
                        }
                    ]
                }
            ]
        }
    ],
    prevStep: 'Indtaegter',
    fields: [
        {
            id: 'F1',
            label: 'El',
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
            id: 'F2',
            label: 'Vand',
            type: 'CURRENCY_WIDGET',
            defaultValue: 4000,
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
            id: 'F3',
            label: 'Varme',
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
            id: 'F4',
            label: 'Fællesudgifter',
            type: 'CURRENCY_WIDGET',
            defaultValue: 25000,
            validationRules: []
        },
        {
            id: 'F5',
            label: 'Vedligeholdelse',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            visibilityRules: [
                {
                    type: 'BOOL',
                    condition: '==true',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'Spoergsmaal',
                            fieldId: 'F4'
                        }
                    ]
                }
            ],
            validationRules: []
        },
        {
            id: 'F6',
            label: 'Ejendomsskat',
            type: 'CURRENCY_WIDGET',
            defaultValue: 6000,
            validationRules: []
        },
        {
            id: 'F7',
            label: 'Omkostninger ved lejerskifte udover tilbageholdt depositum',
            type: 'CURRENCY_WIDGET',
            defaultValue: 0,
            visibilityRules: [
                {
                    type: 'BOOL',
                    condition: '==true',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'Spoergsmaal',
                            fieldId: 'F1'
                        }
                    ]
                }
            ],
            validationRules: []
        },
        {
            id: 'F8',
            label: 'Øvrige udgifter i forbindelse med driften',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            validationRules: []
        },
        {
            id: 'F9',
            label: 'Digital Revisor',
            type: 'CURRENCY_WIDGET',
            defaultValue: 900,
            validationRules: []
        },
        {
            id: 'DIVIDER1',
            type: 'DIVIDER_WIDGET',
            validationRules: []
        },
        {
            id: 'F10',
            label: 'Udgifter i alt',
            type: 'FORMULA_WIDGET',
            formula: tag`
            (Omkostninger:F1*OpretLejlighed:F6)+
            (Omkostninger:F2*OpretLejlighed:F7)+
            (Omkostninger:F3*OpretLejlighed:F8)+
            Omkostninger:F4+
            Omkostninger:F6+
            (Omkostninger:F7*Spoergsmaal:F1)+
            Omkostninger:F8+
            Omkostninger:F9+
            $IF(
                (Omkostninger:F5*Spoergsmaal:F4)>(Indtaegter:F1/Spoergsmaal:F2*12)*0.25;
                (Indtaegter:F1/Spoergsmaal:F2*12)*0.25;
                (Omkostninger:F5*Spoergsmaal:F4)
            )
            `,
            validationRules: []
        },
        {
            id: 'F11',
            label: 'Renteudgifter',
            type: 'CURRENCY_WIDGET',
            defaultValue: 19000,
            validationRules: []
        },
        {
            id: 'DIVIDER2',
            type: 'DIVIDER_WIDGET',
            validationRules: []
        },
        {
            id: 'F12',
            label: 'Fradrag i alt',
            type: 'FORMULA_WIDGET',
            formula: tag`
            Omkostninger:F10+Omkostninger:F11
            `,
            validationRules: []
        }
    ]
}

module.exports = cfg;
