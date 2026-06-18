import { useCompanyStore } from "../store/companyStore";
import { SpinnerLoading } from "../components/molecules/SpinnerLoading";
import { useUsersStore } from "../store/UsersStore";
import { AdblockPage } from "../components/molecules/AdblockPage";
import { KardexTemplate } from "../components/templates/KardexTemplate";
import { useProductsStore } from "../store/ProductsStore";
import useKardex from "../hooks/useKardex";
import useProducts from "../hooks/useProducts";

export const Kardex = () => {
  const dataCompany = useCompanyStore((state) => state.dataCompany);
  const { queryKardex } = useKardex({ company: dataCompany });
  const buscadorProductos = useProductsStore((state) => state.buscador);
  const { searchproducts } = useProductsStore();
  useProducts({
    company: dataCompany,
    buscadorProductos: buscadorProductos,
    searchproducts: searchproducts,
  });

  const dataPermisos = useUsersStore((state) => state.dataPermisos);
  const statePermiso = dataPermisos.some((element) =>
    element.modulos.nombre.includes("Kardex"),
  );

  if (statePermiso == false) {
    return <AdblockPage state={statePermiso} />;
  }
  if (queryKardex.isLoading) {
    return <SpinnerLoading />;
  }
  if (queryKardex.error) {
    return <span>Error...</span>;
  }
  if (queryKardex.data) return <KardexTemplate queryKardex={queryKardex} />;
};
