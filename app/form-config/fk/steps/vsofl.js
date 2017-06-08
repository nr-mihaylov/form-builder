function tag(strings, ...values) {
    var str = strings.raw[0];
    var result = [];

    for(var index in str)
        if(str[index] !== '\n' && str[index] !== '\t' && str[index] !== ' ')
            result.push(str[index]);

    return result.join('');
}

const cfg = {
    id: 'vsofl',
    icon: 'icon-PeopleWithHouse',
    title: 'Vsofl',
    currentStep: 'vsofl',
    nextStep: 'Spoergsmaal',
    nextStepAlternate: null,
    prevStep: 'VaelgSkatteordning',
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
            condition: '==false',
            fieldRefs: [
                {
                    alias: 'LEFT_STEP',
                    stepId: 'OpretLejlighed',
                    fieldId: 'F4'
                }
            ]
        }
    ],
    fields: [
        {
            id: 'LABEL1',
            label: 'Oplysninger fra sidste års regnskab:',
            type: 'LABEL_WIDGET',
            defaultValue: null,
            validationRules: []
        },
        {
            id: 'F1',
            label: 'Har du opsparet overskud fra tidligere år?',
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
                            stepId: 'vsofl',
                            fieldId: 'F1'
                        }
                    ]
                }
            ]
        },
        {
            id: 'LABEL2',
            label: 'Opsparet overskud pr. skatteprocent:',
            type: 'LABEL_WIDGET',
            defaultValue: null,
            validationRules: []
        },
        {
            id: 'F2',
            label: '2016-2017 (22%)',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            visibilityRules: [
                {
                    type: 'BOOL',
                    condition: '==true',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'vsofl',
                            fieldId: 'F1'
                        }
                    ]
                }
            ],
            validationRules: []
        },
        {
            id: 'F3',
            label: '2015 (23,5%)',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            visibilityRules: [
                {
                    type: 'BOOL',
                    condition: '==true',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'vsofl',
                            fieldId: 'F1'
                        }
                    ]
                },
                {
                    type: 'DATE',
                    condition: '>0',
                    fieldRefs: [
                        {
                            alias: 'DATE',
                            stepId: 'OpretLejlighed',
                            fieldId: 'F1'
                        },
                        {
                            alias: 'DATE_COMP',
                            date: 1483225100000
                        }
                    ]
                }
            ],
            validationRules: []
        },
        {
            id: 'F4',
            label: '2014 (24,5%)',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            visibilityRules: [
                {
                    type: 'BOOL',
                    condition: '==true',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'vsofl',
                            fieldId: 'F1'
                        }
                    ]
                },
                {
                    type: 'DATE',
                    condition: '>1',
                    fieldRefs: [
                        {
                            alias: 'DATE',
                            stepId: 'OpretLejlighed',
                            fieldId: 'F1'
                        },
                        {
                            alias: 'DATE_COMP',
                            date: 1483225100000
                        }
                    ]
                }
            ],
            validationRules: []
        },
        {
            id: 'F5',
            label: '2007-2013 (25%)',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            visibilityRules: [
                {
                    type: 'BOOL',
                    condition: '==true',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'vsofl',
                            fieldId: 'F1'
                        }
                    ]
                },
                {
                    type: 'DATE',
                    condition: '>2',
                    fieldRefs: [
                        {
                            alias: 'DATE',
                            stepId: 'OpretLejlighed',
                            fieldId: 'F1'
                        },
                        {
                            alias: 'DATE_COMP',
                            date: 1483225100000
                        }
                    ]
                }
            ],
            validationRules: []
        },
        {
            id: 'F6',
            label: '2005-2006 (28%)',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            visibilityRules: [
                {
                    type: 'BOOL',
                    condition: '==true',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'vsofl',
                            fieldId: 'F1'
                        }
                    ]
                },
                {
                    type: 'DATE',
                    condition: '>9',
                    fieldRefs: [
                        {
                            alias: 'DATE',
                            stepId: 'OpretLejlighed',
                            fieldId: 'F1'
                        },
                        {
                            alias: 'DATE_COMP',
                            date: 1483225100000
                        }
                    ]
                }
            ],
            validationRules: []
        },
        {
            id: 'F7',
            label: '2001-2004 (30%)',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            visibilityRules: [
                {
                    type: 'BOOL',
                    condition: '==true',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'vsofl',
                            fieldId: 'F1'
                        }
                    ]
                },
                {
                    type: 'DATE',
                    condition: '>11',
                    fieldRefs: [
                        {
                            alias: 'DATE',
                            stepId: 'OpretLejlighed',
                            fieldId: 'F1'
                        },
                        {
                            alias: 'DATE_COMP',
                            date: 1483225100000
                        }
                    ]
                }
            ],
            validationRules: []
        },
        {
            id: 'F8',
            label: '1999-2000 (32%)',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            visibilityRules: [
                {
                    type: 'BOOL',
                    condition: '==true',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'vsofl',
                            fieldId: 'F1'
                        }
                    ]
                },
                {
                    type: 'DATE',
                    condition: '>15',
                    fieldRefs: [
                        {
                            alias: 'DATE',
                            stepId: 'OpretLejlighed',
                            fieldId: 'F1'
                        },
                        {
                            alias: 'DATE_COMP',
                            date: 1483225100000
                        }
                    ]
                }
            ],
            validationRules: []
        },
        {
            id: 'F9',
            label: '1992-1998 (34%)',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,

            visibilityRules: [
                {
                    type: 'BOOL',
                    condition: '==true',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'vsofl',
                            fieldId: 'F1'
                        }
                    ]
                },
                {
                    type: 'DATE',
                    condition: '>17',
                    fieldRefs: [
                        {
                            alias: 'DATE',
                            stepId: 'OpretLejlighed',
                            fieldId: 'F1'
                        },
                        {
                            alias: 'DATE_COMP',
                            date: 1483225100000
                        }
                    ]
                }
            ],
            validationRules: []
        },
        {
            id: 'F10',
            label: '1991 (38%)',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            visibilityRules: [
                {
                    type: 'BOOL',
                    condition: '==true',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'vsofl',
                            fieldId: 'F1'
                        }
                    ]
                },
                {
                    type: 'DATE',
                    condition: '>24',
                    fieldRefs: [
                        {
                            alias: 'DATE',
                            stepId: 'OpretLejlighed',
                            fieldId: 'F1'
                        },
                        {
                            alias: 'DATE_COMP',
                            date: 1483225100000
                        }
                    ]
                }
            ],
            validationRules: []
        },
        {
            id: 'F11',
            label: '1987-1990 (50%)',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            visibilityRules: [
                {
                    type: 'BOOL',
                    condition: '==true',
                    fieldRefs: [
                        {
                            alias: 'LEFT_STEP',
                            stepId: 'vsofl',
                            fieldId: 'F1'
                        }
                    ]
                },
                {
                    type: 'DATE',
                    condition: '>25',
                    fieldRefs: [
                        {
                            alias: 'DATE',
                            stepId: 'OpretLejlighed',
                            fieldId: 'F1'
                        },
                        {
                            alias: 'DATE_COMP',
                            date: 1483225100000
                        }
                    ]
                }
            ],
            validationRules: []
        },
        {
            id: 'F12',
            label: 'Saldo på indskudskonto',
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
                            stepId: 'vsofl',
                            fieldId: 'F12'
                        }
                    ]
                }
            ]
        },
        {
            id: 'F13',
            label: 'Kapitalafkastgrundlag',
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
                            stepId: 'vsofl',
                            fieldId: 'F13'
                        }
                    ]
                }
            ]
        },
        {
            id: 'F14',
            label: 'Hensat til senere hævning',
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
                            stepId: 'vsofl',
                            fieldId: 'F14'
                        }
                    ]
                }
            ]
        },
        {
            id: 'F15',
            label: 'Saldo på mellemregningskonto',
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
                            stepId: 'vsofl',
                            fieldId: 'F15'
                        }
                    ]
                }
            ]
        },
    ]
}

module.exports = cfg;
