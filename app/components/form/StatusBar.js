import React        from 'react';
import { connect }  from 'react-redux';
import { Link }     from 'react-router';
import styles       from './StatusBar.scss';

class StatusBar extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    render() {
		var filteredSteps = this.props.steps.filter((step) => {
			if(step.isVisible(this.props.store)) return step;
		});
        return (
            <div className={styles.container}>
                {
                    filteredSteps.map((step, index) =>
                        <div style={{width: 100/filteredSteps.length + "%"}} key={index} className={styles.item}>
                            <span className={
                                styles.checkmark + " " +
                                (
                                    (
                                        step.isValid(this.props.store).isStepValid &&
                                        this.props.store[step.id].isVisited &&
                                        (
                                            this.props.store[step.id].validationAttempt ||
                                            step.allTouched(this.props.store)
                                        )
                                    )?
                                    "ion-checkmark-circled" + " " + styles["checkmark--complete"] : "ion-close-circled"
                                ) + (
                                    this.props.store.currentRoute === step.currentStep? " " + styles["checkmark--current"] : ""
                                )
                            }></span>
                        </div>
                    )
                }
            </div>
        )
    }
}

function mapStateToProps(store, ownProps) {
    return {store: store['forms'][ownProps.formId]}
}

export default connect(mapStateToProps)(StatusBar);
