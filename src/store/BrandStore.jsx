import { create } from "zustand";
import {
  DeleteBrand,
  InsertBrand,
  UpdateBrand,
} from "../supabase/brand.actions";

export const useBrandStore = create((set, get) => ({
  brandItemSelect: [],

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
}));
