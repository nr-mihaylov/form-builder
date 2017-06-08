function tag(strings, ...values) {
    var str = strings.raw[0];
    var result = [];

    for(var index in str)
        if(str[index] !== '\n' && str[index] !== '\t' && str[index] !== ' ')
            result.push(str[index]);

    return result.join('');
}

const cfg = {
    id: 'psofinal',
    icon: 'icon-PeopleWithHouse',
    title: 'Psofinal',
    currentStep: 'psofinal',
    nextStep: null,
    nextStepAlternate: null,
    prevStep: 'Omkostninger',
    visibilityRules: [
        {
            type: 'REGEX',
            expression: 'PSO',
            fieldRefs: [
                {
                    alias: 'ARG',
                    stepId: 'VaelgSkatteordning',
                    fieldId: 'F1'
                }
            ]
        }
    ],
    fields: [
        {
            id: 'F1',
            label: 'Indtægter',
            type: 'FORMULA_WIDGET',
            formula: tag`
            Indtaegter:F5
            `,
            validationRules: []
        },
        {
            id: 'F2',
            label: 'Udgifter',
            type: 'FORMULA_WIDGET',
            formula: tag`
            Omkostninger:F10
            `,
            validationRules: []
        },
        {
            id: 'F3',
            label: 'Resultat før renter',
            type: 'FORMULA_WIDGET',
            formula: tag`
            psofinal:F1-psofinal:F2
            `,
            validationRules: []
        },
        {
            id: 'F4',
            label: 'Renter',
            type: 'FORMULA_WIDGET',
            formula: tag`
            Omkostninger:F11
            `,
            validationRules: []
        },
        {
            id: 'F5',
            label: 'Resultat til personlig indkomst',
            type: 'FORMULA_WIDGET',
            formula: tag`
            psofinal:F3-psofinal:F4
            `,
            validationRules: []
        },
        {
            id: 'DIVIDER2',
            type: 'DIVIDER_WIDGET',
            validationRules: []
        },
        {
            id: 'LABEL1',
            label: 'Indberet følgende på din selvangivelse:',
            type: 'LABEL_WIDGET',
            defaultValue: null,
            validationRules: []
        },
        {
            id: 'F6',
            label: 'Rubrik 111 Overskud',
            alternateLabel: [
                {
                    label: 'Rubrik 112 Underskud',
                    conditions: [
                        {
                            type: 'BOOL',
                            condition: '<0',
                            fieldRefs: [
                                {
                                    alias: 'LEFT_STEP',
                                    stepId: 'psofinal',
                                    fieldId: 'F6'
                                }
                            ]
                        }
                    ]
                }
            ],
            type: 'FORMULA_WIDGET',
            formula: tag`
            psofinal:F3
            `,
            validationRules: []
        },
        {
            id: 'F7',
            label: 'Rubrik 308 Ejendomsavance',
            type: 'FORMULA_WIDGET',
            formula: tag`
            Spoergsmaal:F3*Salgaflejlighed:F8
            `,
            validationRules: []
        },
        {
            id: 'F8',
            label: 'Rubrik 117 Renteudgifter',
            type: 'FORMULA_WIDGET',
            formula: tag`
            psofinal:F4
            `,
            validationRules: []
        },

        {
            id: 'F9',
            label: 'Rubrik 207 Erhvervsmæssig udlejning',
            type: 'FORMULA_WIDGET',
            formula: tag`
            Spoergsmaal:F2*30
            `,
            validationRules: []
        }
    ]
}

module.exports = cfg;
