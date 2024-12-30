import type { Column } from "@tanstack/react-table";

export interface ITask {
  id: string;
  title: string;
  description: string;
  completed: "false" | "true";
}

export interface ColumnButtonProps {
  column: Column<any, any>;
}

export interface FilterElementProps {
  value: any;
  onChange: (value: any) => void;
}
