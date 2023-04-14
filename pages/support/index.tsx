import type { NextPage } from 'next';
import { useState, useMemo } from 'react';
import styled from 'styled-components';

import AskSupport from './AskSupport';
import QaSupport from './QaSupport';

import Divider from '@components/BasicComponent/Divider';
import Header from '@components/BasicComponent/Header';

const SupportBlock = styled.main`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.componentSizes.pagePadding}px;
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderText = styled.div<{ supportType: string; defaultValue: string }>`
  font-size: 24px;
  letter-spacing: -0.55px;
  font-weight: ${props => props.supportType === props.defaultValue && 500};
  color: ${props =>
    props.supportType === props.defaultValue
      ? props.theme.colors.text[600]
      : props.theme.colors.text[200]};
`;

const HeaderDivider = styled(Divider)`
  margin: 0px 20px 0px 20px;
  height: 24px;
  border-color: ${props => props.theme.colors.gray[600]};
`;

const Support: NextPage = function Support() {
  const [supportType, setSupportType] = useState('qa');

  const headerLeftComponent = useMemo(() => {
    return (
      <HeaderBlock>
        <HeaderText
          onClick={() => setSupportType('qa')}
          supportType={supportType}
          defaultValue="qa"
        >
          자주 묻는 질문
        </HeaderText>
        <HeaderDivider isVertical />
      </HeaderBlock>
    );
  }, [supportType]);

  const headertitleComponent = useMemo(() => {
    return (
      <HeaderBlock>
        <HeaderText
          onClick={() => setSupportType('ask')}
          supportType={supportType}
          defaultValue="ask"
        >
          1:1 문의
        </HeaderText>
      </HeaderBlock>
    );
  }, [supportType]);

  return (
    <SupportBlock>
      <Header
        titleComponent={headertitleComponent}
        leftComponent={headerLeftComponent}
      />
      {supportType === 'qa' ? (
        <QaSupport />
      ) : (
        <AskSupport supportType={setSupportType} />
      )}
    </SupportBlock>
  );
};

export default Support;
