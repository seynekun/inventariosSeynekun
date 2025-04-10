import styled from "styled-components";
import { useUsersStore } from "../../store/UsersStore";
import { useEffect, useState } from "react";

export const ListaModulos = ({ checkboxs, setCheckboxs, accion }) => {
  const dataModulos = useUsersStore((state) => state.dataModulos);
  const dataPermisosEdit = useUsersStore((state) => state.dataPermisosEdit);
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    if (accion == "Editar") {
      let allDocs = [];
      dataModulos.map((element) => {
        const statePermiso = dataPermisosEdit?.some((objeto) =>
          objeto.modulos.nombre.includes(element.nombre)
        );
        if (statePermiso) {
          allDocs.push({ ...element, check: true });
        } else {
          allDocs.push({ ...element, check: false });
        }
      });
      setCheckboxs(allDocs);
    } else {
      setCheckboxs(dataModulos);
    }
  }, [dataPermisosEdit]);
  function handlecheckbox(id) {
    setCheckboxs((prev) => {
      return prev?.map((item) => {
        if (item.id === id) {
          return { ...item, check: !item.check };
        } else {
          return { ...item };
        }
      });
    });
  }
  const seleccionar = (e) => {
    let check = e.target.checked;
    setIsChecked(check);
  };

  return (
    <Container>
      {checkboxs?.map((item, index) => {
        return (
          <div
            key={index}
            className="content"
            onClick={() => handlecheckbox(item.id)}
          >
            <input
              onChange={(e) => seleccionar(e)}
              id={item.id}
              type="checkbox"
              className="checkbox"
              checked={item.check}
            />
            <span>{item.nombre}</span>
          </div>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px dashed #414244;
  border-radius: 15px;
  padding: 20px;
  gap: 15px;
  .content {
    display: flex;
    gap: 20px;
  }
  .checkbox {
    appearance: none;
    overflow: hidden;
    min-width: 30px;
    aspect-ratio: 1/1;
    border-radius: 30% 70% 70% 30%/30% 30% 70% 70%;
    border: 2px solid rgb(255, 102, 0);
    position: relative;
    transition: all 0.2s ease-in-out;
    &::before {
      position: absolute;
      inset: 0;
      content: "";
      font-size: 35px;
      transition: all 0.2s ease-in-out;
    }
    &:checked {
      border: 2px solid rgb(255, 212, 59);
      background: linear-gradient(
        135deg,
        rgb(255, 212, 59) 0%,
        rgb(255, 102, 0) 100%
      );
      box-shadow: -5px -5px 30px rgba(255, 212, 59, 1),
        5px 5px 30px rgba(255, 102, 0, 1);
      &::before {
        background: linear-gradient(
          135deg,
          rgb(255, 212, 59) 0%,
          rgb(255, 102, 0) 100%
        );
      }
    }
  }
`;
