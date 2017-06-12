import React from 'react';
import styles from './RadioGroupWidget.scss';

class RadioGroupWidget extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: this.props.fieldState.value}
		this.handleChange = this.handleChange.bind(this);
		this.filterOptions = this.filterOptions.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
		this.props.actions.updateField(this.props.field, {value: event.target.value});
		this.props.actions.touchField(this.props.field, {isTouched: true});
	}

	filterOptions(options) {
		return options.filter((option) => {
			return this.props.validateRules.eval(option.visibilityRules, this.props.store);
		});
	}

	render() {
		return (
			<div className={styles.radiogroup + " widget"}>
				<div className={styles.radiogroup__left + " widget__left"}>
                    <p>{this.props.field.label}</p>
				</div>
				<div className={styles.radiogroup__right + " widget__right"}>
					<div>
					{
						this.filterOptions(this.props.field.options).map((option, index) => {
							return (
								<div className={styles.radiogroup__option} key={index}>
									<input
										className={styles.radiogroup__input}
										id={this.props.field.id+option.value}
										type="radio"
										value={option.value}
										checked={this.state.value === option.value}
										onChange={this.handleChange}
									/>
									<label className={styles.radiogroup__label} htmlFor={this.props.field.id+option.value}>{option.label}</label>
								</div>
							)
						})
					}
					</div>
				</div>
                <p className={"widget__error"}>{this.props.fieldState.msg}</p>
			</div>
		)
	}
}

export default {
	type: 'RADIO_GROUP_WIDGET',
    component: RadioGroupWidget,
	extend: function() {
		return {
			eval: function(state) {
				return this.isVisible(state)? state[this.stepId][this.id].value: 0;
			},
            isTouchable: true
		}
	},
	init: function(cfg, field) {
		field.options.forEach((option) => {
			option.visibilityRules.forEach((rule) => {
				rule.fieldRefs.forEach((ref) => {
					ref.field = cfg.steps.find((step) => {return step.id === ref.stepId})
					.fields.find((field) => {return field.id === ref.fieldId});
					delete ref.fieldId;
					delete ref.stepId;
				});
			});
		});
	}
};
