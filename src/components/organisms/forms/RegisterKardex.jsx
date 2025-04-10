import { useForm } from "react-hook-form";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import { InputText } from "./InputText";
import { Btnsave } from "../../molecules/BtnSave";
import { useCompanyStore } from "../../../store/companyStore";
import { Buscador } from "../Buscador";
import { useState } from "react";
import { ListaGenerica } from "../../molecules/ListaGenerica";
import { useProductsStore } from "../../../store/ProductsStore";
import { CardProductSelect } from "../../molecules/CardProductSelect";
import { useKardexStore } from "../../../store/KardexStore";
import { useUsersStore } from "../../../store/UsersStore";
import { useQueryClient } from "@tanstack/react-query";
export function RegisterKardex({ onClose, dataSelect, tipo }) {
  const insertKardexs = useKardexStore((state) => state.insertKardexs);
  const idUsuario = useUsersStore((state) => state.idUsuario);
  const [stateListaProd, SetstateListaProd] = useState(false);
  const dataproductos = useProductsStore((state) => state.dataproductos);
  const selectproducts = useProductsStore((state) => state.selectproducts);
  const productosItemSelect = useProductsStore(
    (state) => state.productosItemSelect
  );
  const setItemSelect = useProductsStore((state) => state.setItemSelect);
  const setBuscador = useProductsStore((state) => state.setBuscador);
  const query = useQueryClient();

  const { dataCompany } = useCompanyStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  async function insertar(data) {
    const p = {
      fecha: new Date(),
      tipo: tipo,
      id_usuario: idUsuario,
      id_producto: productosItemSelect.id,
      cantidad: parseFloat(data.cantidad),
      detalle: data.detalle,
      id_empresa: dataCompany.id,
    };
    await insertKardexs(p);
    query.invalidateQueries(["mostrar productos"]);
    setItemSelect([]);
    onClose();
  }
  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>Nuevo {tipo == "entrada" ? "Entrada" : "salida"}</h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>
        <div className="contentBuscador">
          <div onClick={() => SetstateListaProd(!stateListaProd)}>
            <Buscador setBuscador={setBuscador} />
          </div>
          {stateListaProd && (
            <ListaGenerica
              bottom="-250px"
              scroll="scroll"
              data={dataproductos}
              setState={() => SetstateListaProd(!stateListaProd)}
              funcion={selectproducts}
            />
          )}
        </div>
        <CardProductSelect
          text1={productosItemSelect.descripcion}
          text2={productosItemSelect.stock}
        />

        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section>
            <article>
              <InputText icono={<v.iconomarca />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.descripcion}
                  type="text"
                  placeholder=""
                  {...register("cantidad", {
                    required: true,
                  })}
                />
                <label className="form__label">Cantidad</label>
                {errors.cantidad?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.iconomarca />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.descripcion}
                  type="text"
                  placeholder=""
                  {...register("detalle", {
                    required: true,
                  })}
                />
                <label className="form__label">Motivo</label>
                {errors.detalle?.type === "required" && <p>Campo requerido</p>}
              </InputText>
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
    .contentBuscador {
      position: relative;
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
