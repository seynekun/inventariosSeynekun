import styled from "styled-components";
import { Device } from "../../styles/breackpoints";
export const Colorcontent = styled.div`
  justify-content: center;
  min-height: ${(props) => props.$alto};
  width: ${(props) => props.$ancho};
  display: flex;
  background-color: ${(props) => props.$color};
  border-radius: 50%;
  text-align: center;
`;

export const ColorcontentStyles = styled.div`
  color: ${(props) => props.color};
  border-radius: 8px;
  border: 1px dashed ${(props) => props.color};
  text-align: center;
  padding: 3px;
  width: 70%;
  @media ${Device.tablet} {
    width: 100%;
  }
`;
