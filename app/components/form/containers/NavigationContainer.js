import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import Navigation from '../NavigationComponent.js';

class NavigationContainer extends React.Component {
	constructor(props) {
		super(props);
		this.onPrevious = this.onPrevious.bind(this);
		this.onNext = this.onNext.bind(this);
	}
    onPrevious(path) {

        var step = this.props.step;
        var actions = this.props.actions;
        var appPath = this.props.appRoute;

        return function() {
    		if(path) {
    			actions.changeRoute(step, path);
    			hashHistory.push('/' + appPath + '/' + path);
    		}
        }
	}
	onNext(path) {

        var step = this.props.step;
        var actions = this.props.actions;
        var appPath = this.props.appRoute;
		var validationResult = step.isValid(this.props.store);

        return function() {
            actions.validateStep(step, validationResult);
            if(validationResult.isStepValid) {
                actions.changeRoute(step, path);
                if(path) hashHistory.push('/' + appPath + '/' + path);
            }
        }
	}
	render() {
        var nextPath = this.props.step.getNextStep(this.props.store);
        var previousPath = this.props.step.getPrevStep(this.props.store);
		return (
			<div>
                <Navigation
                    nextPath={nextPath}
                    prevPath={previousPath}
                    onNext={this.onNext(nextPath)}
                    onPrevious={this.onPrevious(previousPath)}
                />
			</div>
		)
	}
}

function mapStateToProps(store, ownProps) {
    return {store: store['forms'][ownProps.formId]}
}

function mapDispatchToProps(dispatch, ownProps) {
    return {actions: ownProps.createDispatcher(dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer);
