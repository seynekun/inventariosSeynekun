import { useForm } from "react-hook-form";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import { InputText } from "./InputText";
import { Btnsave } from "../../molecules/BtnSave";
import { useCompanyStore } from "../../../store/companyStore";
import { useProductsStore } from "../../../store/ProductsStore";
import { useEffect, useState } from "react";
import { ListaGenerica } from "../../molecules/ListaGenerica";
import { Device } from "../../../styles/breackpoints";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BuscadorItem } from "../BuscadorItem";
import { CardProductResume } from "../../molecules/CardProductResume";
import { useResumeProductsStore } from "../../../store/useResumeProductsStore";
import { ShowProductById } from "../../../supabase/products.actions";

export function RegisterResumeProduct({ onClose, dataSelect, accion }) {
  const queryClient = useQueryClient();
  const [stateListaProd, SetstateListaProd] = useState(false);

  const setBuscador = useProductsStore((state) => state.setBuscador);
  const dataproductos = useProductsStore((state) => state.dataProducts);
  const selectproducts = useProductsStore((state) => state.selectproducts);
  const productosItemSelect = useProductsStore(
    (state) => state.productosItemSelect,
  );

  const { insertresumeproducts, updateresumeproducts } =
    useResumeProductsStore();
  const dataCompany = useCompanyStore((state) => state.dataCompany);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { data } = useQuery({
    queryKey: ["consultar producto", dataSelect?.id_producto],
    queryFn: () =>
      ShowProductById({
        _id_producto: dataSelect?.id_producto,
      }),
    enabled: dataSelect?.id_producto != null,
  });
  async function insertar(data) {
    if (accion === "Editar") {
      const p = {
        id: dataSelect.id,
        id_producto: productosItemSelect.id,
        especificaciones: data.especificaciones,
        modelo: data.modelo,
        serial: data.serial,
        partesprincipales: data.partesprincipales,
        funcion: data.funcion,
        id_empresa: dataCompany.id,
      };
      await updateresumeproducts(p);
      onClose();
    } else {
      const p = {
        _idproducto: productosItemSelect.id,
        _especificaciones: data.especificaciones,
        _modelo: data.modelo,
        _serial: data.serial,
        _partesprincipales: data.partesprincipales,
        _funcion: data.funcion,
        _idempresa: dataCompany.id,
      };
      await insertresumeproducts(p);
      onClose();
    }
    queryClient.invalidateQueries({
      queryKey: ["mostrar hojas de vida", dataCompany?.id],
    });
  }
  useEffect(() => {
    if (accion === "Editar") {
      selectproducts(data);
    }
  }, [accion, data, selectproducts]);
  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              {accion == "Editar"
                ? "Editar Datos Hoja de Vida"
                : "Registrar Hoja de Vida"}
            </h1>
          </section>
          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section className="seccion1">
            <article>
              <div className="contentBuscador">
                <div onClick={() => SetstateListaProd(!stateListaProd)}>
                  <BuscadorItem setBuscador={setBuscador} />
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
            </article>
            <article>
              <CardProductResume>
                <span style={{ fontWeight: "bold" }}>Producto</span>
                <p>
                  Nombre Equipo:
                  <span className="descripcion">
                    {" "}
                    {productosItemSelect?.descripcion}
                  </span>
                </p>

                <p>
                  Marca:
                  <span className="details"> {productosItemSelect?.marca}</span>
                </p>
                <p>
                  Fecha Compra:
                  <span className="details">
                    {" "}
                    {productosItemSelect?.fecha_compra}
                  </span>
                </p>
                <p>
                  Responsable:
                  <span className="details">
                    {" "}
                    {productosItemSelect?.responsable}
                  </span>
                </p>
                <p>
                  Ubicación:
                  <span className="details">
                    {" "}
                    {productosItemSelect?.ubicacion}
                  </span>
                </p>
                <p>
                  Código Inventario:
                  <span className="details">
                    {" "}
                    {productosItemSelect?.codigo}
                  </span>
                </p>
              </CardProductResume>
            </article>
            <article>
              <InputText icono={<v.icononombre />}>
                <textarea
                  className={`form__field `}
                  defaultValue={dataSelect?.especificaciones || ""}
                  placeholder=" "
                  {...register("especificaciones", {
                    required: true,
                  })}
                />
                <label className="form__label">Especificaciones Técnicas</label>

                {errors.especificaciones?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>
          </section>

          <section className="seccion2">
            <article>
              <InputText icono={<v.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.modelo}
                  type="text"
                  placeholder=""
                  {...register("modelo", {
                    required: true,
                  })}
                />
                <label className="form__label">Modelo</label>
                {errors.modelo?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.serial}
                  type="text"
                  placeholder=""
                  {...register("serial", {
                    required: true,
                  })}
                />
                <label className="form__label">Serial</label>
                {errors.serial?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.icononombre />}>
                <textarea
                  className={`form__field `}
                  defaultValue={dataSelect?.partesprincipales || ""}
                  placeholder=""
                  {...register("partesprincipales", {
                    required: true,
                  })}
                />
                <label className="form__label">
                  Partes Principales del Equipo
                </label>

                {errors.partesprincipales?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.icononombre />}>
                <textarea
                  className={`form__field `}
                  defaultValue={dataSelect?.funcion || ""}
                  placeholder=" "
                  {...register("funcion", {
                    required: true,
                  })}
                />
                <label className="form__label">Función del Equipo</label>

                {errors.funcion?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
          </section>
          <div className="btnguardarContent">
            <Btnsave
              icono={<v.iconoguardar />}
              titulo="Guardar"
              bgcolor="#ef552b"
            />
          </div>
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
    width: 100%;
    max-width: 90%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;
    height: 90vh;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 6px;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #484848;
      border-radius: 10px;
    }
    .contentBuscador {
      position: relative;
    }

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
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;
      @media ${Device.tablet} {
        grid-template-columns: repeat(2, 1fr);
      }
      section {
        gap: 20px;
        display: flex;
        flex-direction: column;
      }
      .btnguardarContent {
        display: flex;
        justify-content: end;
        grid-column: 1;
        @media ${Device.tablet} {
          grid-column: 2;
        }
      }
    }
    textarea.form__field {
      width: 100%;
      min-height: 100px;
      padding: 20px 10px 5px 10px;
      font-family: inherit;
      box-sizing: border-box;
      resize: vertical;
      line-height: 1.5;
    }
  }
`;
