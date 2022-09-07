import { Row } from 'react-table';

export type Option = {
  name: string | number;
  value: string | number;
};

export type IconType = {
  name: string;
  width: number;
  height: number;
  color?: string | undefined;
  colorIndex?: number | undefined;
  opacity?: number | undefined;
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

export interface SubRowProps {
  row: Row<any>;
  type?: string;
}
