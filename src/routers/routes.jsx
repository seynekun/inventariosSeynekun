import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { ProtectedRoute } from "../hooks/ProtectedRoute";
import { Configuration } from "../pages/Configuration";
import { Branding } from "../pages/Brand";
import { Category } from "../pages/Category";
import { Products } from "../pages/Products";
import { Users } from "../pages/Users";
import { Kardex } from "../pages/Kardex";
import { Reports } from "../pages/Reports";
import StockActualTodos from "../components/organisms/reports/StockActualTodos";
import StockActualPorProducto from "../components/organisms/reports/StockActualPorProducto";
import StockBajoMinimo from "../components/organisms/reports/StockBajoMinimo";
import KardexEntradaSalida from "../components/organisms/reports/KardexEntradaSalida";
import StockInventarioValorado from "../components/organisms/reports/StockInventarioValorado";
import { Empresa } from "../pages/Company";
import { Layout } from "../hooks/Layout";
import ResumesProducts from "../pages/ResumesProducts";
import ResumeViewProduct from "../pages/ResumeViewProduct";

export function MyRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <ProtectedRoute accessBy="no-authenticated">
            <Login />
          </ProtectedRoute>
        }
      />

      <Route
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/configurar" element={<Configuration />} />
        <Route path="/configurar/personal" element={<Users />} />
        <Route path="/configurar/empresa" element={<Empresa />} />
        <Route path="/configurar/marca" element={<Branding />} />
        <Route path="/configurar/categorias" element={<Category />} />
        <Route path="/configurar/productos" element={<Products />} />
        <Route path="/configurar/hojasvida" element={<ResumesProducts />} />
        <Route
          path="/configurar/hojasvida/:id/view"
          element={<ResumeViewProduct />}
        />
        <Route path="/kardex" element={<Kardex />} />
        <Route path="/reportes" element={<Reports />} />
      </Route>

      <Route
        path="/reportes"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Reports />
            </Layout>
          </ProtectedRoute>
        }
      >
        <Route path="stock-actual-todos" element={<StockActualTodos />} />
        <Route
          path="stock-actual-por-producto"
          element={<StockActualPorProducto />}
        />
        <Route path="stock-bajo-minimo" element={<StockBajoMinimo />} />
        <Route
          path="kardex-entradas-salidas"
          element={<KardexEntradaSalida />}
        />
        <Route
          path="inventario-valorado"
          element={<StockInventarioValorado />}
        />
      </Route>
    </Routes>
  );
}
