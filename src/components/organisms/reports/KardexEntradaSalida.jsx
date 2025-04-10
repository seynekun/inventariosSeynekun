import styled from "styled-components";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useCompanyStore } from "../../../store/companyStore";
import { useProductsStore } from "../../../store/ProductsStore";
import { Buscador } from "../Buscador";
import { ListaGenerica } from "../../molecules/ListaGenerica";

function KardexEntradaSalida() {
  const [stateListaproductos, setstateListaProductos] = useState(false);

  const dataCompany = useCompanyStore((state) => state.dataCompany);
  const searchproducts = useProductsStore((state) => state.searchproducts);
  const buscador = useProductsStore((state) => state.buscador);

  const setBuscador = useProductsStore((state) => state.setBuscador);
  const selectproducts = useProductsStore((state) => state.selectproducts);
  const productosItemSelect = useProductsStore(
    (state) => state.productosItemSelect
  );
  const reportKardexEntradaSalida = useProductsStore(
    (state) => state.reportKardexEntradaSalida
  );

  const { data } = useQuery({
    queryKey: [
      "reporte kardex entrada salida",
      { _id_empresa: dataCompany?.id, _id_producto: productosItemSelect?.id },
    ],
    queryFn: () =>
      reportKardexEntradaSalida({
        _id_empresa: dataCompany?.id,
        _id_producto: productosItemSelect?.id,
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
        {rowData.nombres}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.descripcion}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.tipo}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.cantidad}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.fecha}
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
          <Page size="A4" orientation="landscape">
            <View style={styles.page}>
              <View style={styles.section}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "ultrabold",
                    marginBottom: 10,
                  }}
                >
                  Kardex - entrada y salida por producto
                </Text>
                <Text>Fecha y hora del reporte: {formattedDate}</Text>
                <View style={styles.table}>
                  {renderTableRow(
                    {
                      nombres: "Usuario",
                      descripcion: "Producto",
                      tipo: "Tipo",
                      cantidad: "Cantidad",
                      fecha: "Fecha",
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
export default KardexEntradaSalida;
