import styled from "styled-components";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "../../../store/companyStore";
import { useProductsStore } from "../../../store/ProductsStore";

function StockActualTodos() {
  const reportStoreProductosAll = useProductsStore(
    (state) => state.reportStoreProductosAll
  );
  const dataCompany = useCompanyStore((state) => state.dataCompany);

  const { data, isLoading, error } = useQuery({
    queryKey: ["reporte stock todos", { id_empresa: dataCompany?.id }],
    queryFn: () => reportStoreProductosAll({ id_empresa: dataCompany?.id }),
    enabled: !!dataCompany,
  });

  if (isLoading) return <span>cargando</span>;
  if (error) return <span>Error: {error.message}</span>;

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontSize: 10,
      fontFamily: "Helvetica",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    logoSection: {
      width: "25%",
    },
    logo: {
      width: 80,
      height: 60,
      objectFit: "contain",
    },
    titleSection: {
      width: "50%",
      alignItems: "center",
      justifyContent: "center",
    },
    companyDetailsSection: {
      width: "25%",
      textAlign: "right",
    },
    companyName: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 2,
    },
    metadata: {
      marginTop: 5,
      fontSize: 9,
      color: "#555",
      textAlign: "right",
    },
    documentTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 2,
      textAlign: "center",
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: "#e0e0e0",
      borderBottom: 1,
      padding: 5,
      fontWeight: "bold",
    },
    tableRow: {
      flexDirection: "row",
      borderBottom: 1,
      padding: 5,
    },
    cellIndex: {
      width: "10%",
      textAlign: "center",
    },
    cellDescripcion: {
      width: "65%",
    },
    cellStock: {
      width: "25%",
      textAlign: "right",
    },
  });

  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

  return (
    <Container>
      <PDFViewer className="pdfviewer">
        <Document title="Reporte de Stock">
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <View style={styles.logoSection}>
                <Image style={styles.logo} src={"/seynekun.png"} />
              </View>

              <View style={styles.titleSection}>
                <Text style={styles.companyName}>{dataCompany?.nombre}</Text>
                <Text style={styles.documentTitle}>
                  Reporte de Stock General
                </Text>
              </View>

              <View style={styles.companyDetailsSection}>
                <Text>NIT: 900.367.342-4</Text>
                <Text>Dirección: CARRERA 19A CL 6-97 VALLEDUPAR</Text>
                <Text>Teléfono: 310 8085045</Text>
                <Text style={styles.metadata}>Fecha: {formattedDate}</Text>
              </View>
            </View>

            {/* Tabla */}
            <View style={styles.tableHeader}>
              <Text style={styles.cellIndex}>#</Text>
              <Text style={styles.cellDescripcion}>Descripción</Text>
              <Text style={styles.cellStock}>Cantidad</Text>
            </View>

            {data?.map((producto, index) => (
              <View style={styles.tableRow} key={producto.id}>
                <Text style={styles.cellIndex}>{index + 1}</Text>
                <Text style={styles.cellDescripcion}>
                  {producto.descripcion}
                </Text>
                <Text style={styles.cellStock}>{producto.stock}</Text>
              </View>
            ))}
          </Page>
        </Document>
      </PDFViewer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 90vh;

  .pdfviewer {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

export default StockActualTodos;
