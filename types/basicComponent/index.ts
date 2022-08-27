// import { ReactNode } from 'react';
// import { Column, ColumnInterface } from 'react-table';

export type Option = {
  name: string | number;
  value: string | number;
};

export type IconType = {
  name: string;
  width: number;
  height: number;
};

export type Button = 'button' | 'submit' | 'reset' | undefined;

export type PlaceholderColor = {
  color: string;
  index?: number;
  opacity?: number | string;
};

export type Search = {
  type: string;
  value: string;
};
