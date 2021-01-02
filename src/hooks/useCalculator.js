import { useState } from 'react';
import * as math from 'mathjs';

const doMath = (num1, num2, op) => {
  const firstNumber = math.bignumber(num1 || '0');
  const secondNumber = math.bignumber(
    num2 || (op === '÷' || op === 'x' ? '1' : '0')
  );

  switch (op) {
    case '+':
      return math.add(firstNumber, secondNumber);
    case '-':
      return math.subtract(firstNumber, secondNumber);
    case 'x':
      return math.multiply(firstNumber, secondNumber);
    case '/':
      // Avoid divide by zero error
      if (secondNumber.toString() === '0') {
        return firstNumber;
      }

      return math.divide(firstNumber, secondNumber);
    default:
      return 0;
  }
};

const calculate = ({ result, nextNumber, operation }) =>
  parseFloat(
    math
      .format(doMath(result, nextNumber, operation), {
        notation: 'fixed',
        precision: 10,
      })
      .toString()
  ).toString();

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
          result: math.divide(calculatedValue, 100).toString(),
          nextNumber: null,
          operation: null,
        };
      }

      if (nextNumber) {
        return {
          nextNumber: math.divide(nextNumber, 100).toString(),
        };
      }
      return {};
    case '+/-':
      if (nextNumber) {
        return { nextNumber: (-1 * math.bignumber(nextNumber)).toString() };
      }

      if (result) {
        return { result: (-1 * math.bignumber(result)).toString() };
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
        break;
    }
  };

  return { result: state.nextNumber || state.result || '0', makeCalculation };
}

export default useNewCalculator;
