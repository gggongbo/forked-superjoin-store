import type { NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';

import Accordion from '@components/basicComponent/Accordion';
import { supportKeys } from '@constants/queryKeys';
import { SupportType } from '@constants/types/support';
import { useReactQuery } from '@hooks/useReactQuery';
import { supportService } from '@services/support';

const AccordionBlock = styled.div`
  width: 70%;
  margin-top: 24px;
  margin-left: 8px;
`;

const QaSupport: NextPage = function QaSupport() {
  const [data, setData] = useState<SupportType[]>([]);

  useReactQuery<SupportType[]>(
    supportKeys.getAllQa,
    () => supportService.getAllQa(),
    (resultData: SupportType[]) => setData(resultData),
  );

  return (
    <AccordionBlock>
      <Accordion data={data} />
    </AccordionBlock>
  );
};

export default QaSupport;
