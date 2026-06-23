import styled from "styled-components";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DeleteFacturaRow,
  DeleteMaintenance,
} from "../../supabase/maintenance.actions";
import Spinner from "../atoms/spinner/Spinner";

export function MaintenanceList({ mantenimientos, loading, hvId }) {
  const queryClient = useQueryClient();

  const { mutate: deleteMantto } = useMutation({
    mutationFn: ({ id }) => DeleteMaintenance({ id }),
    onSuccess: () => queryClient.invalidateQueries(["mantenimientos", hvId]),
  });

  const { mutate: deleteFactura } = useMutation({
    mutationFn: ({ id }) => DeleteFacturaRow({ id }),
    onSuccess: () => queryClient.invalidateQueries(["mantenimientos", hvId]),
  });

  const handleDeleteMantto = (id) => {
    Swal.fire({
      title: "¿Eliminar mantenimiento?",
      text: "Se eliminarán también todas las facturas asociadas.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff6b2b",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((r) => {
      if (r.isConfirmed) deleteMantto({ id });
    });
  };

  const handleDeleteFactura = (id) => {
    Swal.fire({
      title: "¿Eliminar esta fila?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff6b2b",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((r) => {
      if (r.isConfirmed) deleteFactura({ id });
    });
  };

  if (loading) return <Spinner />;

  return (
    <ListWrap>
      <ListTitle>🗂 Historial de mantenimientos</ListTitle>
      {mantenimientos.map((m) => (
        <ManttoCard key={m.id}>
          <ManttoHeader>
            <ManttoHeaderLeft>
              <TipoBadge tipo={m.tipo}>{m.tipo}</TipoBadge>
              <ManttoFecha>{m.fechaservicio}</ManttoFecha>
              <ManttoResp>👤 {m.responsable}</ManttoResp>
            </ManttoHeaderLeft>
            <ManttoHeaderRight>
              <TotalLabel>
                Total:{" "}
                <strong>
                  ${" "}
                  {Number(m.total).toLocaleString("es-CO", {
                    minimumFractionDigits: 2,
                  })}
                </strong>
              </TotalLabel>
              <DeleteManttoBtn
                type="button"
                onClick={() => handleDeleteMantto(m.id)}
              >
                🗑 Eliminar
              </DeleteManttoBtn>
            </ManttoHeaderRight>
          </ManttoHeader>

          {m.observaciones && <Observaciones>{m.observaciones}</Observaciones>}

          {m.facturamantenimiento?.length > 0 && (
            <FacturaWrap>
              <FacturaTitle>Factura</FacturaTitle>
              <FacturaTable>
                <thead>
                  <tr>
                    <Th>No.</Th>
                    <Th>Valor unitario</Th>
                    <Th>Proveedor</Th>
                    <Th></Th>
                  </tr>
                </thead>
                <tbody>
                  {m.facturamantenimiento.map((f) => (
                    <tr key={f.id}>
                      <Td>{f.nro}</Td>
                      <Td>
                        ${" "}
                        {Number(f.valor_unitario).toLocaleString("es-CO", {
                          minimumFractionDigits: 2,
                        })}
                      </Td>
                      <Td>{f.proveedor}</Td>
                      <Td>
                        <DeleteRowBtn
                          type="button"
                          onClick={() => handleDeleteFactura(f.id)}
                        >
                          ✕
                        </DeleteRowBtn>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </FacturaTable>
            </FacturaWrap>
          )}
        </ManttoCard>
      ))}
    </ListWrap>
  );
}

const ListWrap = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ListTitle = styled.p`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSecondary || "#888"};
  margin: 0 0 4px;
`;

const ManttoCard = styled.div`
  background: ${({ theme }) => theme.bg || "#fff"};
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const ManttoHeader = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ManttoHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ManttoHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const tipoBg = {
  preventivo: "#16a34a",
  correctivo: "#dc2626",
  predictivo: "#2563eb",
};
const TipoBadge = styled.span`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 4px;
  background: ${({ tipo }) => tipoBg[tipo] || "#555"};
  color: #fff;
`;

const ManttoFecha = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-family: monospace;
`;

const ManttoResp = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
`;

const TotalLabel = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  strong {
    color: #ff6b2b;
    font-family: monospace;
  }
`;

const DeleteManttoBtn = styled.button`
  background: rgba(220, 38, 38, 0.15);
  border: 0.5px solid rgba(220, 38, 38, 0.4);
  color: #f87171;
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: rgba(220, 38, 38, 0.3);
  }
`;

const Observaciones = styled.p`
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
  margin: 0;
  padding: 10px 14px;
  white-space: pre-line;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.06);
`;

const FacturaWrap = styled.div`
  padding: 10px 14px;
`;

const FacturaTitle = styled.p`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSecondary || "#888"};
  margin: 0 0 6px;
`;

const FacturaTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  border: 0.5px solid rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  overflow: hidden;
`;

const Th = styled.th`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #ff6b2b;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 6px 8px;
  text-align: left;
  border-right: 0.5px solid rgba(255, 107, 43, 0.15);
  &:last-child {
    border-right: none;
  }
`;

const Td = styled.td`
  padding: 6px 8px;
  color: ${({ theme }) => theme.text};
  border-right: 0.5px solid rgba(0, 0, 0, 0.06);
  border-top: 0.5px solid rgba(0, 0, 0, 0.06);
  &:last-child {
    border-right: none;
    width: 28px;
    text-align: center;
  }
`;

const DeleteRowBtn = styled.button`
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 11px;
  &:hover {
    color: #e85d1f;
  }
`;
