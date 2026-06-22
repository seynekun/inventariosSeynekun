import { supabase } from "./supabase.config";
import Swal from "sweetalert2";

const tabla = "hojasvidas";
export async function InsertHojasVida(p) {
  const { error } = await supabase.rpc("insertarhojavida", p);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
}
export async function ShowHojasVida(p) {
  const { data } = await supabase.rpc("mostrarhojasvida", p);
  return data;
}
export async function ShowHojaVidaById(p) {
  const { data } = await supabase.rpc("mostrarhojasvidaporid", p).single();
  return data;
}

export async function DeleteHojasVida(p) {
  const { error } = await supabase.from(tabla).delete().eq("id", p.id);
  if (error) {
    alert("Error al eliminar", error.message);
  }
}

export async function UpdateHojasVida(p) {
  const { error } = await supabase.from(tabla).update(p).eq("id", p.id);
  if (error) {
    alert("Error al editar hojas de vida", error.message);
  }
}

export async function SearchHojasVida(p) {
  const { data } = await supabase.rpc("buscarhojavida", p);
  return data;
}
