import { useForm } from "react-hook-form";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import { InputText } from "./InputText";
import { Btnsave } from "../../molecules/BtnSave";
import { useCompanyStore } from "../../../store/companyStore";
import { ContainerSelector } from "../../atoms/ContainerSelector";
import { Selector } from "../Selector";
import { useEffect, useState } from "react";
import { ListaGenerica } from "../../molecules/ListaGenerica";
import { Device } from "../../../styles/breackpoints";
import { TipoDocData, TipouserData } from "../../../utils/dataEstatica";
import { ListaModulos } from "../ListaModulos";
import { useUsersStore } from "../../../store/UsersStore";
import { useQuery } from "@tanstack/react-query";
export function RegisterUsers({ onClose, dataSelect, accion }) {
  const showPermisosEdit = useUsersStore((state) => state.showPermisosEdit);
  const { isLoading } = useQuery({
    queryKey: ["mostrar permisos Edit", { id_usuario: dataSelect.id }],
    queryFn: () => showPermisosEdit({ id_usuario: dataSelect.id }),
    enabled: dataSelect.id != null,
  });
  const [tipodoc, setTipodoc] = useState({ icono: "", descripcion: "otros" });
  const [tipouser, setTipouser] = useState({
    icono: "",
    descripcion: "empleado",
  });
  const [stateTipoUser, setStateTipoUser] = useState(false);
  const [checkboxs, setCheckboxs] = useState([]);
  const [stateTipoDoc, setStateTipoDoc] = useState(false);
  const insertUser = useUsersStore((state) => state.insertUser);
  const updateUser = useUsersStore((state) => state.updateUser);
  const { dataCompany } = useCompanyStore();
  const [subaccion, setAccion] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function insertar(data) {
    if (accion === "Editar") {
      const p = {
        id: dataSelect.id,
        nombres: data.nombres,
        nro_doc: data.nrodoc,
        telefono: data.telefono,
        direccion: data.direccion,
        estado: "activo",
        tipouser: tipouser.descripcion,
        tipodoc: tipodoc.descripcion,
      };
      await updateUser(p, checkboxs, dataCompany.id);
      onClose();
    } else {
      const p = {
        nombres: data.nombres,
        correo: data.correo,
        nrodoc: data.nrodoc,
        telefono: data.telefono,
        direccion: data.direccion,
        estado: "activo",
        tipouser: tipouser.descripcion,
        tipodoc: tipodoc.descripcion,
        id_empresa: dataCompany.id,
      };
      const parametrosAuth = {
        correo: data.correo,
        pass: data.pass,
      };
      await insertUser(parametrosAuth, p, checkboxs);
      onClose();
    }
  }
  useEffect(() => {
    if (accion === "Editar") {
      setTipodoc({ icono: "", descripcion: dataSelect.tipodoc });
      setTipouser({
        icono: "",
        descripcion: dataSelect.tipouser,
      });
    }
  }, []);

  if (isLoading) {
    return <span>Cargando..</span>;
  }

  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              {accion == "Editar"
                ? "Editar Usuarios"
                : "Registrar nuevo Usuario"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section className="seccion1">
            {accion != "Editar" ? (
              <article>
                <InputText icono={<v.icononombre />}>
                  <input
                    defaultValue={dataSelect.correo}
                    type="text"
                    className={
                      accion === "Editar"
                        ? "form__field disabled"
                        : "form__field"
                    }
                    placeholder=""
                    {...register("correo", {
                      required: true,
                    })}
                  />
                  <label className="form__label">correo</label>
                  {errors.correo?.type === "required" && <p>Campo requerido</p>}
                </InputText>
              </article>
            ) : (
              <span className="form__field disabled">{dataSelect.correo}</span>
            )}

            {accion != "Editar" ? (
              <article>
                <InputText icono={<v.iconopass />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.pass}
                    type="text"
                    placeholder=""
                    {...register("pass", {
                      required: true,
                      minLength: 6,
                    })}
                  />
                  <label className="form__label">pass</label>

                  {errors.pass?.type === "required" && <p>Campo requerido</p>}
                  {errors.pass?.type === "minLength" && (
                    <p>La contraseña debe tener 6 caracteres</p>
                  )}
                </InputText>
              </article>
            ) : null}
            <article>
              <InputText icono={<v.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.nombres}
                  type="text"
                  placeholder=""
                  {...register("nombres", {
                    required: true,
                  })}
                />
                <label className="form__label">Nombres</label>

                {errors.nombres?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <ContainerSelector>
              <label>Tipo doc: </label>
              <Selector
                state={stateTipoDoc}
                color="#fc6027"
                texto1="🎴"
                texto2={tipodoc.descripcion}
                funcion={() => setStateTipoDoc(!stateTipoDoc)}
              />
              {stateTipoDoc && (
                <ListaGenerica
                  bottom="-260px"
                  scroll="scroll"
                  setState={() => setStateTipoDoc(!stateTipoDoc)}
                  data={TipoDocData}
                  funcion={(p) => setTipodoc(p)}
                />
              )}

              {subaccion}
            </ContainerSelector>
            <article>
              <InputText icono={<v.iconostock />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.nro_doc}
                  type="number"
                  placeholder=""
                  {...register("nrodoc", {
                    required: true,
                  })}
                />
                <label className="form__label">Nro. doc</label>

                {errors.nrodoc?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.iconostockminimo />}>
                <input
                  step="0.01"
                  className="form__field"
                  defaultValue={dataSelect.telefono}
                  type="text"
                  placeholder=""
                  {...register("telefono", {
                    required: true,
                  })}
                />
                <label className="form__label">Telefono</label>

                {errors.telefono?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.iconocodigobarras />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.direccion}
                  type="text"
                  placeholder=""
                  {...register("direccion", {
                    required: true,
                  })}
                />
                <label className="form__label">Direccion</label>

                {errors.direccion?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>
          </section>
          <section className="seccion2">
            <ContainerSelector>
              <label>Tipo: </label>
              <Selector
                state={stateTipoUser}
                color="#fc6027"
                texto1="👷‍♂️"
                texto2={tipouser.descripcion}
                funcion={() => setStateTipoUser(!stateTipoUser)}
              />

              {stateTipoUser && (
                <ListaGenerica
                  bottom="-150px"
                  scroll="scroll"
                  setState={() => setStateTipoUser(!stateTipoUser)}
                  data={TipouserData}
                  funcion={(p) => setTipouser(p)}
                />
              )}
            </ContainerSelector>
            PERMISOS:🔑
            <ListaModulos
              accion={accion}
              checkboxs={checkboxs}
              setCheckboxs={setCheckboxs}
            />
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
  .form__field {
    font-family: inherit;
    width: 100%;
    border: none;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 17px;
    color: ${(props) => props.theme.text};
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
    &.disabled {
      color: #696969;
      background: #2d2d2d;
      border-radius: 8px;
      margin-top: 8px;
      border-bottom: 1px dashed #656565;
    }
  }
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
