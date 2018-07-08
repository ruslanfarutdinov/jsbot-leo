import React from 'react';
import styled from 'styled-components';

const Message = styled.div`
	align-self: flex-end;
	color: #944743;
  background: papayawhip;
  border: none;
  border-radius: 5px;
  padding: 0.5em;
  margin: 0.5em;
`;

const Human = ({ message }) => (
	<Message>
		<span>{message}</span>
	</Message>
);


export default Human;
