import Step from '../elements/Step.js';
import Field from '../elements/Field.js';

export default function(config) {
    var parseConfig = {
        id: config.id,
        appRoute: config.appRoute,
        currentRoute: config.currentRoute,
        steps: []
    };
    config.steps.forEach((step) => {
        var stepObj = Step(step);
        step.fields.forEach((field) => stepObj.fields.push(Field(step, field)));
        parseConfig.steps.push(stepObj);
    });
    parseConfig.steps.forEach((step) => {
        ruleSetParse(step.visibilityRules);
        alternateRuleSetParse(step.nextStepAlternate);
        alternateRuleSetParse(step.prevStepAlternate);
        step.fields.forEach((field) => {
            if(field.init) {
                field.init(parseConfig, field);
                delete field.init;
            }
            alternateRuleSetParse(field.alternateLabel);
            ruleSetParse(field.visibilityRules);
            ruleSetParse(field.validationRules);
        });
    });

    function alternateRuleSetParse(arg) {
        if(arg) arg.forEach((alt) => alt.conditions.forEach((condition) => ruleParse(condition)));
    }

    function ruleSetParse(arg) {
        if(arg) arg.forEach((rule) => ruleParse(rule));
    }

    function ruleParse(arg) {
        arg.fieldRefs.forEach((ref) => {
            if((
                ref.hasOwnProperty('stepId') && !ref.hasOwnProperty('fieldId')
            )|(
                !ref.hasOwnProperty('stepId') && ref.hasOwnProperty('fieldId')
            )) throw new Error('Mssing either step or field id');
            if(ref.hasOwnProperty('stepId') && ref.hasOwnProperty('fieldId')) {
                ref.field = parseConfig.steps.find((step) => {return step.id === ref.stepId})
                .fields.find((field) => {return field.id === ref.fieldId});
                delete ref.fieldId;
                delete ref.stepId;
            }
        });
    }
    console.log(parseConfig);
    return parseConfig;
}
