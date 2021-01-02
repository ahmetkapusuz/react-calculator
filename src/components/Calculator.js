import React from 'react';
import styled from 'styled-components';
import Display from './Display';
import Keypad from './Keypad';
import useNewCalculator from '../hooks/useNewCalculator';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #21252c;
  color: #ffffff;
  justify-content: center;
  max-width: 414px;
  max-height: 736px;
  border-radius: 20px;
  position: relative;
`;

const Calculator = () => {
  const { result, makeCalculation } = useNewCalculator();

  console.log('result', result);

  const handleOnKeyClicked = (key) => {
    makeCalculation(key);
  };

  return (
    <Container>
      <Display result={result}></Display>
      <Keypad onKeyClicked={handleOnKeyClicked}></Keypad>
    </Container>
  );
};

export default Calculator;
