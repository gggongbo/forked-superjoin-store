import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import logoIcon from '@resources/svg/logo/logo-icon.svg';
import logoTitle from '@resources/svg/logo/logo-title.svg';
import loginBg from '@resources/svg/img/img-login-bg.svg';
import styled from 'styled-components';
import Oval from '@components/basicComponent/Oval';
import ErrorLabel from '@components/basicComponent/ErrorLabel';
import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import InputText from '@components/basicComponent/InputText';
import Button from '@components/basicComponent/Button';
import { Check } from '@components/Icon/basic';

const LoginBlock = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #f1efee;
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
  margin: 50px 0;
  background-color: #d9d9d9;
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
  font-size: 35px;
  color: #282c34;
`;

const RightBox = styled.div`
  flex: 2;
  text-align: center;
`;

const InputDiv = styled.div`
  margin: auto 18% 2% 10%;
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
    height: 1.2rem;
    width: 1.2rem;
    border: 2px solid transparent;
    border-radius: 50%;
    background-image: url(${Check.src});
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #282c34;
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

const SideDiv = styled.div`
  width: 24%;
`;

const CenterDiv = styled.div`
  align-items: center;
  width: 52%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${loginBg.src});
`;

const LoginDiv = styled.div`
  height: 14.5%;
  background-color: rgba(255, 255, 255, 0);
`;

const LoginDivCenter = styled.div`
  height: 71%;
  position: relative;
  background-color: rgba(255, 255, 255, 0);
`;

const LoginBox = styled.div`
  width: 74.5%;
  height: 64.5%;
  margin: -50px 0 0 -50px;
  top: 23%;
  left: 17%;
  position: absolute;
  display: flex;
  background-color: rgba(255, 255, 255, 0);
`;

const LoginBottom = styled.div`
  display: flex;
  position: absolute;
  width: 74.5%;
  height: 64.5%;
  margin: -50px 0 0 -50px;
  top: 98%;
  left: 35%;
`;

const Login: NextPage = function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(true);
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  function changeShowPassword() {
    setShowPassword(!showPassword);
  }

  useEffect(() => {
    const auto = localStorage.getItem('autoLogin');
    if (auto === 'true') {
      setAutoLogin(true);
    } else {
      setAutoLogin(false);
    }
  }, []);

  function onSubmit() {
    if (!loginError) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          router.push('/makeoffer');
        })
        .catch(() => {
          setLoginError(true);
        });
    }
  }

  return (
    <LoginBlock>
      <SideDiv />
      <CenterDiv>
        <LoginDiv />
        <LoginDivCenter>
          <LoginBox>
            <LeftBox>
              <LogoIcon />
              <LogoTitle />
              <LoginOval width={8} height={8} />
              <Text>셀프 관리 서비스</Text>
            </LeftBox>
            <Rectangle />
            <RightBox>
              <Text style={{ margin: '21% 0% 12%', fontSize: '35px' }}>
                로그인
              </Text>
              <InputDiv>
                <p>아이디</p>
                <InputText
                  height={35}
                  customStyle={{
                    border: `solid 1px ${loginError ? '#e63d22' : '#d9d9d9'}`,
                  }}
                  onClick={() => setLoginError(false)}
                  placeholder="Email 입력"
                  onChange={e => setEmail(e.target.value)}
                />
              </InputDiv>
              <InputDiv>
                <p>비밀번호</p>
                <InputText
                  height={35}
                  customStyle={{
                    border: `solid 1px ${loginError ? '#e63d22' : '#d9d9d9'}`,
                  }}
                  onClick={() => setLoginError(false)}
                  placeholder="password"
                  onChange={e => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  onPassword
                  showPassword={showPassword}
                  setShowPassword={() => changeShowPassword()}
                />
                {loginError ? (
                  <ErrorLabel>
                    아이디 혹은 비밀번호를 잘 못 입력했습니다.
                  </ErrorLabel>
                ) : null}
              </InputDiv>
              <InputDiv>
                <StyledInput
                  onChange={() => {
                    setAutoLogin(!autoLogin);
                    localStorage.setItem('autoLogin', String(!autoLogin));
                  }}
                  id="autoLogin"
                  type="checkbox"
                  checked={autoLogin}
                />
                <StyledLabel htmlFor="autoLogin">
                  <StyledP>자동로그인</StyledP>
                </StyledLabel>
                <Button
                  disabled={loginError}
                  onClick={e => {
                    e.preventDefault();
                    onSubmit();
                  }}
                  text="로그인"
                />
              </InputDiv>
            </RightBox>
          </LoginBox>
        </LoginDivCenter>
        <LoginDiv style={{ position: 'relative' }}>
          <LoginBottom>
            <img
              src={logoTitle.src}
              alt="logoTitle"
              width={50}
              height={30}
              style={{ width: '18%' }}
            />
            <p style={{ margin: '0' }}>
              &nbsp;&nbsp;&nbsp;Copyright ⓒ Superjoin Corp. All rights reserved.
            </p>
          </LoginBottom>
        </LoginDiv>
      </CenterDiv>
      <SideDiv />
    </LoginBlock>
  );
};
export default Login;

Login.getInitialProps = async (ctx: { pathname: string }) => {
  const { pathname } = ctx;
  return { pathname };
};
