import type { NextPage } from 'next';
import styled from 'styled-components';
import Accordion from '@components/basicComponent/Accordion';
import { useEffect, useState } from 'react';
import { qaService } from '@service/support/qa';

const AccordionBlock = styled.div`
  width: 70%;
  margin-top: 24px;
  margin-left: 8px;
`;

const QaSupport: NextPage = function QaSupport() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // @ts-ignore
    qaService.getAll().then(qaList => setData(qaList));
  }, []);

  return (
    <AccordionBlock>
      <Accordion data={data} />
    </AccordionBlock>
  );
};

export default QaSupport;
