import { useState } from 'react';

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

const calculate = ({ result, nextNumber, operation }) =>
  doMath(parseFloat(result), parseFloat(nextNumber), operation);

const handleNumber = ({ result, nextNumber, operation }, key) => {
  // If user pressed 0 and there is no other number entered return empty object
  if (key.label === '0' && !nextNumber) {
    return {};
  }

  // If there is an operation
  if (operation) {
    // If there is already a number entered before, update the number by adding pressed number to the end
    // If this is the first number, set nextNumber as key label
    return {
      nextNumber: nextNumber ? nextNumber + key.label : key.label,
    };
  } else {
    // If there is no nextNumber or nextNumber is 0 return key label as nextNumber
    // If there is a nextNumber add pressed key value to the end of the number
    return {
      nextNumber:
        !nextNumber || nextNumber === '0' ? key.label : nextNumber + key.label,
      result: null,
    };
  }
};

const handleOperation = ({ result, nextNumber, operation }, key) => {
  // If there is an operation, calculate result and update operation with new key
  if (operation) {
    return {
      result: calculate({ result, nextNumber, operation }),
      nextNumber: null,
      operation: key.label,
    };
  }

  // If no number yet, save operation
  if (!nextNumber) {
    return { operation: key.label };
  }

  // If there is no operation yet, update result with the number
  return {
    result: nextNumber,
    nextNumber: null,
    operation: key.label,
  };
};

const handleOther = ({ result, nextNumber, operation }, key) => {
  switch (key.label) {
    case '=':
      return {
        result: calculate({ result, nextNumber, operation }),
        nextNumber: null,
        operation: null,
      };
    case 'AC':
      return { result: null, nextNumber: null, operation: null };
    case '%':
      if (operation && nextNumber) {
        const calculatedValue = calculate({ result, nextNumber, operation });

        return {
          result: parseFloat(calculatedValue / 100).toString(),
          nextNumber: null,
          operation: null,
        };
      }

      if (nextNumber) {
        return {
          nextNumber: parseFloat(nextNumber / 100).toString(),
        };
      }
      return {};
    case '+/-':
      if (nextNumber) {
        return { nextNumber: (-1 * parseFloat(nextNumber)).toString() };
      }

      if (result) {
        return { result: (-1 * parseFloat(result)).toString() };
      }

      return {};
    case '.':
      if (nextNumber) {
        if (nextNumber.includes('.')) {
          return {};
        }

        return { nextNumber: nextNumber + '.' };
      }

      return { nextNumber: '0.' };
    default:
      break;
  }
};

function useNewCalculator() {
  const [state, setState] = useState({
    result: null,
    nextNumber: null,
    operation: null,
  });

  const makeCalculation = (key) => {
    if (!key || !key.label || !key.type) {
      return;
    }

    switch (key.type) {
      case 'number':
        setState({ ...state, ...handleNumber(state, key) });
        break;
      case 'operation':
        setState({ ...state, ...handleOperation(state, key) });
        break;
      case 'other':
        setState({ ...state, ...handleOther(state, key) });
        break;
      default:
        console.log(key.label);
    }
  };

  console.log('state', state);

  return { result: state.nextNumber || state.result || '0', makeCalculation };
}

export default useNewCalculator;
