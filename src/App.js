import React, { useState, useEffect } from 'react';
import './App.css';
import image from './cryptomonedas.png';
import Form from './components/Form';
import Estimation from './components/Estimation';

import styled from '@emotion/styled';
import axios from 'axios';

const Container = styled.div`
		max-width: 900px;
		margin: 0 auto;
		@media (min-width: 992px) {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			column-gap: 2rem;
		}
	`;

const Image = styled.img`
		max-width: 100%;
		margin-top: 5 rem;
	`;

const Heading = styled.h1`
		font-family: 'Bebas Neue', cursive;
		color: #ffffff;
		text-align: left;
		font-weight: 700;
		font-size: 50px;
		margin-bottom: 50px;
		margin-top: 80px;

		&::after {
			content: '';
			width: 100px;
			height: 6px;
			background-color: #66A2FE;
			display: block;
		}
	`;

function App() {

	const [currency, setCurrency] = useState('');
	const [cryptocurrency, setCryptocurrency] = useState('');
	const [result, setResult] = useState({});

	useEffect(() => {
		const callAPI = async () => {
			// prevent first execution
			if (currency === '') return;

			const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${currency}`;

			const result = await axios.get(url);

			setResult(result.data.DISPLAY[cryptocurrency][currency]);
		}

		callAPI();
	}, [currency, cryptocurrency]);

	return (
		<Container>
			<div>
				<Image
					src={image}
					alt='image crypto'
				/>
			</div>
			<div>
				<Heading>Quote cryptocurrencies instantly</Heading>
				<Form
					setCurrency={setCurrency}
					setCryptocurrency={setCryptocurrency}
				/>
				<Estimation
					result={result}
				/>
			</div>
		</Container>
	);
}

export default App;
