import type { NextPage } from 'next';
import Divider from '@components/basicComponent/Divider';
import Header from '@components/basicComponent/Header';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import ReceiveOffer from './ReceiveOffer';
import SendOffer from './SendOffer';

const OfferBlock = styled.main`
  display: flex;
  flex-direction: column;
  padding: 24px;
  /* align-items: center; //test setting
  justify-content: center; //test setting */
`;

const HeaderLeftBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderLeftText = styled.div<{ offerType: string; defaultValue: string }>`
  font-size: 24px;
  letter-spacing: -0.55px;
  font-weight: ${props => props.offerType !== props.defaultValue && 500};
  color: ${props =>
    props.offerType === props.defaultValue
      ? props.theme.colors.text[2]
      : props.theme.colors.text[6]};
`;

const HeaderDivider = styled(Divider)`
  margin: 0px 20px 0px 20px;
  height: 24px;
  border-color: ${props => props.theme.colors.gray[6]};
`;

const Offer: NextPage = function Offer() {
  const [offerType, setOfferType] = useState('send');
  const headerLeftComponent = useMemo(() => {
    return (
      <HeaderLeftBlock>
        <HeaderLeftText
          onClick={() => setOfferType('send')}
          offerType={offerType}
          defaultValue="send"
        >
          보낸 제안 관리
        </HeaderLeftText>
        <HeaderDivider isVertical />
      </HeaderLeftBlock>
    );
  }, [offerType]);

  return (
    <OfferBlock>
      <Header
        titleOnClick={() => setOfferType('receive')}
        title="받은 제안 관리"
        leftComponent={headerLeftComponent}
      />
      {offerType === 'send' ? <SendOffer /> : <ReceiveOffer />}
    </OfferBlock>
  );
};

export default Offer;
