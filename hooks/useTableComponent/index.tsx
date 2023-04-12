import Link from 'next/link';
import { useCallback, useRef } from 'react';
import { ClipLoader } from 'react-spinners';
import styled, { css } from 'styled-components';

import Button from '@components/basicComponent/Button';
import { CategoryTag } from '@components/basicComponent/CategoryTag';
import { SubRow } from '@components/basicComponent/Table/SubRow';
import Icon from '@components/Icon';
import {
  CallHostType,
  CallStatusType,
  CallType,
  CommentType,
} from '@constants/types/call';
import { OptionType, SubRowProps } from '@constants/types/components';
import { RewardInfo } from '@constants/types/reward';
import {
  singletons,
  green as GreenColors,
  gray as GrayColors,
  text as TextColors,
} from '@styles/theme/colors';
import { getFormattedTime } from '@utils/dateUtils';

const CallCategoryTitleBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding-right: 20px;
`;

const TitleTextBlock = styled.div`
  flex: 1;
  margin-left: 8px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  word-wrap: break-word;
  text-overflow: ellipsis;
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
  width: 100%;
  font-size: 14px;
  color: ${({ disabled, theme }) =>
    disabled ? theme.colors.text[200] : theme.colors.text[600]};
`;

const CallButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
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
  width: 80px;
  padding: 4px 0px;
  line-height: 1.5;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  margin-right: 8px;

  :hover {
    background-color: ${({ theme }) => `${theme.colors.singletons.black}50`};
  }
`;

const CallButtonBlock = styled.div`
  cursor: pointer;
  margin-right: 8px;
`;

const callButtonStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6px 0px 4px 0px;
`;

const confirmButtonTextStyle = css`
  color: ${({ theme }) => theme.colors.singletons.white};
  line-height: 1.5;
  font-size: 14px;
  font-weight: 500;
`;

const cancelButtonTextStyle = css`
  color: ${({ theme }) => theme.colors.singletons.black};
  line-height: 1.5;
  font-size: 14px;
  font-weight: 500;
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
  width: 100%;
`;

const RewardTextBlock = styled.div<{ rewardStatus?: boolean }>`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  word-wrap: break-word;
  text-overflow: ellipsis;
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

const VisitButtonBlock = styled.div`
  cursor: pointer;
`;

const visitButtonStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6px 12px 4px 12px;
`;

const visitButtonTextStyle = css`
  color: ${({ theme }) => theme.colors.singletons.white};
  line-height: 1.5;
  font-size: 14px;
  font-weight: 500;
`;

const CanceledVisitButtonBlock = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.singletons.black};
`;

const CallHostInfoBlock = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const CallHostImageBlock = styled.div<{
  userPhoto: string;
}>`
  width: 22px;
  aspect-ratio: 1;
  border-radius: 6px;
  margin-right: 8px;
  background-image: url(${({ userPhoto }) => userPhoto});
  background-position: center;
  background-size: cover;
`;

const NonImageBlock = styled.div`
  width: 22px;
  aspect-ratio: 1;
  border-radius: 6px;
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray[200]};
`;

const CallHostNameBlock = styled.div`
  flex: 1;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  word-wrap: break-word;
  text-overflow: ellipsis;
`;

const TextInfoBlock = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const TextInfoTextBlock = styled.div<{ fontWeight?: string }>`
  flex: 1;
  font-size: 14px;
  font-weight: ${({ fontWeight }) => (!fontWeight ? 'normal' : fontWeight)};
  white-space: nowrap;
  overflow: hidden;
  word-wrap: break-word;
  text-overflow: ellipsis;
`;

const LoadingBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 0px;
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

  const callCategoryTitleComponent = useCallback(
    (title: string, category: string) => {
      return (
        <CallCategoryTitleBlock>
          <CategoryTag value={category} />
          <TitleTextBlock>{title}</TitleTextBlock>
        </CallCategoryTitleBlock>
      );
    },
    [],
  );

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
      case 'visited':
        icon = 'CircleCheck';
        backgroundColor = `${GreenColors[400]}18`;
        color = singletons.green;
        text = '방문 확정';
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
    (callDeadline: Date, nowTime: Date, callStatus: string) => {
      if (!callDeadline) return null;

      const disabled = callStatus !== 'proceeding' || callDeadline <= nowTime;
      const callEndTime = getFormattedTime(nowTime, callDeadline);

      return (
        <CallEndTimeBlock disabled={disabled}>{callEndTime}</CallEndTimeBlock>
      );
    },
    [],
  );

  const callButtonComponent = useCallback(
    (
      callData: CallType,
      callStatus: CallStatusType,
      loading: boolean,
      onConfirmClick?: () => void,
      onCancelClick?: () => void,
    ) => {
      const confirmDisabled = callData?.callMemberList?.length < 1;
      return (
        <CallButtonContainer>
          {callStatus !== 'confirmed' && callStatus !== 'proceeding' && (
            <ReCallButtonBlock>
              {!loading ? (
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
              ) : (
                <LoadingBlock>
                  <ClipLoader color={singletons.white} size={14} />
                </LoadingBlock>
              )}
            </ReCallButtonBlock>
          )}
          {callStatus === 'proceeding' && !confirmDisabled && (
            <CallButtonBlock>
              <Button
                text="지금 확정"
                width={80}
                color="green"
                loading={loading}
                disabled={confirmDisabled || loading}
                onClick={() => {
                  if (confirmDisabled) return;
                  onConfirmClick?.();
                }}
                customStyle={callButtonStyle}
                textStyle={confirmButtonTextStyle}
              />
            </CallButtonBlock>
          )}
          {(callStatus === 'confirmed' || callStatus === 'proceeding') && (
            <CallButtonBlock>
              <Button
                text="제안 취소"
                width={80}
                color="gray"
                colorIndex={300}
                loading={loading}
                disabled={loading}
                onClick={() => {
                  onCancelClick?.();
                }}
                customStyle={callButtonStyle}
                textStyle={cancelButtonTextStyle}
              />
            </CallButtonBlock>
          )}
        </CallButtonContainer>
      );
    },
    [],
  );

  const callDeleteButtonComponent = useCallback(
    (disabled: boolean, loading: boolean, onDeleteClick: () => void) => {
      const color = disabled ? GrayColors[300] : GrayColors[500];
      return (
        <DeleteButtonBlock
          disabled={disabled}
          onClick={() => {
            if (disabled) return;
            onDeleteClick?.();
          }}
        >
          {!loading ? (
            <Icon
              name="Trash"
              width={18}
              height={18}
              color={color}
              disabled={disabled}
              customStyle={deleteButtonIconStyle}
            />
          ) : (
            <LoadingBlock>
              <ClipLoader color={GrayColors[500]} size={14} />
            </LoadingBlock>
          )}
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
    (comment: CommentType | undefined, status: string) => {
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
    (canceled: boolean, loading: boolean, onVisitClick?: () => void) => {
      if (canceled)
        return <CanceledVisitButtonBlock>취소됨</CanceledVisitButtonBlock>;
      return (
        <VisitButtonBlock>
          <Button
            text="확인"
            width={80}
            color="black"
            loading={loading}
            disabled={loading}
            onClick={onVisitClick}
            customStyle={visitButtonStyle}
            textStyle={visitButtonTextStyle}
          />
        </VisitButtonBlock>
      );
    },
    [],
  );

  const callHostInfoComponent = useCallback((callHost: CallHostType) => {
    return (
      <CallHostInfoBlock>
        {callHost?.image ? (
          <CallHostImageBlock userPhoto={callHost.image} />
        ) : (
          <NonImageBlock>
            <Icon
              name="User"
              width={16}
              height={16}
              color="gray"
              colorIndex={400}
            />
          </NonImageBlock>
        )}
        <CallHostNameBlock>{callHost.name}</CallHostNameBlock>
      </CallHostInfoBlock>
    );
  }, []);

  const textInfoComponent = useCallback((infoText: string) => {
    return (
      <TextInfoBlock>
        <TextInfoTextBlock>{infoText}</TextInfoTextBlock>
      </TextInfoBlock>
    );
  }, []);

  const renderRowSubComponent = useCallback(({ row, type }: SubRowProps) => {
    return <SubRow row={row} type={type} />;
  }, []);

  return {
    getFetchedData,
    callCategoryTitleComponent,
    callStatusComponent,
    callEndTimeComponent,
    callButtonComponent,
    callDeleteButtonComponent,
    rewardComponent,
    numOfRewardComponent,
    appealStatusComponent,
    visitButtonComponent,
    renderRowSubComponent,
    callHostInfoComponent,
    textInfoComponent,
  };
};

export { useTableComponent };
