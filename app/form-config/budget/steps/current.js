function tag(strings, ...values) {
    var str = strings.raw[0];
    var result = [];

    for(var index in str)
        if(str[index] !== '\n' && str[index] !== '\t' && str[index] !== ' ')
            result.push(str[index]);

    return result.join('');
}

const cfg = {
    id: 'current',
    icon: 'icon-PeopleWithHouse',
    title: 'Current Month',
    currentStep: 'current',
    nextStep: null,
    nextStepAlternate: null,
    prevStep: 'prevPercent',
    fields: [
        {
            id: 'totalIncome',
            label: 'Income',
            type: 'CURRENCY_WIDGET',
            defaultValue: 800,
            validationRules: []
        },
        {
            id: 'loanPayment',
            label: 'Loan Payment',
            type: 'FORMULA_WIDGET',
            formula: tag`
                $IF(
                    prev:balance<0;
                    (prev:balance+(prev:balance*prev:interestRate/100))*(-1);
                    0;
                )
            `,
            validationRules: []
        },
        {
            id: 'afterLoanIncome',
            label: 'Income after loan',
            type: 'FORMULA_WIDGET',
            formula: tag`
                current:totalIncome-current:loanPayment
            `,
            validationRules: []
        },
        {
            id: 'food',
            label: 'Food',
            type: 'FORMULA_WIDGET',
            formula: tag`
                current:afterLoanIncome*(prevPercent:food/100)
            `,
            validationRules: []
        },
        {
            id: 'transport',
            label: 'Transport',
            type: 'FORMULA_WIDGET',
            formula: tag`
                current:afterLoanIncome*(prevPercent:transport/100)
            `,
            validationRules: []
        },
        {
            id: 'entertainment',
            label: 'Entertainment',
            type: 'FORMULA_WIDGET',
            formula: tag`
                current:afterLoanIncome*(prevPercent:entertainment/100)
            `,
            validationRules: []
        },
        {
            id: 'utilities',
            label: 'Utilities',
            type: 'FORMULA_WIDGET',
            formula: tag`
                current:afterLoanIncome*(prevPercent:utilities/100)
            `,
            validationRules: []
        },
        {
            id: 'others',
            label: 'Others',
            type: 'FORMULA_WIDGET',
            formula: tag`
                current:afterLoanIncome*(prevPercent:others/100)
            `,
            validationRules: []
        },
        {
            id: 'totalExpenses',
            label: 'Total Expenses',
            type: 'FORMULA_WIDGET',
            formula: tag`
                current:food+
                current:transport+
                current:entertainment+
                current:utilities+
                current:others
            `,
            validationRules: []
        },
        {
            id: 'balance',
            label: 'Balance',
            type: 'FORMULA_WIDGET',
            formula: tag`
                current:afterLoanIncome-current:totalExpenses
            `,
            validationRules: []
        }
    ]
}

module.exports = cfg;
