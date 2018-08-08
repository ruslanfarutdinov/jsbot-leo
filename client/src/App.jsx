import React from 'react';
import styled from 'styled-components';
import Human from './Human.jsx';
import Bot from './Bot.jsx';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const MainWrapper = styled.div`
  height: 100%;
  display: flex;
`;

const WrapperLeft = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  background-color: #DFDBE5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
`;

const WrapperRight = styled.div`
  width: 70%;
  overflow-y: auto;
`;
  
const ContentWrapper = styled.div`
  min-height: 100%;
  display: flex;
  justify-content: center;
`;

const Messages = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  margin: auto;
  height: fit-content;
	color: #944743;
	padding: 0 0.5em 0 0.5em;
	border: 1px solid #944743;
  border-radius: 5px;
  font-family: 'Pacifico', cursive;
`;

const Form = styled.form`
  display: flex;
  justify-content: flex-start;
`;

const Input = styled.input`
  padding: 0.5em;
  padding-bottom: 0;
  margin: 3em 3em 3em 8px;
  color: #944743;
  border: none;
  border-bottom: 1px #944743 solid;
  font-size: 14px;
  font-family: 'Indie Flower', cursive;
`;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
      message: [],
      firstMsg: true,
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
        firstMsg: false,
			})
	    event.preventDefault();
		}

	}

	handleButtonSubmit(key, answer) {
    let choice = '';
		if (key === 0) {
      choice = 'A';
      answer = answer.slice(0, answer.length - 2);
		} else if (key === 1) {
      choice = 'B';
      answer = answer.slice(0, answer.length - 2);
		} else if (key === 2) {
      choice = 'C';
      answer = answer.slice(0, answer.length - 5);
		} else if (key === 3) {
      choice = 'D';
      answer = answer.slice(0, answer.length - 1);
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
    let placeholder = 'Say hi...';
    if (!this.state.firstMsg) {
      placeholder = 'Interact with Leo...';
    } 
		return (
			<MainWrapper>
        <WrapperLeft>
				  <Header>Learn with Leo</Header>
        </WrapperLeft> 
        <WrapperRight>
          <ContentWrapper>
            <Messages>
              <TransitionGroup
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {this.state.message.map((tuple, i) => {
                  if (tuple[1] === 'human') {
                    return (
                      <CSSTransition
                        key={tuple[0]}
                        timeout={500}
                        classNames="fade"
                      >
                        <Human message={tuple[0]} key={tuple[0]}/>
                      </CSSTransition>
                    )
                  } else {
                    return (
                      <CSSTransition
                        key={tuple[0]}
                        timeout={500}
                        classNames="fade"
                      >
                        <Bot handleButtonSubmit={this.handleButtonSubmit} message={tuple[0]} key={tuple[0]}/>
                      </CSSTransition>
                  )
                  }
                })}
              </TransitionGroup>
              <Form>
                <Input type="text" placeholder={placeholder} value={this.state.value} onChange={this.handleInputChange} onKeyDown={this.handleHumanSubmit} />
              </Form>
            </Messages>
          </ContentWrapper>
        </WrapperRight>
			</MainWrapper>
		);
	}
}

export default App;
