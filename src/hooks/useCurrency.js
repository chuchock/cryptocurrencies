import React, { Fragment, useState } from 'react';

const useCurrency = (label, initialState, currencies) => {

	// state of our custom hook
	const [state, setState] = useState(initialState);

	const SelectCurrency = () => (
		<>
			<label>{label}</label>
			<select
				onChange={e => setState(e.target.value)}
				value={state}
			>
				<option value='-1'>Choose an option</option>
				{
					currencies.map(currency => (
						<option key={currency.code} value={currency.code}>${currency.name}</option>
					))
				}
			</select>
		</>
	);

	// Return state, interface and function that modifies the state
	return [state, SelectCurrency, setState];
}

export default useCurrency;