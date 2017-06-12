import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import FormComponent from '../components/FormComponent/FormComponent.js';

class FormContainer extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.actions.initializeForm(this.props.plainConfig);
	}
	render() {
        return this.props.store[this.props.formId]? (
            <FormComponent
                {...this.props}
            />
        ) : null;
	}
}

function mapStateToProps(store, ownProps) {
    return {store: store['forms']}
}

function mapDispatchToProps(dispatch, ownProps) {
    return {actions: ownProps.createDispatcher(dispatch)}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormContainer));
