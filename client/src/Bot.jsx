import React from 'react';
import styled from 'styled-components';
import PossibleAnswer from './PossibleAnswer.jsx';

const Wrapper = styled.div`
	align-self: flex-end;
	display: flex;
	flex-direction: column;	
	width: 350px;
`;

const Message = styled.div`
	width: 300px;
	align-self: flex-end;
	color: #944743;
  background: #F5F5DC;
  border: none;
  border-radius: 5px;
  padding: 8px;
  margin: 8px;
`;

const Bot = ({ message, handleButtonSubmit }) => {
	const answerIndex = message.indexOf('A:');
	let allAnswersStr = ''; 
	let allAnswersArr = []; 

	if (answerIndex !== -1) {
		allAnswersStr = message.substring(answerIndex);
		const indexA = allAnswersStr.indexOf('A:');
		const indexB = allAnswersStr.indexOf('B:');
		const indexC = allAnswersStr.indexOf('C:');
		const indexD = allAnswersStr.indexOf('D:');

		allAnswersArr.push(allAnswersStr.substring(indexA, indexB));
		allAnswersArr.push(allAnswersStr.substring(indexB, indexC));
		allAnswersArr.push(allAnswersStr.substring(indexC, indexD));
		allAnswersArr.push(allAnswersStr.substring(indexD));

		message = message.substring(0, answerIndex);
	}

	return (
		<Wrapper>
			<Message>
				<span>{message}</span>
			</Message>
			{allAnswersArr.map((possibleAnswer, i) => <PossibleAnswer handleButtonSubmit={handleButtonSubmit} possibleAnswer={possibleAnswer} key={i} id={i}/>)}
		</Wrapper>
	);
}

export default Bot;
