import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions.js';
import widget  from './widgetAggregator.js';
import ruleEval from '../rules/rulesAggregator.js';

class Widget extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
			if(this.props.field.isVisible(this.props.store).valid) {
				var Widget = widget(this.props.field.type).Component;
				return <Widget
					field={this.props.field}
					ruleEval={ruleEval}
					{...this.props}
				/>;
			} else return null;
    }
}

function mapStateToProps(store, ownProps) {
	return {
		store: store.fk,
		fieldState: store.fk[ownProps.field.stepId][ownProps.field.id]
	}
}

function mapDispatchToProps(dispatch) {
    return {actions: actions(dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Widget);
