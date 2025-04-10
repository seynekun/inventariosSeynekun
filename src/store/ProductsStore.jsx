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
  ShowProducts,
  UpdateProducts,
} from "../supabase/products.actions";

export const useProductsStore = create((set, get) => ({
  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  setItemSelect: (p) => {
    set({ productosItemSelect: p });
  },
  dataproductos: [],
  productosItemSelect: [],
  parametros: {},
  showproducts: async (p) => {
    const response = await ShowProducts(p);
    set({ parametros: p });
    set({ dataproductos: response });
    set({ productosItemSelect: [] });
    return response;
  },
  selectproducts: (p) => {
    set({ productosItemSelect: p });
  },
  insertproducts: async (p) => {
    await InsertProducts(p);
    const { showproducts } = get();
    const { parametros } = get();
    set(showproducts(parametros));
  },
  deleteproducts: async (p) => {
    await DeleteProducts(p);
    const { showproducts } = get();
    const { parametros } = get();
    set(showproducts(parametros));
  },
  updateproducts: async (p) => {
    await UpdateProducts(p);
    const { showproducts } = get();
    const { parametros } = get();
    set(showproducts(parametros));
  },
  searchproducts: async (p) => {
    const response = await SearchProducts(p);
    set({ dataproductos: response });
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
