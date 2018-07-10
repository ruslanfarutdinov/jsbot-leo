import React from 'react';
import styled from 'styled-components';

const Message = styled.div`
	align-self: flex-start;
	color: #944743;
  background: #F5F5DC;
  border: none;
  border-radius: 5px;
  padding: 8px;
  margin: 8px;
`;

const Human = ({ message }) => (
	<Message>
		<span>{message}</span>
	</Message>
);


export default Human;
