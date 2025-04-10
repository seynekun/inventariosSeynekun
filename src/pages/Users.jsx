import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "../store/companyStore";
import { SpinnerLoading } from "../components/molecules/SpinnerLoading";
import { UsersTemplate } from "../components/templates/UsersTemplate";
import { useUsersStore } from "../store/UsersStore";
import { AdblockPage } from "../components/molecules/AdblockPage";

export const Users = () => {
  const dataPermisos = useUsersStore((state) => state.dataPermisos);
  const statePermiso = dataPermisos.some((element) =>
    element.modulos.nombre.includes("Personal")
  );
  const showUsersAll = useUsersStore((state) => state.showUsersAll);
  const dataUsers = useUsersStore((state) => state.dataUsers);
  const buscador = useUsersStore((state) => state.buscador);
  const searchUser = useUsersStore((state) => state.searchUser);
  const showModulos = useUsersStore((state) => state.showModulos);
  const dataCompany = useCompanyStore((state) => state.dataCompany);
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar usuarios todos", dataCompany?.id],
    queryFn: () => showUsersAll({ _id_empresa: dataCompany?.id }),
    enabled: !!dataCompany,
  });

  useQuery({
    queryKey: [
      "buscar usuarios",
      { _id_empresa: dataCompany?.id, buscador: buscador },
    ],
    queryFn: () =>
      searchUser({ _id_empresa: dataCompany.id, buscador: buscador }),
    enabled: !!dataCompany,
  });

  useQuery({
    queryKey: ["mostrar modulos"],
    queryFn: showModulos,
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

  return <UsersTemplate data={dataUsers} />;
};
