// import Swal from "sweetalert2";
import { supabase } from "./supabase.config";

export const ShowCompany = async (p) => {
  const { error, data } = await supabase
    .from("asignarempresa")
    .select(`empresa(id,nombre,simbolomoneda)`)
    .eq("id_usuario", p.idusaurio)
    .maybeSingle();
  if (error) {
    throw new Error("A ocurrido un error al mostrar la empresa", error);
  }
  if (data) {
    return data;
  }
};

export const CountUserEmpresa = async (p) => {
  const { data, error } = await supabase.rpc("contar_usuarios_por_empresa", {
    _id_empresa: p.id_empresa,
  });
  if (error) {
    throw new Error("Ocurrio un error al obtneer los usuarios");
  }
  if (data) {
    return data;
  }
};
