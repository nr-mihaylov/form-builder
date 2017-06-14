function tag(strings, ...values) {
    var str = strings.raw[0];
    var result = [];

    for(var index in str)
        if(str[index] !== '\n' && str[index] !== '\t' && str[index] !== ' ')
            result.push(str[index]);

    return result.join('');
}

const cfg = {
    id: 'prev',
    icon: 'icon-PeopleWithHouse',
    title: 'Prevoius Month',
    currentStep: 'prev',
    nextStep: 'prevPercent',
    nextStepAlternate: null,
    prevStep: null,
    fields: [
        {
            id: 'LABEL1',
            label: 'Types of expenses:',
            type: 'LABEL_WIDGET',
            defaultValue: null,
            validationRules: []
        },
        {
            id: 'food',
            label: 'Food',
            type: 'CURRENCY_WIDGET',
            defaultValue: 100,
            validationRules: []
        },
        {
            id: 'transport',
            label: 'Transport',
            type: 'CURRENCY_WIDGET',
            defaultValue: 200,
            validationRules: []
        },
        {
            id: 'entertainment',
            label: 'Entertainment',
            type: 'CURRENCY_WIDGET',
            defaultValue: 70,
            validationRules: []
        },
        {
            id: 'utilities',
            label: 'Utilities',
            type: 'CURRENCY_WIDGET',
            defaultValue: 100,
            validationRules: []
        },
        {
            id: 'others',
            label: 'Others',
            type: 'CURRENCY_WIDGET',
            defaultValue: 90,
            validationRules: []
        },
        {
            id: 'totalExpenses',
            label: 'Total Expenses',
            type: 'FORMULA_WIDGET',
            formula: tag`
                prev:food+
                prev:transport+
                prev:entertainment+
                prev:utilities+
                prev:others
            `,
            validationRules: []
        },
        {
            id: 'totalIncome',
            label: 'Income',
            type: 'CURRENCY_WIDGET',
            defaultValue: 800,
            validationRules: []
        },
        {
            id: 'balance',
            label: 'Balance',
            type: 'FORMULA_WIDGET',
            formula: tag`
            prev:totalIncome-prev:totalExpenses
            `,
            validationRules: []
        },
        {
            id: 'interestRate',
            label: 'Interest Rate',
            type: 'CURRENCY_WIDGET',
            defaultValue: 5,
            validationRules: []
        },
    ]
}

module.exports = cfg;
