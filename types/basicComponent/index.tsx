import { ReactNode } from 'react';

export type Option = string | number;
export type Column<> = {
  accessor: string;
  Header: ReactNode;
};
export type Button = 'button' | 'submit' | 'reset' | undefined;
