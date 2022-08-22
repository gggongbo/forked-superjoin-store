import type { NextPage } from 'next';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import Divider from '@components/basicComponent/Divider';
import Header from '@components/basicComponent/Header';
import SelectInputText from '@components/basicComponent/SelectInputText';
import ReceiveOffer from './ReceiveOffer';
import SendOffer from './SendOffer';

const optionList = [
  { name: '제목', value: 'title' },
  { name: '내용', value: 'content' },
];

const OfferBlock = styled.main`
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderText = styled.div<{ offerType: string; defaultValue: string }>`
  font-size: 24px;
  letter-spacing: -0.55px;
  font-weight: ${props => props.offerType === props.defaultValue && 500};
  color: ${props =>
    props.offerType === props.defaultValue
      ? props.theme.colors.text[6]
      : props.theme.colors.text[2]};
`;

const HeaderDivider = styled(Divider)`
  margin: 0px 20px 0px 20px;
  height: 24px;
  border-color: ${props => props.theme.colors.gray[6]};
`;

const HeaderRightBlock = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const Offer: NextPage = function Offer() {
  const [offerType, setOfferType] = useState('send');

  const headerLeftComponent = useMemo(() => {
    return (
      <HeaderBlock>
        <HeaderText
          onClick={() => setOfferType('send')}
          offerType={offerType}
          defaultValue="send"
        >
          보낸 제안 관리
        </HeaderText>
        <HeaderDivider isVertical />
      </HeaderBlock>
    );
  }, [offerType]);

  const headerRightComponent = useMemo(() => {
    return (
      <HeaderRightBlock>
        <SelectInputText optionList={optionList} />
      </HeaderRightBlock>
    );
  }, []);

  const headertitleComponent = useMemo(() => {
    return (
      <HeaderBlock>
        <HeaderText
          onClick={() => setOfferType('receive')}
          offerType={offerType}
          defaultValue="receive"
        >
          받은 제안 관리
        </HeaderText>
      </HeaderBlock>
    );
  }, [offerType]);

  return (
    <OfferBlock>
      <Header
        titleComponent={headertitleComponent}
        leftComponent={headerLeftComponent}
        rightComponent={headerRightComponent}
      />
      {offerType === 'send' ? <SendOffer /> : <ReceiveOffer />}
    </OfferBlock>
  );
};

export default Offer;
