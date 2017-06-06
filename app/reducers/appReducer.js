var _ = require('lodash');
var config = require('../components/form/config/configApp.js');

var defaultState = {
	currentRoute: config.currentRoute
};
config.steps.map((step) => {
	defaultState[step.id] = {};
	step.fields.map((field) => {
		defaultState[step.id][field.id] = {
			value: field.defaultValue
		}
	});
});

const reducer = function(
	state = defaultState,
	action
){
	var payload = action.payload;
	switch(action.type) {

		case 'UPDATE_FIELD':
			var newState = _.assign({}, state);
			_.assign(newState[payload.field.stepId][payload.field.id], payload.fieldProps);
			_.assign(newState[payload.field.stepId][payload.field.id], payload.field.isValid(newState))
			return newState;

		case 'TOUCH_FIELD':
			var newState = _.assign({}, state);
			_.assign(newState[payload.field.stepId][payload.field.id], payload.fieldProps);
			return newState;

		case 'VALIDATE_STEP':
			var newState = _.assign({}, state);
			newState[payload.step.id].validationAttempt = true;
			payload.validation.validationCheck.forEach((item) => {
				newState[item.stepId][item.fieldId] = item.fieldState;
			});
			return newState;

		case 'CHANGE_STEP':
			var newState = _.assign({}, state);
			newState.currentRoute = payload.newRoute;
			return newState;

		case 'VISIT_STEP':
			var newState = _.assign({}, state);
			newState[payload.step.id].isVisited = true;
			return newState;


        default:
			return state;
	}
}

export default reducer;
