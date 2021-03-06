export default {
    type: 'REGEX',
    ruleFunc: function(rule, state) {
        var arg = rule.fieldRefs.find((ref) => { return ref.alias === 'ARG' });
        return (new RegExp(rule.expression)).exec(arg.field.eval(state)) === null? false : true;
    }
}
