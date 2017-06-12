import React        from 'react';
import { connect }  from 'react-redux';
import findWidget   from './findWidget.js';
import validateRules from '../rules/validateRules.js';

class Widget extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
		if(this.props.field.isVisible(this.props.store)) {
			var Widget = findWidget(this.props.field.type).component;
			return <Widget
				field={this.props.field}
                validateRules={validateRules}
				{...this.props}
			/>;
		} else return null;
    }
}

function mapStateToProps(store, ownProps) {
	return {
		store: store['forms'][ownProps.formId],
		fieldState: store['forms'][ownProps.formId][ownProps.field.stepId][ownProps.field.id]
	}
}

function mapDispatchToProps(dispatch, ownProps) {
    return {actions: ownProps.createDispatcher(dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Widget);
