import { supabase } from "./supabase.config";
import Swal from "sweetalert2";

export async function InsertBrand(p) {
  const { error } = await supabase.rpc("insertarmarca", p);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
}

export async function ShowBrand(p) {
  const { error, data } = await supabase
    .from("marca")
    .select()
    .eq("id_empresa", p.id_empresa)
    .order("id", { ascending: true });
  if (error) {
    throw new Error("A ocurrido un error al mostrar la empresa", error);
  }
  if (data) {
    return data;
  }
}

export async function DeleteBrand(p) {
  const { error } = await supabase.from("marca").delete().eq("id", p.id);
  if (error) {
    alert("Error al eliminar la marca", error);
  }
}

export async function UpdateBrand(p) {
  const { error } = await supabase.from("marca").update(p).eq("id", p.id);
  if (error) {
    alert("Error al actualizar la marca", error);
  }
}

export async function SearchBrand(p) {
  const { data } = await supabase
    .from("marca")
    .select()
    .eq("id_empresa", p.id_empresa)
    .ilike("descripcion", "%" + p.descripcion + "%");
  return data;
}
