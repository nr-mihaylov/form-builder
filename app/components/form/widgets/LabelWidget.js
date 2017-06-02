import React from 'react';

class LabelWidgetComponent extends React.Component {
    constructor(props) {
        super(props);
        this.pretty = this.pretty.bind(this);
        this.styleOption = this.styleOption.bind(this);
    }

    pretty(arg) {
        var negative = false;
        var temp = null;

        if(arg.toString().substring(0,1) === '-') {
            temp = arg.toString().substring(1, arg.length).toString().split('.');
            negative = true;
        } else {
            temp = arg.toString().split('.');
        }

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

        return (negative? '-' : '') + result.split('').reverse().join('');// NO DECMAL + (decimal !== null && decimal !== undefined? ',' + decimal :  '');
    }

    styleOption(option) {
        switch(option) {
            case 'BOLD':
                return (
                    <div className="formRow">
                        <div className="leftPart">
                            <label className="boldResultLabel bigResultLabel">{this.props.field.label}</label>
                        </div>
                        <div className="rightPart">
                            <div className="resultDisplayerComponent boldResultDisplayer">
                                {this.props.field.defaultValue && <span>{this.pretty(this.props.field.defaultValue)}</span>}
                                {this.props.field.suffix && <span>{this.props.field.suffix}</span>}
                            </div>
                        </div>
                    </div>
                )

            default:
                return (
                    <div className="formRow">
                        <div className="leftPart">
                            <label>{this.props.field.label}</label>
                        </div>
                        <div className="rightPart">
                            <div className="resultDisplayerComponent">
                                {this.props.field.defaultValue && <span>{this.pretty(this.props.field.defaultValue)}</span>}
                                {this.props.field.suffix && <span>{this.props.field.suffix}</span>}
                            </div>
                        </div>
                    </div>
                )
        }
    }

    render() {
        return this.styleOption(this.props.field.style);
    }
}

export default {
    Component: LabelWidgetComponent,
	extend: function() {
		return {
			eval: function(state) {
				return null;
			},
            isTouchable: false
		}
	}
};
