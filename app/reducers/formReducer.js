var _ = require('lodash');
var context = require.context('../form-config', true, /config\.js$/);

var initialState = {};

context.keys().forEach(function(path) {
	var plainFormConfig = context(path);
	var formState = getInitState(plainFormConfig);
    initialState[plainFormConfig.id] = formState;
});

function getInitState(config) {
	var formState = {
		currentRoute: config.currentRoute
	};
	config.steps.map((step) => {
		formState[step.id] = {};
		step.fields.map((field) => {
			formState[step.id][field.id] = {
				value: field.defaultValue
			}
		});
	});
	return formState;
}

export default function(
	state = initialState,
	action
){
	var payload = action.payload;
	var newState = _.assign({}, state);
	switch(action.type) {
		case 'UPDATE_FIELD':
			_.assign(newState[payload.formId][payload.field.stepId][payload.field.id], payload.fieldProps);
			_.assign(newState[payload.formId][payload.field.stepId][payload.field.id], payload.field.isValid(newState[payload.formId]));
			return newState;

		case 'TOUCH_FIELD':
			_.assign(newState[payload.formId][payload.field.stepId][payload.field.id], payload.fieldProps);
			return newState;

		case 'VALIDATE_STEP':
			newState[payload.formId][payload.step.id].validationAttempt = true;
			payload.validation.validationCheck.forEach((item) => {
				newState[payload.formId][item.stepId][item.fieldId] = item.fieldState;
			});
			return newState;

		case 'CHANGE_STEP':
			newState[payload.formId].currentRoute = payload.newRoute;
			return newState;

		case 'VISIT_STEP':
			newState[payload.formId][payload.step.id].isVisited = true;
			return newState;

        default:
			return state;
	}
}
