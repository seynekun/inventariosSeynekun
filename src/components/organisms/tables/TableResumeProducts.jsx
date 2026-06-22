import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styled from "styled-components";
import { ContentAccionesTabla } from "../ContentAccionesTabla";
import Swal from "sweetalert2";
import { v } from "../../../styles/variables";
import { FaArrowsAltV } from "react-icons/fa";
import { Paginated } from "./Paginated";
import { useState } from "react";
import { Buscador } from "../Buscador";
import { useCallback } from "react";
import { useResumeProductsStore } from "../../../store/useResumeProductsStore";
import { Link } from "react-router-dom";

export const TableResumeProducts = ({
  data,
  SetopenRegistro,
  setdataSelect,
  setAccion,
}) => {
  const deleteresumeproducts = useResumeProductsStore(
    (state) => state.deleteresumeproducts,
  );
  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  function eliminar(p) {
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
        await deleteresumeproducts({ id: p });
      }
    });
  }
  function editar(data) {
    SetopenRegistro(true);
    setdataSelect(data);
    setAccion("Editar");
  }
  const columns = [
    {
      accessorKey: "nombre",
      header: "Producto",
      cell: (info) => <span>{info.getValue()}</span>,
      filterFn: "includesString",
    },

    {
      accessorKey: "modelo",
      header: "Modelo",
      enableSorting: false,
      cell: (info) => (
        <td data-title="Modelo" className="ContentCell">
          <span>{info.getValue()}</span>
        </td>
      ),
      enableColumnFilter: false,
    },
    {
      accessorKey: "cod_inventario",
      header: "Cod.Inventario",
      enableSorting: false,
      cell: (info) => (
        <td data-title="Cod.Inventario" className="ContentCell">
          <span>{info.getValue()}</span>
        </td>
      ),
      enableColumnFilter: false,
    },
    {
      accessorKey: "ubicacion",
      header: "Ubicación",
      enableSorting: false,
      cell: (info) => (
        <td data-title="Ubicación" className="ContentCell">
          <span>{info.getValue()}</span>
        </td>
      ),
      enableColumnFilter: false,
    },
    {
      accessorKey: "marca",
      header: "Marca",
      enableSorting: false,
      cell: (info) => (
        <td data-title="Marca" className="ContentCell">
          <span>{info.getValue()}</span>
        </td>
      ),
      enableColumnFilter: false,
    },
    {
      accessorKey: "serial",
      header: "Serial",
      enableSorting: false,
      cell: (info) => (
        <td data-title="Serial" className="ContentCell">
          <span>{info.getValue()}</span>
        </td>
      ),
      enableColumnFilter: false,
    },
    {
      accessorKey: "responsable",
      header: "Responsable",
      enableSorting: false,
      cell: (info) => (
        <td data-title="Responsable" className="ContentCell">
          <span>{info.getValue()}</span>
        </td>
      ),
      enableColumnFilter: false,
    },
    {
      accessorKey: "acciones",
      header: "",
      enableSorting: false,
      cell: (info) => (
        <>
          <td data-title="Acciones" className="ContentCell">
            <ContentAccionesTabla
              funcionEditar={() => editar(info.row.original)}
              funcionEliminar={() => eliminar(info.row.original.id)}
              stateeditar={true}
              stateView={true}
            >
              <Link
                className="link-nav"
                to={`/configurar/hojasvida/${info.row.original.id}/view`}
              >
                <v.iconoVisualizar color="#276CF5" />
              </Link>
            </ContentAccionesTabla>
          </td>
        </>
      ),
      enableColumnFilter: false,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const handleFilter = useCallback(
    (value) => {
      table.getColumn("nombre")?.setFilterValue(value);
      setPagination((prev) =>
        prev.pageIndex === 0
          ? prev
          : {
              ...prev,
              pageIndex: 0,
            },
      );
    },
    [table],
  );
  return (
    <Container>
      <section className="area2">
        <Buscador
          value={table.getColumn("nombre")?.getFilterValue() ?? ""}
          onChange={handleFilter}
          placeholder="Buscar"
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
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`resizer ${
                      header.column.getIsResizing() ? "isResizing" : ""
                    }`}
                  />
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
      <Paginated
        table={table}
        irinicio={() => table.setPageIndex(0)}
        pagina={table.getState().pagination.pageIndex + 1}
        maximo={table.getPageCount()}
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  border: 1px solid #6a6b6c;
  padding: 20px;
  border-radius: 15px;
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
    .link-nav {
      font-size: 22px;
      cursor: pointer;
    }

    .imagen {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 8px;
      border: 1px solid #ccc;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease-in-out;

      &:hover {
        transform: scale(1.1);
      }

      @media (max-width: 768px) {
        width: 40px;
        height: 40px;
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
        .contentCategoria {
          color: ${(props) => props.color};
          background-color: ${(props) => props.color};
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
