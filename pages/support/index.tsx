import type { NextPage } from 'next';

import styled from 'styled-components';
// import Support01 from './Support01';
// import Support02 from './Support02';

const SupportBlock = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center; //test setting
  justify-content: center; //test setting
`;

const Support: NextPage = function Home() {
  return (
    <SupportBlock>
      <p>Support</p>
      {/* <Customer01 />
      <Customer02 /> */}
    </SupportBlock>
  );
};

export default Support;
