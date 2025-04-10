import { supabase } from "./supabase.config";
import Swal from "sweetalert2";

export async function InsertKardex(p) {
  const { error } = await supabase.from("kardex").insert(p);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
}

export async function ShowKardex(p) {
  const { data } = await supabase
    .rpc("mostrarkardeandempresa", {
      _id_empresa: p.id_empresa,
    })
    .order("id", { ascending: false });
  return data;
}

export async function DeleteKardex(p) {
  const { error } = await supabase.from("kardex").delete().eq("id", p.id);
  if (error) {
    alert("Error al eliminar la marca", error);
  }
}

export async function UpdateKardex(p) {
  const { error } = await supabase.from("kardex").update(p).eq("id", p.id);
  if (error) {
    alert("Error al actualizar la marca", error);
  }
}

export async function SearchKardex(p) {
  const { data } = await supabase
    .rpc("buscarkardexempresa", {
      _id_empresa: p.id_empresa,
      buscador: p.buscador,
    })
    .order("id", { ascending: false });
  return data;
}
