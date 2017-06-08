function tag(strings, ...values) {
    var str = strings.raw[0];
    var result = [];

    for(var index in str)
        if(str[index] !== '\n' && str[index] !== '\t' && str[index] !== ' ')
            result.push(str[index]);

    return result.join('');
}

const cfg = {
    id: 'VaelgSkatteordning',
    icon: 'icon-PeopleWithHouse',
    title: 'Skatteordning',
    currentStep: 'VaelgSkatteordning',
    nextStep: 'Spoergsmaal',
    nextStepAlternate: [
        {
            nextStep: 'vsofr',
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
            nextStep: 'vsofl',
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
        },
        {
            nextStep: 'kaofr',
            conditions: [
                {
                    type: 'REGEX',
                    expression: 'KAO',
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
            nextStep: 'kaofl',
            conditions: [
                {
                    type: 'REGEX',
                    expression: 'KAO',
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
    prevStep: 'OpretLejlighed',
    fields: [
        {
            id: 'F1',
            type: 'RADIO_GROUP_WIDGET',
            label: 'Hvilken skatteordning vil du bruge?',
            generalTooltip: [
                'Virksomhedsordningen (mest anvendt) bruges typisk ved gæld i lejligheden',
                'Kapitalafkastordningen er typisk anvendt ved ingen gæld i lejligheden',
                'Almindelige skatteregler (simpel metode)'
            ],
            defaultValue: null,
            options: [
                {
                    label: 'Virksomhedsordningen',
                    value: 'VSO',
                    visibilityRules: [
                        {
                            type: 'BOOL',
                            condition: '==true',
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
                // {
                //     label: 'Kapitalafkastordningen',
                //     value: 'KAO',
                //     visibilityRules: []
                // },
                {
                    label: 'De almindelige skatteregler',
                    value: 'PSO',
                    visibilityRules: []
                }
            ],
            validationRules: [
                {
                    type: 'REGEX',
                    expression: 'PSO|VSO|KAO',
                    msg: '!=empty',
                    fieldRefs: [
                        {
                            alias: 'ARG',
                            stepId: 'VaelgSkatteordning',
                            fieldId: 'F1'
                        }
                    ]
                }
            ]
        }
    ]
}

module.exports = cfg;
