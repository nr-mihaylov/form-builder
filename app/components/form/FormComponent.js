/* global PLANID */

import React from 'react';
import StatusBar from './StatusBar.js';
import styles from './FormComponent.scss';

class FormComponent extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className={styles.form}>
				<div className={styles.form__statusbar}>
					<StatusBar steps={this.props.config.steps}/>
				</div>
				<div className={styles.form__steps}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default FormComponent;
