import { FC, memo } from 'react';
import styled from 'styled-components';
import { AccordionItem, AccordionItemProps } from './AccordionItem';

const AccordionBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

interface AccordionProps {
  data: AccordionItemProps[];
}

const Accordion: FC<AccordionProps> = function Accordion(props) {
  const { data = [] } = props;

  return (
    <AccordionBlock>
      {data.map((item, index) => {
        const { title, content } = item;
        // eslint-disable-next-line react/no-array-index-key
        return <AccordionItem key={index} title={title} content={content} />;
      })}
    </AccordionBlock>
  );
};

export default memo(Accordion);
