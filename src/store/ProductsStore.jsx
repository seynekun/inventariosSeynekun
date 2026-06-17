import { create } from "zustand";
import {
  DeleteProducts,
  InsertProducts,
  ReportInventarioValorado,
  ReportKardexEntradaSalida,
  ReportStockBajoMinimo,
  ReportStockProductsAll,
  ReportStockXProducto,
  UpdateProducts,
} from "../supabase/products.actions";

export const useProductsStore = create((set) => ({
  setItemSelect: (p) => {
    set({ productosItemSelect: p });
  },
  productosItemSelect: [],

  selectproducts: (p) => {
    set({ productosItemSelect: p });
  },
  insertproducts: async (p) => {
    await InsertProducts(p);
  },
  deleteproducts: async (p) => {
    await DeleteProducts(p);
  },
  updateproducts: async (p) => {
    await UpdateProducts(p);
  },

  reportStoreProductosAll: async (p) => {
    const response = await ReportStockProductsAll(p);
    return response;
  },
  reportStockxProducto: async (p) => {
    const response = await ReportStockXProducto(p);
    return response;
  },
  reportBajoMinimo: async (p) => {
    const response = await ReportStockBajoMinimo(p);
    return response;
  },
  reportKardexEntradaSalida: async (p) => {
    const response = await ReportKardexEntradaSalida(p);
    return response;
  },
  reportInventarioValorado: async (p) => {
    const response = await ReportInventarioValorado(p);
    return response;
  },
}));
