import { FC, ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

import { deviceSizes } from '@styles/theme/media';

interface MediaComponentProps {
  children: ReactNode;
}

const MediaComponentBlock = styled.div``;

const MobileComponent: FC<MediaComponentProps> = function MobileComponent(
  props,
) {
  const { children } = props;
  const isMobile = useMediaQuery({ maxWidth: deviceSizes.mobile });
  return <MediaComponentBlock>{isMobile && children}</MediaComponentBlock>;
};

const PcComponent: FC<MediaComponentProps> = function PcComponent(props) {
  const { children } = props;
  const isPc = useMediaQuery({ minWidth: deviceSizes.mobile });
  return <MediaComponentBlock>{isPc && children}</MediaComponentBlock>;
};

export { MobileComponent, PcComponent };
