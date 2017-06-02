import React from 'react';
import styles from './BinaryWidget.scss';

class BinaryWidget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {value: this.props.fieldState.value}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        var value = event.target.value == 'true';
        this.setState({value: value});
        this.props.actions.updateField(this.props.field, {value: value});
        this.props.actions.touchField(this.props.field, {isTouched: true});
    }

    render() {
        return (
            <div className={styles.binary}>
                <div className={styles.binary__left}>
                    <p>{this.props.field.label}</p>
                </div>
                <div className={styles.binary__right}>
                    <div className={styles.binaryinput}>
                        <div className={styles.binaryinput__positive}>
                            <input
                                id={this.props.field.id+'true'}
                                type="radio"
                                value={true}
                                checked={this.state.value === true}
                                onChange={this.handleChange}
                            />
                            <label htmlFor={this.props.field.id+'true'}>Ja</label>
                        </div>
                        <div className={styles.binaryinput__negative}>
                            <input
                                id={this.props.field.id+'false'}
                                type="radio"
                                value={false}
                                checked={this.state.value === false}
                                onChange={this.handleChange}
                            />
                            <label htmlFor={this.props.field.id+'false'}>Nej</label>
                        </div>
                    </div>
                </div>
                <p className={styles.binary__error}>{this.props.fieldState.msg}</p>
            </div>
        )
    }
}

export default {
    Component: BinaryWidget,
	extend: function() {
		return {
            eval: function(state) {
                return this.isVisible(state).valid === true? state[this.stepId][this.id].value: 0;
			},
            isTouchable: true
		}
	}
};
