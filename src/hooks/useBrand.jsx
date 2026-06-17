import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "../store/companyStore";
import { ShowBrand } from "../supabase/brand.actions";

export default function useMarcas() {
  const dataCompany = useCompanyStore((state) => state.dataCompany);
  const queryMarcas = useQuery({
    queryKey: ["mostrar marca", { id_empresa: dataCompany?.id }],
    queryFn: () => ShowBrand({ id_empresa: dataCompany?.id }),
    enabled: dataCompany?.id != null,
    refetchOnWindowFocus: false,
  });
  return {
    queryMarcas,
  };
}
