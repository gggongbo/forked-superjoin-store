import { FC } from 'react';
import styled from 'styled-components';

import Accordion from '@components/BasicComponent/Accordion';
import { SupportType } from '@constants/types/support';

const AccordionBlock = styled.div`
  width: 70%;
  margin-top: 24px;
  margin-left: 8px;
`;

interface QaSupportProps {
  initialData: SupportType[];
}

const QaSupport: FC<QaSupportProps> = function QaSupport({ initialData }) {
  return (
    <AccordionBlock>
      <Accordion data={initialData} />
    </AccordionBlock>
  );
};

export default QaSupport;
