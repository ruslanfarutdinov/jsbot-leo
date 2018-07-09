import React from 'react';
import styled from 'styled-components';

const Message = styled.div`
	width: 300px;
	align-self: flex-end;
	color: #944743;
  background: #F5F5DC;
  border: none;
  border-radius: 5px;
  padding: 0.5em;
  margin: 0.5em;
`;

const Bot = ({ message }) => (
	<Message>
		<span>{message}</span>
	</Message>
);

export default Bot;
