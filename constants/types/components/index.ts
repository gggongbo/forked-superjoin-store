import { Row } from 'react-table';

export type OptionType = {
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

export type ButtonType = 'button' | 'submit' | 'reset' | undefined;

export type PlaceholderColorType = {
  color: string;
  index?: number;
  opacity?: number | string;
};

export type SearchType = {
  type: string;
  value: string;
};

export interface SubRowProps {
  row: Row<any>;
  type?: string;
}
