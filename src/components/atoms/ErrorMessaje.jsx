import styled from "styled-components";
export default function ErrorMessaje({ children }) {
  return <StyledError>{children}</StyledError>;
}
const StyledError = styled.div`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: #fee2e2;
  color: #dc2626;
  font-weight: 700;
  padding: 0.75rem;
  text-transform: uppercase;
  font-size: 0.875rem;
`;
