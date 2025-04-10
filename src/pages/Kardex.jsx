import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "../store/companyStore";
import { SpinnerLoading } from "../components/molecules/SpinnerLoading";
import { useUsersStore } from "../store/UsersStore";
import { AdblockPage } from "../components/molecules/AdblockPage";
import { KardexTemplate } from "../components/templates/KardexTemplate";
import { useKardexStore } from "../store/KardexStore";
import { useProductsStore } from "../store/ProductsStore";

export const Kardex = () => {
  const { showKardex, dataKardex, searchKardex, buscador } = useKardexStore();
  const searchproducts = useProductsStore((state) => state.searchproducts);
  const buscadorProductos = useProductsStore((state) => state.buscador);
  const dataPermisos = useUsersStore((state) => state.dataPermisos);
  const statePermiso = dataPermisos.some((element) =>
    element.modulos.nombre.includes("Kardex")
  );
  const dataCompany = useCompanyStore((state) => state.dataCompany);
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar kardex", { id_empresa: dataCompany?.id }],
    queryFn: () => showKardex({ id_empresa: dataCompany?.id }),
    enabled: dataCompany?.id != null,
  });
  useQuery({
    queryKey: [
      "buscar productos",
      { _id_empresa: dataCompany?.id, buscador: buscadorProductos },
    ],
    queryFn: () =>
      searchproducts({
        _id_empresa: dataCompany?.id,
        buscador: buscadorProductos,
      }),
    enabled: dataCompany?.id != null,
  });

  useQuery({
    queryKey: [
      "buscar kardex",
      { id_empresa: dataCompany.id, buscador: buscador },
    ],
    queryFn: () =>
      searchKardex({ id_empresa: dataCompany.id, buscador: buscador }),
    enabled: dataCompany.id != null,
  });
  if (statePermiso == false) {
    return <AdblockPage state={statePermiso} />;
  }
  if (isLoading) {
    return <SpinnerLoading />;
  }
  if (error) {
    return <span>Error...</span>;
  }

  return <KardexTemplate data={dataKardex} />;
};
