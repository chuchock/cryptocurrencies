import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

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

const Form = () => {

	const [cryptocurrencies, setCryptocurrencies] = useState([]);

	const CURRENCIES = [
		{ code: 'USD', name: 'US DOLLAR' },
		{ code: 'MXN', name: 'MEXICAN PESO' },
		{ code: 'EUR', name: 'EURO' },
		{ code: 'GBP', name: 'POUND STERLING' }
	];

	const [currency, SelectCurrency] = useCurrency('Choose your currency', '', CURRENCIES);

	const [criptocurrency, SelectCryptoCurrency] = useCriptocurrency('Choose your cryptocurrency', '',
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

	return (
		<form>
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