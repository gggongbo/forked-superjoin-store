import type { NextPage } from 'next';

import styled from 'styled-components';
// import MakeOffer01 from './MakeOffer01';
// import MakeOffer02 from './MakeOffer02';

const MakeOfferBlock = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center; //test setting
  justify-content: center; //test setting
`;

const MakeOffer: NextPage = function MakeOffer() {
  return (
    <MakeOfferBlock>
      <p>MakeOffer</p>
      {/* <Customer01 />
      <Customer02 /> */}
    </MakeOfferBlock>
  );
};

export default MakeOffer;
