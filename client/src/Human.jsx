import React from 'react';
import styled from 'styled-components';

const Message = styled.div`
	max-width: 300px;
	align-self: flex-start;
	color: #944743;
  background: #D3AB9E;
  border: none;
  border-radius: 10px;
  padding: 8px;
  margin: 8px;
  font-family: 'Indie Flower', cursive;
`;

const Human = ({ message }) => (
		<Message>
			<span>{message}</span>
		</Message>
);

export default Human;
