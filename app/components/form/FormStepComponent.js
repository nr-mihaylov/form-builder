import React from 'react';
import { withRouter } from 'react-router';
import Widget  from './widgets/Widget.js';
import Navigation from './NavigationComponent.js';
import styles from './FormStepComponent.scss';

class FormStepComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={styles.formstep}>
				<div className={styles.formstep__wrapper}>
					<section style={{height: window.innerHeight-140}} className={styles.formstep__content}>
						<header className={styles.formstep__header}>
							<h2 className={styles.formstep__title}>{this.props.step.title}</h2>
						</header>
						{
							this.props.step.fields.map((field) => {
								return <Widget key={field.id} field={field} />;
							})
						}
					</section>
				</div>
				<div className={styles.formstep__navigation}>
					<Navigation step={this.props.step} appRoute={this.props.appRoute}/>
				</div>
			</div>
		)
	}
}

export default withRouter(FormStepComponent);
