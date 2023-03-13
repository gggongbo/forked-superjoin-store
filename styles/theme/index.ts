import * as colors from './colors';
import { media, componentSizes } from './media';

declare type Recursive<T> = {
  [P in keyof T]: Recursive<T[P]>;
};

type Colors = Recursive<typeof colors>;
type Media = Recursive<typeof media>;
type ComponentSizes = Recursive<typeof componentSizes>;

export interface Theme {
  colors: Colors;
  media: Media;
  componentSizes: ComponentSizes;
}

export const theme: Theme = {
  colors,
  media,
  componentSizes,
};
