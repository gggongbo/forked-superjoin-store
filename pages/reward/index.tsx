import type { NextPage } from 'next';

import styled from 'styled-components';
// import Reward01 from './Reward01';
// import Reward02 from './Reward02';

const RewardBlock = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center; //test setting
  justify-content: center; //test setting
`;

const Reward: NextPage = function Home() {
  return (
    <RewardBlock>
      <p>Reward</p>
      {/* <Customer01 />
      <Customer02 /> */}
    </RewardBlock>
  );
};

export default Reward;
