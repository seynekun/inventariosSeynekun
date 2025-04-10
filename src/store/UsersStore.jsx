import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";
import {
  DeletePermisos,
  DeleteUsers,
  EditarTemaMonedaUser,
  InsertAsignaciones,
  InsertPermisos,
  InsertUsers,
  SearchUsers,
  ShowModulos,
  ShowPermisos,
  ShowUsers,
  ShowUsersAll,
  UpdateUsers,
} from "../supabase/users.actions";
import { DataModulosConfiguracion } from "../utils/dataEstatica";

export const useUsersStore = create((set, get) => ({
  dataModulos: [],
  dataUsuario: [],
  insertUserAdmin: async (p) => {
    const { data, error } = await supabase.auth.signUp({
      email: p.correo,
      password: p.pass,
    });
    if (error) return;
    const datauser = await InsertUsers({
      idauth: data.user.id,
      fecharegistro: new Date(),
      tipouser: "superadmin",
    });
    return datauser;
  },
  idUsuario: 0,
  showUsers: async () => {
    const response = await ShowUsers();
    if (response) {
      set({ idUsuario: response.id, dataUsuario: response });
      return response;
    } else {
      return [];
    }
  },

  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  dataUsers: [],
  usersItemSelect: [],
  parametros: {},
  showUsersAll: async (p) => {
    const response = await ShowUsersAll(p);
    set({ parametros: p });
    set({ dataUsers: response });
    set({ usersItemSelect: response[0] });
    return response;
  },
  selectUser: (p) => {
    set({ usersItemSelect: p });
  },
  insertUser: async (parametrosAuth, p, datacheckpermisos) => {
    const { data, error } = await supabase.auth.signUp({
      email: parametrosAuth.correo,
      password: parametrosAuth.pass,
    });
    if (error) {
      return null;
    }
    const dataUserNew = await InsertUsers({
      nombres: p.nombres,
      nro_doc: p.nrodoc,
      telefono: p.telefono,
      direccion: p.direccion,
      fecharegistro: new Date(),
      estado: "activo",
      idauth: data.user.id,
      tipouser: p.tipouser,
      tipodoc: p.tipodoc,
      correo: p.correo,
    });
    await InsertAsignaciones({
      id_empresa: p.id_empresa,
      id_usuario: dataUserNew.id,
    });
    datacheckpermisos.forEach(async (item) => {
      if (item.check) {
        let parametrosPermisos = {
          id_usuario: dataUserNew.id,
          idmodulo: item.id,
        };
        await InsertPermisos(parametrosPermisos);
      }
    });

    await supabase.auth.signOut();
  },
  deleteUser: async (p) => {
    await DeleteUsers(p);
    const { showUsers } = get();
    const { parametros } = get();
    set(showUsers(parametros));
  },
  updateUser: async (p, datacheckpermisos, idempresa) => {
    await UpdateUsers(p);

    await DeletePermisos({
      id_usuario: p.id,
    });
    datacheckpermisos.forEach(async (item) => {
      if (item.check) {
        let parametrosPermisos = {
          id_usuario: p.id,
          idmodulo: item.id,
        };
        await InsertPermisos(parametrosPermisos);
      }
    });

    const { showUsersAll } = get();
    set(
      showUsersAll({
        _id_empresa: idempresa,
      })
    );
  },
  searchUser: async (p) => {
    const response = await SearchUsers(p);
    set({ dataUsers: response });
    return response;
  },
  showModulos: async () => {
    const response = await ShowModulos();
    set({ dataModulos: response });
    return response;
  },
  dataPermisos: [],
  dataPermisosEdit: [],
  showPermisos: async (p) => {
    const response = await ShowPermisos(p);
    set({ dataPermisos: response });
    let allDocs = [];
    DataModulosConfiguracion.map((element) => {
      const statePermiso = response.some((objeto) =>
        objeto.modulos.nombre.includes(element.title)
      );
      if (statePermiso) {
        allDocs.push({ ...element, state: true });
      } else {
        allDocs.push({ ...element, state: false });
      }
    });
    DataModulosConfiguracion.splice(0, DataModulosConfiguracion.length);
    DataModulosConfiguracion.push(...allDocs);

    return response;
  },
  showPermisosEdit: async (p) => {
    const response = await ShowPermisos(p);
    set({ dataPermisosEdit: response });
    return response;
  },

  editartemamonedauser: async (p) => {
    await EditarTemaMonedaUser(p);
    const { showUsers } = get();
    set(showUsers);
  },
}));
