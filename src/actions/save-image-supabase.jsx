import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY
);

export const saveImageUrlToSupabase = async (imageUrl) => {
  const { data, error } = await supabase
    .from("imagenes")
    .insert([{ url: imageUrl }]);

  if (error) {
    throw new Error("Error al guardar en Supabase");
  }

  return data;
};
