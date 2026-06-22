import { useForm } from "react-hook-form";
import styled from "styled-components";
import ErrorMessaje from "../../atoms/ErrorMessaje";
import { useState } from "react";
import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  RegisterFacturaMaintenance,
  RegisterMaintenance,
} from "../../../supabase/maintenance.actions";

export default function ModalRegisterMaintenance({ onClose, hvidaId }) {
  const [facturaRows, setFacturaRows] = useState([
    { nro: "", valorUnitario: "", proveedor: "" },
  ]);

  const addRow = () =>
    setFacturaRows([
      ...facturaRows,
      { nro: "", valorUnitario: "", proveedor: "" },
    ]);

  const removeRow = (i) =>
    setFacturaRows(facturaRows.filter((_, idx) => idx !== i));

  const updateRow = (i, field, value) =>
    setFacturaRows(
      facturaRows.map((row, idx) =>
        idx === i ? { ...row, [field]: value } : row,
      ),
    );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const total = useMemo(
    () =>
      facturaRows.reduce(
        (acc, row) => acc + (parseFloat(row.valorUnitario) || 0),
        0,
      ),
    [facturaRows],
  );

  const { mutateAsync } = useMutation({
    mutationFn: (p) => RegisterMaintenance(p),
    onSuccess: () => {
      // queryClient.invalidateQueries(["mantenimientos", hvidaId]);
      onClose(false);
    },
    onError: (err) => console.error(err),
  });

  const queryFactura = useMutation({
    mutationFn: (p) => RegisterFacturaMaintenance(p),
    onSuccess: () => {
      // queryClient.invalidateQueries(["mantenimientos", hvidaId]);
      onClose(false);
    },
  });
  // const { mutate: deleteMantto } = useMutation({
  //   mutationFn: ({ id }) => DeleteMaintenance({ id }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["mantenimientos", hvidaId]);
  //   },
  // });
  // const handleDelete = (id) => {
  //   Swal.fire({
  //     title: "¿Eliminar mantenimiento?",
  //     text: "Se eliminarán también todas las facturas asociadas.",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#ff6b2b",
  //     cancelButtonColor: "#aaa",
  //     confirmButtonText: "Sí, eliminar",
  //     cancelButtonText: "Cancelar",
  //   }).then((result) => {
  //     if (result.isConfirmed) deleteMantto({ id });
  //   });
  // };

  const onSubmit = async (data) => {
    const p = {
      id_hvida: hvidaId,
      fechaservicio: data.fechaservicio,
      tipo: data.tipo,
      observaciones: data.observaciones,
      responsable: data.responsable,
      total: parseFloat(total),
    };

    const mantto = await mutateAsync(p);

    await queryFactura.mutateAsync({
      facturaRows,
      maintenanceId: mantto.id,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalOverlay onClick={() => onClose(false)}>
        <ModalBox onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Registrar mantenimiento</ModalTitle>
            <CloseBtn onClick={() => onClose(false)}>✕</CloseBtn>
          </ModalHeader>
          <ModalBody>
            <ModalField>
              <ModalLabel>Fecha</ModalLabel>
              <ModalInput
                type="date"
                {...register("fechaservicio", {
                  required: "La fecha del mantenimiento es obligatoria",
                })}
              />
              {errors.fechaservicio && (
                <ErrorMessaje>{errors.fechaservicio.message}</ErrorMessaje>
              )}
            </ModalField>
            <ModalField>
              <ModalLabel>Tipo de mantenimiento</ModalLabel>
              <ModalSelect
                {...register("tipo", {
                  required: " El tipo de Mantemimiento es obligatorio",
                })}
              >
                <option value="" disabled>
                  Seleccionar...
                </option>
                <option value="preventivo">Preventivo</option>
                <option value="correctivo">Correctivo</option>
                <option value="predictivo">Predictivo</option>
              </ModalSelect>
              {errors.tipo && (
                <ErrorMessaje>{errors.tipo.message}</ErrorMessaje>
              )}
            </ModalField>

            <ModalField>
              <ModalLabel>Responsable</ModalLabel>
              <ModalInput
                type="text"
                placeholder="Nombre del técnico"
                {...register("responsable", {
                  required: "El nombre del Técnico es requerido",
                })}
              />
              {errors.responsable && (
                <ErrorMessaje>{errors.responsable.message}</ErrorMessaje>
              )}
            </ModalField>
            <ModalField>
              <ModalLabel>Descripción</ModalLabel>
              <ModalTextarea
                {...register("observaciones", {
                  required: "Las observaciones son necesarias",
                })}
                rows={4}
                placeholder="Observaciones y detalles..."
              />
              {errors.observaciones && (
                <ErrorMessaje>{errors.observaciones.message}</ErrorMessaje>
              )}
            </ModalField>
            <ModalField>
              <ModalLabel>Factura</ModalLabel>
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
                  {facturaRows.map((row, i) => (
                    <tr key={i}>
                      <Td>
                        <TableInput
                          value={row.nro}
                          onChange={(e) => updateRow(i, "nro", e.target.value)}
                          placeholder="001"
                        />
                      </Td>
                      <Td>
                        <TableInput
                          value={row.valorUnitario}
                          onChange={(e) =>
                            updateRow(i, "valorUnitario", e.target.value)
                          }
                          placeholder="$ 0.00"
                        />
                      </Td>
                      <Td>
                        <TableInput
                          value={row.proveedor}
                          onChange={(e) =>
                            updateRow(i, "proveedor", e.target.value)
                          }
                          placeholder="Nombre proveedor"
                        />
                      </Td>
                      <Td>
                        {facturaRows.length > 1 && (
                          <RemoveRowBtn
                            type="button"
                            onClick={() => removeRow(i)}
                          >
                            ✕
                          </RemoveRowBtn>
                        )}
                      </Td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <TotalTd colSpan={2}>Total</TotalTd>
                    <TotalValue>
                      ${" "}
                      {total.toLocaleString("es-CO", {
                        minimumFractionDigits: 2,
                      })}
                    </TotalValue>
                    <Td></Td>
                  </tr>
                </tfoot>
              </FacturaTable>
              <AddRowBtn type="button" onClick={addRow}>
                + Agregar fila
              </AddRowBtn>
            </ModalField>
          </ModalBody>
          <ModalFooter>
            <CancelBtn onClick={() => onClose(false)}>Cancelar</CancelBtn>
            <SaveBtn type="submit">Guardar mantenimiento</SaveBtn>
          </ModalFooter>
        </ModalBox>
      </ModalOverlay>
    </form>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow: scroll;
`;

const ModalBox = styled.div`
  background: ${({ theme }) => theme.bgtotal};
  border: 0.5px solid rgba(255, 107, 43, 0.25);
  border-radius: 12px;
  width: 100%;
  max-width: 480px;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  &:hover {
    color: #fff;
  }
`;
const ModalBody = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ModalField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ModalLabel = styled.label`
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSecondary || "#888"};
`;
const inputBase = `
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  border: 0.5px solid rgba(0,0,0,0.15);
  font-size: 13px;
  background: ${({ theme }) => theme.bg || "#f9f9f9"};
  color: ${({ theme }) => theme.text};
  outline: none;
  box-sizing: border-box;
  &:focus {
    border-color: #ff6b2b;
  }
`;
const ModalInput = styled.input`
  ${inputBase}
`;
const ModalSelect = styled.select`
  ${inputBase}
`;
const ModalTextarea = styled.textarea`
  ${inputBase}
  resize: vertical;
  line-height: 1.5;
`;

const ModalFooter = styled.div`
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  border-top: 0.5px solid rgba(0, 0, 0, 0.08);
`;

const CancelBtn = styled.button`
  padding: 7px 16px;
  border-radius: 6px;
  border: 0.5px solid rgba(0, 0, 0, 0.15);
  background: none;
  font-size: 13px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const SaveBtn = styled.button`
  padding: 7px 16px;
  border-radius: 6px;
  border: none;
  background: #ff6b2b;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: #e85d1f;
  }
`;
const FacturaTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  overflow: hidden;
  font-size: 12px;
`;

const Th = styled.th`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #ff6b2b;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 7px 8px;
  text-align: center;
  border-right: 0.5px solid rgba(255, 107, 43, 0.2);
  &:last-child {
    border-right: none;
  }
`;

const Td = styled.td`
  padding: 4px;
  border-right: 0.5px solid rgba(0, 0, 0, 0.08);
  border-top: 0.5px solid rgba(0, 0, 0, 0.08);
  &:last-child {
    border-right: none;
    width: 28px;
    text-align: center;
  }
`;

const TableInput = styled.input`
  width: 100%;
  padding: 5px 7px;
  border: none;
  background: transparent;
  font-size: 12px;
  color: ${({ theme }) => theme.text};
  outline: none;
  box-sizing: border-box;
  &:focus {
    background: rgba(255, 107, 43, 0.06);
    border-radius: 4px;
  }
`;

const RemoveRowBtn = styled.button`
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 11px;
  padding: 2px;
  &:hover {
    color: #e85d1f;
  }
`;

const AddRowBtn = styled.button`
  margin-top: 6px;
  background: none;
  border: 0.5px dashed rgba(255, 107, 43, 0.4);
  color: #ff6b2b;
  font-size: 11px;
  padding: 5px 12px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background: rgba(255, 107, 43, 0.06);
  }
`;
const TotalTd = styled.td`
  padding: 7px 8px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ff6b2b;
  border-top: 1px solid rgba(255, 107, 43, 0.3);
  background: rgba(255, 107, 43, 0.05);
`;

const TotalValue = styled.td`
  padding: 7px 8px;
  font-size: 13px;
  font-weight: 700;
  color: #ff6b2b;
  font-family: monospace;
  border-top: 1px solid rgba(255, 107, 43, 0.3);
  background: rgba(255, 107, 43, 0.05);
`;
