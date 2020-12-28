import React from 'react';
import styled from 'styled-components';

const DisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  height: 40%;
  width: 100%;
  position: absolute;
  top: 0;
  padding: 20px;
  overflow: hidden;
`;

const Result = styled.div`
  font-size: 40px;
  font-weight: bold;
`;

const Display = ({ result = '' }) => {
  return (
    <DisplayContainer>
      <Result>{result}</Result>
    </DisplayContainer>
  );
};

export default Display;
