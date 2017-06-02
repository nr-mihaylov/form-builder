const math = require('mathjs');

export default function bool(rule, state) {
    var leftOperand = rule.fieldRefs.find((ref) => { return ref.alias === 'LEFT_STEP' });
    var rightOperand = rule.fieldRefs.find((ref) => { return ref.alias === 'RIGHT_STEP' });
    return math.eval(
        leftOperand.field.eval(state) +
        rule.condition +
        (rightOperand? rightOperand.field.eval(state) : '')
    );
}
