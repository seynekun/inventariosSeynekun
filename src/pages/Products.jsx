import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "../store/companyStore";
import { SpinnerLoading } from "../components/molecules/SpinnerLoading";
import { ProductsTemplate } from "../components/templates/ProductsTemplate";
import { useProductsStore } from "../store/ProductsStore";
import { useBrandStore } from "../store/BrandStore";
import { useCategoryStore } from "../store/CategoryStore";
import { useUsersStore } from "../store/UsersStore";
import { AdblockPage } from "../components/molecules/AdblockPage";

export const Products = () => {
  const dataPermisos = useUsersStore((state) => state.dataPermisos);
  const statePermiso = dataPermisos.some((element) =>
    element.modulos.nombre.includes("Productos")
  );

  const { showproducts, dataproductos, searchproducts, buscador } =
    useProductsStore();
  const dataCompany = useCompanyStore((state) => state.dataCompany);
  const showBrand = useBrandStore((state) => state.showBrand);
  const showCategory = useCategoryStore((state) => state.showCategory);

  const { isLoading, error, data } = useQuery({
    queryKey: ["mostrar productos", dataCompany?.id],
    queryFn: () => showproducts({ _id_empresa: dataCompany?.id }),
    enabled: dataCompany?.id != null,
  });

  useQuery({
    queryKey: [
      "buscar productos",
      { _id_empresa: dataCompany?.id, buscador: buscador },
    ],
    queryFn: () =>
      searchproducts({
        _id_empresa: dataCompany?.id,
        buscador: buscador,
      }),
    enabled: dataCompany?.id != null,
  });
  useQuery({
    queryKey: ["mostrar marca", dataCompany?.id],
    queryFn: () => showBrand({ id_empresa: dataCompany?.id }),
    enabled: dataCompany?.id != null,
  });
  useQuery({
    queryKey: ["mostrar categorias", dataCompany?.id],
    queryFn: () => showCategory({ id_empresa: dataCompany?.id }),
    enabled: dataCompany?.id != null,
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
  if (data) return <ProductsTemplate data={dataproductos} />;
};
