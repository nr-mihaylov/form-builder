function tag(strings, ...values) {
    var str = strings.raw[0];
    var result = [];

    for(var index in str)
        if(str[index] !== '\n' && str[index] !== '\t' && str[index] !== ' ')
            result.push(str[index]);

    return result.join('');
}

const cfg = {
    id: 'vsofr',
    icon: 'icon-PeopleWithHouse',
    title: 'Vsofr',
    currentStep: 'vsofr',
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
            label: 'Indskudskonto:',
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
            label: 'Gæld realkredit',
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
                            stepId: 'vsofr',
                            fieldId: 'F3'
                        }
                    ]
                }
            ]
        },
        {
            id: 'F4',
            label: 'Gæld bank',
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
                            stepId: 'vsofr',
                            fieldId: 'F4'
                        }
                    ]
                }
            ]
        },
        {
            id: 'F5',
            label: 'Indskudt kapital ved opstart',
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
                            stepId: 'vsofr',
                            fieldId: 'F5'
                        }
                    ]
                }
            ]
        },
        {
            id: 'F6',
            label: 'Anden gæld',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            validationRules: []
        },
        {
            id: 'F7',
            label: 'Vedrører gæld kun udlejning af lejligheden?',
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
                            stepId: 'vsofr',
                            fieldId: 'F7'
                        }
                    ]
                }
            ]
        },
        {
            id: 'F8',
            label: 'Indskudskonto',
            type: 'FORMULA_WIDGET',
            formula: tag`
            $IF(
                $AND(
                    vsofr:F1+vsofr:F2+vsofr:F5-(vsofr:F3+vsofr:F4+vsofr:F6)<0;
                    vsofr:F7==1
                );
                0;
                vsofr:F1+vsofr:F2+vsofr:F5-(vsofr:F3+vsofr:F4+vsofr:F6)
            )
            `,
            validationRules: []
        },
        {
            id: 'DIVIDER1',
            type: 'DIVIDER_WIDGET',
            validationRules: []
        },
        {
            id: 'F9',
            label: 'Kapitalafkastgrundlag',
            type: 'FORMULA_WIDGET',
            formula: tag`
            $IF(
                vsofr:F1+vsofr:F2+vsofr:F5-(vsofr:F3+vsofr:F4+vsofr:F6)>0;
                vsofr:F1+vsofr:F2+vsofr:F5-(vsofr:F3+vsofr:F4+vsofr:F6);
                0
            )
            `,
            validationRules: []
        }
    ]
}

module.exports = cfg;
