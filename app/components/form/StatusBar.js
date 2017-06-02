import React        from 'react';
import { connect }  from 'react-redux';
import { Link }     from 'react-router';
import styles       from './StatusBar.scss';

class StatusBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
		var filteredSteps = this.props.steps.filter((step) => {
			if(step.isVisible(this.props.store)) return step;
		});
        return (
            <div className={styles.statusbar}>
                {
                    filteredSteps.map((step, index) =>
                        <div style={{width: 100/filteredSteps.length + "%"}} key={index} className={
                            ((this.props.store[step.id].validationAttempt && step.isValid(this.props.store).isStepValid) ||
                            (step.allTouched(this.props.store) && step.isValid(this.props.store).isStepValid))?
                            styles.statusbar__item + " " + styles["statusbar__item--complete"] : styles.statusbar__item
                        }>
                            <img className={styles.statusbar__img} src="https://maxcdn.icons8.com/windows10/PNG/96/Business/sell_property-96.png" />
                        </div>
                    )
                }
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {store: store.fk}
}

export default connect(mapStateToProps)(StatusBar)

// <img src="">

// <i className={
//     ((this.props.store[step.id].validationAttempt &&
//     step.isValid(this.props.store).isStepValid) ||
//     (step.allTouched(this.props.store) &&
//     step.isValid(this.props.store).isStepValid))
//     ? 'icon-cmyk-DRCheckmark' : step.icon
// }></i>
// <span>{step.title}</span>
