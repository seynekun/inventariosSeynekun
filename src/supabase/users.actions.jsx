import Swal from "sweetalert2";
import { supabase } from "./supabase.config";
import { getIdAuthSupabase } from "./globalSupabase";

export const InsertUsers = async (p) => {
  const { data, error } = await supabase
    .from("usuarios")
    .insert(p)
    .select()
    .maybeSingle();
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "A ocurrido un error al insertar el usuario" + error.message,
    });
  }
  if (data) return data;
};

export const ShowUsers = async () => {
  const idAuthsupabase = await getIdAuthSupabase();
  const { error, data } = await supabase
    .from("usuarios")
    .select()
    .eq("idauth", idAuthsupabase)
    .maybeSingle();
  if (error) {
    throw new Error("A ocurrido un error al mostrar usuarios", error);
  }
  if (data) {
    return data;
  }
};

export const ShowUsersAll = async (p) => {
  const { error, data } = await supabase.rpc("mostrarpersonal", p);
  if (error) {
    throw new Error("A ocurrido un error al mostrar usuarios", error);
  }
  if (data) {
    return data;
  }
};

export async function DeleteUsers(p) {
  const { error } = await supabase.from("usuarios").delete().eq("id", p.id);
  if (error) {
    alert("Error al eliminar la usuarios", error);
  }
}

export async function UpdateUsers(p) {
  const { error } = await supabase.from("usuarios").update(p).eq("id", p.id);
  if (error) {
    alert("Error al actualizar la usuarios", error);
  }
}

export async function SearchUsers(p) {
  const { data } = await supabase.rpc("buscarpersonal", p);
  return data;
}

export const InsertAsignaciones = async (p) => {
  const { error } = await supabase.from("asignarempresa").insert(p);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "A ocurrido un error al insertar asignaciones" + error.message,
    });
  }
};

export const InsertPermisos = async (p) => {
  const { error } = await supabase.from("permisos").insert(p);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "A ocurrido un error al insertar permisos" + error.message,
    });
  }
};

export async function ShowPermisos(p) {
  const { error, data } = await supabase
    .from("permisos")
    .select(`id, id_usuario, idmodulo, modulos(nombre)`)
    .eq("id_usuario", p.id_usuario);

  if (error) {
    throw new Error("A ocurrido un error al mostrar la empresa", error);
  }
  if (data) {
    return data;
  }
}

export async function DeletePermisos(p) {
  const { error } = await supabase
    .from("permisos")
    .delete()
    .eq("id_usuario", p.id_usuario);
  if (error) {
    alert("Error al eliminar permisos", error);
  }
}

export async function ShowModulos() {
  const { data } = await supabase.from("modulos").select();
  return data;
}

export async function EditarTemaMonedaUser(p) {
  try {
    const { error } = await supabase.from("usuarios").update(p).eq("id", p.id);
    if (error) {
      alert("Error al editar usuarios", error);
    }
  } catch (error) {
    alert(error.error_description || error.message + "EditarTemaMonedaUser");
  }
}
