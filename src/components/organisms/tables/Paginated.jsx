import styled from "styled-components";
import { v } from "../../../styles/variables";

export function Paginated({ table, pagina, maximo, irinicio }) {
  return (
    <Container>
      {/* Botón Ir al inicio */}
      <button
        onClick={() => irinicio()}
        disabled={!table.getCanPreviousPage()}
        title="Primera página"
      >
        <span className="iconos">{<v.iconotodos />}</span>
      </button>

      {/* Botón Página Anterior */}
      <button
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
        title="Página anterior"
      >
        <span className="iconos izquierda">{<v.iconoflechaderecha />}</span>
      </button>

      {/* Indicador de página actual */}
      <span>{pagina}</span>
      <p> de {maximo}</p>

      {/* Botón Página Siguiente */}
      <button
        disabled={!table.getCanNextPage()}
        onClick={() => table.nextPage()}
        title="Página siguiente"
      >
        <span className="iconos">{<v.iconoflechaderecha />}</span>
      </button>
    </Container>
  );
}

// ... (Tus Styled Components se mantienen idénticos)
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  button {
    background-color: #ff7800;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-align: center;
    transition: 0.3s;
    &:hover {
      box-shadow: 0px 10px 15px -3px #ff7800;
    }
    .iconos {
      color: #fff;
      &.izquierda {
        transform: rotate(-180deg);
      }
    }
  }
  button[disabled] {
    background-color: #646464;
    cursor: no-drop;
    box-shadow: none;
  }
`;
