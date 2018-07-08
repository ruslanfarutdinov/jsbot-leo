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
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 3em;
  color: #944743;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			human: [],
			bot: [],
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleHumanSubmit = this.handleHumanSubmit.bind(this);
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
					console.log(response.data.queryResult.fulfillmentText);
					const bot = this.state.bot;
					bot.push(response.data.queryResult.fulfillmentText);
					this.setState({
						bot: bot,
					});
				})
				.catch((error) => {
					console.log(`Error sending a get request: ${error}`);
				});

			const human = this.state.human;
			human.push(this.state.value);
			this.setState({
				value: '',
				human: human,
			})
	    event.preventDefault();
		}

	}

	render() {
		return (
			<MainWrapper>
				<Header>Chat with Leo</Header>
				{this.state.bot.map((message) => <Bot message={message} key={message}/>)}
				
				<form>
					<Input type="text" placeholder="Say hi..." value={this.state.value} onChange={this.handleInputChange} onKeyDown={this.handleHumanSubmit} />
				</form> 
			</MainWrapper>
		);
	}
}

export default App;
