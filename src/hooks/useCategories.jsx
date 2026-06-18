import { useQuery } from "@tanstack/react-query";
import { ShowCategory } from "../supabase/categories.actions";

export default function useCategories({ company }) {
  const queryCategories = useQuery({
    queryKey: ["mostrar categoria", { id_empresa: company?.id }],
    queryFn: () => ShowCategory({ id_empresa: company?.id }),
    enabled: company?.id != null,
  });
  return {
    queryCategories,
  };
}
