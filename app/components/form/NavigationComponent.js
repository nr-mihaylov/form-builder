import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import actions from './actions.js';
import styles from './NavigationComponent.scss';

class NavigationComponent extends React.Component {
	constructor(props) {
		super(props);
		this.onPrevious = this.onPrevious.bind(this);
		this.onNext = this.onNext.bind(this);
		this.state = {
			prev: this.props.step.getPrevStep(this.props.store),
			next: this.props.step.getNextStep(this.props.store)
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			prev: this.props.step.getPrevStep(this.props.store),
			next: this.props.step.getNextStep(this.props.store)
		});
	}

	onPrevious() {
		if(this.state.prev) hashHistory.push('/' + this.props.appRoute + '/' + this.state.prev);
	}

	onNext() {
		var validation = this.props.step.isValid(this.props.store);
		this.props.actions.validateStep(this.props.step, validation);
		if(validation.isStepValid) {
			if(this.state.next) hashHistory.push('/' + this.props.appRoute + '/' + this.state.next);
		}
	}

	render() {
		console.log(this.state);
		return (
			<div className={styles.navigation}>
				<div className={styles.navigation__back}>
					{this.state.prev && <button className={styles.navigation__button} onClick={this.onPrevious}>Tilbage</button>}
				</div>
				<div className={styles.navigation__next}>
					{this.state.next && <button className={styles.navigation__button + (this.state.prev? '' : ' ' + styles.navigation__fullbutton)} onClick={this.onNext}>Næste</button>}
				</div>
			</div>
		)
	}
}

function mapStateToProps(store, ownProps) {
    return {store: store.fk}
}

function mapDispatchToProps(dispatch) {
    return {actions: actions(dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationComponent);