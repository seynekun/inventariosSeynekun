import { create } from "zustand";
import {
  DeleteKardex,
  InsertKardex,
  SearchKardex,
  ShowKardex,
} from "../supabase/kardex.actions";

export const useKardexStore = create((set, get) => ({
  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  dataKardex: [],
  kardexItemSelect: [],
  parametros: {},
  showKardex: async (p) => {
    const response = await ShowKardex(p);
    set({ parametros: p });
    set({ dataKardex: response });
    return response;
  },
  selectKardex: (p) => {
    set({ kardexItemSelect: p });
  },
  insertKardexs: async (p) => {
    await InsertKardex(p);
    const { showKardex } = get();
    const { parametros } = get();
    set(showKardex(parametros));
  },
  deleteKardex: async (p) => {
    await DeleteKardex(p);
    const { showKardex } = get();
    const { parametros } = get();
    set(showKardex(parametros));
  },
  // updateBrand: async (p) => {
  //   await UpdateBrand(p);
  //   const { showBrand } = get();
  //   const { parametros } = get();
  //   set(showBrand(parametros));
  // },
  searchKardex: async (p) => {
    const response = await SearchKardex(p);
    set({ dataKardex: response });
    return response;
  },
}));
