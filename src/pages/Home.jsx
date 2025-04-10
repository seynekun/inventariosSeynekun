import { useQuery } from "@tanstack/react-query";
import { HomeTemplate } from "../components/templates/HomeTemplate";
import { useCompanyStore } from "../store/companyStore";
export const Home = () => {
  const countUsersCompany = useCompanyStore((state) => state.countUsersCompany);
  const dataCompany = useCompanyStore((state) => state.dataCompany);
  useQuery({
    queryKey: ["contar usuarios por empresa", { idempresa: dataCompany?.id }],
    queryFn: () =>
      countUsersCompany({
        id_empresa: dataCompany?.id,
      }),
    enabled: !!dataCompany,
  });
  return <HomeTemplate />;
};
