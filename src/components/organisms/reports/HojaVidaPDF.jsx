// components/organisms/HojaVidaPDF.jsx

import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

const C = {
  navy: "#1E293B",
  gray: "#E5E7EB",
  text: "#334155",
  white: "#FFFFFF",
};

const S = StyleSheet.create({
  page: {
    padding: 22,
    fontSize: 8,
    fontFamily: "Helvetica",
    color: C.text,
  },

  table: {
    border: "1pt solid #CBD5E1",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
  },

  cell: {
    borderRight: "1pt solid #E5E7EB",
    borderBottom: "1pt solid #E5E7EB",
    padding: 6,
    justifyContent: "center",
  },

  headerCell: {
    backgroundColor: C.navy,
    color: C.white,
    fontFamily: "Helvetica-Bold",
  },

  title: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
  },

  small: {
    fontSize: 7,
  },

  sectionTitle: {
    backgroundColor: C.navy,
    color: "white",
    padding: 6,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
  },

  sectionBody: {
    padding: 8,
  },
});

const money = (v) =>
  Number(v || 0).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
  });

export function HojaVidaPDF({ equipo, mantenimientos = [] }) {
  return (
    <Document>
      <Page size="A4" style={S.page} wrap>
        {/* HEADER */}

        <View style={S.table}>
          <View style={S.row}>
            <View
              style={[
                S.cell,
                {
                  width: 70,
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <Image
                src="/seynekunlogo.png"
                style={{
                  width: 45,
                  height: 45,
                }}
              />
            </View>

            <View
              style={[
                S.cell,
                {
                  flex: 1,
                  justifyContent: "center",
                },
              ]}
            >
              <Text style={S.title}>HOJA DE VIDA DE EQUIPO</Text>
            </View>

            <View
              style={[
                S.cell,
                {
                  width: 150,
                },
              ]}
            >
              <Text>Fecha: {new Date().toLocaleDateString("es-CO")}</Text>

              <Text>Código: {equipo.cod_inventario}</Text>
            </View>
          </View>
        </View>

        {/* NOMBRE */}

        <View style={S.table}>
          <View style={[S.row, S.headerCell]}>
            <Text
              style={{
                padding: 8,
                fontSize: 12,
              }}
            >
              {equipo.nombre}
            </Text>
          </View>
        </View>

        {/* INFO */}

        <View style={S.table}>
          <View style={[S.row, S.headerCell]}>
            <Text style={{ padding: 6 }}>INFORMACIÓN GENERAL</Text>
          </View>

          {[
            ["Marca", equipo.marca],
            ["Modelo", equipo.modelo],
            ["Serial", equipo.serial],
            ["Ubicación", equipo.ubicacion],
            ["Responsable", equipo.responsable],
            ["Compra", equipo.fechacompra],
          ].map(([k, v]) => (
            <View key={k} style={S.row}>
              <Text
                style={[
                  S.cell,
                  {
                    width: 120,
                    fontFamily: "Helvetica-Bold",
                  },
                ]}
              >
                {k}
              </Text>

              <Text
                style={[
                  S.cell,
                  {
                    flex: 1,
                  },
                ]}
              >
                {v || "-"}
              </Text>
            </View>
          ))}
        </View>

        {/* BLOQUES */}

        {[
          ["ESPECIFICACIONES", equipo.especificaciones],

          ["FUNCIÓN DEL EQUIPO", equipo.funcion],

          ["PARTES PRINCIPALES", equipo.partesprincipales],

          ["OBSERVACIONES", equipo.observaciones],
        ].map(([title, val]) => (
          <View key={title} style={S.table}>
            <Text style={S.sectionTitle}>{title}</Text>

            <View style={S.sectionBody}>
              <Text>{val || "N/A"}</Text>
            </View>
          </View>
        ))}

        {/* TABLA */}

        <View style={S.table}>
          <View style={[S.row, S.headerCell]}>
            <Text
              style={[
                S.cell,
                {
                  width: 70,
                },
              ]}
            >
              Fecha
            </Text>

            <Text
              style={[
                S.cell,
                {
                  width: 70,
                },
              ]}
            >
              Tipo
            </Text>

            <Text
              style={[
                S.cell,
                {
                  flex: 1,
                },
              ]}
            >
              Detalle
            </Text>

            <Text
              style={[
                S.cell,
                {
                  width: 90,
                },
              ]}
            >
              Factura
            </Text>

            <Text
              style={[
                S.cell,
                {
                  width: 90,
                },
              ]}
            >
              Total
            </Text>
          </View>

          {mantenimientos.map((m) => (
            <View key={m.id} wrap>
              <View style={S.row}>
                <Text
                  style={[
                    S.cell,
                    {
                      width: 70,
                    },
                  ]}
                >
                  {m.fechaservicio}
                </Text>

                <Text
                  style={[
                    S.cell,
                    {
                      width: 70,
                    },
                  ]}
                >
                  {m.tipo}
                </Text>

                <View
                  style={[
                    S.cell,
                    {
                      flex: 1,
                    },
                  ]}
                >
                  <Text>{m.observaciones}</Text>

                  <Text
                    style={{
                      marginTop: 4,
                    }}
                  >
                    Resp: {m.responsable}
                  </Text>
                </View>

                <View
                  style={[
                    S.cell,
                    {
                      width: 90,
                    },
                  ]}
                >
                  {(m.facturamantenimiento || []).map((f) => (
                    <Text key={f.id}>{f.nro}</Text>
                  ))}
                </View>

                <View
                  style={[
                    S.cell,
                    {
                      width: 90,
                    },
                  ]}
                >
                  <Text>{money(m.total)}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
