import { create } from "zustand";
import {
  DeleteBrand,
  InsertBrand,
  UpdateBrand,
} from "../supabase/brand.actions";

export const useBrandStore = create((set) => ({
  brandItemSelect: [],

  selectBrand: (p) => {
    set({ brandItemSelect: p });
  },
  insertBrands: async (p) => {
    await InsertBrand(p);
  },
  deleteBrand: async (p) => {
    await DeleteBrand(p);
  },
  updateBrand: async (p) => {
    await UpdateBrand(p);
  },
}));
