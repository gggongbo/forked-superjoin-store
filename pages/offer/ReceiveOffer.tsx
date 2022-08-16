import type { NextPage } from 'next';
import styled from 'styled-components';

const OfferBlock = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center; //test setting
  justify-content: center; //test setting
`;

const ReceiveOffer: NextPage = function ReceiveOffer() {
  return (
    <OfferBlock>
      <p>receive</p>
    </OfferBlock>
  );
};

export default ReceiveOffer;
