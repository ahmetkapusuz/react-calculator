import { computeHeadingLevel } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Display from './Display';
import Keypad from './Keypad';

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

const doMath = (num1, num2, op) => {
  switch (op) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case 'X':
      return num1 * num2;
    case '/':
      return (num1 / num2).toFixed(2);
    default:
      return 0;
  }
};

const compute = (stack) => {
  return doMath(parseInt(stack[0]), parseInt(stack[2]), stack[1]);
};

const printStack = (stack) => {
  return stack.length === 0
    ? '0'
    : stack.length === 1 || stack.length === 2
    ? `${stack[0]}`
    : `${stack[0]} ${stack[1]} ${stack[2]}`;
};

const Calculator = () => {
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');
  const [currentOperation, setCurrentOperation] = useState('');
  const [stack, setStack] = useState([]);

  useEffect(() => {
    console.log('stack', stack);
    setResult(printStack(stack));
  }, [stack]);

  const handleOnKeyClicked = (key) => {
    console.log('key', key);
    switch (key.type) {
      case 'number':
        if (stack.length === 0) {
          stack.push(parseInt(key.label));
        } else if (stack.length === 1) {
          const oldValue = stack.pop();
          stack.push(oldValue * 10 + parseInt(key.label));
        } else if (stack.length === 2) {
          stack.push(key.label);
        } else if (stack.length === 3) {
          const oldValue = stack.pop();
          stack.push(oldValue * 10 + parseInt(key.label));
        } else {
          console.error('Error occurred!');
        }
        break;
      case 'operation':
        if (stack.length === 1) {
          console.log(key.label);
          stack.push(key.label);
        } else if (stack.length === 3) {
          setStack([compute(stack), key.label]);
          return;
        }
        break;
      case 'other':
        console.log(key.label);
        if (key.label === '=') {
          setStack([compute(stack)]);
          return;
        } else if (key.label === 'AC') {
          setStack([]);
          return;
        } else if (key.label === '%') {
          if (stack.length === 1) {
            setStack([parseInt(stack[0]) / 100]);
          } else if (stack.length === 3) {
            setStack([compute(stack) / 100]);
          }
          return;
        }
        break;
      default:
        console.log(key.label);
    }
    setStack([...stack]);
  };

  return (
    <Container>
      <Display operation={operation} result={result}></Display>
      <Keypad onKeyClicked={handleOnKeyClicked}></Keypad>
    </Container>
  );
};

export default Calculator;
