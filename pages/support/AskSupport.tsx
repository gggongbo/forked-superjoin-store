import type { NextPage } from 'next';
import styled, { css } from 'styled-components';
import InputText from '@components/basicComponent/InputText';
import InfoText from '@components/basicComponent/InfoText';
import VerticalSubText from '@components/basicComponent/VerticalSubText';
import Button from '@components/basicComponent/Button';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useAuthUser } from 'next-firebase-auth';
import axios from 'axios';

const AskSupportBlock = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px 8px;
`;

const ContentBlock = styled.form`
  display: flex;
  flex-direction: column;
  width: 720px;
`;

const subjectStyle = css`
  margin-top: 32px;
`;

const contentStyle = css`
  margin-top: 16px;
`;

const buttonStyle = css`
  margin-top: 32px;
`;

interface AskSupportProps {
  supportType: Dispatch<SetStateAction<string>>;
}

const AskSupport: NextPage<AskSupportProps> = function AskSupport({
  supportType,
}) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const { email } = useAuthUser();
  const validation = title.length !== 0 && text.length !== 0;

  // TODO 도메인 설정 후 url 변경
  const send = async () => {
    const ok = window.confirm('문의하기 전송');
    if (ok) {
      const param = { email, title, text };
      await axios
        .post(`http://localhost:3000/api/email/askSupport`, param)
        .then(() => {
          alert('문의가 완료되었습니다.');
          supportType('qa');
        });
    }
  };

  return (
    <AskSupportBlock>
      <InfoText
        width={340}
        content="문의하신 내용은 인증하신 이메일로 답변을 보내드립니다."
      />
      <ContentBlock>
        <VerticalSubText
          title="제목"
          content={
            <InputText
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
          }
          customStyle={subjectStyle}
        />
        <VerticalSubText
          title="내용"
          content={
            <InputText
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setText(e.target.value)
              }
              height={392}
              isArea
            />
          }
          customStyle={contentStyle}
        />
        <Button
          text="문의하기"
          type="button"
          onClick={() => {
            send();
          }}
          customStyle={buttonStyle}
          disabled={!validation}
        />
      </ContentBlock>
    </AskSupportBlock>
  );
};

export default AskSupport;
