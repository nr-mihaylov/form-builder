const _ = require('lodash');
import widget  from '../widgets/widgetAggregator.js';
import ruleEval from '../rules/rulesAggregator.js';

export default (step, field) => new Field(step, field);

function Field(stepCfg, fieldCfg) {
    _.assign(this, {stepId: stepCfg.id});
    _.assign(this, fieldCfg);
    var Widget = widget(fieldCfg.type);
    _.assign(this, Widget.extend(this));
    _.assign(this, Widget.init? {init: (arg) => Widget.init(arg, this)} : {});
    this.isVisible = (state) => ruleEval(this.visibilityRules, state);
    this.isValid = (state) => ruleEval(this.validationRules, state);
    this.getLabel = function(state) {
        if(this.alternateLabel && this.alternateLabel.length>0) {
            var result = this.alternateLabel.find((alt) => {
                if(ruleEval(alt.conditions, state).valid) return alt.label;
            });
            return result === undefined? this.label : result.label;
        } else {
            return this.label;
        }
    }
}
