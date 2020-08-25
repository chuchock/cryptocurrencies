import React, { Fragment, useState } from 'react';

const useCurrency = () => {

	// state of our custom hook
	const [state, setState] = useState('');

	const SelectCurrency = () => (
		<>
			<label>Currency</label>
			<select>
				<option value="MXN">Mexican Peso</option>
			</select>
		</>
	);

	// Return state, interface and function that modifies the state
	return [state, SelectCurrency, setState];
}

export default useCurrency;