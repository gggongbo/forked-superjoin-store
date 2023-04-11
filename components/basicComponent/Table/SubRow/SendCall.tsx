import React, { FC } from 'react';
import styled, { css } from 'styled-components';

import Button from '@components/basicComponent/Button';
import CheckboxItem from '@components/basicComponent/CheckboxItem';
import Divider from '@components/basicComponent/Divider';
import SubText from '@components/basicComponent/SubText';
import Icon from '@components/Icon';
import { CallMemberType } from '@constants/types/call';
import { RewardType } from '@constants/types/reward';

const RewardAndMemberBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const colorCommonStyle = css<{ disabled: boolean }>`
  color: ${({ disabled, theme }) =>
    disabled ? `${theme.colors.text[600]}40` : theme.colors.text[600]};
`;

const MemberListBlock = styled.div`
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

const MemberBlock = styled.div`
  display: flex;
  flex-direction: row;
`;

const MemberItemBlock = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 4px 8px;
  margin-right: 8px;
  background-color: ${({ disabled, theme }) =>
    disabled ? `${theme.colors.gray[200]}40` : theme.colors.gray[200]};
`;

const MemberPhotoBlock = styled.div<{
  userPhoto: string;
  disabled: boolean;
}>`
  width: 22px;
  aspect-ratio: 1;
  border-radius: 6px;
  margin-left: 8px;
  margin-right: 8px;
  background-image: url(${({ userPhoto }) => userPhoto});
  background-position: center;
  background-size: cover;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`;

const NonPhotoBlock = styled.div<{ disabled: boolean }>`
  width: 22px;
  aspect-ratio: 1;
  border-radius: 6px;
  margin-left: 8px;
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ disabled, theme }) =>
    disabled ? `${theme.colors.gray[200]}40` : theme.colors.gray[200]};
`;

const MemberTextBlock = styled.div<{ disabled: boolean }>`
  font-size: 14px;
  font-weight: normal;
  ${colorCommonStyle};
`;

const MemberDivider = styled(Divider)`
  align-self: center;
  height: 80%;
  border-color: ${({ theme }) => theme.colors.gray[500]};
  margin-left: 8px;
  margin-right: 16px;
`;

const CallMemberIconBlock = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const acceptButtonStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-right: 8px;
`;

const acceptButtonTextStyle = css`
  color: ${({ theme }) => theme.colors.singletons.white};
  line-height: 1.5;
  font-size: 14px;
  font-weight: 500;
`;

const rejectButtonStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-right: 8px;
`;

const rejectButtonTextStyle = css`
  color: ${({ theme }) => theme.colors.singletons.black};
  line-height: 1.5;
  font-size: 14px;
  font-weight: 500;
`;

const subTextStyle = css`
  margin-top: 6px;
`;

interface SendCallPropTypes {
  callId: string;
  title: string;
  reward: RewardType | null;
  requestMemberList: CallMemberType[];
  callMemberList: CallMemberType[];
  disabled: boolean;
  buttonDisabled: boolean;
  acceptMutate: Function;
  rejectMutate: Function;
  loading: boolean;
}

const SendCall: FC<SendCallPropTypes> = React.memo(function SendCall(props) {
  const {
    callId,
    title,
    reward,
    requestMemberList,
    callMemberList,
    disabled,
    buttonDisabled,
    acceptMutate,
    rejectMutate,
    loading,
  } = props;

  const memberList: CallMemberType[] = [];

  return (
    <RewardAndMemberBlock>
      {!!reward && (
        <SubText
          title={reward.name}
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
      )}
      <MemberListBlock>
        <RequestTextBlock disabled={disabled}>
          {`참여 신청 멤버 (${
            requestMemberList?.length || 0 + (callMemberList?.length || 0)
          })`}
        </RequestTextBlock>
        <MemberBlock>
          {requestMemberList?.map((requestMember: CallMemberType) => (
            <MemberItemBlock key={requestMember.id} disabled={buttonDisabled}>
              <CheckboxItem
                disabled={buttonDisabled}
                value={requestMember}
                onValueChange={(value: CallMemberType, isSelected: boolean) => {
                  const findIndex = memberList.findIndex(
                    member => member.id === value.id,
                  );
                  if (findIndex > -1 && !isSelected) {
                    memberList.splice(findIndex, 1);
                  } else if (findIndex < 0 && isSelected) {
                    memberList.push(value);
                  }
                }}
              />
              {requestMember?.image ? (
                <MemberPhotoBlock
                  userPhoto={requestMember.image}
                  disabled={buttonDisabled}
                />
              ) : (
                <NonPhotoBlock disabled={buttonDisabled}>
                  <Icon
                    name="User"
                    width={16}
                    height={16}
                    color="gray"
                    colorIndex={400}
                    opacity={buttonDisabled ? 40 : undefined}
                  />
                </NonPhotoBlock>
              )}
              <MemberTextBlock disabled={buttonDisabled}>
                {requestMember.name}
              </MemberTextBlock>
            </MemberItemBlock>
          ))}
          {callMemberList?.map((callMember: CallMemberType) => (
            <MemberItemBlock key={callMember.id} disabled={disabled}>
              <CallMemberIconBlock>
                <Icon width={20} height={20} name="CircleCheck" color="green" />
              </CallMemberIconBlock>
              {callMember?.image ? (
                <MemberPhotoBlock
                  userPhoto={callMember.image}
                  disabled={disabled}
                />
              ) : (
                <NonPhotoBlock disabled={disabled}>
                  <Icon
                    name="User"
                    width={16}
                    height={16}
                    color="gray"
                    colorIndex={400}
                    opacity={disabled ? 40 : undefined}
                  />
                </NonPhotoBlock>
              )}
              <MemberTextBlock disabled={disabled}>
                {callMember.name}
              </MemberTextBlock>
            </MemberItemBlock>
          ))}
          {requestMemberList?.length > 0 && !buttonDisabled && (
            <>
              <MemberDivider isVertical />
              <Button
                text="수락"
                width={80}
                color="black"
                loading={loading}
                disabled={loading}
                onClick={() => {
                  acceptMutate({
                    callInfo: { callId, title },
                    targetMemberList: memberList,
                  });
                }}
                customStyle={acceptButtonStyle}
                textStyle={acceptButtonTextStyle}
              />
              <Button
                text="거절"
                width={80}
                color="gray"
                colorIndex={300}
                loading={loading}
                disabled={loading}
                onClick={() => {
                  rejectMutate({
                    callId,
                    targetMemberIdList: memberList.map(member => member.id),
                  });
                }}
                customStyle={rejectButtonStyle}
                textStyle={rejectButtonTextStyle}
              />
            </>
          )}
        </MemberBlock>
      </MemberListBlock>
    </RewardAndMemberBlock>
  );
});

export { SendCall };
