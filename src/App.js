import Calculator from './components/Calculator';
import styled from 'styled-components';

const MainContainer = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #dfdede;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

function App() {
  return (
    <MainContainer>
      <Calculator />
    </MainContainer>
  );
}

export default App;
