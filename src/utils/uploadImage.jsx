import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { supabase } from "../supabase/supabase.config";

export default function UploadAndInsertProduct() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Datos de producto simulados
  const productoData = {
    descripcion: "Zapato casual",
    idmarca: 1,
    stock: 10,
    preciocompra: 45.5,
    ubicacion: "Estante 3",
    fecha_compra: "2025-04-10",
    proveedor: "Proveedor ABC",
    meses_dep: 12,
    id_categoria: 2,
    id_empresa: 1,
    responsable: "Juan Pérez",
  };

  const onDrop = useCallback(async (files) => {
    const file = files[0];
    if (!file) return;
    setLoading(true);

    try {
      // 1. Subir imagen a Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );

      const cloudinaryRes = await fetch(
        import.meta.env.VITE_PUBLIC_CLOUDINARY_UPLOAD_URL,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await cloudinaryRes.json();
      const imageUrl = data.secure_url;
      setImageUrl(imageUrl);

      const { error } = await supabase.rpc("insertarproductos", {
        ...productoData,
        imagen: imageUrl,
      });

      if (error) {
        console.error("Error insertando producto:", error.message);
        return;
      }

      console.log("Producto insertado con imagen");
    } catch (err) {
      console.error("Error general:", err);
    } finally {
      // 3. Limpiar estado
      setLoading(false);
      setImageUrl(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop,
    maxFiles: 1,
  });

  return (
    <div className="space-y-5">
      <div
        {...getRootProps({
          className: "border-2 border-dashed p-10 text-center cursor-pointer",
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Suelta la imagen aquí...</p>
        ) : (
          <p>Arrastra y suelta una imagen, o haz clic para seleccionarla</p>
        )}
      </div>

      {loading && <p>Subiendo imagen e insertando producto...</p>}

      {imageUrl && (
        <div>
          <p className="font-bold">Vista previa de la imagen:</p>
          <div className="w-[300px] h-[420px] relative">
            <Image
              src={imageUrl}
              alt="Subida"
              fill
              className="object-cover rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}
