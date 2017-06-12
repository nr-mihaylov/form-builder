import React from 'react';
import DynamicNumber from 'react-dynamic-number';
import styles from './CurrencyWidget.scss';

class CurrencyWidget extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    handleChange(event, modelValue, viewValue) {
		this.props.actions.updateField(
			this.props.field,
			{
				value: viewValue === ''? null : modelValue
			}
		);
    }

    handleFocus() {
        this.props.actions.touchField(this.props.field, {isTouched: true});
    }

    render() {
			return (
				<div className={styles.currency + " widget"}>
					<div className={"widget__left"}>
						<p>{this.props.field.label}</p>
					</div>
					<div className={"widget__right"}>
						<DynamicNumber
                            className={styles.currency__input}
							value={this.props.fieldState.value === null? '' : this.props.fieldState.value}
							integer={64}
							separator={','}
							thousand={true}
							fraction={2}
							positive={true}
							negative={true}
							onChange={this.handleChange}
                            onFocus={this.handleFocus}
						/>
					</div>
                    <p className={"widget__error"}>{this.props.fieldState.msg}</p>
				</div>
			)
    }
}

export default {
    type: 'CURRENCY_WIDGET',
    component: CurrencyWidget,
	extend: function() {
		return {
			eval: function(state) {
                return this.isVisible(state) === true? state[this.stepId][this.id].value: 0;
			},
            isTouchable: true
		}
	}
};
