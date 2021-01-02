import { useState } from 'react';

const handleNumber = ({ result, nextNumber, operation }, key) => {
  // If user pressed 0 and there is no other number entered return empty object
  if (key.label === '0' && !nextNumber) {
    return {};
  }

  // If there is an operation
  if (operation) {
    // If there is already a number entered before, update the number by adding pressed number to the end
    // If this is the first number, set nextNumber as key label
    return { nextNumber: nextNumber ? nextNumber + key.label : key.label };
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
const handleOperation = ({ result, nextNumber, operation }, key) => {};
const handleOther = ({ result, nextNumber, operation }, key) => {};

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
        handleOperation(state, key);
        break;
      case 'other':
        handleOther(state, key);
        break;
      default:
        console.log(key.label);
    }
  };
  return { result: state.result || state.nextNumber || '0', makeCalculation };
}

export default useNewCalculator;
