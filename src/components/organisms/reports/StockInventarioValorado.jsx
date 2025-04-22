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
import { formatCurrency } from "../../../utils";

function StockInventarioValorado() {
  const reportInventarioValorado = useProductsStore(
    (state) => state.reportInventarioValorado
  );
  const dataCompany = useCompanyStore((state) => state.dataCompany);

  const { data, isLoading, error } = useQuery({
    queryKey: ["reporte stock valorado", { _id_empresa: dataCompany?.id }],
    queryFn: () => reportInventarioValorado({ _id_empresa: dataCompany?.id }),
    enabled: !!dataCompany,
  });

  if (isLoading) return <span>Cargando...</span>;
  if (error) return <span>Error: {error.message}</span>;

  const totalGeneral =
    data?.reduce((acc, item) => acc + parseFloat(item.total), 0) || 0;

  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontSize: 10,
      fontFamily: "Helvetica",
      color: "#1a1a1a",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 30,
      borderBottom: "1 solid #ccc",
      paddingBottom: 10,
    },
    logo: {
      width: 80,
      height: 60,
      objectFit: "contain",
    },
    companyName: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 2,
    },
    companyInfo: {
      textAlign: "right",
    },
    titleSection: {
      marginBottom: 20,
      textAlign: "center",
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
    },
    subTitle: {
      fontSize: 10,
      color: "#555",
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: "#e6e6e6",
      paddingVertical: 6,
      paddingHorizontal: 4,
      fontWeight: "bold",
      borderBottom: "1 solid #999",
    },
    tableRow: {
      flexDirection: "row",
      paddingVertical: 5,
      paddingHorizontal: 4,
      borderBottom: "1 solid #ddd",
    },
    colDescripcion: { flex: 2 },
    colStock: { flex: 1, textAlign: "right" },
    colPrecio: { flex: 1, textAlign: "right" },
    colTotal: { flex: 1, textAlign: "right" },
    totalText: {
      marginTop: 10,
      textAlign: "right",
      fontWeight: "bold",
      fontSize: 11,
    },
    footer: {
      marginTop: 30,
      fontSize: 9,
      color: "#666",
      textAlign: "center",
    },
  });

  return (
    <Container>
      <PDFViewer className="pdfviewer">
        <Document title="Inventario Valorado">
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <Image style={styles.logo} src={"/seynekun.png"} />
              <View style={styles.companyInfo}>
                <Text>NIT: 900.367.342-4</Text>
                <Text>Dirección: CARRERA 19A CL 6-97 VALLEDUPAR</Text>
                <Text>Teléfono: 310 8085045</Text>
              </View>
            </View>

            <View style={styles.titleSection}>
              <Text style={styles.companyName}>{dataCompany?.nombre}</Text>
              <Text style={styles.title}>Inventario Valorado</Text>

              <Text style={styles.subTitle}>
                Fecha del reporte: {formattedDate}
              </Text>
            </View>

            {/* Tabla */}
            <View style={styles.tableHeader}>
              <Text style={styles.colDescripcion}>Descripción</Text>
              <Text style={styles.colStock}>Cantidad</Text>
              <Text style={styles.colPrecio}>Precio</Text>
              <Text style={styles.colTotal}>Total</Text>
            </View>

            {data?.map((item) => (
              <View style={styles.tableRow} key={item.id}>
                <Text style={styles.colDescripcion}>{item.descripcion}</Text>
                <Text style={styles.colStock}>{item.stock}</Text>
                <Text style={styles.colPrecio}>
                  {formatCurrency(item.preciocompra)}
                </Text>
                <Text style={styles.colTotal}>
                  {formatCurrency(item.total)}
                </Text>
              </View>
            ))}

            <Text style={styles.totalText}>
              Total general del inventario: S/ {formatCurrency(totalGeneral)}
            </Text>

            <Text style={styles.footer}>
              Este reporte fue generado automáticamente desde el sistema.
            </Text>
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

export default StockInventarioValorado;
