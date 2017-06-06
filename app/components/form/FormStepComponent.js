import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Widget  from './widgets/Widget.js';
import Navigation from './NavigationComponent.js';
import actions from './actions.js';
import styles from './FormStepComponent.scss';

class FormStepComponent extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		console.log(this.props.actions.visitStep(this.props.step));
	}
	render() {
		return (
			<div className={styles.formstep}>
				<section className={styles.formstep__content}>
					<header className={styles.formstep__header}>
						<h2 className={styles.formstep__title}>{this.props.step.title}</h2>
					</header>
					{
						this.props.step.fields.map((field) => {
							return <Widget key={field.id} field={field} />;
						})
					}
				</section>
				<div className={styles.formstep__navigation}>
					<Navigation step={this.props.step} appRoute={this.props.appRoute}/>
				</div>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
    return {actions: actions(dispatch)}
}

export default withRouter(connect(null, mapDispatchToProps)(FormStepComponent));
