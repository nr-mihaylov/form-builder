const math = require('mathjs');
import React    from 'react';
import Moment   from 'moment';

class FormulaWidget extends React.Component {
    constructor(props) {
        super(props);
        this.pretty = this.pretty.bind(this);
    }

    pretty(arg) {
        if(arg === null) return 0;
        var negative = false;
        var temp = null;
        if(arg.toString().substring(0,1) === '-') {
            temp = arg.toString().substring(1, arg.length).toString().split('.');
            negative = true;
        } else temp = arg.toString().split('.');
        var integer = temp[0];
        var decimal = temp[1];
        var result = '';
        var counter = 0;
        for(var i=integer.length-1; i>=0; i--) {
            if(counter%3 === 0 && counter > 0)
                result += '.' + integer[i];
            else
                result += integer[i];
            counter++;
        }
        return (negative? '-' : '') + result.split('').reverse().join('');// + ' ' + (decimal !== null && decimal !== undefined? ',' + decimal :  '');

    }

    render() {
        return this.props.field.hidden === true? null: (
            <div className="formRow">
                <div className="leftPart">
                    <label>{this.props.field.getLabel(this.props.store)}</label>
                </div>
                <div className="rightPart">
                    <div className="resultDisplayerComponent">
                        {this.pretty(this.props.field.eval(this.props.store))}
                    </div>
                </div>
            </div>
        )
    }
}

export default {
    Component: FormulaWidget,
	extend: function(field) {
        field.compiledFormula = breakdown(field.formula);
        field.spreadFormula = false;
		return {
			eval: function(state) {
                function compute(arg, cache, state) {
                    var computeResult = arg.reduce((acc, obj) => {
                        switch(obj.type) {
                            case 'formula':
                                return acc + cache[obj.value.id+obj.value.stepId].value;
                            case 'reference':
                                var ref = cache[obj.value.id+obj.value.stepId].value;
                                return acc + (ref === null? '0': ref);
                            case 'symbol':
                                return acc + obj.value;
                            case 'number':
                                return acc + obj.value;
                            case 'IF':
                                var condition = compute(obj.value[0], cache, state);
                                var expTrue = compute(obj.value[1], cache, state);
                                var expFalse = compute(obj.value[2], cache, state);
                                return acc + (math.eval(condition)? expTrue : expFalse);
                            case 'AND':
                                var result = obj.value.reduce(function(andAcc, value) {
                                    return andAcc += compute(value, cache, state) + '&';
                                }, '');
                                result = result.substring(0, result.length - 1);
                                return acc + math.eval(result);
                            case 'OR':
                                var result = obj.value.reduce(function(acc, value) {
                                    return acc += compute(value, cache, state) + '|';
                                }, '');
                                result = result.substring(0, result.length - 1);
                                return acc + math.eval(result);
                            case 'CEIL':
                                return acc + math.ceil(compute(obj.value[0], cache, state));
                            case 'FLOOR':
                                return acc + math.floor(compute(obj.value[0], cache, state));
                            case 'ROUND':
                                var result = compute(obj.value[0], cache, state);
                                return acc + math.round(result, obj.value[1][0].value);
                            case 'DATEDIFF':
                                return  acc + Moment(1483138800000).diff(
                                    Moment(parseInt(compute(obj.value[0], cache, state))),
                                    'years'
                                );
                            default:
                                return acc;
                        }
                    }, '');
                    return computeResult;
                }
                var equalityCheck = _.values(this.cache).reduce(function(acc, item) {
                    var result = item.field.eval(state);
                    if(result !== item.value) acc = false;
                    item.value = result;
                    return acc;
                }, true);
                if(!equalityCheck || this.cachedValue === undefined) {
                    this.cachedValue = math.eval(compute(this.compiledFormula, this.cache, state));
                }
                return this.isVisible(state).valid === true? this.cachedValue: 0;
			},
            isTouchable: false
		}
	},
    init: function(cfg, field) {
        field.compiledFormula = spread(field.compiledFormula, cfg);
        field.spreadFormula = true;
        field.cache = {};
        toFields(field, field.compiledFormula, cfg);
    }
};

