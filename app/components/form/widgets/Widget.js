import React        from 'react';
import { connect }  from 'react-redux';
import actions      from '../actions.js';
import findWidget   from './findWidget.js';
import ruleUtil     from '../rules/ruleUtil.js';

class Widget extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
			if(this.props.field.isVisible(this.props.store)) {
				var Widget = findWidget(this.props.field.type).component;
				return <Widget
					field={this.props.field}
                    ruleUtil={ruleUtil}
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
