const _ = require('lodash');
import findWidget   from '../widgets/findWidget.js';
import ruleUtil     from '../rules/ruleUtil.js';

export default (step, field) => new Field(step, field);

function Field(stepCfg, fieldCfg) {
    _.assign(this, {stepId: stepCfg.id});
    _.assign(this, fieldCfg);
    var Widget = findWidget(fieldCfg.type);
    _.assign(this, Widget.extend(this));
    _.assign(this, Widget.init? {init: (arg) => Widget.init(arg, this)} : {});
    this.isVisible = (state) => ruleUtil.eval(this.visibilityRules, state);
    this.isValid = (state) => ruleUtil.evalWithMessage(this.validationRules, state);
    this.getLabel = function(state) {
        if(this.alternateLabel && this.alternateLabel.length>0) {
            var result = this.alternateLabel.find((alt) => {
                if(ruleUtil.eval(alt.conditions, state)) return alt.label;
            });
            return result === undefined? this.label : result.label;
        } else {
            return this.label;
        }
    }
}
