import { supabase } from "./supabase.config";
import Swal from "sweetalert2";

const tabla = "productos";
export async function InsertProducts(p) {
  const { data, error } = await supabase.rpc("insertarproductos", p);
  console.log("data de productos", data);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
}
export async function ShowProducts(p) {
  const { data } = await supabase.rpc("mostrarproductos", p);
  return data;
}

export async function DeleteProducts(p) {
  const { error } = await supabase.from("productos").delete().eq("id", p.id);
  if (error) {
    alert("Error al eliminar", error.message);
  }
}

export async function UpdateProducts(p) {
  const { error } = await supabase.from("productos").update(p).eq("id", p.id);
  if (error) {
    alert("Error al editar Productos", error.message);
  }
}

export async function SearchProducts(p) {
  const { data } = await supabase.rpc("buscarproductos", p);
  return data;
}

export async function ReportStockProductsAll(p) {
  const { data, error } = await supabase
    .from(tabla)
    .select()
    .eq("id_empresa", p.id_empresa);
  if (error) {
    return;
  }
  return data;
}

export async function ReportStockXProducto(p) {
  const { data, error } = await supabase
    .from(tabla)
    .select()
    .eq("id_empresa", p.id_empresa)
    .eq("id", p.id);
  if (error) {
    return;
  }
  return data;
}
export async function ReportStockBajoMinimo(p) {
  const { data, error } = await supabase.rpc("reportproductosbajominimo", p);
  if (error) {
    return;
  }
  return data;
}
export async function ReportKardexEntradaSalida(p) {
  const { data, error } = await supabase.rpc("mostrarkardexempresa", p);
  if (error) {
    return;
  }
  return data;
}
export async function ReportInventarioValorado(p) {
  const { data, error } = await supabase.rpc("inventariovalorado", p);

  if (error) {
    return;
  }
  return data;
}
