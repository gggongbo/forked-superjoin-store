import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import Button from '@components/BasicComponent/Button';
import InfoText from '@components/BasicComponent/InfoText';
import InputText from '@components/BasicComponent/InputText';
import VerticalSubText from '@components/BasicComponent/VerticalSubText';
import { ReduxStoreType } from '@constants/types/redux';
import { useConfirm } from '@hooks/useConfirm';

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

const AskSupport: FC<AskSupportProps> = function AskSupport({ supportType }) {
  const email = useSelector<ReduxStoreType, string | null>(
    ({ auth }) => auth?.currentUser?.email,
  );
  const [title, setTitle] = useState<string>();
  const [text, setText] = useState<string>();
  const { confirm } = useConfirm();

  const askSubmit = useCallback(() => {
    if (!email || !title?.length || !text?.length) return;
    confirm(
      '문의하신 내용은 인증하신 이메일로 답변을 보내드립니다. 문의하시겠습니까?',
      () => {
        fetch('/api/support/askSupport', {
          method: 'POST',
          body: JSON.stringify({ email, title, text }),
        }).then(() => {
          alert('문의가 완료되었습니다.');
          supportType('qa');
        });
      },
    );
  }, [confirm, email, supportType, text, title]);

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
            askSubmit();
          }}
          customStyle={buttonStyle}
          disabled={!title?.length || !text?.length}
        />
      </ContentBlock>
    </AskSupportBlock>
  );
};

export default AskSupport;
