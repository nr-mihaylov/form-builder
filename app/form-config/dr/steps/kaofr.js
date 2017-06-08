function tag(strings, ...values) {
    var str = strings.raw[0];
    var result = [];

    for(var index in str)
        if(str[index] !== '\n' && str[index] !== '\t' && str[index] !== ' ')
            result.push(str[index]);

    return result.join('');
}

const cfg = {
    id: 'kaofr',
    icon: 'icon-PeopleWithHouse',
    title: 'Kaofr',
    currentStep: 'kaofr',
    nextStep: 'Spoergsmaal',
    nextStepAlternate: null,
    prevStep: 'VaelgSkatteordning',
    visibilityRules: [
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
    ],
    fields: [
        {
            id: 'LABEL1',
            label: 'Kapitalafkastgrundlag:',
            type: 'LABEL_WIDGET',
            defaultValue: null,
            validationRules: []
        },
        {
            id: 'F1',
            label: 'Anskaffelsessum',
            type: 'FORMULA_WIDGET',
            formula: tag`
            OpretLejlighed:F2
            `,
            validationRules: []
        },
        {
            id: 'F2',
            label: 'Forbedringer af lejlighed frem til 31.12.15',
            type: 'FORMULA_WIDGET',
            formula: tag`
            OpretLejlighed:F3
            `,
            validationRules: []
        },
        {
            id: 'F3',
            label: 'Anden gæld',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            validationRules: []
        },
        {
            id: 'DIVIDER1',
            type: 'DIVIDER_WIDGET',
            validationRules: []
        },
        {
            id: 'F4',
            label: 'Kapitalafkastgrundlag',
            type: 'FORMULA_WIDGET',
            formula: tag`
            kaofr:F1+kaofr:F2-kaofr:F3
            `,
            validationRules: []
        }
    ]
}

module.exports = cfg;
