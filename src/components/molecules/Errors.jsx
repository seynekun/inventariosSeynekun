import styled from "styled-components";
export function Errors({ mensaje }) {
  return (
    <Container>
      <span>Error... {mensaje}</span>
    </Container>
  );
}
const Container = styled.div`
  color: ${({ theme }) => theme.text};
`;
