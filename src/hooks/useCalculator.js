import { useState, useEffect } from 'react';

const doMath = (num1, num2, op) => {
  switch (op) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case 'x':
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

const handleNumber = (stack, setStack, key) => {
  switch (stack.length) {
    case 0:
      if (key.label === '0') {
        return;
      }
      stack.push(parseInt(key.label));
      break;
    case 1:
      stack.push(stack.pop() * 10 + parseInt(key.label));
      break;
    case 2:
      stack.push(parseInt(key.label));
      break;
    case 3:
      stack.push(stack.pop() * 10 + parseInt(key.label));
      break;
    default:
      break;
  }

  setStack([...stack]);
};

const handleOperation = (stack, setStack, key) => {
  switch (stack.length) {
    case 1:
      stack.push(key.label);
      break;
    case 3:
      setStack([compute(stack), key.label]);
      break;
    default:
      break;
  }
};

const handleOther = (stack, setStack, key) => {
  switch (key.label) {
    case '=':
      setStack([compute(stack)]);
      break;
    case 'AC':
      setStack([]);
      break;
    case '%':
      if (stack.length === 1) {
        setStack([parseInt(stack[0]) / 100]);
      } else if (stack.length === 3) {
        setStack([compute(stack) / 100]);
      }
      break;
    case '+/-':
      if (stack.length === 1) {
        setStack([parseInt(stack[0]) * -1]);
      }
      break;
    default:
      break;
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
    if (!key || !key.label || !key.type) {
      return;
    }

    switch (key.type) {
      case 'number':
        handleNumber(stack, setStack, key);
        break;
      case 'operation':
        handleOperation(stack, setStack, key);
        break;
      case 'other':
        handleOther(stack, setStack, key);
        break;
      default:
        console.log(key.label);
    }
  };

  return { result, makeCalculation };
}

export default useCalculator;
