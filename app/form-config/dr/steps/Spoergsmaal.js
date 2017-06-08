function tag(strings, ...values) {
    var str = strings.raw[0];
    var result = [];

    for(var index in str)
        if(str[index] !== '\n' && str[index] !== '\t' && str[index] !== ' ')
            result.push(str[index]);

    return result.join('');
}

const cfg = {
    id: 'Spoergsmaal',
    icon: 'icon-PeopleWithHouse',
    title: 'Spoergsmaal',
    currentStep: 'Spoergsmaal',
    nextStep: 'Indtaegter',
    nextStepAlternate: [
        {
            nextStep: 'Salgaflejlighed',
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
    prevStep: 'VaelgSkatteordning',
    prevStepAlternate: [
        {
            prevStep: 'vsofr',
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
            prevStep: 'vsofl',
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
            prevStep: 'kaofr',
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
            prevStep: 'kaofl',
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
    fields: [
        {
            id: 'LABEL1',
            label: 'Udlejning:',
            type: 'LABEL_WIDGET',
            defaultValue: null,
            validationRules: []
        },
        {
            id: 'F1',
            label: 'Har der været udskiftning af lejer i 2016?',
            type: 'BINARY_WIDGET',
            defaultValue: null,
            validationRules: [
                {
                    type: 'BOOL',
                    condition: '!=null',
                    msg: '!=empty',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'Spoergsmaal',
                            fieldId: 'F1'
                        }
                    ]
                }
            ]
        },
        {
            id: 'F2',
            label: 'Antal måneder udlejet i år',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            validationRules: [
                {
                    type: 'BOOL',
                    condition: '!=null',
                    msg: '!=empty',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'Spoergsmaal',
                            fieldId: 'F2'
                        }
                    ]
                },
                {
                    type: 'BOOL',
                    condition: '>0',
                    msg: '>0',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'Spoergsmaal',
                            fieldId: 'F2'
                        }
                    ]
                },
                {
                    type: 'BOOL',
                    condition: '<13',
                    msg: '<13',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'Spoergsmaal',
                            fieldId: 'F2'
                        }
                    ]
                }
            ]
        },
        {
            id: 'DIVIDER1',
            type: 'DIVIDER_WIDGET',
            validationRules: []
        },
        {
            id: 'LABEL2',
            label: 'Lejligheden:',
            type: 'LABEL_WIDGET',
            defaultValue: null,
            validationRules: []
        },
        {
            id: 'F3',
            label: 'Har du solgt din lejlighed i år?',
            type: 'BINARY_WIDGET',
            defaultValue: null,
            validationRules: [
                {
                    type: 'BOOL',
                    condition: '!=null',
                    msg: '!=empty',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'Spoergsmaal',
                            fieldId: 'F3'
                        }
                    ]
                }
            ]
        },
        {
            id: 'F5',
            label: 'Har du lavet forbedringer i 2016?',
            type: 'BINARY_WIDGET',
            defaultValue: null,
            visibilityRules: [
                {
                    type: 'REGEX',
                    expression: 'VSO|KAO',
                    fieldRefs: [
                        {
                            alias: 'ARG',
                            stepId: 'VaelgSkatteordning',
                            fieldId: 'F1'
                        }
                    ]
                }
            ],
            validationRules: [
                {
                    type: 'BOOL',
                    condition: '!=null',
                    msg: '!=empty',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'Spoergsmaal',
                            fieldId: 'F5'
                        }
                    ]
                }
            ]
        },
        {
            id: 'F6',
            label: 'Omkostninger ved forbedring',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            visibilityRules: [
                {
                    type: 'REGEX',
                    expression: 'VSO|KAO',
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
                            stepId: 'Spoergsmaal',
                            fieldId: 'F5'
                        }
                    ]
                }
            ],
            validationRules: [
                {
                    type: 'BOOL',
                    condition: '!=null',
                    msg: '!=empty',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'Spoergsmaal',
                            fieldId: 'F6'
                        }
                    ]
                }
            ]
        },
        {
            id: 'F4',
            label: 'Har du haft vedligeholdelsesudgifter i 2016?',
            type: 'BINARY_WIDGET',
            defaultValue: null,
            validationRules: [
                {
                    type: 'BOOL',
                    condition: '!=null',
                    msg: '!=empty',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'Spoergsmaal',
                            fieldId: 'F4'
                        }
                    ]
                }
            ]
        },
        {
            id: 'DIVIDER2',
            type: 'DIVIDER_WIDGET',
            visibilityRules: [
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
                }
            ],
            validationRules: []
        },
        {
            id: 'LABEL3',
            label: 'Økonomi:',
            type: 'LABEL_WIDGET',
            defaultValue: null,
            visibilityRules: [
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
                }
            ],
            validationRules: []
        },
        {
            id: 'F8',
            label: 'Har du flyttet penge til din private konto?',
            type: 'BINARY_WIDGET',
            defaultValue: null,
            visibilityRules: [
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
                }
            ],
            validationRules: [
                {
                    type: 'BOOL',
                    condition: '!=null',
                    msg: '!=empty',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'Spoergsmaal',
                            fieldId: 'F8'
                        }
                    ]
                }
            ]
        },
        {
            id: 'F9',
            label: 'Hvor mange penge har du flyttet til din private konto?',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            visibilityRules: [
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
                            stepId: 'Spoergsmaal',
                            fieldId: 'F8'
                        }
                    ]
                }
            ],
            validationRules: [
                {
                    type: 'BOOL',
                    condition: '!=null',
                    msg: '!=empty',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'Spoergsmaal',
                            fieldId: 'F9'
                        }
                    ]
                }
            ]
        },
        {
            id: 'F10',
            label: 'Har du indskudt penge i virksomhedsordningen i løbet af året?',
            type: 'BINARY_WIDGET',
            defaultValue: null,
            visibilityRules: [
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
                }
            ],
            validationRules: [
                {
                    type: 'BOOL',
                    condition: '!=null',
                    msg: '!=empty',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'Spoergsmaal',
                            fieldId: 'F10'
                        }
                    ]
                }
            ]
        },
        {
            id: 'F11',
            label: 'Hvor mange penge er indskudt i løbet af året?',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            visibilityRules: [
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
                            stepId: 'Spoergsmaal',
                            fieldId: 'F10'
                        }
                    ]
                }
            ],
            validationRules: [
                {
                    type: 'BOOL',
                    condition: '!=null',
                    msg: '!=empty',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'Spoergsmaal',
                            fieldId: 'F11'
                        }
                    ]
                }
            ]
        },
        {
            id: 'F12',
            label: 'Samlet gæld i lejligheden pr. 31.12.16',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            visibilityRules: [
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
                }
            ],
            validationRules: [
                {
                    type: 'BOOL',
                    condition: '!=null',
                    msg: '!=empty',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'Spoergsmaal',
                            fieldId: 'F12'
                        }
                    ]
                }
            ]
        },
    ]
}

module.exports = cfg;
