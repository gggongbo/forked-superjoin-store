import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { FC, useCallback, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';

import Button from '@components/basicComponent/Button';
import IconButton from '@components/basicComponent/IconButton';
import InputText from '@components/basicComponent/InputText';
import SubText from '@components/basicComponent/SubText';
import { SubRowProps } from '@constants/types/components';
import { singletons } from '@styles/theme/colors';

const SubRowBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RewardRequestMemberBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const colorCommonStyle = css<{ disabled: boolean }>`
  color: ${({ disabled, theme }) =>
    disabled ? `${theme.colors.text[600]}40` : theme.colors.text[600]};
`;

const DescriptionBlock = styled.div<{ disabled: boolean }>`
  font-size: 14px;
  font-weight: normal;
  margin-bottom: 8px;
  ${colorCommonStyle};
`;

const RequestMemberListBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const RequestTextBlock = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
  justify-content: center;
  ${colorCommonStyle};
`;

const RequestMemberBlock = styled.div`
  display: flex;
  flex-direction: row;
`;

const RequestMemberItemBlock = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: row;
  border-radius: 6px;
  padding: 4px 8px;
  margin-right: 8px;
  background-color: ${({ disabled, theme }) =>
    disabled ? `${theme.colors.gray[200]}40` : theme.colors.gray[200]};
`;

const RequestMemberPhotoBlock = styled.div<{
  userPhoto: string;
  disabled: boolean;
}>`
  width: 22px;
  aspect-ratio: 1;
  border-radius: 6px;
  margin-right: 8px;
  background-image: url(${({ userPhoto }) => userPhoto});
  background-position: center;
  background-size: cover;
  background-color: ${({ disabled, theme }) =>
    disabled
      ? `${theme.colors.singletons.pink}40`
      : theme.colors.singletons.pink}; //test setting
`;

const RequestMemberTextBlock = styled.div<{ disabled: boolean }>`
  font-size: 14px;
  font-weight: normal;
  ${colorCommonStyle};
`;

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

const subTextStyle = css`
  margin-top: 6px;
`;

const iconButtonStyle = css`
  margin-left: 16px;
`;

const SubRow: FC<SubRowProps> = function SubRow({ row, type }) {
  const {
    address,
    description,
    maxNumOfUser,
    deadline,
    status,
    reward,
    requestList,
    callMemberList,
    appealContent: originalAppealContent,
    appealAt,
  } = row.original;
  const [appealContent, setAppealContent] = useState<string>(
    originalAppealContent || '',
  );
  const [inputContent, setInputContent] = useState<string>();
  const [appealTime, setAppealTime] = useState<Date>(appealAt);
  const [isEditable, setIsEditable] = useState<boolean>(
    !appealContent || appealContent?.length < 1,
  );
  const disabled = status === 'expired' || status === 'canceled';

  const rewardRequestMemberComponent = useMemo(
    () => (
      <RewardRequestMemberBlock>
        <SubText
          title={`${reward} Point`}
          icon={{
            name: 'Point',
            width: 16,
            height: 16,
            color: 'text',
            colorIndex: 400,
            opacity: disabled ? 40 : undefined,
          }}
          disabled={disabled}
          customStyle={subTextStyle}
        />
        <RequestMemberListBlock>
          <RequestTextBlock disabled={disabled}>
            {`참여 신청 인원 (${requestList?.length})`}
          </RequestTextBlock>
          <RequestMemberBlock>
            {requestList?.map((requestMember: any) => (
              <RequestMemberItemBlock
                key={requestMember.userId}
                disabled={disabled}
              >
                <RequestMemberPhotoBlock
                  userPhoto={requestMember.userPhoto}
                  disabled={disabled}
                />
                <RequestMemberTextBlock disabled={disabled}>
                  {requestMember.userId}
                </RequestMemberTextBlock>
              </RequestMemberItemBlock>
            ))}
          </RequestMemberBlock>
        </RequestMemberListBlock>
      </RewardRequestMemberBlock>
    ),
    [disabled, requestList, reward],
  );

  const appealBoxComponent = useCallback(
    (editable: boolean) => {
      const confirmed = status === 'confirmed';

      return editable ? (
        <AppealBoxBlock>
          <InputText
            defaultValue={inputContent}
            width={720}
            placeholder="어필 할 내용을 입력해주세요."
            disabled={disabled}
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
                setIsEditable(false);
                // calls data 에 데이터 저장하는 로직 필요
              }
            }}
          >
            <Button text="등록" color="green" width={52} disabled={disabled} />
            {!disabled && <ButtonBackgroundBlock />}
          </ButtonWrapper>
        </AppealBoxBlock>
      ) : (
        <AppealBoxBlock>
          <SubText
            title={appealContent}
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
          {appealTime && (
            <AppealTimeBlock disabled={disabled}>
              {format(appealTime, 'h:mm')}
            </AppealTimeBlock>
          )}
          {!confirmed && !disabled && (
            <IconButton
              width={34}
              icon={{ name: 'Edit', width: 18, height: 18 }}
              customStyle={iconButtonStyle}
              onClick={() => {
                setIsEditable(true);
              }}
            />
          )}
        </AppealBoxBlock>
      );
    },
    [appealContent, appealTime, disabled, inputContent, status],
  );

  return (
    <SubRowBlock>
      <DescriptionBlock disabled={disabled}>{description}</DescriptionBlock>
      <SubText
        title={address}
        icon={{
          name: 'MapPin',
          width: 16,
          height: 16,
          color: 'text',
          colorIndex: 400,
          opacity: disabled ? 40 : undefined,
        }}
        disabled={disabled}
        customStyle={subTextStyle}
      />
      <SubText
        title={
          type === 'send'
            ? `${maxNumOfUser}명 모집`
            : `${callMemberList?.length}명 방문`
        }
        icon={{
          name: 'Users',
          width: 16,
          height: 16,
          color: 'text',
          colorIndex: 400,
          opacity: disabled ? 40 : undefined,
        }}
        disabled={disabled}
        customStyle={subTextStyle}
      />
      <SubText
        title={`${format(deadline, 'a h:mm', { locale: ko })}에 제안 마감`}
        icon={{
          name: 'ClockDeadLine',
          width: 16,
          height: 16,
          color: 'text',
          colorIndex: 400,
          opacity: disabled ? 40 : undefined,
        }}
        disabled={disabled}
        customStyle={subTextStyle}
      />
      {type === 'send'
        ? rewardRequestMemberComponent
        : appealBoxComponent(isEditable)}
    </SubRowBlock>
  );
};

export { SubRow };
