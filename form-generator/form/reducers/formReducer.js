var _ = require('lodash');


function getInitState(config) {
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
	return defaultState;
}

export default function(
	state = {},
	action
){
	var payload = action.payload;
	switch(action.type) {
		case 'UPDATE_FIELD':
			var newState = _.merge({}, state);
			_.merge(newState[payload.formId][payload.field.stepId][payload.field.id], payload.fieldProps);
			_.merge(newState[payload.formId][payload.field.stepId][payload.field.id], payload.field.isValid(newState[payload.formId]));
			return newState;

		case 'TOUCH_FIELD':
			var newState = _.merge({}, state);
			_.merge(newState[payload.formId][payload.field.stepId][payload.field.id], payload.fieldProps);
			return newState;

		case 'VALIDATE_STEP':
			var newState = _.merge({}, state);
			newState[payload.formId][payload.step.id].validationAttempt = true;
			payload.validation.validationCheck.forEach((item) => {
				newState[payload.formId][item.stepId][item.fieldId] = item.fieldState;
			});
			return newState;

		case 'CHANGE_STEP':
			var newState = _.merge({}, state);
			newState[payload.formId].currentRoute = payload.newRoute;
			return newState;

		case 'VISIT_STEP':
			var newState = _.merge({}, state);
			newState[payload.formId][payload.step.id].isVisited = true;
			return newState;

		case 'INIT_FORM':
			var newState = _.merge({}, state);
			if(newState[payload.formCfg.formId] === undefined)
				newState[payload.formCfg.id] = getInitState(payload.formCfg);
			return newState;

		default:
			return state;
	}
}
