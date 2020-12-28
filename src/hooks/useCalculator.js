import { useState, useEffect } from 'react';

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

const calculateResult = (stack) => {
  return stack.length === 0
    ? '0'
    : stack.length === 1 || stack.length === 2
    ? `${stack[0]}`
    : `${stack[0]} ${stack[1]} ${stack[2]}`;
};

const handleNumber = (stack, key) => {
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
};

function useCalculator() {
  const [stack, setStack] = useState([]);
  const [result, setResult] = useState('');

  useEffect(() => {
    console.log('stack', stack);
    setResult(calculateResult(stack));
  }, [stack]);

  const makeCalculation = (key) => {
    switch (key.type) {
      case 'number':
        handleNumber(stack, key);
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

  return { result, makeCalculation };
}

export default useCalculator;
