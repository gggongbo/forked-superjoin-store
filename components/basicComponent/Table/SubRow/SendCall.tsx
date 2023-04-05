import { useRouter } from 'next/router';
import React, { FC } from 'react';
import styled, { css } from 'styled-components';

import CheckboxItem from '@components/basicComponent/CheckboxItem';
import Divider from '@components/basicComponent/Divider';
import SubText from '@components/basicComponent/SubText';
import Icon from '@components/Icon';
import { callKeys } from '@constants/queryKeys';
import {
  AcceptRequestCallParamType,
  CallMemberType,
  RejectRequestCallParamType,
} from '@constants/types/call';
import { useReactMutation } from '@hooks/useReactMutation';
import { callService } from '@services/call';

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
  background-color: ${({ disabled, theme }) =>
    disabled
      ? `${theme.colors.singletons.pink}40`
      : theme.colors.singletons.pink}; //test setting
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

const RequestAcceptButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.singletons.black};
  color: ${({ theme }) => theme.colors.singletons.white};
  width: 80px;
  padding-top: 5px;
  padding-bottom: 5px;
  line-height: 1.5;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  margin-right: 8px;
`;

const RequestRejectButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.gray[300]};
  color: ${({ theme }) => theme.colors.singletons.black};
  width: 80px;
  padding-top: 5px;
  padding-bottom: 5px;
  line-height: 1.5;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
`;

const subTextStyle = css`
  margin-top: 6px;
`;

const SendCall: FC<any> = React.memo(function SendCall(props) {
  const {
    callId,
    title,
    reward,
    requestMemberList,
    callMemberList,
    disabled,
    buttonDisabled,
  } = props;

  const router = useRouter();

  const { mutate: acceptMutate } = useReactMutation<AcceptRequestCallParamType>(
    callKeys.acceptRequestCall,
    callService.acceptRequestCall,
    () => {
      router.reload();
    },
    () => {
      alert('제안을 수락하는 도중 오류가 발생하였습니다.');
      router.reload();
    },
  );

  const { mutate: rejesctMutate } =
    useReactMutation<RejectRequestCallParamType>(
      callKeys.rejectRequestCall,
      callService.rejectRequestCall,
      () => {
        router.reload();
      },
      () => {
        alert('제안을 거절하는 도중 오류가 발생하였습니다.');
        router.reload();
      },
    );

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
          {`참여 신청 인원 (${requestMemberList?.length})`}
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
              <MemberPhotoBlock
                userPhoto={requestMember.image}
                disabled={buttonDisabled}
              />
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
              <MemberPhotoBlock
                userPhoto={callMember.image}
                disabled={disabled}
              />
              <MemberTextBlock disabled={disabled}>
                {callMember.name}
              </MemberTextBlock>
            </MemberItemBlock>
          ))}
          {requestMemberList?.length > 0 && !buttonDisabled && (
            <>
              <MemberDivider isVertical />
              <RequestAcceptButton
                onClick={() => {
                  acceptMutate({
                    callInfo: { callId, title },
                    targetMemberList: memberList,
                  });
                }}
              >
                수락
              </RequestAcceptButton>
              <RequestRejectButton
                onClick={() => {
                  rejesctMutate({
                    callId,
                    targetMemberIdList: memberList.map(member => member.id),
                  });
                }}
              >
                거절
              </RequestRejectButton>
            </>
          )}
        </MemberBlock>
      </MemberListBlock>
    </RewardAndMemberBlock>
  );
});

export { SendCall };
