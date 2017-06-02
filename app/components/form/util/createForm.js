import React 					from 'react';
import { Route, IndexRedirect }	from 'react-router';
import FormComponent 			from '../FormComponent.js';
import FormStepComponent 		from '../FormStepComponent.js';
import parseConfig				from './parseConfig.js';

export default function(cfg) {
	console.log(cfg);
	var config = parseConfig(cfg);
	return (
		<Route path={config.appRoute} component={(props) => <FormComponent {...props} config={config} />}>
			<IndexRedirect to={config.currentRoute} />
			{
				config.steps.map((step) => {
					return (
						<Route
							key={step.id}
							path={step.currentStep}
							component={(props) => <FormStepComponent key={step.id} step={step} appRoute={config.appRoute} />}
							onEnter={() => window.scrollTo(0, 0)}
						/>
					)
				})
			}
		</Route>
	)
}
