import type { NextPage } from 'next';
import styled from 'styled-components';
import Accordion from '@components/basicComponent/Accordion';

const AccordionBlock = styled.div`
  width: 70%;
  margin-top: 24px;
  margin-left: 8px;
`;

const QaSupport: NextPage = function QaSupport() {
  const data = [
    { title: '리워드 충전은 어떻게 하나요?', content: 'tt' },
    { title: 'test2', content: 'tt' },
  ]; // TODO: get data from server
  return (
    <AccordionBlock>
      <Accordion data={data} />
    </AccordionBlock>
  );
};

export default QaSupport;
