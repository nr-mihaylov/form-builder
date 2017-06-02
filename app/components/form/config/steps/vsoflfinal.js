function tag(strings, ...values) {
    var str = strings.raw[0];
    var result = [];

    for(var index in str)
        if(str[index] !== '\n' && str[index] !== '\t' && str[index] !== ' ')
            result.push(str[index]);

    return result.join('');
}

const cfg = {
    id: 'vsoflfinal',
    icon: 'icon-PeopleWithHouse',
    title: 'Vsoflfinal',
    currentStep: 'vsoflfinal',
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
            vsoflfinal:F1-(vsoflfinal:F2+vsoflfinal:F3)
            `,
            validationRules: []
        },
        {
            id: 'F5',
            label: 'Kapitalafkast',
            type: 'FORMULA_WIDGET',
            formula: tag`
            $IF(
                vsoflfinal:F4<0;
                0;
                $IF(
                    vsofl:F13<0;
                    0;
                    $IF(
                        vsoflfinal:F1-vsoflfinal:F2>=vsoflfinal:F3;
                        $IF(
                            vsofl:F13*0.01>vsoflfinal:F1-vsoflfinal:F2;
                            $IF(
                                vsoflfinal:F1-vsoflfinal:F2<0;
                                0;
                                vsoflfinal:F1-vsoflfinal:F2
                            );
                            vsofl:F13*0.01
                        );
                        $IF(
                            vsofl:F13*0.01>vsoflfinal:F3;
                            $IF(
                                vsoflfinal:F3<0;
                                0;
                                vsoflfinal:F3
                            );
                            vsofl:F13*0.01
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
            $IF(
                vsoflfinal:F8<0;
                $IF(
                    vsofl:F2+vsofl:F3+vsofl:F4+vsofl:F5+vsofl:F6+
                    vsofl:F8+vsofl:F8+vsofl:F9+vsofl:F10+vsofl:F11
                    <
                    -vsoflfinal:F8;
                    vsofl:F2+vsofl:F3+vsofl:F4+vsofl:F5+vsofl:F6+
                    vsofl:F8+vsofl:F8+vsofl:F9+vsofl:F10+vsofl:F11;
                    -vsoflfinal:F8
                );
                0
            )
            `,
            validationRules: []
        },
        {
            id: 'F7',
            label: 'J43',
            type: 'FORMULA_WIDGET',
            hidden: true,
            formula: tag`
            vsofl:F12-
            $IF(
                vsoflfinal:F8<(Spoergsmaal:F8*Spoergsmaal:F9);
                (Spoergsmaal:F8*Spoergsmaal:F9);
                0
            )+
            $IF(
                vsoflfinal:F6>0;
                $IF(
                    (vsoflfinal:F8+vsoflfinal:F6)>0;
                    0;
                    vsoflfinal:F8+vsoflfinal:F6
                );
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
            vsoflfinal:F4-vsoflfinal:F5
            `,
            validationRules: []
        },
        {
            id: 'F9',
            label: 'Rentekorrektion',
            type: 'FORMULA_WIDGET',
            formula: tag`
            $IF(
                $AND(vsofl:F12<0;vsoflfinal:F7<0);
                $IF(
                    vsoflfinal:F7<vsofl:F12;
                    vsofl:F12*(0.01+0.03);
                    vsoflfinal:F7*(0.01+0.03)
                );
                $IF(
                    $AND(vsoflfinal:F7<0;vsofl:F12>0);
                    vsoflfinal:F7*(0.01+0.03);
                    $IF(
                        $AND(vsoflfinal:F7>0;
                        vsofl:F12<0);
                        vsofl:F12*(0.01+0.03);
                        0
                    )
                )
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
            id: 'F10',
            label: 'Du kan opspare op til',
            type: 'FORMULA_WIDGET',
            formula: tag`
            $IF(
                $OR(vsoflfinal:F7<0;vsofl:F12<0);
                0;
                $IF(
                    (vsoflfinal:F5+vsoflfinal:F8*0.22)>(Spoergsmaal:F8*Spoergsmaal:F9);
                    vsoflfinal:F8;
                    (vsoflfinal:F4-((Spoergsmaal:F8*Spoergsmaal:F9)))/0.78
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
                vsoflfinal:F11;
                $IF(
                    vsoflfinal:F12>vsoflfinal:F8;
                    0;
                    vsoflfinal:F8-vsoflfinal:F12
                );
                vsoflfinal:F8
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
            vsoflfinal:F1-vsoflfinal:F2
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
            vsoflfinal:F3
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
            vsoflfinal:F5
            `,
            validationRules: []
        },
        {
            id: 'F17',
            label: 'Rubrik 149 Opsparet overskud',
            type: 'FORMULA_WIDGET',
            formula: tag`
            $IF(
                vsoflfinal:F11==1;
                vsoflfinal:F12/0.78;
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
            vsoflfinal:F9
            `,
            validationRules: []
        },
        {
            id: 'F19',
            label: 'Rubrik 152 Årets samlede overførsler',
            type: 'FORMULA_WIDGET',
            formula: tag`
            vsoflfinal:F13+vsoflfinal:F16-vsofl:F14+(Spoergsmaal:F8*Spoergsmaal:F9)
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
                    vsoflfinal:F11==0;
                    vsoflfinal:F7<0;
                    vsoflfinal:F8>0
                );
                vsoflfinal:F7+vsoflfinal:F8;
                vsoflfinal:F7
            )
            +
            $IF(
                $AND(
                    vsoflfinal:F8>0;
                    vsoflfinal:F7<0
                );
                Spoergsmaal:F10*Spoergsmaal:F11;
                0
            )
            `,
            validationRules: []
        }
    ]
}

module.exports = cfg;
