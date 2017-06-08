function tag(strings, ...values) {
    var str = strings.raw[0];
    var result = [];

    for(var index in str)
        if(str[index] !== '\n' && str[index] !== '\t' && str[index] !== ' ')
            result.push(str[index]);

    return result.join('');
}

const cfg = {
    id: 'Salgaflejlighed',
    icon: 'icon-PeopleWithHouse',
    title: 'Salgaflejlighed',
    currentStep: 'Salgaflejlighed',
    nextStep: 'Indtaegter',
    nextStepAlternate: null,
    prevStep: 'Spoergsmaal',
    visibilityRules: [
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
            label: 'Salgspris',
            type: 'CURRENCY_WIDGET',
            defaultValue: 3000000,
            validationRules: []
        },
        {
            id: 'F2',
            label: 'Salgsomkostninger',
            type: 'CURRENCY_WIDGET',
            defaultValue: 22000,
            validationRules: []
        },
        {
            id: 'F3',
            label: 'Kontantomregnet salgspris',
            type: 'FORMULA_WIDGET',
            formula: tag`
            Salgaflejlighed:F1-Salgaflejlighed:F2
            `,
            validationRules: []
        },
        {
            id: 'DIVIDER1',
            type: 'DIVIDER_WIDGET',
            validationRules: []
        },
        {
            id: 'F4',
            label: 'Købspris',
            type: 'FORMULA_WIDGET',
            formula: tag`
            OpretLejlighed:F2
            `,
            validationRules: []
        },
        {
            id: 'F5',
            label: 'Tillæg',
            type: 'FORMULA_WIDGET',
            formula: tag`
                $DATEDIFF(OpretLejlighed:F1)*10000
            `,
            validationRules: []
        },
        {
            id: 'F6',
            label: 'Forbedringsudgifter',
            type: 'FORMULA_WIDGET',
            formula: tag`
            $IF(
                Salgaflejlighed:F5>OpretLejlighed:F3;
                0;
                OpretLejlighed:F3-Salgaflejlighed:F5
            )
            `,
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
            validationRules: []
        },
        {
            id: 'F9',
            label: 'Forbedringsudgifter',
            type: 'FORMULA_WIDGET',
            formula: tag`
            $IF(
                Salgaflejlighed:F5>OpretLejlighed:F3;
                0;
                (OpretLejlighed:F3+Spoergsmaal:F6)-Salgaflejlighed:F5
            )
            `,
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
            validationRules: []
        },
        {
            id: 'F7',
            label: 'Kontantomregnet købspris',
            type: 'FORMULA_WIDGET',
            formula: tag`
            Salgaflejlighed:F4+Salgaflejlighed:F5+Salgaflejlighed:F6+Salgaflejlighed:F9
            `,
            validationRules: []
        },
        {
            id: 'DIVIDER2',
            type: 'DIVIDER_WIDGET',
            validationRules: []
        },
        {
            id: 'F8',
            label: 'Tab/fortjeneste',
            type: 'FORMULA_WIDGET',
            formula: tag`
            Salgaflejlighed:F3-Salgaflejlighed:F7
            `,
            validationRules: []
        }
    ]
}

module.exports = cfg;
