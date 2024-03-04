import {memo} from 'react';
import Abbr from './Abbr';
import Errors from './Errors';
const StateSelection = ({handleOnChange, input, states, isFetchingStates, isShipping}: any) => {
	
	const {state, errors} = input || {};
	
	const inputId = `state-${isShipping ? 'shipping' : 'billing'}`;
	
	if (isFetchingStates) {
		// Show loading component.
		return (
			<div className="mb-3">
				<label className="leading-7 text-sm text-gray-700">
					State/County
					<Abbr required/>
				</label>
				<div className="relative w-full border-none">
					<select
						disabled
						value=""
						name="state"
						className="opacity-50 bg-gray-100 bg-opacity-50 border border-gray-500 text-gray-500 appearance-none inline-block py-3 pl-3 pr-8 rounded leading-tight w-full"
					>
						<option value="">Loading...</option>
					</select>
				</div>
			</div>
		)
	}
	
	if (!states.length) {
		return null;
	}
	
	return (
		<div className="mb-3">
			<label className="leading-7 text-sm text-gray-600" htmlFor={inputId}>
				State/County
				<Abbr required/>
			</label>
			<div className="relative w-full border-none">
				<select
					disabled={isFetchingStates}
					onChange={handleOnChange}
					value={state}
					name="state"
					className={`${isFetchingStates ? 'opacity-50' : ''} bg-gray-100 bg-opacity-50 border border-gray-400 text-gray-500 appearance-none inline-block py-3 pl-3 pr-8 rounded leading-tight w-full`}
					id={inputId}
				>
					<option value="">Select a state...</option>
					{states.map((state: any, index: number) => (
						<option key={state?.stateCode ?? index} value={state?.stateName ?? ''}>
							{state?.stateName}
						</option>
					))}
				</select>
			</div>
			<Errors errors={errors} fieldName={'state'}/>
		</div>
	)
}



export default memo(StateSelection);