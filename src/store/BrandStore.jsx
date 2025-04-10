import { create } from "zustand";
import {
  DeleteBrand,
  InsertBrand,
  SearchBrand,
  ShowBrand,
  UpdateBrand,
} from "../supabase/brand.actions";

export const useBrandStore = create((set, get) => ({
  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  dataBrand: [],
  brandItemSelect: [],
  parametros: {},
  showBrand: async (p) => {
    const response = await ShowBrand(p);
    set({ parametros: p });
    set({ dataBrand: response });
    set({ brandItemSelect: response[0] });
    return response;
  },
  selectBrand: (p) => {
    set({ brandItemSelect: p });
  },
  insertBrands: async (p) => {
    await InsertBrand(p);
    const { showBrand } = get();
    const { parametros } = get();
    set(showBrand(parametros));
  },
  deleteBrand: async (p) => {
    await DeleteBrand(p);
    const { showBrand } = get();
    const { parametros } = get();
    set(showBrand(parametros));
  },
  updateBrand: async (p) => {
    await UpdateBrand(p);
    const { showBrand } = get();
    const { parametros } = get();
    set(showBrand(parametros));
  },
  searchBrand: async (p) => {
    const response = await SearchBrand(p);
    set({ dataBrand: response });
  },
}));
