import type { NextPage } from 'next';

import styled from 'styled-components';
// import Offer01 from './Offer01';
// import Offer02 from './Offer02';

const OfferBlock = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center; //test setting
  justify-content: center; //test setting
`;

const Offer: NextPage = function Home() {
  return (
    <OfferBlock>
      <p>Offer</p>
      {/* <Customer01 />
      <Customer02 /> */}
    </OfferBlock>
  );
};

export default Offer;
