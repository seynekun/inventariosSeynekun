import styled from "styled-components";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { useState } from "react";
import { Buscador } from "../Buscador";
import { ListaGenerica } from "../../molecules/ListaGenerica";
import { useQuery } from "@tanstack/react-query";
import { useProductsStore } from "../../../store/ProductsStore";
import { useCompanyStore } from "../../../store/companyStore";

function StockActualPorProducto() {
  const [stateListaproductos, setstateListaProductos] = useState(false);
  const searchproducts = useProductsStore((state) => state.searchproducts);
  const reportStockxProducto = useProductsStore(
    (state) => state.reportStockxProducto
  );
  const productosItemSelect = useProductsStore(
    (state) => state.productosItemSelect
  );
  const buscador = useProductsStore((state) => state.buscador);
  const setBuscador = useProductsStore((state) => state.setBuscador);
  const selectproducts = useProductsStore((state) => state.selectproducts);
  const dataCompany = useCompanyStore((state) => state.dataCompany);
  const { data, isLoading, error } = useQuery({
    queryKey: [
      "reporte stock por producto",
      { id_empresa: dataCompany?.id, id: productosItemSelect?.id },
    ],
    queryFn: () =>
      reportStockxProducto({
        id_empresa: dataCompany?.id,
        id: productosItemSelect.id,
      }),
    enabled: !!dataCompany,
  });
  const { data: dataproductosbuscador } = useQuery({
    queryKey: [
      "buscar productos",
      { _id_empresa: dataCompany?.id, descripcion: buscador },
    ],
    queryFn: () =>
      searchproducts({
        _id_empresa: dataCompany?.id,
        buscador: buscador,
      }),
    enabled: dataCompany?.id != null,
  });

  // if (isLoading) {
  //   return <span>cargando</span>;
  // }
  // if (error) {
  //   return <span>Error {error.message}</span>;
  // }
  const styles = StyleSheet.create({
    page: { flexDirection: "row", position: "relative" },
    section: { margin: 10, padding: 10, flexGrow: 1 },
    table: { width: "100%", margin: "auto", marginTop: 10 },
    row: {
      flexDirection: "row",
      borderBottom: 1,
      borderBottomColor: "#121212",
      alignItems: "center",
      height: 24,
      borderLeftColor: "#000",
      borderLeft: 1,
      textAlign: "left",
      justifyContent: "flex-start",
    },
    cell: {
      flex: 1,
      textAlign: "center",

      borderLeftColor: "#000",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    headerCell: {
      flex: 1,
      backgroundColor: "#dcdcdc",
      fontWeight: "bold",
      textAlign: "center",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  });
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
  const renderTableRow = (rowData, isHeader = false) => (
    <View style={styles.row} key={rowData.id}>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.descripcion}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.stock}
      </Text>
    </View>
  );
  return (
    <Container>
      <Buscador
        funcion={() => setstateListaProductos(!stateListaproductos)}
        setBuscador={setBuscador}
      />
      {stateListaproductos && (
        <ListaGenerica
          bottom="350px"
          funcion={(p) => {
            selectproducts(p);
            setBuscador("");
          }}
          setState={() => setstateListaProductos(!stateListaproductos)}
          data={dataproductosbuscador}
        />
      )}

      <PDFViewer className="pdfviewer">
        <Document title="Reporte de stock todos">
          <Page size="A4" orientation="portrait">
            <View style={styles.page}>
              <View style={styles.section}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "ultrabold",
                    marginBottom: 10,
                  }}
                >
                  Stock actual por producto
                </Text>
                <Text>Fecha y hora del reporte: {formattedDate}</Text>
                <View style={styles.table}>
                  {renderTableRow(
                    {
                      descripcion: "Producto",
                      stock: "Stock",
                    },
                    true
                  )}
                  {data?.map((movement) => renderTableRow(movement))}
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 15px;
  .pdfviewer {
    width: 100%;
    height: 100%;
  }
`;
export default StockActualPorProducto;
