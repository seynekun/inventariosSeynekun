import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styled from "styled-components";
import Swal from "sweetalert2";
import { FaArrowsAltV } from "react-icons/fa";
import { Paginated } from "./Paginated";
import { Device } from "../../../styles/breackpoints";
import { useKardexStore } from "../../../store/KardexStore";
import { v } from "../../../styles/variables";
import { ContentAccionesTabla } from "../ContentAccionesTabla";
import { useState } from "react";
import { Buscador } from "../Buscador";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCompanyStore } from "../../../store/companyStore";

export const TableKardex = ({ data }) => {
  const deleteKardex = useKardexStore((state) => state.deleteKardex);
  const dataCompany = useCompanyStore((state) => state.dataCompany);
  const queryClient = useQueryClient();
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const multiFilter = (row, _, value) => {
    const search = value.toLowerCase();

    return (
      String(row.original.descripcion ?? "")
        .toLowerCase()
        .includes(search) ||
      String(row.original.detalle ?? "")
        .toLowerCase()
        .includes(search)
    );
  };
  const eliminar = (p) => {
    if (p.estado === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Este registro ya fue eliminado",
      });
      return;
    }
    Swal.fire({
      title: "¿Estás seguro(a)(e)?",
      text: "Una vez eliminado, ¡no podrá recuperar este registro!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteKardex({ id: p.id });
        queryClient.invalidateQueries({
          queryKey: [
            "mostrar productos",
            {
              id_empresa: dataCompany.id,
            },
          ],
        });
      }
    });
  };
  const columns = [
    {
      accessorKey: "descripcion",
      header: "Producto",
      cell: (info) => (
        <span
          style={{
            textDecoration:
              info.row.original.estado === 0 ? "line-through" : "",
          }}
        >
          {info.getValue()}
        </span>
      ),
      filterFn: "includesString",
      enableColumnFilter: true,
    },
    {
      accessorKey: "fecha",
      header: "Fecha",
      enableSorting: false,
      cell: (info) => (
        <td data-title="Fecha" className="ContentCell">
          <span>{info.getValue()}</span>
        </td>
      ),
      enableColumnFilter: true,
    },
    {
      accessorKey: "tipo",
      header: "Tipo",
      enableSorting: false,
      cell: (info) => (
        <td data-title="Tipo" className="ContentCell">
          {info.getValue() == "salida" ? (
            <Colorcontent color="#ed4d4d" className="contentCategoria">
              {info.getValue()}
            </Colorcontent>
          ) : (
            <Colorcontent color="#30c85b" className="contentCategoria">
              {info.getValue()}
            </Colorcontent>
          )}
        </td>
      ),
      enableColumnFilter: true,
    },
    {
      accessorKey: "detalle",

      header: "Detalle",

      filterFn: "includesString",

      enableColumnFilter: true,

      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      accessorKey: "nombres",
      header: "Usuario",
      enableSorting: false,
      cell: (info) => (
        <td data-title="Nombres" className="ContentCell">
          <span>{info.getValue()}</span>
        </td>
      ),
      enableColumnFilter: true,
    },
    {
      accessorKey: "cantidad",
      header: "Cantidad",
      enableSorting: false,
      cell: (info) => (
        <td data-title="Cantidad" className="ContentCell">
          <span>{info.getValue()}</span>
        </td>
      ),
      enableColumnFilter: true,
    },
    {
      accessorKey: "stock",
      header: "Stock",
      enableSorting: false,
      cell: (info) => (
        <td data-title="Usuario" className="ContentCell">
          <span>{info.getValue()}</span>
        </td>
      ),
      filterFn: "includesString",
      enableColumnFilter: true,
    },
    {
      accessorKey: "acciones",
      header: "Acciones",
      enableSorting: false,
      cell: (info) => (
        <td className="ContentCell">
          <ContentAccionesTabla
            // funcionEditar={() => update(info.row.original)}
            funcionEliminar={() => eliminar(info.row.original)}
            stateeditar={false}
          />
        </td>
      ),
    },
  ];
  const table = useReactTable({
    data,

    columns,

    state: {
      globalFilter,
      pagination,
    },

    globalFilterFn: multiFilter,

    onGlobalFilterChange: setGlobalFilter,

    onPaginationChange: setPagination,

    autoResetPageIndex: false,

    getCoreRowModel: getCoreRowModel(),

    getFilteredRowModel: getFilteredRowModel(),

    getSortedRowModel: getSortedRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
  });
  const handleFilter = useCallback((value) => {
    setGlobalFilter(value);

    setPagination((prev) =>
      prev.pageIndex === 0
        ? prev
        : {
            ...prev,
            pageIndex: 0,
          },
    );
  }, []);
  return (
    <Container>
      <section className="area2">
        <Buscador
          value={table.getColumn("descripcion")?.getFilterValue() ?? ""}
          onChange={handleFilter}
          placeholder="
Buscar producto o detalle
"
        />
      </section>
      <table className="responsive-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.column.columnDef.header}
                  {header.column.getCanSort() && (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <FaArrowsAltV />
                    </span>
                  )}
                  {
                    {
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted()]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((item) => (
            <tr key={item.id}>
              {item.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Paginated table={table} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  margin: 5% 3%;
  @media (min-width: ${v.bpbart}) {
    margin: 2%;
  }
  @media (min-width: ${v.bphomer}) {
    margin: 2em auto;
    /* max-width: ${v.bphomer}; */
  }
  .responsive-table {
    width: 100%;
    margin-bottom: 1.5em;
    border-spacing: 0;
    @media (min-width: ${v.bpbart}) {
      font-size: 0.9em;
    }
    @media (min-width: ${v.bpmarge}) {
      font-size: 1em;
    }
    thead {
      position: absolute;

      padding: 0;
      border: 0;
      height: 1px;
      width: 1px;
      overflow: hidden;
      @media (min-width: ${v.bpbart}) {
        position: relative;
        height: auto;
        width: auto;
        overflow: auto;
      }
      th {
        border-bottom: 2px solid rgba(115, 115, 115, 0.32);
        font-weight: normal;
        text-align: center;
        color: ${({ theme }) => theme.text};
        &:first-of-type {
          text-align: center;
        }
      }
    }
    tbody,
    tr,
    th,
    td {
      display: block;
      padding: 0;
      text-align: left;
      white-space: normal;
    }
    tr {
      @media (min-width: ${v.bpbart}) {
        display: table-row;
      }
    }

    th,
    td {
      padding: 0.5em;
      vertical-align: middle;
      @media (min-width: ${v.bplisa}) {
        padding: 0.75em 0.5em;
      }
      @media (min-width: ${v.bpbart}) {
        display: table-cell;
        padding: 0.5em;
      }
      @media (min-width: ${v.bpmarge}) {
        padding: 0.75em 0.5em;
      }
      @media (min-width: ${v.bphomer}) {
        padding: 0.75em;
      }
    }
    tbody {
      @media (min-width: ${v.bpbart}) {
        display: table-row-group;
      }
      tr {
        margin-bottom: 1em;
        @media (min-width: ${v.bpbart}) {
          display: table-row;
          border-width: 1px;
        }
        &:last-of-type {
          margin-bottom: 0;
        }
        &:nth-of-type(even) {
          @media (min-width: ${v.bpbart}) {
            background-color: rgba(78, 78, 78, 0.12);
          }
        }
      }
      th[scope="row"] {
        @media (min-width: ${v.bplisa}) {
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
        }
        @media (min-width: ${v.bpbart}) {
          background-color: transparent;
          text-align: center;
          color: ${({ theme }) => theme.text};
        }
      }
      .ContentCell {
        text-align: right;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;

        border-bottom: 1px solid rgba(161, 161, 161, 0.32);
        @media (min-width: ${v.bpbart}) {
          justify-content: center;
          border-bottom: none;
        }
      }
      td {
        text-align: right;
        @media (min-width: ${v.bpbart}) {
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
          text-align: center;
        }
      }
      td[data-title]:before {
        content: attr(data-title);
        float: left;
        font-size: 0.8em;
        @media (min-width: ${v.bplisa}) {
          font-size: 0.9em;
        }
        @media (min-width: ${v.bpbart}) {
          content: none;
        }
      }
    }
  }
`;
const Colorcontent = styled.div`
  color: ${(props) => props.color};
  border-radius: 8px;
  border: 1px dashed ${(props) => props.color};
  text-align: center;
  padding: 3px;
  width: 70%;
  font-weight: 700;
  @media ${Device.tablet} {
    width: 100%;
  }
`;
