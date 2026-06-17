import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "../store/companyStore";
import { SpinnerLoading } from "../components/molecules/SpinnerLoading";
import { ProductsTemplate } from "../components/templates/ProductsTemplate";
import { useBrandStore } from "../store/BrandStore";
import { useCategoryStore } from "../store/CategoryStore";
import { useUsersStore } from "../store/UsersStore";
import { AdblockPage } from "../components/molecules/AdblockPage";
import useProducts from "../hooks/useProducts";

export const Products = () => {
  const dataCompany = useCompanyStore((state) => state.dataCompany);
  const { queryProductos } = useProducts({
    company: dataCompany,
  });
  const dataPermisos = useUsersStore((state) => state.dataPermisos);
  const statePermiso = dataPermisos.some((element) =>
    element.modulos.nombre.includes("Productos"),
  );

  const showBrand = useBrandStore((state) => state.showBrand);
  const showCategory = useCategoryStore((state) => state.showCategory);

  const queryMarcas = useQuery({
    queryKey: ["mostrar marca", dataCompany?.id],
    queryFn: () => showBrand({ id_empresa: dataCompany?.id }),
    enabled: dataCompany?.id != null,
    refetchOnWindowFocus: false,
  });
  const queryCategorias = useQuery({
    queryKey: ["mostrar categorias", dataCompany?.id],
    queryFn: () => showCategory({ id_empresa: dataCompany?.id }),
    enabled: dataCompany?.id != null,
    refetchOnWindowFocus: false,
  });
  if (statePermiso == false) {
    return <AdblockPage state={statePermiso} />;
  }

  if (queryProductos.isLoading) {
    return <SpinnerLoading />;
  }
  if (queryProductos.error) {
    return <span>Error...</span>;
  }
  if (queryProductos.data)
    return (
      <ProductsTemplate
        queryProducts={queryProductos}
        queryCategorias={queryCategorias}
        queryMarcas={queryMarcas}
      />
    );
};
