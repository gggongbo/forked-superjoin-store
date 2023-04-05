import Link from 'next/link';
import { useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';

import { CategoryTag } from '@components/basicComponent/CategoryTag';
import { SubRow } from '@components/basicComponent/Table/SubRow';
import Icon from '@components/Icon';
import { CallStatusType, CommentType } from '@constants/types/call';
import { OptionType, SubRowProps } from '@constants/types/components';
import { RewardInfo } from '@constants/types/reward';
import {
  singletons,
  green as GreenColors,
  gray as GrayColors,
  text as TextColors,
} from '@styles/theme/colors';

const CatetgoryBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CategoryTextBlock = styled.div`
  margin-left: 8px;
  font-weight: 500;
`;

const CallStatusBlock = styled.div<{
  option: OptionType;
  backgroundColor?: string;
}>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${({ option }) =>
    option.value === 'proceeding' ? '0px' : '3px 8px'};
  border-radius: 12px;
`;

const CallStatusIconBlock = styled.div`
  margin-right: 6px;
`;

const CallStatusTextBlock = styled.div<{ color?: string }>`
  font-size: 14px;
  color: ${({ color }) => color};
`;

const CallEndTimeBlock = styled.div<{ disabled: boolean }>`
  font-size: 14px;
  color: ${({ disabled, theme }) =>
    disabled ? theme.colors.text[200] : theme.colors.text[600]};
`;

const CallButtonBlock = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`;

const ReCallButtonBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.singletons.black};
  color: ${({ theme }) => theme.colors.singletons.white};
  padding: 4px 12px;
  line-height: 1.5;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  margin-right: 8px;
`;

const CancelButtonBlock = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.gray[300]};
  color: ${({ theme }) => theme.colors.singletons.black};
  padding: 6px 12px 4px 12px;
  line-height: 1.5;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
`;

const ConfirmButtonBlock = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.singletons.green};
  color: ${({ theme }) => theme.colors.singletons.white};
  padding: 6px 12px 4px 12px;
  line-height: 1.5;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  margin-right: 8px;
`;

const DeleteButtonBlock = styled.button<{ disabled: boolean }>`
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
`;

const deleteButtonIconStyle = css`
  :hover {
    background-color: ${({ theme }) => theme.colors.green[500]};
  }

  :active,
  :visited {
    background-color: ${({ theme }) => theme.colors.green[600]};
  }
`;

const RewardBlock = styled.div<{ option?: OptionType }>`
  display: flex;
  flex-direction: row;
`;

const RewardTextBlock = styled.div<{ rewardStatus?: boolean }>`
  margin-left: 8px;
  color: ${({ rewardStatus = true, theme }) =>
    rewardStatus ? theme.colors.text[600] : theme.colors.text[200]};
`;

const AppealStatusBlock = styled.div<{
  option: OptionType;
  disabled?: boolean;
}>`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  color: ${({ disabled, theme }) =>
    disabled ? `${theme.colors.text[600]}40` : theme.colors.text[600]};
`;

const VisitButtonBlock = styled.button`
  display: flex;
  flex: 0.4;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.singletons.black};
  color: ${({ theme }) => theme.colors.singletons.white};
  padding: 4px 12px;
  line-height: 1.5;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
`;

const CanceledVisitButtonBlock = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.singletons.black};
`;

