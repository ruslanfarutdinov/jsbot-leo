import React from 'react';
import styled from 'styled-components';

const Answer = styled.button`
	width: 200px;
	align-self: flex-end;
	color: #944743;
  background: #F1DEDC;
  border: none;
  border-radius: 10px;
  padding: 8px;
  margin: 0px 8px 4px 8px;
  cursor: pointer;
  font-size: 13px;
  font-family: 'Indie Flower', cursive;
`;


const PossibleAnswer = ({ possibleAnswer, id, handleButtonSubmit }) => (
	<Answer onClick={handleButtonSubmit.bind(null, id, possibleAnswer)}>{possibleAnswer}</Answer>
);

export default PossibleAnswer;