function toFields(field, array, cfg) {
    _.values(array).forEach((obj) => {
        if((obj.type === 'reference' || obj.type === 'formula') && (typeof obj.value === 'string')) {
            var compoments = obj.value.split(':');
            var link = cfg
            .steps.find((step) => step.id === compoments[0])
            .fields.find((field) => field.id === compoments[1]);
            obj.value = link;
            field.cache[link.id+link.stepId] = {
                field: link,
                value: undefined
            }
        }
        if(obj.value instanceof Array) toFields(field, obj.value, cfg);
        if(obj instanceof Array) toFields(field, obj, cfg);
    });
}

function breakdown(input) {
    var state = 'DEFAULT';
    var result = [];
    var type = '';
    var value = '';
    var fnMin = 0;
    var fnMax = 0;
    for(var i=0; i<input.length; i++) {
        switch(state) {
            case 'DEFAULT':
                if(input[i] === '$') {
                    if(value !== '')
                        result.push({
                            type: 'reference',
                            value: value
                        });
                    state = 'FUNCTION';
                    value = '';
                } else if(input[i] === '(' || input[i] === ')' || input[i] === '+' || input[i] === '-' || input[i] === '/' || input[i] === '*' || input[i] === '<' || input[i] === '>' || input[i] === '=') {
                    if(value !== '')
                        result.push({
                            type: 'reference',
                            value: value
                        });
                    result.push({
                        type: 'symbol',
                        value: input[i]
                    });
                    value = '';
                } else {
                    value +=input[i];
                }
            break;
            case 'FUNCTION':
                if(input[i] === '(') {
                    fnMin++;
                    state = 'ARGS';

                } else type += input[i];
            break;
            case 'ARGS':
                if(input[i] === '(') fnMin++;
                if(input[i] === ')') fnMax++;
                if(fnMin > 0 && fnMax > 0 && fnMin===fnMax) {
                        result.push({
                            type: type,
                            value: breakdownFncArgs(value)
                        });
                    state = 'DEFAULT';
                    fnMin = fnMax = 0;
                    type = '';
                    value = '';

                } else value += input[i];
            break;
        }

    }
    if(value === '(' || value === ')' || value === '+' || value === '-' || value === '/' || value === '*' || value === '<' || value === '>' || value === '=') {
        result.push({
            type: 'symbol',
            value: value
        });
        value = '';
    }
    if(value !== '') {
        result.push({
            type: 'reference',
            value: value
        });
        value = '';
    }
    return result;
}

function breakdownFncArgs(input) {
    var state = 'DEFAULT';
    var result = [];
    var value = '';
    var fnMin = 0;
    var fnMax = 0;
    for(var i=0; i<input.length; i++) {
        switch (state) {
            case 'DEFAULT':
                if(input[i] === ';') {
                    result[result.length] = breakdown(value);
                    value = '';
                } else if(input[i] === '$') {
                    value += input[i];
                    state = 'FUNCTION';
                } else {
                    value += input[i];
                }
            break;
            case 'FUNCTION':
                if(input[i] === '(') fnMin++;
                if(input[i] === ')') fnMax++;
                if(fnMin > 0 && fnMax > 0 && fnMin===fnMax) {
                    value += input[i];
                    state = 'DEFAULT';
                    fnMin = fnMax = 0;
                } else value += input[i];
            break;
        }
    }
    if(value != '') result[result.length] = breakdown(value);
    return result;

}
function spread(searchable, cfg) {
    for(var i=0; i<searchable.length; i++) {
        var element = searchable[i];
        if(isNaN(element.value)) {
            if(element.type === 'reference') {
                var compoments = element.value.split(':');
                var field = cfg
                .steps.find((step) => step.id === compoments[0])
                .fields.find((field) => field.id === compoments[1]);
                if(field.type === 'FORMULA_WIDGET') {
                    if(field.spreadFormula) element.type = 'formula';
                    else {
                        field.compiledFormula = spread(field.compiledFormula, cfg);
                        field.spreadFormula = true;
                        element.type = 'formula';
                        element.value = field;
                    }
                }
            }
        } else if(element.type === 'reference') element.type = 'number';
        if(element.value instanceof Array && element.type !== 'formula')
            for(var k=0; k<element.value.length; k++)
                spread(element.value[k], cfg);
    }
    return searchable;
}
