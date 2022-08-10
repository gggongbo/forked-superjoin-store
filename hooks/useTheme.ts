import { useTheme as useSCTheme } from 'styled-components';
import { Theme } from '@styles/theme/index';

declare module 'styled-components' {
  export type ProjectDefaultTheme = Theme;
}

const useTheme = () => {
  const theme = useSCTheme();
  return theme;
};

export { useTheme };
