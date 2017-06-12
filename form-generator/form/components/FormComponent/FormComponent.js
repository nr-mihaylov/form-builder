import React from 'react';
import StatusbarComponent from '../StatusbarComponent/StatusbarComponent.js';
import styles from './FormComponent.scss';

class FormComponent extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className={styles.form}>
				<div className={styles.form__StatusbarComponent}>
					<StatusbarComponent
						steps={this.props.config.steps}
						formId={this.props.formId}
					/>
				</div>
				<div className={styles.form__steps}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default FormComponent;
