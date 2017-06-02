import Bool from './Bool.js';
import Nullable from './Nullable.js';
import Regex from './Regex.js';
import DateRule from './DateRule.js';

var ruleTemplates = [
    {
        type: 'BOOL',
        template: Bool
    },
    {
        type: 'REGEX',
        template: Regex
    },
    {
        type: 'DATE',
        template: DateRule
    }
];

function getTemplate(type) {
    return ruleTemplates.find((template) => {return template.type === type}).template;
}

export default (rules, state) => {
    if(rules && rules.length>0) {
        var result = rules.find((rule) => {
            if(!getTemplate(rule.type)(rule, state)) return rule;
        });
        return result === undefined? {
            valid: true,
            msg: null
        } : {
            valid: false,
            msg: result.msg === undefined? null : result.msg
        };
    } else return {
        valid: true,
        msg: null
    }
}
