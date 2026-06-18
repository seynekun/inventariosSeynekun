import { useQuery } from "@tanstack/react-query";
import { ShowProducts } from "../supabase/products.actions";

export default function useProducts({
  company,
  searchproducts,
  buscadorProductos,
}) {
  const queryProductos = useQuery({
    queryKey: ["mostrar productos", company?.id],
    queryFn: () => ShowProducts({ _id_empresa: company?.id }),
    enabled: company?.id != null,
    refetchOnWindowFocus: false,
  });

  const querySearchProducts = useQuery({
    queryKey: [
      "buscar productos",
      { _id_empresa: company?.id, buscador: buscadorProductos },
    ],
    queryFn: () =>
      searchproducts({
        _id_empresa: company?.id,
        buscador: buscadorProductos,
      }),
    enabled: company?.id != null,
  });

  return {
    queryProductos,
    querySearchProducts,
  };
}
