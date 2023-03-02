import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Accordion from '@components/basicComponent/Accordion';
import { QaType } from '@constants/types/support';
import { supportService } from '@services/support';

const AccordionBlock = styled.div`
  width: 70%;
  margin-top: 24px;
  margin-left: 8px;
`;

const QaSupport: NextPage = function QaSupport() {
  const [data, setData] = useState<QaType[]>([]);

  useEffect(() => {
    supportService.getAllQa().then(qaList => setData(qaList));
  }, []);

  return (
    <AccordionBlock>
      <Accordion data={data} />
    </AccordionBlock>
  );
};

export default QaSupport;
