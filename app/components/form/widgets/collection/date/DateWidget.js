import React            from 'react';
import ReactDatePicker  from 'react-datepicker';
import Moment           from 'moment';
import styles           from './DateWidget.scss';
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

class DateWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: this.props.fieldState.value}
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }
    handleChange(date) {
        var newDate = (date === null? null : date.toDate().getTime());
        this.setState({date: newDate});
        this.props.actions.updateField(this.props.field, {value: newDate});
    }

    handleFocus() {
        this.props.actions.touchField(this.props.field, {isTouched: true});
    }

    render() {
        return (
            <div className={styles.date}>
                <div className={styles.date__left}>
                    <p>{this.props.field.label}</p>
                </div>
                <div className={styles.date__right}>
                    <div className={styles.date__wrapper}>
                        <ReactDatePicker
                            className={styles.date__input}
                            showYearDropdown
                            selected={this.state.date === null? null : Moment(this.state.date)}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            maxDate={Moment(this.props.field.maxDate)}
                            dateFormat="DD/MM/YYYY"
                            locale="en-dk"
                        />
                        <i className="icon-CalendarIcon"></i>
                    </div>
                </div>
                <p className={styles.date__error}>{this.props.fieldState.msg}</p>
            </div>
        )
    }
}

export default {
    type: 'DATE_WIDGET',
    component: DateWidget,
	extend: function() {
		return {
			eval: function(state) {
                return this.isVisible(state).valid === true? state[this.stepId][this.id].value: 0;
			},
            isTouchable: true
		}
	}
};
