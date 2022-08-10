import type { NextPage } from 'next';

import styled from 'styled-components';
// import Login01 from './Login01';
// import Login02 from './Login02';

const LoginBlock = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Login: NextPage = function Home() {
  return (
    <LoginBlock>
      Login
      {/* <Customer01 />
      <Customer02 /> */}
    </LoginBlock>
  );
};

export default Login;
