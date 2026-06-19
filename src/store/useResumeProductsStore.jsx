import { create } from "zustand";
import {
  DeleteHojasVida,
  InsertHojasVida,
  UpdateHojasVida,
} from "../supabase/resume-products.actions";

export const useResumeProductsStore = create((set) => ({
  dataResumeProducts: [],
  resumeProductosItemSelect: [],
  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  setItemSelect: (p) => {
    set({ resumeProductosItemSelect: p });
  },

  selectproducts: (p) => {
    set({ resumeProductosItemSelect: p });
  },
  insertresumeproducts: async (p) => {
    await InsertHojasVida(p);
  },
  deleteresumeproducts: async (p) => {
    await DeleteHojasVida(p);
  },
  updateresumeproducts: async (p) => {
    await UpdateHojasVida(p);
  },

  // searchproducts: async (p) => {
  //   const response = await SearchProducts(p);
  //   set({ dataResumeProducts: response });
  //   return response;
  // },
  // reportStoreProductosAll: async (p) => {
  //   const response = await ReportStockProductsAll(p);
  //   return response;
  // },
  // reportStockxProducto: async (p) => {
  //   const response = await ReportStockXProducto(p);
  //   return response;
  // },
  // reportBajoMinimo: async (p) => {
  //   const response = await ReportStockBajoMinimo(p);
  //   return response;
  // },
  // reportKardexEntradaSalida: async (p) => {
  //   const response = await ReportKardexEntradaSalida(p);
  //   return response;
  // },
  // reportInventarioValorado: async (p) => {
  //   const response = await ReportInventarioValorado(p);
  //   return response;
  // },
}));
