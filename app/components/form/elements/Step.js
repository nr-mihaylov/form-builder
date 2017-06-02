const _ = require('lodash');
import ruleEval from '../rules/rulesAggregator.js';

export default (step) => new Step(step);

function Step(stepCfg) {
    _.assign(this, stepCfg);
    this.fields = [];
    this.allTouched = function(state) {
        return this.fields.reduce((acc, field) => {
            if(
                field.isTouchable &&
                !state[this.id][field.id].isTouched &&
                field.isVisible(state).valid
            ) acc = false;
            return acc;
        }, true);
    }
    this.isValid = function(state) {
        var result = this.fields.map((field) => {
            var fieldState = state[this.id][field.id];
            return {
                stepId: this.id,
                fieldId: field.id,
                fieldState: _.assign(
                    {},
                    fieldState,
                    field.isVisible(state).valid? field.isValid(state) : {valid: true, msg: null}
                )
            };
        });
        var isValid = result.reduce((acc, item) => {
            if(!item.fieldState.valid) acc = false;
            return acc;
        }, true);
        return {
            validationCheck: result,
            isStepValid: isValid,
        }
    }
    this.isVisible = function(state) {
        return ruleEval(this.visibilityRules, state).valid;
    }
    this.getNextStep = function(state) {
        if(this.nextStepAlternate && this.nextStepAlternate.length>0) {
            var result = this.nextStepAlternate.find((alt) => {
                if(ruleEval(alt.conditions, state).valid) return alt.nextStep;
            });
            return result === undefined? this.nextStep : result.nextStep;
        } else {
            return this.nextStep;
        }
    }
    this.getPrevStep = function(state) {
        if(this.prevStepAlternate && this.prevStepAlternate.length>0) {
            var result = this.prevStepAlternate.find((alt) => {
                if(ruleEval(alt.conditions, state).valid) return alt.prevStep;
            });
            return result === undefined? this.prevStep : result.prevStep;
        } else {
            return this.prevStep;
        }
    }
}
