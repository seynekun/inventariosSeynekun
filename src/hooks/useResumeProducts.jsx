import { useQuery } from "@tanstack/react-query";
import { ShowHojasVida } from "../supabase/resume-products.actions";

export default function useResumeProducts({ company }) {
  const queryResumeProducts = useQuery({
    queryKey: ["mostrar hojas de vida", company?.id],
    queryFn: () => ShowHojasVida({ _id_empresa: company?.id }),
    enabled: company?.id != null,
    refetchOnWindowFocus: false,
  });

  return {
    queryResumeProducts,
  };
}
