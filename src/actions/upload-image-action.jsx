export const uploadImage = async (formData) => {
  formData.append(
    "upload_preset",
    import.meta.env.VITE_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );
  const res = await fetch(import.meta.env.VITE_PUBLIC_CLOUDINARY_UPLOAD_URL, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Error al subir la imagen a Cloudinary");
  }

  const data = await res.json();
  return data.secure_url;
};
