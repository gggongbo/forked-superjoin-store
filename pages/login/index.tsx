import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef, useCallback } from 'react';
import logoIcon from '@resources/svg/logo/logo-icon.svg';
import logoTitle from '@resources/svg/logo/logo-title.svg';
import loginBg from '@resources/svg/img/img-login-bg.svg';
import styled, { css } from 'styled-components';
import Oval from '@components/basicComponent/Oval';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import InputText from '@components/basicComponent/InputText';
import Button from '@components/basicComponent/Button';
import Divider from '@components/basicComponent/Divider';
import VerticalSubText from '@components/basicComponent/VerticalSubText';
import Icon from '@components/Icon';
import CheckboxText from '@components/basicComponent/CheckboxText';
import { useAppDispatch } from '~/store';
import { userActions } from '~/slice/user';
import { userService } from '@service/user';

const LoginBlock = styled.main`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.singletons.loginBackground};
`;

const LoginContentBlock = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const LoginBackgroundBlock = styled.div`
  display: flex;
  width: 1000px;
  height: 800px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${loginBg.src});
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  margin: 140px 120px;
`;

const LeftBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoIcon = styled.div`
  width: 68px;
  aspect-ratio: 0.9;
  background-image: url(${logoIcon.src});
  background-position: center;
  background-size: cover;
`;

const LogoTitle = styled.div`
  width: 172px;
  aspect-ratio: 4;
  background-image: url(${logoTitle.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 29px;
  margin-bottom: 22px;
`;

const TitleText = styled.div`
  font-size: 26px;
  color: ${({ theme }) => theme.colors.text[6]};
  margin-top: 22px;
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 60px;
`;

const LoginText = styled.div`
  font-size: 24px;
  font-weight: 500;
`;

const IDBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 31px;
`;

const PasswordBox = styled.div<{ height?: number }>`
  display: flex;
  flex-direction: column;
  height: ${({ height }) => (height || 0) + 45}px;
  margin-top: 24px;
`;

const ErrorLabel = styled.label`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.singletons.errorRed};
  margin-top: 8px;
`;

const AutoLoginBox = styled.div`
  align-self: flex-start;
  margin-bottom: 24px;
`;

const FooterBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 32px;
`;

const FooterLogoTitle = styled.div`
  width: 80px;
  aspect-ratio: 4;
  background-image: url(${logoTitle.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const FooterTitleText = styled.div`
  font-size: 12px;
  letter-spacing: -0.27px;
  color: ${({ theme }) => `${theme.colors.text[6]}64`};
  text-align: center;
  margin-left: 16px;
`;

const subTextStyle = css`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text[6]};
  align-items: flex-start;
`;

const inputTextStyle = css`
  padding: 8px 12px 8px 0px;
`;

const Login: NextPage = function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [autoLogin, setAutoLogin] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordBoxHeight, setPasswordBoxHeight] = useState<number>(0);
  const passwordBoxRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const auto = localStorage.getItem('autoLogin');
    if (auto === 'true') {
      setAutoLogin(true);
    } else {
      setAutoLogin(false);
    }
    if (passwordBoxRef.current) {
      const { clientHeight } = passwordBoxRef.current;
      setPasswordBoxHeight(clientHeight);
    }
  }, []);

  const onSubmit = useCallback(
    (e: Event) => {
      e.preventDefault();
      if (!loginError) {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
          .then(async () => {
            if (auth?.currentUser?.uid) {
              if (auth?.currentUser?.email != null) {
                dispatch(
                  userActions.setCurrentUser(
                    await userService.findStoreInfo(auth?.currentUser?.email),
                  ),
                );
              }
            }
            router.push('/makeoffer');
          })
          .catch(() => {
            setLoginError(true);
          });
      }
    },
    [dispatch, email, loginError, password, router],
  );

  return (
    <LoginBlock>
      <LoginContentBlock>
        <LoginBackgroundBlock>
          <LoginBox>
            <LeftBox>
              <LogoIcon />
              <LogoTitle />
              <Oval width={6} height={6} />
              <TitleText>셀프 관리 서비스</TitleText>
            </LeftBox>
            <Divider isVertical />
            <RightBox>
              <LoginText>로그인</LoginText>
              <IDBox>
                <VerticalSubText
                  title="아이디"
                  customStyle={subTextStyle}
                  content={
                    <InputText
                      width={300}
                      isError={loginError}
                      onClick={() => setLoginError(false)}
                      placeholder="Email 입력"
                      onChange={e => setEmail(e.target.value)}
                      customStyle={inputTextStyle}
                    />
                  }
                />
              </IDBox>
              <PasswordBox height={passwordBoxHeight}>
                <VerticalSubText
                  ref={passwordBoxRef}
                  title="비밀번호"
                  customStyle={subTextStyle}
                  content={
                    <InputText
                      width={300}
                      isError={loginError}
                      onClick={() => setLoginError(false)}
                      placeholder="password"
                      onChange={e => setPassword(e.target.value)}
                      type={showPassword ? 'text' : 'password'}
                      customStyle={inputTextStyle}
                      rightComponent={
                        <Icon
                          name={showPassword ? 'EyeOn' : 'EyeOff'}
                          width={20}
                          height={20}
                          color="gray"
                          colorIndex={6}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      }
                    />
                  }
                />
                {loginError && (
                  <ErrorLabel>
                    아이디 혹은 비밀번호를 잘못 입력했습니다.
                  </ErrorLabel>
                )}
              </PasswordBox>
              <AutoLoginBox>
                <CheckboxText
                  title="자동로그인"
                  isChecked={autoLogin}
                  onClick={() => {
                    setAutoLogin(!autoLogin);
                    localStorage.setItem('autoLogin', String(!autoLogin));
                  }}
                />
              </AutoLoginBox>
              <Button
                width={300}
                disabled={loginError}
                onClick={e => onSubmit(e)}
                text="로그인"
              />
            </RightBox>
          </LoginBox>
        </LoginBackgroundBlock>
      </LoginContentBlock>
      <FooterBlock>
        <FooterLogoTitle />
        <FooterTitleText>
          Copyright ⓒ Superjoin Corp. All rights reserved.
        </FooterTitleText>
      </FooterBlock>
    </LoginBlock>
  );
};
export default Login;

Login.getInitialProps = async (ctx: { pathname: string }) => {
  const { pathname } = ctx;
  return { pathname };
};
