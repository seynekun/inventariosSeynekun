import { AdblockPage } from "../components/molecules/AdblockPage";
import { useCompanyStore } from "../store/companyStore";
import { useUsersStore } from "../store/UsersStore";
import useProducts from "../hooks/useProducts";
import { useProductsStore } from "../store/ProductsStore";
import useResumeProducts from "../hooks/useResumeProducts";
import { ResumeProductsTemplate } from "../components/templates/ResumeProductsTemplate";

export default function ResumesProducts() {
  const dataCompany = useCompanyStore((state) => state.dataCompany);
  const dataPermisos = useUsersStore((state) => state.dataPermisos);
  const buscadorProductos = useProductsStore((state) => state.buscador);
  const { queryResumeProducts } = useResumeProducts({
    company: dataCompany,
  });
  const { searchproducts } = useProductsStore();
  const statePermiso = dataPermisos.some((element) =>
    element.modulos.nombre.includes("Hojas de Vida"),
  );
  useProducts({
    company: dataCompany,
    buscadorProductos: buscadorProductos,
    searchproducts: searchproducts,
  });

  if (statePermiso == false) {
    return <AdblockPage state={statePermiso} />;
  }
  if (queryResumeProducts.data)
    return <ResumeProductsTemplate queryResumeProducts={queryResumeProducts} />;
}
