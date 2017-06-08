function tag(strings, ...values) {
    var str = strings.raw[0];
    var result = [];

    for(var index in str)
        if(str[index] !== '\n' && str[index] !== '\t' && str[index] !== ' ')
            result.push(str[index]);

    return result.join('');
}

const cfg = {
    id: 'kaofl',
    icon: 'icon-PeopleWithHouse',
    title: 'Kaofl',
    currentStep: 'kaofl',
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
            id: 'F1',
            label: 'Kapitalafkastgrundlag',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            validationRules: []
        }
    ]
}

module.exports = cfg;
