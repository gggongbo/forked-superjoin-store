import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import { deviceSizes } from '@styles/theme/media';

const useMobile = () => {
  const [mobile, setMobile] = useState<boolean>(false);
  const isMobile = useMediaQuery({ maxWidth: deviceSizes.mobile });

  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);
  return { mobile };
};

export { useMobile };
