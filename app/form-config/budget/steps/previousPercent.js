function tag(strings, ...values) {
    var str = strings.raw[0];
    var result = [];

    for(var index in str)
        if(str[index] !== '\n' && str[index] !== '\t' && str[index] !== ' ')
            result.push(str[index]);

    return result.join('');
}

const cfg = {
    id: 'prevPercent',
    icon: 'icon-PeopleWithHouse',
    title: 'Prevoius Month in Percentages',
    currentStep: 'prevPercent',
    nextStep: 'current',
    nextStepAlternate: null,
    prevStep: 'prev',
    fields: [
        {
            id: 'LABEL1',
            label: 'Expenses in percentages:',
            type: 'LABEL_WIDGET',
            defaultValue: null,
            validationRules: []
        },
        {
            id: 'food',
            label: 'Food (%)',
            type: 'FORMULA_WIDGET',
            formula: tag`
                prev:food*100/prev:totalExpenses
            `,
            validationRules: []
        },
        {
            id: 'transport',
            label: 'Transport (%)',
            type: 'FORMULA_WIDGET',
            formula: tag`
                prev:transport*100/prev:totalExpenses
            `,
            validationRules: []
        },
        {
            id: 'entertainment',
            label: 'Entertainment (%)',
            type: 'FORMULA_WIDGET',
            formula: tag`
                prev:entertainment*100/prev:totalExpenses
            `,
            validationRules: []
        },
        {
            id: 'utilities',
            label: 'Utilities (%)',
            type: 'FORMULA_WIDGET',
            formula: tag`
                prev:utilities*100/prev:totalExpenses
            `,
            validationRules: []
        },
        {
            id: 'others',
            label: 'Others (%)',
            type: 'FORMULA_WIDGET',
            formula: tag`
                prev:others*100/prev:totalExpenses
            `,
            validationRules: []
        },
    ]
}

module.exports = cfg;
