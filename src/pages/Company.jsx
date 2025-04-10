import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "../store/companyStore";
import { EmpresaTemplate } from "../components/templates/CompanyTemplate";

export function Empresa() {
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
  return (
    <>
      <EmpresaTemplate />
    </>
  );
}
