import type { NextPage } from 'next';

import styled from 'styled-components';
// import Customer01 from './Customer01';
// import Customer02 from './Customer02';

const CustomerBlock = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center; //test setting
  justify-content: center; //test setting
`;

const Customer: NextPage = function Home() {
  return (
    <CustomerBlock>
      <p>Customer</p>
      {/* <Customer01 />
      <Customer02 /> */}
    </CustomerBlock>
  );
};

export default Customer;
