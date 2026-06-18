import { useQuery } from "@tanstack/react-query";
import { ShowKardex } from "../supabase/kardex.actions";

export default function useKardex({ company }) {
  const queryKardex = useQuery({
    queryKey: ["mostrar kardex", { id_empresa: company?.id }],
    queryFn: () => ShowKardex({ id_empresa: company?.id }),
    enabled: company?.id != null,
  });

  return {
    queryKardex,
  };
}
