import { useQuery } from "@tanstack/react-query";
import { BrandingTemplate } from "../components/templates/BrandringTemplate";
import { useBrandStore } from "../store/BrandStore";
import { useCompanyStore } from "../store/companyStore";
import { SpinnerLoading } from "../components/molecules/SpinnerLoading";
import { useUsersStore } from "../store/UsersStore";
import { AdblockPage } from "../components/molecules/AdblockPage";

export const Branding = () => {
  const { showBrand, dataBrand, searchBrand, buscador } = useBrandStore();
  const dataPermisos = useUsersStore((state) => state.dataPermisos);
  const statePermiso = dataPermisos.some((element) =>
    element.modulos.nombre.includes("Marca de productos")
  );
  const dataCompany = useCompanyStore((state) => state.dataCompany);
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar marca", { id_empresa: dataCompany?.id }],
    queryFn: () => showBrand({ id_empresa: dataCompany?.id }),
    enabled: dataCompany?.id != null,
  });

  useQuery({
    queryKey: [
      "buscar marca",
      { id_empresa: dataCompany.id, descripcion: buscador },
    ],
    queryFn: () =>
      searchBrand({ id_empresa: dataCompany.id, descripcion: buscador }),
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

  return <BrandingTemplate data={dataBrand} />;
};
