import React 					from 'react';
import { Route, IndexRedirect }	from 'react-router';
import FormContainer 			from './containers/FormContainer.js';
import FormStepComponent 		from './components/FormStepComponent/FormStepComponent.js';
import parseConfig				from './parseConfig.js';
import formActions				from './actions/formActions.js';

export default function(cfg) {
	var createDispatcher = formActions(cfg);
	var config = parseConfig(cfg);
	return (
		<Route path={config.appRoute} component={(props) => {
					return <FormContainer
						{...props}
						plainConfig={cfg}
						config={config}
						formId={config.id}
						createDispatcher={createDispatcher}
					/>
				}
			}>
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
