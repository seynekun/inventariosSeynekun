import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "../store/companyStore";
import { SpinnerLoading } from "../components/molecules/SpinnerLoading";
import { CategoryTemplate } from "../components/templates/CategoryTemplate";
import { useCategoryStore } from "../store/CategoryStore";
import { useUsersStore } from "../store/UsersStore";
import { AdblockPage } from "../components/molecules/AdblockPage";

export const Category = () => {
  const { showCategory, dataCategories, searchCategory, buscador } =
    useCategoryStore();
  const dataPermisos = useUsersStore((state) => state.dataPermisos);
  const statePermiso = dataPermisos.some((element) =>
    element.modulos.nombre.includes("Categoria de productos")
  );

  const dataCompany = useCompanyStore((state) => state.dataCompany);
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar categoria", { id_empresa: dataCompany?.id }],
    queryFn: () => showCategory({ id_empresa: dataCompany?.id }),
    enabled: dataCompany?.id != null,
  });
  useQuery({
    queryKey: [
      "buscar categoria",
      { id_empresa: dataCompany.id, descripcion: buscador },
    ],
    queryFn: () =>
      searchCategory({ id_empresa: dataCompany.id, descripcion: buscador }),
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

  return <CategoryTemplate data={dataCategories} />;
};
