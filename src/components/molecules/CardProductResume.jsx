import styled from "styled-components";

export const CardProductResume = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: 1px dashed #12e10b;
  background-color: rgba(84, 240, 79, 0.1);
  padding: 10px;
  margin-bottom: 10px;

  .descripcion {
    color: #26bd56;
    font-weight: 700;
  }
  .details {
    color: ${({ theme }) => theme.text};
  }
`;
