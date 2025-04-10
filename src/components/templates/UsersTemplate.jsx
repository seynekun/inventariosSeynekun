import { useState } from "react";
import styled from "styled-components";
import { Header } from "../organisms/Header";
import { BtnFilter } from "../molecules/BtnFilter";
import { ContentFiltro } from "../atoms/ContentFilter";
import { Title } from "../atoms/Title";
import { v } from "../../styles/variables";
import { Buscador } from "../organisms/Buscador";
import { Lottieanimacion } from "../molecules/Lottieanimacion";
import vacio from "../../assets/vacio.json";
import { RegisterUsers } from "../organisms/forms/RegisterUsers";
import { TableUsers } from "../organisms/tables/TableUsers";
import { useUsersStore } from "../../store/UsersStore";

export const UsersTemplate = ({ data }) => {
  const [state, setState] = useState(false);
  const [dataSelect, setdataSelect] = useState([]);
  const [accion, setAccion] = useState("");
  const [openRegistro, SetopenRegistro] = useState(false);
  const nuevoRegistro = () => {
    SetopenRegistro(!openRegistro);
    setAccion("Nuevo");
    setdataSelect([]);
  };

  const setBuscador = useUsersStore((state) => state.setBuscador);

  return (
    <Container>
      {openRegistro && (
        <RegisterUsers
          dataSelect={dataSelect}
          accion={accion}
          onClose={() => SetopenRegistro(!openRegistro)}
        />
      )}

      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="area1">
        <ContentFiltro>
          <Title>Personal</Title>
          <BtnFilter
            funcion={nuevoRegistro}
            bgcolor="#f6f3f3"
            textcolor="#353535"
            icono={<v.agregar />}
          />
        </ContentFiltro>
      </section>
      <section className="area2">
        <Buscador setBuscador={setBuscador} />
      </section>
      <section className="main">
        {data?.length == 0 && (
          <Lottieanimacion alto="300" ancho="300" animacion={vacio} />
        )}
        <TableUsers
          data={data}
          SetopenRegistro={SetopenRegistro}
          setdataSelect={setdataSelect}
          setAccion={setAccion}
        />
      </section>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  padding: 15px;
  width: 100%;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  grid-template:
    "header" 100px
    "area1" 100px
    "area2" 60px
    "main" auto;

  .header {
    grid-area: header;
    display: flex;
    align-items: center;
  }
  .area1 {
    grid-area: area1;
    display: flex;
    align-items: center;
  }
  .area2 {
    grid-area: area2;

    display: flex;
    align-items: center;
    justify-content: end;
  }
  .main {
    grid-area: main;
  }
`;
