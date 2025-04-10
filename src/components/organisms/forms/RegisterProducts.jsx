import { useForm } from "react-hook-form";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import { InputText } from "./InputText";
import { Btnsave } from "../../molecules/BtnSave";
import { useCompanyStore } from "../../../store/companyStore";
import { useProductsStore } from "../../../store/ProductsStore";
import { ContainerSelector } from "../../atoms/ContainerSelector";
import { Selector } from "../Selector";
import { useBrandStore } from "../../../store/BrandStore";
import { useEffect, useState } from "react";
import { BtnFilter } from "../../molecules/BtnFilter";
import { RegisterBrand } from "./RegisterBrand";
import { RegisterCategory } from "./RegisterCategory";
import { ListaGenerica } from "../../molecules/ListaGenerica";
import { useCategoryStore } from "../../../store/CategoryStore";
import { Device } from "../../../styles/breackpoints";
export function RegisterProducts({ onClose, dataSelect, accion }) {
  const { insertproducts, updateproducts } = useProductsStore();
  const { dataCompany } = useCompanyStore();
  const brandItemSelect = useBrandStore((state) => state.brandItemSelect);
  const selectBrand = useBrandStore((state) => state.selectBrand);
  const { dataCategories, selectCategory, categoryItemSelect } =
    useCategoryStore();
  const { dataBrand } = useBrandStore();

  const [stateBrand, setStateBrand] = useState(false);
  const [openRegistroMarca, SetopenRegistroMarca] = useState(false);
  const [openRegistroCategoria, SetopenRegistroCategoria] = useState(false);
  const [stateCategoria, setStateCategoria] = useState(false);
  const [subaccion, setAccion] = useState("");
  const nuevoRegistroMarca = () => {
    SetopenRegistroMarca(!openRegistroMarca);
    setAccion("Nuevo");
  };
  const nuevoRegistroCategoria = () => {
    SetopenRegistroCategoria(!openRegistroCategoria);
    setAccion("Nuevo");
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function insertar(data) {
    if (accion === "Editar") {
      const p = {
        id: dataSelect.id,
        descripcion: data.descripcion,
        idmarca: brandItemSelect.id,
        stock: parseFloat(data.stock),
        preciocompra: parseFloat(data.preciocompra),
        ubicacion: data.ubicacion,
        fecha_compra: data.fecha_compra,
        proveedor: data.proveedor,
        meses_dep: data.meses_dep,
        id_categoria: categoryItemSelect.id,
        id_empresa: dataCompany.id,
      };
      await updateproducts(p);
      onClose();
    } else {
      const p = {
        _descripcion: data.descripcion,
        _idmarca: brandItemSelect.id,
        _stock: parseFloat(data.stock),
        _preciocompra: parseFloat(data.preciocompra),
        _ubicacion: data.ubicacion,
        _fecha_compra: data.fecha_compra,
        _proveedor: data.proveedor,
        _meses_dep: data.meses_dep,
        _id_categoria: categoryItemSelect.id,
        _id_empresa: dataCompany.id,
      };
      await insertproducts(p);
      onClose();
    }
  }
  useEffect(() => {
    if (accion === "Editar") {
      selectBrand({ id: dataSelect.idmarca, descripcion: dataSelect.marca });
      selectCategory({
        id: dataSelect.id_categoria,
        descripcion: dataSelect.categoria,
      });
    }
  }, []);
  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              {accion == "Editar"
                ? "Editar Producto"
                : "Registrar nuevo Producto"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section className="seccion1">
            <article>
              <InputText icono={<v.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.descripcion}
                  type="text"
                  placeholder=""
                  {...register("descripcion", {
                    required: true,
                  })}
                />
                <label className="form__label">descripcion</label>
                {errors.descripcion?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>
            <ContainerSelector>
              <label>Marca: </label>
              <Selector
                funcion={() => setStateBrand(!stateBrand)}
                state={stateBrand}
                color="#fc6027"
                texto1="🍿"
                texto2={brandItemSelect?.descripcion}
              />
              {stateBrand && (
                <ListaGenerica
                  setState={() => setStateBrand(!stateBrand)}
                  bottom="-260px"
                  scroll="scroll"
                  data={dataBrand}
                  funcion={selectBrand}
                />
              )}
              <BtnFilter
                bgcolor="#f6f3f3"
                funcion={nuevoRegistroMarca}
                textcolor="#353535"
                icono={<v.agregar />}
              />
            </ContainerSelector>
            <article>
              <InputText icono={<v.iconostock />}>
                <input
                  className="form__field"
                  type="number"
                  step="0.01"
                  placeholder=""
                  defaultValue={dataSelect.stock}
                  {...register("stock", {
                    required: true,
                  })}
                />
                <label className="form__label">Stock</label>
              </InputText>
            </article>

            <ContainerSelector>
              <label>Categoria: </label>
              <Selector
                funcion={() => setStateCategoria(!stateCategoria)}
                state={stateCategoria}
                color="#fc6027"
                texto1="🍿"
                texto2={categoryItemSelect?.descripcion}
              />
              <BtnFilter
                bgcolor="#f6f3f3"
                funcion={nuevoRegistroCategoria}
                textcolor="#353535"
                icono={<v.agregar />}
              />
              {stateCategoria && (
                <ListaGenerica
                  setState={() => setStateCategoria(!stateCategoria)}
                  bottom="-260px"
                  scroll="scroll"
                  data={dataCategories}
                  funcion={selectCategory}
                />
              )}
            </ContainerSelector>
            <article>
              <InputText icono={<v.iconopreciocompra />}>
                <input
                  step="0.01"
                  className="form__field"
                  defaultValue={dataSelect.preciocompra}
                  type="number"
                  placeholder=""
                  {...register("preciocompra", {
                    required: true,
                  })}
                />
                <label className="form__label">Precio de compra</label>

                {errors.preciocompra?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>
          </section>
          <section className="seccion2">
            <article>
              <InputText icono={<v.iconopreciocompra />}>
                <input
                  step="0.01"
                  className="form__field"
                  defaultValue={dataSelect.ubicacion}
                  type="text"
                  placeholder=""
                  {...register("ubicacion", {
                    required: true,
                  })}
                />
                <label className="form__label">Ubicación</label>

                {errors.ubicacion?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.iconopreciocompra />}>
                <input
                  step="0.01"
                  className="form__field"
                  defaultValue={dataSelect.fecha_compra}
                  type="text"
                  placeholder=""
                  {...register("fecha_compra", {
                    required: true,
                  })}
                />
                <label className="form__label">Fecha compra</label>

                {errors.fecha_compra?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.iconoprecioventa />}>
                <input
                  step="0.01"
                  className="form__field"
                  defaultValue={dataSelect.proveedor}
                  type="text"
                  placeholder=""
                  {...register("proveedor", {
                    required: true,
                  })}
                />
                <label className="form__label">Proveedor</label>

                {errors.proveedor?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.iconoprecioventa />}>
                <input
                  step="0.01"
                  name="meses_dep"
                  className="form__field"
                  defaultValue={dataSelect.meses_dep}
                  type="text"
                  placeholder=""
                  {...register("meses_dep", {
                    required: true,
                  })}
                />
                <label className="form__label">Meses de venta</label>

                {errors.meses_dep?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.iconoprecioventa />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.responsable}
                  type="text"
                  placeholder=""
                  {...register("responsable", {
                    required: true,
                  })}
                />
                <label className="form__label">Responsable</label>

                {errors.responsable?.type === "required" && (
                  <p>Campo requerido</p>
                )}
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
        {openRegistroMarca && (
          <RegisterBrand
            accion={subaccion}
            onClose={() => SetopenRegistroMarca(!openRegistroMarca)}
            dataSelect={dataSelect}
          />
        )}
        {openRegistroCategoria && (
          <RegisterCategory
            accion={subaccion}
            onClose={() => SetopenRegistroCategoria(!openRegistroCategoria)}
            dataSelect={dataSelect}
          />
        )}
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
  }
`;
