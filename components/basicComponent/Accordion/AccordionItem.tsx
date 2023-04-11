import { FC, useCallback, useState } from 'react';
import styled from 'styled-components';

import Icon from '@components/Icon';

const AccordionItemBlock = styled.div<{ contentVisible: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.singletons.defaultBackground};
  transition: 0.4s;
  border-style: solid;
  border-width: 0px 0px 1px 0px;
  border-color: ${({ theme }) => theme.colors.gray[300]};
  :hover {
    background-color: ${({ theme }) => `${theme.colors.green[100]}24`};
  }
  :active,
  :visited {
    background-color: ${({ theme }) => `${theme.colors.green[100]}60`};
  }
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

const Title = styled.pre`
  font-family: 'Noto Sans KR';
  font-size: 15px;
  font-weight: 500;
  text-align: center;
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
  background-color: ${({ theme }) => theme.colors.gray[200]};
`;

const ContentText = styled.div`
  font-family: 'Noto Sans KR';
  font-size: 14px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text[400]};
  white-space: pre-wrap;
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
