import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "../store/companyStore";
import { SpinnerLoading } from "../components/molecules/SpinnerLoading";
import { useUsersStore } from "../store/UsersStore";
import { AdblockPage } from "../components/molecules/AdblockPage";
import { ReportsTemplate } from "../components/templates/ReportsTemplate";
import { useKardexStore } from "../store/KardexStore";

export const Reports = () => {
  const { showKardex } = useKardexStore();
  const dataPermisos = useUsersStore((state) => state.dataPermisos);
  const statePermiso = dataPermisos.some((element) =>
    element.modulos.nombre.includes("Marca de productos")
  );
  const dataCompany = useCompanyStore((state) => state.dataCompany);

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar kardex", { id_empresa: dataCompany?.id }],
    queryFn: () => showKardex({ id_empresa: dataCompany?.id }),
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

  return <ReportsTemplate />;
};
