import { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import Icon from '../../Icon';

const AccordionItemBlock = styled.div<{ contentVisible: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.singletons.defaultBackground};
  transition: 0.4s;
  border-style: solid;
  border-width: 0px 0px 1px 0px;
  border-color: ${({ theme }) => theme.colors.gray[3]};
`;

const AccordionItemTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 17px 20px;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.div`
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  margin-left: 11px;
`;

const AccordionItemContent = styled.div<{ visible: boolean }>`
  overflow: hidden;
  max-height: ${({ visible }) => (visible ? 1000 : 0)}px;
  transition: max-height
    ${({ visible }) => (visible ? `0.5s ease-in` : `0.25s ease-out`)};
`;

const ContentBlock = styled.div`
  padding: 16px 20px;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray[1]};
`;

const ContentText = styled.div`
  font-size: 14px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text[4]};
`;

const ArrowBlock = styled.div<{ contentVisible: boolean }>`
  display: flex;
  transform: rotateZ(
    ${({ contentVisible }) => (contentVisible ? '180deg' : '0deg')}
  );
  transition: transform 0.4s;
`;

export interface AccordionItemProps {
  title: string;
  icon?: string;
  content: string;
}

const AccordionItem: FC<AccordionItemProps> = function AccordionItem({
  title,
  icon = 'MarkQ',
  content,
}) {
  const [visible, setVisible] = useState<boolean>(false);

  const onClick = useCallback(() => setVisible(prev => !prev), []);
  return (
    <AccordionItemBlock contentVisible={visible}>
      <AccordionItemTitle onClick={onClick}>
        <TitleBlock>
          <Icon name={icon} width={16} height={16} />
          <Title>{title}</Title>
        </TitleBlock>
        <ArrowBlock contentVisible={visible}>
          <Icon name="ChevronDown" width={20} height={20} />
        </ArrowBlock>
      </AccordionItemTitle>
      <AccordionItemContent visible={visible}>
        <ContentBlock>
          <ContentText>{content}</ContentText>
        </ContentBlock>
      </AccordionItemContent>
    </AccordionItemBlock>
  );
};

AccordionItem.defaultProps = {
  icon: 'MarkQ',
};

export { AccordionItem };
