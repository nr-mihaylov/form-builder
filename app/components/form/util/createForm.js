import React 					from 'react';
import { Route, IndexRedirect }	from 'react-router';
import FormComponent 			from '../FormComponent.js';
import FormStepComponent 		from '../FormStepComponent.js';
import parseConfig				from './parseConfig.js';
import actionsInit				from '../actions.js';

export default function(cfg) {
	console.log(cfg);
	var createDispatcher = actionsInit(cfg);
	var config = parseConfig(cfg);
	return (
		<Route path={config.appRoute} component={(props) => <FormComponent {...props} config={config} createDispatcher={createDispatcher} />}>
			<IndexRedirect to={config.currentRoute} />
			{
				config.steps.map((step) => {
					return (
						<Route
							key={step.id}
							path={step.currentStep}
							component={
								(props) =>
								<FormStepComponent
									key={step.id}
									step={step}
									formId={config.id}
									appRoute={config.appRoute}
									createDispatcher={createDispatcher}
								/>
							}
							onEnter={() => window.scrollTo(0, 0)}
						/>
					)
				})
			}
		</Route>
	)
}
