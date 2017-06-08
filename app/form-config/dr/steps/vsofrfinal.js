function tag(strings, ...values) {
    var str = strings.raw[0];
    var result = [];

    for(var index in str)
        if(str[index] !== '\n' && str[index] !== '\t' && str[index] !== ' ')
            result.push(str[index]);

    return result.join('');
}

const cfg = {
    id: 'vsofrfinal',
    icon: 'icon-PeopleWithHouse',
    title: 'Vsofrfinal',
    currentStep: 'vsofrfinal',
    nextStep: null,
    nextStepAlternate: null,
    prevStep: 'Omkostninger',
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
            label: 'Renter',
            type: 'FORMULA_WIDGET',
            formula: tag`
            Omkostninger:F11
            `,
            validationRules: []
        },
        {
            id: 'F4',
            label: 'Overskud',
            type: 'FORMULA_WIDGET',
            formula: tag`
            vsofrfinal:F1-(vsofrfinal:F2+vsofrfinal:F3)
            `,
            validationRules: []
        },
        {
            id: 'F5',
            label: 'Kapitalafkast',
            type: 'FORMULA_WIDGET',
            formula: tag`
            $IF(
                vsofrfinal:F4<0;
                0;
                $IF(
                    vsofr:F9<0;
                    0;
                    $IF(
                        vsofrfinal:F1-vsofrfinal:F2>=vsofrfinal:F3;
                        $IF(
                            vsofr:F9*0.01*$FLOOR(Spoergsmaal:F2)/12>vsofrfinal:F1-vsofrfinal:F2;
                            $IF(
                                vsofrfinal:F1-vsofrfinal:F2<0;
                                0;
                                vsofrfinal:F1-vsofrfinal:F2
                            );
                            vsofr:F9*0.01*$FLOOR(Spoergsmaal:F2)/12
                        );
                        $IF(
                            vsofr:F9*0.01*$FLOOR(Spoergsmaal:F2)/12>vsofrfinal:F3;
                            $IF(
                                vsofrfinal:F3<0;
                                0;
                                vsofrfinal:F3
                            );
                            vsofr:F9*0.01*$FLOOR(Spoergsmaal:F2)/12
                        )
                    )
                )
            )
            `,
            validationRules: []
        },
        {
            id: 'F6',
            label: 'Opsparet overskud reducering',
            type: 'FORMULA_WIDGET',
            hidden: true,
            formula: tag`
            0
            `,
            validationRules: []
        },
        {
            id: 'F7',
            label: 'J43',
            type: 'FORMULA_WIDGET',
            hidden: true,
            formula: tag`
            $IF(
                vsofrfinal:F8<0;
                vsofr:F8-vsofrfinal:F8;
                vsofr:F8
            )
            +
            $IF(
                $OR(
                    vsofr:F8<0;
                    vsofrfinal:F8<0
                );
                (Spoergsmaal:F10*Spoergsmaal:F11);
                0
            )
            `,
            validationRules: []
        },
        {
            id: 'F9',
            label: 'Rentekorrektion',
            type: 'FORMULA_WIDGET',
            formula: tag`
            $IF(
                vsofr:F8<0;
                vsofr:F8*0.01;
                0
            )
            `,
            validationRules: []
        },
        {
            id: 'F8',
            label: 'Resultat',
            type: 'FORMULA_WIDGET',
            formula: tag`
            vsofrfinal:F4-vsofrfinal:F5
            `,
            validationRules: []
        },
        {
            id: 'DIVIDER1',
            type: 'DIVIDER_WIDGET',
            validationRules: []
        },
        {
            id: 'F10',
            label: 'Du kan opspare op til',
            type: 'FORMULA_WIDGET',
            formula: tag`
            $IF(
                $OR(vsofrfinal:F7<0;vsofr:F8<0);
                0;
                $IF(
                    vsofrfinal:F5+0.22*vsofrfinal:F8>(Spoergsmaal:F8*Spoergsmaal:F9);
                    vsofrfinal:F8;
                    (vsofrfinal:F4-(Spoergsmaal:F8*Spoergsmaal:F9))/0.78
                )
            )
            `,
            validationRules: []
        },
        {
            id: 'F11',
            label: 'Ønsker du at spare op i VSO?',
            type: 'BINARY_WIDGET',
            defaultValue: null,
            validationRules: []
        },
        {
            id: 'F12',
            label: 'Ønsket opsparing',
            type: 'CURRENCY_WIDGET',
            defaultValue: null,
            validationRules: []
        },
        {
            id: 'F13',
            label: 'Rest til personlig indkomst',
            type: 'FORMULA_WIDGET',
            formula: tag`
            $IF(
                vsofrfinal:F11;
                $IF(
                    vsofrfinal:F10<0;
                    0;
                    vsofrfinal:F10-vsofrfinal:F12
                );
                vsofrfinal:F8
            )
            `,
            validationRules: []
        },
        {
            id: 'DIVIDER2',
            type: 'DIVIDER_WIDGET',
            validationRules: []
        },
        {
            id: 'F14',
            label: 'Rubrik 111 Overskud før renter',
            type: 'FORMULA_WIDGET',
            formula: tag`
            vsofrfinal:F1-vsofrfinal:F2
            `,
            validationRules: []
        },
        {
            id: 'F21',
            label: 'Rubrik 308 Ejendomsavance',
            type: 'FORMULA_WIDGET',
            formula: tag`
            Spoergsmaal:F3*Salgaflejlighed:F8
            `,
            validationRules: []
        },
        {
            id: 'F15',
            label: 'Rubrik 117 Renteudgifter',
            type: 'FORMULA_WIDGET',
            formula: tag`
            vsofrfinal:F3
            `,
            validationRules: []
        },
        {
            id: 'LABEL1',
            label: 'Rubrik 147 Virksomhedsordningen vælges',
            type: 'LABEL_WIDGET',
            validationRules: []
        },
        {
            id: 'F16',
            label: 'Rubrik 148 Kapitalafkast',
            type: 'FORMULA_WIDGET',
            formula: tag`
            vsofrfinal:F5
            `,
            validationRules: []
        },
        {
            id: 'F17',
            label: 'Rubrik 149 Opsparet overskud',
            type: 'FORMULA_WIDGET',
            formula: tag`
            $IF(
                vsofrfinal:F11==1;
                vsofrfinal:F12/0.78;
                0
            )
            `,
            validationRules: []
        },
        {
            id: 'F18',
            label: 'Rubrik 150 Rentekorrektion',
            type: 'FORMULA_WIDGET',
            formula: tag`
            vsofrfinal:F9
            `,
            validationRules: []
        },
        {
            id: 'F19',
            label: 'Rubrik 152 Årets samlede overførsler',
            type: 'FORMULA_WIDGET',
            formula: tag`
            vsofrfinal:F13+vsofrfinal:F16+(Spoergsmaal:F8*Spoergsmaal:F9)
            `,
            validationRules: []
        },
        {
            id: 'F20',
            label: 'Rubrik 984 Beløb indskudskonto',
            type: 'FORMULA_WIDGET',
            formula: tag`
            $IF(
                $AND(
                    vsofrfinal:F11==0;
                    vsofrfinal:F7<0;
                    vsofrfinal:F11>0
                );
                vsofrfinal:F7+vsofrfinal:F11;
                vsofrfinal:F7
            )
            `,
            validationRules: []
        }
    ]
}

module.exports = cfg;
