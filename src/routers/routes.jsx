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
        path="/"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configurar/personal"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Users />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configurar/empresa"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Empresa />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configurar"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Configuration />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configurar/marca"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Branding />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configurar/categorias"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Category />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configurar/productos"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Products />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/kardex"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Kardex />
            </Layout>
          </ProtectedRoute>
        }
      />

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
