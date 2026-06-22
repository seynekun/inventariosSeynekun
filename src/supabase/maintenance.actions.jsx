import { supabase } from "./supabase.config";

export async function RegisterMaintenance(p) {
  const { data: mantto, error: errorMantto } = await supabase
    .from("maintenance")
    .insert(p)
    .select("id")
    .single();

  if (errorMantto) throw errorMantto;
  return mantto;
}
export async function RegisterFacturaMaintenance({
  facturaRows,
  maintenanceId,
}) {
  const filasConId = facturaRows.map((row) => ({
    id_mantenimiento: maintenanceId,
    nro: row.nro,
    valor_unitario: parseFloat(row.valorUnitario) || 0,
    proveedor: row.proveedor,
  }));

  const { error } = await supabase
    .from("facturamantenimiento")
    .insert(filasConId);

  if (error) throw error;
}

export async function DeleteMaintenance({ id }) {
  const { error } = await supabase.from("maintenance").delete().eq("id", id);

  if (error) throw error;
}

export async function DeleteFacturaRow({ id }) {
  const { error } = await supabase
    .from("facturamantenimiento")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function GetMaintenanceByHvida({ id_hvida }) {
  const { data, error } = await supabase
    .from("maintenance")
    .select(
      `
      id,
      fechaservicio,
      tipo,
      responsable,
      observaciones,
      total,
      facturamantenimiento (
        id,
        nro,
        valor_unitario,
        proveedor
      )
    `,
    )
    .eq("id_hvida", id_hvida)
    .order("fechaservicio", { ascending: false });

  if (error) throw error;
  return data;
}
