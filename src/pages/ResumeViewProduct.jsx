import { useState } from "react";
import { Header } from "../components/organisms/Header";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ShowHojaVidaById } from "../supabase/resume-products.actions";
import { SpinnerLoading } from "../components/molecules/SpinnerLoading";
import ModalRegisterMaintenance from "../components/organisms/forms/ModalRegisterMaintenance";
import { GetMaintenanceByHvida } from "../supabase/maintenance.actions";
import { MaintenanceList } from "../components/organisms/MaintenanceList";
export default function ResumeViewProduct() {
  const [state, setState] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { id: hvId } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["consultar hoja vida", hvId],
    queryFn: () => ShowHojaVidaById({ _id_hojavida: hvId }),
    enabled: !!hvId,
  });

  // dentro del componente, después de la query de data:
  const { data: mantenimientos, isLoading: loadingMantto } = useQuery({
    queryKey: ["mantenimientos", hvId],
    queryFn: () => GetMaintenanceByHvida({ id_hvida: hvId }),
    enabled: !!hvId,
  });
  if (isLoading) {
    return <SpinnerLoading />;
  }
  if (error) {
    return <span>Error...</span>;
  }
  if (data)
    return (
      <Container>
        <header className="header">
          <Header
            stateConfig={{ state: state, setState: () => setState(!state) }}
          />
        </header>

        <section className="main">
          <BadgeLabel>📋 hoja de vida de equipo</BadgeLabel>

          <EquipoCard>
            <CardHeader>
              <IconBox>⚙️</IconBox>
              <HeaderInfo>
                <MachineName>{data.nombre}</MachineName>
                <MachineMeta>
                  {data.marca} · Modelo {data.modelo}
                </MachineMeta>
              </HeaderInfo>
              <BtnMantto onClick={() => setModalOpen(true)}>
                🔧 Registrar mantenimiento
              </BtnMantto>
              <StatusArea>
                <StatusDot>Activo</StatusDot>
                <UbicacionLabel>{data.ubicacion}</UbicacionLabel>
              </StatusArea>
            </CardHeader>

            <CardBody>
              <Section>
                <SectionTitle>🔖 Identificación</SectionTitle>
                <FieldGrid>
                  <Field>
                    <Label>Cód. inventario</Label>
                    <Value className="mono">{data.cod_inventario}</Value>
                  </Field>
                  <Field>
                    <Label>Serial</Label>
                    <Value className="mono">{data.serial}</Value>
                  </Field>
                  <Field>
                    <Label>Fecha de compra</Label>
                    <Value>{data.fechacompra}</Value>
                  </Field>
                  <Field>
                    <Label>Ubicación</Label>
                    <Value>{data.ubicacion}</Value>
                  </Field>
                </FieldGrid>
              </Section>

              <Section>
                <SectionTitle>👤 Responsable</SectionTitle>
                <ResponsableRow>
                  <div>
                    <ResponsableName>{data.responsable}</ResponsableName>
                    <ResponsableRole>Responsable del equipo</ResponsableRole>
                  </div>
                </ResponsableRow>
              </Section>

              <Section>
                <SectionTitle>🔧 Especificaciones técnicas</SectionTitle>
                <TextBlock>{data.especificaciones}</TextBlock>
              </Section>

              <Section>
                <SectionTitle>⚙️ Función</SectionTitle>
                <TextBlock>{data.funcion}</TextBlock>
              </Section>

              <Section>
                <SectionTitle>🔧 Especificaciones técnicas</SectionTitle>
                <TextBlock>{data.especificaciones}</TextBlock>
              </Section>

              <Section>
                <SectionTitle>Partes principales · serial ref.</SectionTitle>
                <TextBlock>{data.partesprincipales}</TextBlock>
              </Section>
            </CardBody>
          </EquipoCard>
          <MaintenanceList
            mantenimientos={mantenimientos}
            loading={loadingMantto}
            hvId={hvId}
          />
        </section>
        {modalOpen && (
          <ModalRegisterMaintenance
            onClose={() => setModalOpen(!modalOpen)}
            hvidaId={hvId}
          />
        )}
      </Container>
    );
}
const Container = styled.div`
  min-height: 100vh;
  padding: 15px;
  width: 100%;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  grid-template:
    "header" 100px
    "main" auto / 1fr;

  .header {
    grid-area: header;
    display: flex;
    align-items: center;
  }
  .main {
    grid-area: main;
    max-width: 860px;
    width: 100%;
    margin: 0 auto;
    padding: 1.5rem 0;
  }
`;

const BadgeLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #1a1a2e;
  color: #ff6b2b;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 4px;
  border: 0.5px solid rgba(255, 107, 43, 0.35);
  margin-bottom: 1rem;
`;

const EquipoCard = styled.div`
  background: ${({ theme }) => theme.bg || "#fff"};
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
`;

const CardHeader = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: rgba(255, 107, 43, 0.15);
  border: 1px solid rgba(255, 107, 43, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
`;

const HeaderInfo = styled.div`
  flex: 1;
`;

const MachineName = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  margin: 0 0 2px;
`;

const MachineMeta = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  font-family: monospace;
  margin: 0;
`;

const StatusArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const StatusDot = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #4ade80;
  &::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #4ade80;
  }
`;

const UbicacionLabel = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.35);
  font-family: monospace;
`;

const CardBody = styled.div`
  padding: 1.25rem 1.5rem;
`;

const Section = styled.div`
  margin-bottom: 1.25rem;
`;

const SectionTitle = styled.p`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSecondary || "#888"};
  margin: 0 0 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  &::after {
    content: "";
    flex: 1;
    height: 0.5px;
    background: rgba(0, 0, 0, 0.1);
  }
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const Label = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.textTertiary || "#aaa"};
`;

const Value = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  &.mono {
    font-family: monospace;
    color: #ff6b2b;
  }
`;

const ResponsableRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ResponsableName = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ResponsableRole = styled.p`
  margin: 0;
  font-size: 11px;
  color: ${({ theme }) => theme.textTertiary || "#aaa"};
`;

const TextBlock = styled.p`
  font-size: 13px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text};
  margin: 0;
  white-space: pre-line;
`;

const BtnMantto = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 107, 43, 0.15);
  color: #ff6b2b;
  border: 1px solid rgba(255, 107, 43, 0.4);
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s;
  &:hover {
    background: rgba(255, 107, 43, 0.28);
  }
`;
