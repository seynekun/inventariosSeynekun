import { BrandingTemplate } from "../components/templates/BrandringTemplate";
import { SpinnerLoading } from "../components/molecules/SpinnerLoading";
import { useUsersStore } from "../store/UsersStore";
import { AdblockPage } from "../components/molecules/AdblockPage";
import useMarcas from "../hooks/useBrand";

export const Branding = () => {
  const { queryMarcas } = useMarcas();
  const dataPermisos = useUsersStore((state) => state.dataPermisos);
  const statePermiso = dataPermisos.some((element) =>
    element.modulos.nombre.includes("Marca de productos"),
  );

  if (statePermiso == false) {
    return <AdblockPage state={statePermiso} />;
  }
  if (queryMarcas.isLoading) {
    return <SpinnerLoading />;
  }
  if (queryMarcas.error) {
    return <span>Error...</span>;
  }
  if (queryMarcas.data)
    return <BrandingTemplate queryMarcas={queryMarcas || []} />;
};
