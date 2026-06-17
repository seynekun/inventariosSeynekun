import { useQuery } from "@tanstack/react-query";
import { ShowProducts } from "../supabase/products.actions";

export default function useProducts({ company }) {
  const queryProductos = useQuery({
    queryKey: ["mostrar productos", company?.id],
    queryFn: () => ShowProducts({ _id_empresa: company?.id }),
    enabled: company?.id != null,
    refetchOnWindowFocus: false,
  });

  return {
    queryProductos,
  };
}
