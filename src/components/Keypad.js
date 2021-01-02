import React from 'react';
import styled from 'styled-components';
import { keys } from '../utils';

const KeypadContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  align-items: center;
  justify-items: center;
  height: 60%;
  width: 100%;
  background-color: #292d36;
  border-radius: 20px;
  padding: 10px 0;
  font-size: 20px;
`;

const Key = styled.button`
  width: 60px;
  height: 60px;
  background-color: #272b32;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: ${({ type }) =>
    type === 'other'
      ? '#8de969'
      : type === 'operation'
      ? '#c32f27'
      : '#ffffff'};
  box-shadow: 3px 3px 5px 2px rgba(0, 0, 0, 0.1);
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  border: none;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    transform: scale(0.99);
  }
`;

const findKey = (keyValue) => keys.find((key) => keyValue === key.label);

const Keypad = ({ onKeyClicked }) => {
  return (
    <KeypadContainer>
      {keys.map((key, index) => (
        <Key
          key={`${key.type}-${key.label}-${index}`}
          type={key.type}
          onClick={() => {
            onKeyClicked(findKey(key.label));
          }}
          disabled={key.label === ''}
        >
          {key.label}
        </Key>
      ))}
    </KeypadContainer>
  );
};

export default Keypad;
