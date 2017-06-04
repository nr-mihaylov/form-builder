import findRule from './findRule.js';

function rulesEval(rules, state) {
    return rules && rules.length>0? rules.find((rule) => {
        var evalFunc = findRule(rule.type);
        if(!evalFunc(rule, state)) return rule;
    }) : undefined;
}

export default {
    eval: function(rules, state) {
        return rulesEval(rules, state) === undefined? true : false;
    },
    evalWithMessage: function(rules, state) {
        var rulesEvalResult = rulesEval(rules, state);
        console.log(rulesEvalResult);
        return rulesEvalResult === undefined? {
            valid: true,
            msg: null
        } : {
            valid: false,
            msg: rulesEvalResult.msg === undefined? 'Validation error: default response' : rulesEvalResult.msg
        };
    }
}
