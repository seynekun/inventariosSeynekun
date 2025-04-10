import { useForm } from "react-hook-form";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import { InputText } from "./InputText";
import { Btnsave } from "../../molecules/BtnSave";
import { useCompanyStore } from "../../../store/companyStore";
import { ConvertirCapitalize } from "../../../utils/Conversiones";
import { CirclePicker } from "react-color";
import { useEffect, useState } from "react";
import { useCategoryStore } from "../../../store/CategoryStore";
export function RegisterCategory({ onClose, dataSelect, accion }) {
  const [currentColor, setColor] = useState("#F44336");
  const { insertCategorys, updateCategory } = useCategoryStore();
  const { dataCompany } = useCompanyStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const elegirColor = (color) => {
    setColor(color.hex);
  };
  async function insertar(data) {
    if (accion === "Editar") {
      const p = {
        id: dataSelect.id,
        descripcion: ConvertirCapitalize(data.nombre),
        color: currentColor,
      };
      await updateCategory(p);
      onClose();
    } else {
      const p = {
        _descripcion: ConvertirCapitalize(data.nombre),
        _idempresa: dataCompany.id,
        _color: currentColor,
      };
      await insertCategorys(p);
      onClose();
    }
  }
  useEffect(() => {
    if (accion === "Editar") {
      setColor(dataSelect.color);
    }
  }, [accion, dataSelect.color]);
  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              {accion == "Editar"
                ? "Editar categorias"
                : "Registrar nueva categoria"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section>
            <article>
              <InputText icono={<v.iconocategorias />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.descripcion}
                  type="text"
                  placeholder=""
                  {...register("nombre", {
                    required: true,
                  })}
                />
                <label className="form__label">categoria</label>
                {errors.nombre?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article className="colorContainer">
              <CirclePicker onChange={elegirColor} color={currentColor} />
            </article>

            <div className="btnguardarContent">
              <Btnsave
                icono={<v.iconoguardar />}
                titulo="Guardar"
                bgcolor="#ef552b"
              />
            </div>
          </section>
        </form>
      </div>
    </Container>
  );
}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
      section {
        gap: 20px;
        display: flex;
        flex-direction: column;
        .colorContainer {
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
    }
  }
`;
