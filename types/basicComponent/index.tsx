// import { ReactNode } from 'react';
// import { Column, ColumnInterface } from 'react-table';

export type Option = {
  name: string;
  value: string;
};
// todo: table column type add
// export type Column<> extends Column= {
//   accessor: string;
//   Header: ReactNode;
// };

// export type CustomColumn = Column<Object>;

export type Button = 'button' | 'submit' | 'reset' | undefined;

export type PlaceholderColor = {
  color: string;
  index?: number;
  opacity?: number | string;
};