const useTableComponent = () => {
  const fetchIdRef = useRef(0);

  const getFetchedData = useCallback(
    (pageSize: any, pageIndex: any, data: any) => {
      // eslint-disable-next-line no-plusplus
      const fetchId = ++fetchIdRef.current;
      const fetchResult: any = [];
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;
        fetchResult.push(data.slice(startRow, endRow));
        fetchResult.push(Math.ceil(data.length / pageSize));
      }
      return fetchResult;
    },
    [],
  );

  const callTitleComponent = useCallback((category: string, title: string) => {
    return (
      <CatetgoryBlock>
        <CategoryTag value={category} />
        <CategoryTextBlock>{title}</CategoryTextBlock>
      </CatetgoryBlock>
    );
  }, []);

  /* eslint-disable prefer-destructuring */
  const callStatusComponent = useCallback((callStatus: string) => {
    let icon = null;
    let backgroundColor = 'none';
    let color = singletons.black;
    let text = '진행 중';
    switch (callStatus) {
      case 'proceeding':
        break;
      case 'canceled':
        icon = 'CircleCancel';
        backgroundColor = singletons.cancelRed;
        color = singletons.red;
        text = '제안 취소';
        break;
      case 'confirmed':
        icon = 'CircleCheck';
        backgroundColor = `${GreenColors[400]}18`;
        color = singletons.green;
        text = '제안 확정';
        break;
      case 'expired':
        icon = 'ClockDone';
        backgroundColor = GrayColors[300];
        color = TextColors[600];
        text = '제안 마감';
        break;
      default:
        break;
    }

    const option = {
      name: text,
      value: callStatus,
    };

    return (
      <CallStatusBlock option={option} backgroundColor={backgroundColor}>
        {icon && color && (
          <CallStatusIconBlock>
            <Icon name={icon} width={18} height={18} color={color} />
          </CallStatusIconBlock>
        )}
        <CallStatusTextBlock color={color}>{text}</CallStatusTextBlock>
      </CallStatusBlock>
    );
  }, []);

  const callEndTimeComponent = useCallback(
    (callEndTime: number, callStatus: string) => {
      const disabled = callStatus !== 'proceeding' || callEndTime < 0;
      if (typeof callEndTime === 'number') {
        const postFix = callEndTime > 0 ? '후' : '전';
        return (
          <CallEndTimeBlock disabled={disabled}>
            {`${Math.abs(callEndTime) + 1} 분 ${postFix}`}
          </CallEndTimeBlock>
        );
      }
      return callEndTime;
    },
    [],
  );

  const callButtonComponent = useCallback(
    (
      callData: any,
      callStatus: CallStatusType,
      onConfirmClick?: () => void,
      onCancelClick?: () => void,
    ) => {
      return (
        <CallButtonBlock>
          {callStatus !== 'confirmed' && callStatus !== 'proceeding' && (
            <ReCallButtonBlock>
              <Link
                href={{
                  pathname: '/createCall',
                  query: {
                    title: callData.title,
                    category: callData.category,
                    description: callData.description,
                    maxNumOfUser: callData.maxNumOfUser,
                    reward: JSON.stringify(callData.reward),
                  },
                }}
                as="/createCall"
                shallow
              >
                다시 제안
              </Link>
            </ReCallButtonBlock>
          )}
          {callStatus === 'proceeding' && (
            <ConfirmButtonBlock onClick={onConfirmClick}>
              지금 확정
            </ConfirmButtonBlock>
          )}
          {(callStatus === 'confirmed' || callStatus === 'proceeding') && (
            <CancelButtonBlock onClick={onCancelClick}>
              제안 취소
            </CancelButtonBlock>
          )}
        </CallButtonBlock>
      );
    },
    [],
  );

  const callDeleteButtonComponent = useCallback(
    (disabled: boolean, onDeleteClick: () => void) => {
      const color = disabled ? GrayColors[300] : GrayColors[500];
      return (
        <DeleteButtonBlock disabled={disabled} onClick={onDeleteClick}>
          <Icon
            name="Trash"
            width={18}
            height={18}
            color={color}
            disabled={disabled}
            customStyle={deleteButtonIconStyle}
          />
        </DeleteButtonBlock>
      );
    },
    [],
  );

  const rewardComponent = useCallback(
    (rewardStatus: boolean, reward: RewardInfo) => {
      const option = {
        name: rewardStatus ? '제공' : '미제공',
        value: rewardStatus ? 'rewarded' : 'notRewarded',
      };
      return (
        <RewardBlock option={option}>
          <RewardTextBlock rewardStatus={rewardStatus}>
            {rewardStatus ? reward.name : option?.name}
          </RewardTextBlock>
        </RewardBlock>
      );
    },
    [],
  );

  const numOfRewardComponent = useCallback(
    (rewardStatus: boolean, numOfReward?: number) => {
      const option = {
        name: rewardStatus ? '제공' : '미제공',
        value: rewardStatus ? 'rewarded' : 'notRewarded',
      };
      return (
        <RewardBlock option={option}>
          <RewardTextBlock rewardStatus={rewardStatus}>
            {rewardStatus ? `${numOfReward}회` : option?.name}
          </RewardTextBlock>
        </RewardBlock>
      );
    },
    [],
  );

  const appealStatusComponent = useCallback(
    (comment: CommentType, status: string) => {
      let appealStatus = '';
      let appealStatusName = '';
      if (!comment) {
        appealStatus = 'empty';
        appealStatusName = '미작성';
      } else if (comment.confirmed) {
        appealStatus = 'confirmed';
        appealStatusName = '완료';
      } else if (!comment.confirmed) {
        appealStatus = 'proceeding';
        appealStatusName = '미확정';
      }
      const option = {
        value: appealStatus,
        name: appealStatusName,
      };

      return (
        <AppealStatusBlock disabled={status !== 'proceeding'} option={option}>
          {option?.name}
        </AppealStatusBlock>
      );
    },
    [],
  );

  const visitButtonComponent = useCallback(
    (
      canceled: boolean,
      callId: string,
      userId: string,
      onVisitClick?: () => void,
    ) => {
      if (canceled)
        return <CanceledVisitButtonBlock>취소됨</CanceledVisitButtonBlock>;
      return <VisitButtonBlock onClick={onVisitClick}>확인</VisitButtonBlock>;
    },
    [],
  );

  const renderRowSubComponent = useCallback(({ row, type }: SubRowProps) => {
    return <SubRow row={row} type={type} />;
  }, []);

  return {
    getFetchedData,
    callTitleComponent,
    callStatusComponent,
    callEndTimeComponent,
    callButtonComponent,
    callDeleteButtonComponent,
    rewardComponent,
    numOfRewardComponent,
    appealStatusComponent,
    visitButtonComponent,
    renderRowSubComponent,
  };
};

export { useTableComponent };
