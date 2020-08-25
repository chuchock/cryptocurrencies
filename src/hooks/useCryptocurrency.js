import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display:block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`

const useCryptocurrency = (label, initialState, cryptocurrencies) => {

	// state of our custom hook
	const [state, setState] = useState(initialState);

	const SelectCryptoCurrency = () => (
		<>
			<Label>{label}</Label>
			<Select
				onChange={e => setState(e.target.value)}
				value={state}
			>
				<option value='-1'>Choose an option</option>
				{
					cryptocurrencies.map(crypto => (
						<option key={crypto.CoinInfo.Id} value={crypto.CoinInfo.Name}>${crypto.CoinInfo.FullName}</option>
					))
				}
			</Select>
		</>
	);

	// Return state, interface and function that modifies the state
	return [state, SelectCryptoCurrency, setState];
}

export default useCryptocurrency;