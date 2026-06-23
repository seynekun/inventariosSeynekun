import styled from "styled-components";
import { v } from "../../../styles/variables";
import BtnShared from "../../molecules/BtnShared";

export function Paginated({ table }) {
  return (
    <Container>
      <BtnShared
        funcion={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
        title="Primera página"
        bgcolor="#F3D20C"
        icono={<v.iconotodos />}
      />
      <BtnShared
        disabled={!table.getCanPreviousPage()}
        funcion={() => table.previousPage()}
        bgcolor="#F3D20C"
        icono={<v.iconoflechaizquierda />}
      />

      <span>{table.getState().pagination.pageIndex + 1}</span>
      <p> de {table.getPageCount()} </p>

      <BtnShared
        disabled={!table.getCanNextPage()}
        funcion={() => table.nextPage()}
        bgcolor="#F3D20C"
        icono={<v.iconoflechaderecha />}
      />
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
