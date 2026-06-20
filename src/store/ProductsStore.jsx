import { create } from "zustand";
import {
  DeleteProducts,
  InsertProducts,
  ReportInventarioValorado,
  ReportKardexEntradaSalida,
  ReportStockBajoMinimo,
  ReportStockProductsAll,
  ReportStockXProducto,
  SearchProducts,
  UpdateProducts,
} from "../supabase/products.actions";

export const useProductsStore = create((set) => ({
  dataProducts: [],
  productosItemSelect: [],
  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  setItemSelect: (p) => {
    set({ productosItemSelect: p });
  },

  selectproducts: (p) => {
    console.log(p);
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

  searchproducts: async (p) => {
    const response = await SearchProducts(p);
    set({ dataProducts: response });
    return response;
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
