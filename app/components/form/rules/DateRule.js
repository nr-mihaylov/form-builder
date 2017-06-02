const math = require('mathjs');
const Moment = require('moment');

export default function bool(rule, state) {
    var date = rule.fieldRefs.find((ref) => { return ref.alias === 'DATE' });
    var dateComp = rule.fieldRefs.find((ref) => { return ref.alias === 'DATE_COMP' });
    return math.eval(
        Moment(dateComp.date).diff(
            Moment(date.field.eval(state)),
            'years'
        ) + rule.condition
    );
}
