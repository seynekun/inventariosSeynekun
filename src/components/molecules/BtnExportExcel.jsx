import { Btnsave } from "./BtnSave";
import * as XLSX from "xlsx";
import { useProductsStore } from "../../store/ProductsStore";
import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "../../store/companyStore";

export default function BtnExportExcel() {
  const dataCompany = useCompanyStore((state) => state.dataCompany);

  const showproducts = useProductsStore((state) => state.showproducts);

  const { isLoading, data } = useQuery({
    queryKey: ["mostrar productos", dataCompany?.id],
    queryFn: () =>
      showproducts({
        _id_empresa: dataCompany?.id,
      }),
    enabled: dataCompany?.id != null,
  });

  const handleDownload = () => {
    // FORMATEAR DATOS
    const datosFormateados = data.map((item, index) => ({
      N: index + 1,
      Código: item.codigo || "N/A",
      Descripción: item.descripcion || "",
      Marca: item.marca || "",
      Categoría: item.categoria || "",
      Ubicación: item.ubicacion || "",
      Responsable: item.responsable || "",
      Proveedor: item.proveedor || "",
      Stock: Number(item.stock) || 0,
      "Precio Compra": Number(item.preciocompra) || 0,
      "Fecha Compra": item.fecha_compra || "",
      "Meses Dep.": Number(item.meses_dep) || 0,
      "Vida Útil": Number(item.vidautil) || 0,
      Estado: item.estadoequipo || "Activo",
      Total: Number(item.preciocompra) * (Number(item.stock) || 0),
    }));

    // CREAR HOJA
    const hoja = XLSX.utils.json_to_sheet(datosFormateados);

    // ANCHO COLUMNAS
    hoja["!cols"] = [
      { wch: 8 },
      { wch: 18 },
      { wch: 40 },
      { wch: 20 },
      { wch: 20 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 10 },
      { wch: 18 },
      { wch: 15 },
      { wch: 12 },
      { wch: 12 },
      { wch: 15 },
    ];

    // CREAR LIBRO
    const libro = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(libro, hoja, "Inventario");

    // DESCARGAR
    XLSX.writeFile(libro, "InventarioProductos.xlsx");
  };

  return (
    <>
      {!isLoading && (
        <Btnsave bgcolor="#52de65" titulo="Excel" funcion={handleDownload} />
      )}
    </>
  );
}
