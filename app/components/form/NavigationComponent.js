import React from 'react';
import styles from './NavigationComponent.scss';

class NavigationComponent extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props);
	}

	render() {
		return (
			<div className={styles.navigation}>
				{
					this.props.prevPath &&
					<button
						className={styles.navigation__button + (this.props.nextPath? '' : ' ' + styles.navigation__fullbutton)}
						onClick={this.props.onPrevious}
					>Tilbage</button>
				}
				{
					this.props.nextPath &&
					<button
						className={styles.navigation__button + (this.props.prevPath? '' : ' ' + styles.navigation__fullbutton)}
						onClick={this.props.onNext}
					>Næste</button>
				}
			</div>
		)
	}
}

export default NavigationComponent;
