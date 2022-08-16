import type { NextPage } from 'next';
import styled from 'styled-components';

const OfferBlock = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center; //test setting
  justify-content: center; //test setting
`;

const SendOffer: NextPage = function SendOffer() {
  return (
    <OfferBlock>
      <p>send</p>
    </OfferBlock>
  );
};

export default SendOffer;
