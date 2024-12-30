import React from "react";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef, flexRender } from "@tanstack/react-table";
import {
  List,
  ShowButton,
  EditButton,
  DeleteButton,
  DateField,
} from "@refinedev/chakra-ui";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  Text,
  Select,
} from "@chakra-ui/react";

import { ColumnFilter, ColumnSorter } from "../../components/table";
import { Pagination } from "../../components/pagination";
import type { FilterElementProps, ITask } from "../../interfaces";

export const TaskList: React.FC = () => {
  const columns = React.useMemo<ColumnDef<ITask>[]>(
    () => [
      {
        id: "title",
        header: "Titulo",
        accessorKey: "title",
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "description",
        header: "description",
        accessorKey: "description",
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "Estatus",
        header: "Estatus",
        accessorKey: "completed",
        cell: function render({ getValue }) {
          const status = getValue() === true ? "Culminada" : "En proceso";
          return <span>{status}</span>;
        },
        meta: {
          filterElement: function render(props: FilterElementProps) {
            return (
              <Select
                borderRadius="md"
                size="sm"
                placeholder="Todos los estados"
                {...props}
              >
                <option value="false">En proceso</option>
                <option value="true">Culminada</option>
              </Select>
            );
          },
          filterOperator: "eq",
        },
      },
      {
        id: "createdAt",
        header: "Fecha de creación",
        accessorKey: "createdAt",
        cell: function render({ getValue }) {          return <DateField value={getValue() as string} format="LLL" />;
        },
        enableColumnFilter: false,
      },
      {
        id: "Opciones",
        header: "Acciones",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
        cell: function render({ getValue }) {
          return (
            <HStack>
              <ShowButton
                hideText
                size="sm"
                recordItemId={getValue() as number}
              />
              <EditButton
                hideText
                size="sm"
                recordItemId={getValue() as number}
              />
              <DeleteButton
                hideText
                size="sm"
                recordItemId={getValue() as number}
              />
            </HStack>
          );
        },
      },
    ],
    [],
  );

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: {
      setCurrent,
      pageCount,
      current,
    },
  } = useTable({
    columns,
    refineCoreProps: {
      initialSorter: [
        {
          field: "id",
          order: "desc",
        },
      ],
    },
  });
  return (
    <List>
      <TableContainer whiteSpace="pre-line">
        <Table variant="simple">
          <Thead>
            {getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {!header.isPlaceholder && (
                      <HStack spacing="2">
                        <Text>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </Text>
                        <HStack spacing="2">
                          <ColumnSorter column={header.column} />
                          <ColumnFilter column={header.column} />
                        </HStack>
                      </HStack>
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        current={current}
        pageCount={pageCount}
        setCurrent={setCurrent}
      />
    </List>
  );
};
