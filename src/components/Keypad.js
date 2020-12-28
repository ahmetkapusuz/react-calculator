import React from 'react';
import styled from 'styled-components';

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
  cursor: pointer;
  border: none;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    transform: scale(0.99);
  }
`;

const keys = [
  {
    label: 'AC',
    type: 'other',
  },
  {
    label: '+/-',
    type: 'other',
  },
  {
    label: '%',
    type: 'other',
  },
  {
    label: '/',
    type: 'operation',
  },
  {
    label: '7',
    type: 'number',
  },
  {
    label: '8',
    type: 'number',
  },
  {
    label: '9',
    type: 'number',
  },
  {
    label: 'X',
    type: 'operation',
  },
  {
    label: '4',
    type: 'number',
  },
  {
    label: '5',
    type: 'number',
  },
  {
    label: '6',
    type: 'number',
  },
  {
    label: '-',
    type: 'operation',
  },
  {
    label: '1',
    type: 'number',
  },
  {
    label: '2',
    type: 'number',
  },
  {
    label: '3',
    type: 'number',
  },
  {
    label: '+',
    type: 'operation',
  },
  {
    label: '',
    type: 'number',
  },
  {
    label: '0',
    type: 'number',
  },
  {
    label: '.',
    type: 'number',
  },
  {
    label: '=',
    type: 'other',
  },
];

const findKey = (keyValue) => keys.find((key) => keyValue === key.label);

const Keypad = ({ onKeyClicked }) => {
  return (
    <KeypadContainer>
      {keys.map((key) => (
        <Key
          key={`${key.type}-${key.label}`}
          type={key.type}
          onClick={() => {
            onKeyClicked(findKey(key.label));
          }}
        >
          {key.label}
        </Key>
      ))}
    </KeypadContainer>
  );
};

export default Keypad;
