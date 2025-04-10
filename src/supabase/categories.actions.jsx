import { supabase } from "./supabase.config";
import Swal from "sweetalert2";

export async function InsertCategory(p) {
  const { error } = await supabase.rpc("insertarcategorias", p);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
}

export async function ShowCategory(p) {
  const { data } = await supabase
    .from("categorias")
    .select()
    .eq("id_empresa", p.id_empresa)
    .order("id", { ascending: true });
  return data;
}

export async function DeleteCategory(p) {
  const { error } = await supabase.from("categorias").delete().eq("id", p.id);
  if (error) {
    alert("Error al eliminar", error.message);
  }
}

export async function UpdateCategory(p) {
  const { error } = await supabase.from("categorias").update(p).eq("id", p.id);
  if (error) {
    alert("Error al editar Categorias", error.message);
  }
}

export async function SearchCategory(p) {
  const { data } = await supabase
    .from("categorias")
    .select()
    .eq("id_empresa", p.id_empresa)
    .ilike("descripcion", "%" + p.descripcion + "%");
  return data;
}
