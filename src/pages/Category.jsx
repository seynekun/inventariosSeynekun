import { useCompanyStore } from "../store/companyStore";
import { SpinnerLoading } from "../components/molecules/SpinnerLoading";
import { CategoryTemplate } from "../components/templates/CategoryTemplate";
import { useUsersStore } from "../store/UsersStore";
import { AdblockPage } from "../components/molecules/AdblockPage";
import useCategories from "../hooks/useCategories";

export const Category = () => {
  const dataCompany = useCompanyStore((state) => state.dataCompany);
  const { queryCategories } = useCategories({ company: dataCompany });

  const dataPermisos = useUsersStore((state) => state.dataPermisos);
  const statePermiso = dataPermisos.some((element) =>
    element.modulos.nombre.includes("Categoria de productos"),
  );

  if (statePermiso == false) {
    return <AdblockPage state={statePermiso} />;
  }
  if (queryCategories.isLoading) {
    return <SpinnerLoading />;
  }
  if (queryCategories.error) {
    return <span>Error...</span>;
  }
  if (queryCategories.data)
    return <CategoryTemplate queryCategories={queryCategories} />;
};
