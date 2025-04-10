import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "../store/companyStore";
import { useUsersStore } from "../store/UsersStore";
import { SpinnerLoading } from "../components/molecules/SpinnerLoading";
import { Errors } from "../components/molecules/Errors";
import { Device } from "../styles/breackpoints";
import styled from "styled-components";
import { Sidebar } from "../components/organisms/sidebar/Sidebar";
import { useState } from "react";
import { MenuHambur } from "../components/organisms/MenuHambur";

export const Layout = ({ children }) => {
  const showUsers = useUsersStore((state) => state.showUsers);
  const idUsuario = useUsersStore((state) => state.idUsuario);
  const showPermisos = useUsersStore((state) => state.showPermisos);
  const showCompany = useCompanyStore((state) => state.showCompany);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    data: dataUsers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mostrar usuarios"],
    queryFn: showUsers,
  });

  useQuery({
    queryKey: ["mostrar empresa"],
    queryFn: () => showCompany({ idusaurio: idUsuario }),
    enabled: !!dataUsers,
  });

  useQuery({
    queryKey: ["mostrar permisos", { id_usuario: idUsuario }],
    queryFn: () => showPermisos({ id_usuario: idUsuario }),
    enabled: !!dataUsers,
  });

  if (isLoading) {
    return <SpinnerLoading />;
  }
  if (error) {
    return <Errors mensaje={error.message} />;
  }
  return (
    <Container className={sidebarOpen ? "active" : ""}>
      <div className="ContentSidebar">
        <Sidebar
          state={sidebarOpen}
          setState={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>
      <div className="ContentMenuambur">
        <MenuHambur />
      </div>

      <Containerbody>{children}</Containerbody>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.2s ease-in-out;

  .ContentSidebar {
    display: none;
  }
  .ContentMenuambur {
    display: block;
    position: absolute;
    left: 20px;
  }
  @media ${Device.tablet} {
    grid-template-columns: 65px 1fr;
    &.active {
      grid-template-columns: 220px 1fr;
    }
    .ContentSidebar {
      display: initial;
    }
    .ContentMenuambur {
      display: none;
    }
  }
`;
const Containerbody = styled.div`
  grid-column: 1;
  width: 100%;
  @media ${Device.tablet} {
    grid-column: 2;
  }
`;
