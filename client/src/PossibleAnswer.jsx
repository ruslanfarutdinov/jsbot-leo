import React from 'react';
import styled from 'styled-components';

const Answer = styled.button`
	width: 200px;
	align-self: flex-end;
	color: #944743;
  background: #F5F5DC;
  border: none;
  border-radius: 5px;
  padding: 8px;
  margin: 0px 8px 4px 8px;
`;


const PossibleAnswer = ({ possibleAnswer, id, handleButtonSubmit }) => (
	<Answer onClick={handleButtonSubmit.bind(null, id, possibleAnswer)}>{possibleAnswer}</Answer>
);

export default PossibleAnswer;
