import styled from "styled-components";
import { BannerHome } from "../organisms/BannerHome";

export const HomeTemplate = () => {
  return (
    <>
      <Main>
        <BannerHome />
      </Main>
    </>
  );
};

const Main = styled.main`
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  font-size: 26px;
`;
