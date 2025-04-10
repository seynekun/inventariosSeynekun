import { useState } from "react";
import styled from "styled-components";
import { Header } from "../organisms/Header";
import { ContentFiltro } from "../atoms/ContentFilter";
import { Title } from "../atoms/Title";
import { Buscador } from "../organisms/Buscador";
import { Btnsave } from "../molecules/BtnSave";
import { Tabs } from "../organisms/Tabs";
import { RegisterKardex } from "../organisms/forms/RegisterKardex";
import { useKardexStore } from "../../store/KardexStore";

export const KardexTemplate = ({ data }) => {
  const [state, setState] = useState(false);
  const [dataSelect, setdataSelect] = useState([]);
  const [accion, setAccion] = useState("");
  const [openRegistro, SetopenRegistro] = useState(false);
  const [tipo, setTipo] = useState("");
  function nuevaentrada() {
    SetopenRegistro(true);
    setTipo("entrada");
  }
  function nuevasalida() {
    SetopenRegistro(true);
    setTipo("salida");
  }

  const setBuscador = useKardexStore((state) => state.setBuscador);

  return (
    <Container>
      {openRegistro && (
        <RegisterKardex
          dataSelect={dataSelect}
          accion={accion}
          tipo={tipo}
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
          <Title>Kardex</Title>
          <Btnsave bgcolor="#52de65" titulo="+Entrada" funcion={nuevaentrada} />
          <Btnsave bgcolor="#fb6661" titulo="-Salida" funcion={nuevasalida} />
        </ContentFiltro>
      </section>
      <section className="area2">
        <Buscador setBuscador={setBuscador} />
      </section>
      <section className="main">
        <Tabs data={data} />
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
    /* background-color: rgba(103, 93, 241, 0.14); */
    display: flex;
    align-items: center;
  }
  .area1 {
    grid-area: area1;
    /* background-color: rgba(229, 67, 26, 0.14); */
    display: flex;
    align-items: center;
  }
  .area2 {
    grid-area: area2;
    /* background-color: rgba(77, 237, 106, 0.14); */
    display: flex;
    align-items: center;
    justify-content: end;
  }

  .main {
    margin-top: 20px;
    grid-area: main;
    /* background-color: rgba(179, 46, 241, 0.14); */
  }
`;
