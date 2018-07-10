import React from 'react';
import styled from 'styled-components';
import Human from './Human.jsx';
import Bot from './Bot.jsx';
import axios from 'axios';

const MainWrapper = styled.div`
	width: 400px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Header = styled.h1`
	color: #944743;
	padding: 2px;
	border: 1px solid #944743;
	border-radius: 5px;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 3em;
  color: #944743;
  background: #F5F5DC;
  border: none;
  border-radius: 3px;
`;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			message: [],
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleHumanSubmit = this.handleHumanSubmit.bind(this);
		this.handleButtonSubmit = this.handleButtonSubmit.bind(this);
	}

	handleInputChange(event) {
		this.setState({
			value: event.target.value,
		});
	}

	handleHumanSubmit(event) {
		if (event.keyCode === 13) {
			axios.get(`/dialogflow/${this.state.value}`)
				.then((response) => {
					const message = this.state.message;
					message.push([response.data.queryResult.fulfillmentText, 'bot']);
					this.setState({
						message: message,
					});
				})
				.catch((error) => {
					console.log(`Error sending a get request: ${error}`);
				});

			const message = this.state.message;
			message.push([this.state.value, 'human']);
			this.setState({
				value: '',
				message: message,
			})
	    event.preventDefault();
		}

	}

	handleButtonSubmit(key, answer) {
		let choice = '';
		if (key === 0) {
			choice = 'A';
		} else if (key === 1) {
			choice = 'B';
		} else if (key === 2) {
			choice = 'C';
		} else if (key === 3) {
			choice = 'D';
		}

		axios.get(`/dialogflow/${choice}`)
			.then((response) => {
				const message = this.state.message;
				message.push([response.data.queryResult.fulfillmentText, 'bot']);
				this.setState({
					message: message,
				});
			})
			.catch((error) => {
				console.log(`Error sending a get request: ${error}`);
			});

		const message = this.state.message;
		message.push([answer, 'human']);
		this.setState({
			value: '',
			message: message,
		})

	}

	render() {
		return (
			<MainWrapper>
				<Header>Chat with Leo</Header>
				{this.state.message.map((tuple, i) => {
					if (tuple[1] === 'human') {
						return <Human message={tuple[0]} key={i}/>
					} else {
						return <Bot handleButtonSubmit={this.handleButtonSubmit} message={tuple[0]} key={i}/>
					}
				})}
				<form>
					<Input type="text" placeholder="Say hi..." value={this.state.value} onChange={this.handleInputChange} onKeyDown={this.handleHumanSubmit} />
				</form> 
			</MainWrapper>
		);
	}
}

export default App;
