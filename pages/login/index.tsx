import type { NextPage } from 'next';
import logoIcon from '@resources/svg/logo/logo-icon.svg';
import logoTitle from '@resources/svg/logo/logo-title.svg';
import loginBg from '@resources/svg/img/img-login-bg.svg';
import styled from 'styled-components';
import Oval from '@components/basicComponent/Oval';

const LoginBlock = styled.main`
  width: 100vw;
  height: 100vh;
  text-align: center;
  background-color: #f1efee;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${loginBg.src});
`;

const LoginDiv = styled.div`
  height: 65.5%;
  width: 53%;
  margin: 10% auto;
  display: flex;
  background-color: rgba(255, 255, 255, 0);
`;

const LogoIcon = styled.div`
  height: 12%;
  margin: 40% 40% 5% 35%;
  display: inline-block;
  aspect-ratio: 1;
  background-image: url(${logoIcon.src});
  background-position: center;
  background-size: cover;
`;

const LogoTitle = styled.div`
  height: 14%;
  width: 53%;
  display: inline-block;
  margin: auto;
  aspect-ratio: 1;
  background-image: url(${logoTitle.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Rectangle = styled.div`
  width: 1px;
  height: 80%;
  margin: 50px 0px;
  background-color: #eaeaea;
`;

const LeftBox = styled.div`
  flex: 1.6;
  text-align: center;
`;

const LoginOval = styled(Oval)`
  margin: auto;
`;

const Text = styled.div`
  margin: 7%;
  font-family: 'NotoSansCJKkr';
  font-size: 35px;
  color: #282c34;
`;

const RightBox = styled.div`
  flex: 2;
  text-align: center;
`;

const Button = styled.button`
  width: 100%;
  height: 44px;
  margin: auto;
  border: none;
  font-family: 'NotoSansCJKkr';
  font-size: 14px;
  border-radius: 6px;
  background: #0d6efd;
  color: #ffffff;

  :disabled {
    background: #cfcfcf;
  }

  :hover {
    background-color: blue;
  }

  :active {
    position: relative;
    top: 1px;
  }
`;

const InputBox = styled.input`
  width: 100%;
  height: 35px;
  padding-left: 20px;
  border-radius: 6px;
  border: solid 1px #eaeaea;
  background-color: #ffffff;
`;

const InputDiv = styled.div`
  margin: auto 18% 6% 10%;
  text-align: left;
`;

const StyledLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: default;
  &:before {
    display: block;
    content: '';
    height: 1.5rem;
    width: 1.5rem;
    background-color: #eaeaea;
    border-radius: 50%;
  }
  &:after {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    display: block;
    opacity: 0;
    content: '';
    height: 1.5rem;
    width: 1.5rem;
    border: 2px solid transparent;
    border-radius: 50%;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: blue;
  }
`;

const StyledInput = styled.input`
  position: absolute;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  white-space: nowrap;
  width: 1px;
  &:checked + ${StyledLabel} {
    :after {
      opacity: 1;
    }
  }
`;

const StyledP = styled.p`
  margin-left: 0.5rem;
`;

const Login: NextPage = function Home() {
  return (
    <LoginBlock>
      <LoginDiv>
        <LeftBox>
          <LogoIcon />
          <LogoTitle />
          <LoginOval width={8} height={8} />
          <Text>셀프 관리 서비스</Text>
        </LeftBox>
        <Rectangle />
        <RightBox>
          <Text style={{ margin: '21% 0% 12%', fontSize: '35px' }}>로그인</Text>
          <InputDiv>
            <p>Email</p>
            <InputBox id="email" placeholder="Email 입력" />
          </InputDiv>
          <InputDiv>
            <p>비밀번호</p>
            <InputBox id="password" placeholder="password" type="password" />
          </InputDiv>
          <InputDiv>
            <StyledInput type="checkbox" id="autoLogin" name="autoLogin" />
            <StyledLabel htmlFor="autoLogin">
              <StyledP>자동로그인</StyledP>
            </StyledLabel>
            <Button>로그인</Button>
          </InputDiv>
        </RightBox>
      </LoginDiv>
    </LoginBlock>
  );
};

export default Login;
