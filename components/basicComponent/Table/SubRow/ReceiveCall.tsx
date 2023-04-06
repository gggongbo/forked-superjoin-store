import { format } from 'date-fns';
import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';

import Button from '@components/basicComponent/Button';
import IconButton from '@components/basicComponent/IconButton';
import InputText from '@components/basicComponent/InputText';
import SubText from '@components/basicComponent/SubText';
import { callKeys } from '@constants/queryKeys';
import {
  CallStatusType,
  CommentType,
  RegisterCommentCallParamType,
  StoreInfoType,
} from '@constants/types/call';
import { useReactMutation } from '@hooks/useReactMutation';
import { callService } from '@services/call';
import { singletons } from '@styles/theme/colors';

const AppealBoxBlock = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  margin-left: 13px;
  position: relative;
`;

const ButtonBackgroundBlock = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  position: absolute;
  background-color: ${({ theme }) => `${theme.colors.singletons.white}00`};

  :hover {
    background-color: ${({ theme }) => `${theme.colors.singletons.white}30`};
  }

  :active,
  :visited {
    background-color: ${({ theme }) => `${theme.colors.singletons.black}10`};
  }
`;

const AppealTimeBlock = styled.div<{ disabled?: boolean }>`
  font-size: 13px;
  color: ${({ disabled, theme }) =>
    disabled ? `${theme.colors.text[200]}40` : theme.colors.text[200]};
  margin-left: 8px;
`;

const iconButtonStyle = css`
  margin-left: 16px;
`;

interface ReceiveCallPropTypes {
  callId: string;
  status: CallStatusType;
  commentList: CommentType[];
  storeInfo: StoreInfoType;
  disabled: boolean;
  buttonDisabled: boolean;
}

const ReceiveCall: FC<ReceiveCallPropTypes> = React.memo(function ReceiveCall(
  props,
) {
  const { callId, status, commentList, storeInfo, disabled, buttonDisabled } =
    props;

  const [inputContent, setInputContent] = useState<string>();
  const [editable, setEditable] = useState<boolean>(
    commentList?.findIndex(
      (comment: CommentType) => comment?.storeInfo?.id === storeInfo.id,
    ) < 0,
  );
  const [appealContent, setAppealContent] = useState<string>();
  const [appealTime, setAppealTime] = useState<Date>();

  const [appeal] = useState<CommentType | undefined>(
    commentList?.find(
      (comment: CommentType) => comment.storeInfo.id === storeInfo.id,
    ),
  );
  const [confirmed] = useState<boolean>(
    appeal
      ? (status === 'confirmed' || status === 'visited') && appeal.confirmed
      : false,
  );

  const { mutate: commentMutate } =
    useReactMutation<RegisterCommentCallParamType>(
      callKeys.registerCommentCall,
      callService.registerCommentCall,
      () => {},
      () => {
        alert('어필하는 도중 오류가 발생하였습니다.');
      },
    );

  if (editable)
    return (
      <AppealBoxBlock>
        <InputText
          defaultValue={appealContent || appeal?.comment || inputContent}
          width={720}
          placeholder="어필 할 내용을 입력해주세요."
          disabled={buttonDisabled}
          onChange={e => {
            setInputContent(e.target.value);
          }}
        />
        <ButtonWrapper
          onClick={() => {
            if (inputContent) {
              const now = new Date();
              setAppealContent(inputContent);
              setAppealTime(now);
              setEditable(false);
              const commentInfo = {
                storeInfo,
                comment: inputContent,
              };
              commentMutate({ callId, commentInfo });
            }
          }}
        >
          <Button
            text="등록"
            color="green"
            width={52}
            type="submit"
            disabled={buttonDisabled}
          />
          {!buttonDisabled && <ButtonBackgroundBlock />}
        </ButtonWrapper>
      </AppealBoxBlock>
    );
  return (
    <AppealBoxBlock>
      <SubText
        title={appealContent || appeal?.comment || ''}
        icon={{
          name: confirmed ? 'SetOk' : 'Check',
          width: 17,
          height: 17,
          color: confirmed ? undefined : 'black',
          opacity: disabled ? 40 : undefined,
        }}
        titleSize={14}
        color={disabled ? `${singletons.black}40` : singletons.black}
      />
      {!!appeal && (
        <AppealTimeBlock disabled={disabled}>
          {format(
            appealTime ||
              (appeal?.updatedAt as Date) ||
              (appeal?.createdAt as Date),
            'h:mm',
          )}
        </AppealTimeBlock>
      )}
      {!confirmed && !buttonDisabled && (
        <IconButton
          width={34}
          icon={{ name: 'Edit', width: 18, height: 18 }}
          customStyle={iconButtonStyle}
          onClick={() => {
            setEditable(true);
          }}
        />
      )}
    </AppealBoxBlock>
  );
});

export { ReceiveCall };
