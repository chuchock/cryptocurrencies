import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Error from './Error';

import useCurrency from '../hooks/useCurrency';
import useCriptocurrency from '../hooks/useCryptocurrency';
import axios from 'axios';


const Button = styled.input`
		margin-top: 20px;
		font-weight: bold;
		font-size: 20px;
		padding: 10px;
		background-color: #66a2fe;
		border: none;
		width: 100%;
		border-radius: 10px;
		color: #FFF;
		transition: background-color .3s ease;
		&:hover {
			background-color: #326AC0;
			cursor:pointer;
		}
	`

const Form = ({ setCurrency, setCryptocurrency }) => {

	// List of cryptocurrencies
	const [cryptocurrencies, setCryptocurrencies] = useState([]);

	// Form validation
	const [error, setError] = useState(false);

	const CURRENCIES = [
		{ code: 'USD', name: 'US DOLLAR' },
		{ code: 'MXN', name: 'MEXICAN PESO' },
		{ code: 'EUR', name: 'EURO' },
		{ code: 'GBP', name: 'POUND STERLING' }
	];

	const [currency, SelectCurrency] = useCurrency('Choose your currency', '-1', CURRENCIES);

	const [cryptocurrency, SelectCryptoCurrency] = useCriptocurrency('Choose your cryptocurrency', '-1',
		cryptocurrencies);

	// Call API
	useEffect(() => {
		const callAPI = async () => {
			const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

			const result = await axios.get(url);

			setCryptocurrencies(result.data.Data);
		}

		callAPI();
	}, []);

	const estimateCurrency = e => {
		e.preventDefault();

		// validate if both selects have selected option
		if (currency === '-1' || cryptocurrency === '-1') {
			setError(true);
			return;
		}

		setError(false);

		// pass data to principal component
		setCurrency(currency);
		setCryptocurrency(cryptocurrency);
	}

	return (
		<form
			onSubmit={estimateCurrency}
		>
			{error &&
				<Error
					message="You must select both options"
				/>
			}
			<SelectCurrency />
			<SelectCryptoCurrency />
			<Button
				type="submit"
				value="Calculate"
			/>
		</form>
	);
};

export default Form;