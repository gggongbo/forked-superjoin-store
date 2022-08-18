import type { NextPage } from 'next';
import styled, { css } from 'styled-components';
import InputText from '@components/basicComponent/InputText';
import InfoText from '@components/basicComponent/InfoText';
import VerticalSubText from '@components/basicComponent/VerticalSubText';
import Button from '@components/basicComponent/Button';

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

const AskSupport: NextPage = function AskSupport() {
  return (
    <AskSupportBlock>
      <InfoText
        width={340}
        content="문의하신 내용은 인증하신 이메일로 답변을 보내드립니다."
      />

      <ContentBlock>
        <VerticalSubText
          title="제목"
          content={<InputText />}
          customStyle={subjectStyle}
        />
        <VerticalSubText
          title="내용"
          content={<InputText height={392} isArea />}
          customStyle={contentStyle}
        />
        <Button
          text="문의하기"
          type="button"
          onClick={() => {
            alert('click');
          }}
          customStyle={buttonStyle}
        />
      </ContentBlock>
    </AskSupportBlock>
  );
};

export default AskSupport;
