import React from 'react';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ScoreDiv = styled.div`
  color: #944743;
  margin: 20px auto 10px auto;
  font-family: 'Pacifico', cursive;
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
  margin: auto;
`;

const Numbers = styled.div`
  margin: auto;
`;

const Score = ({ correct, total }) => (
  <ScoreDiv>
    <Text>Your Score:</Text>
    <TransitionGroup style={{display: 'flex', flexDirection: 'column'}}>
      <CSSTransition
        key={total}
        timeout={500}
        classNames="fade"
      >
        <Numbers>{correct}/{total}</Numbers>
      </CSSTransition>
    </TransitionGroup>
  </ScoreDiv>
);

export default Score;
