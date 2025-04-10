import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
export function Buscador({ setBuscador, onFocus, funcion }) {
  function buscar(e) {
    setBuscador(e.target.value);
  }
  function ejecutarfuncion() {
    if (funcion) {
      funcion();
    }
  }
  return (
    <Container onClick={ejecutarfuncion}>
      <article className="content">
        <FaSearch className="icono" />
        <input onFocus={onFocus} onChange={buscar} placeholder="...buscar" />
      </article>
    </Container>
  );
}
const Container = styled.div`
  background-color: ${(props) => props.theme.bg};
  border-radius: 10px;
  height: 60px;
  align-items: center;
  display: flex;
  color: ${(props) => props.theme.text};
  border: 1px solid #414244;
  .content {
    padding: 15px;
    gap: 10px;
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    .icono {
      font-size: 18px;
    }
    input {
      font-size: 18px;
      width: 100%;
      outline: none;
      background: none;
      border: 0;
      color: ${(props) => props.theme.text};
    }
  }
`;
