import { useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Option, SubRowProps } from '~/types/basicComponent';
import Icon from '@components/Icon';
import { CategoryTag } from '@components/basicComponent/CategoryTag';
import {
  singletons,
  gray as GrayColors,
  text as TextColors,
} from '@styles/theme/colors';
import { SubRow } from '@components/basicComponent/Table/SubRow';

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
  option: Option;
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
    disabled ? theme.colors.text[2] : theme.colors.text[6]};
`;

const CallButtonBlock = styled.button<{
  backgroundColor?: string;
  color?: string;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 14px;
`;

const DeleteButtonBlock = styled.button<{ disabled: boolean }>`
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
`;

const deleteButtonIconStyle = css`
  :hover {
    background-color: ${({ theme }) => theme.colors.singletons.green};
  }
  :active,
  :visited {
    background-color: ${({ theme }) => theme.colors.singletons.textGreen};
  }
`;

const RewardBlock = styled.div<{ option: Option }>`
  display: flex;
  flex-direction: row;
`;

const RewardTextBlock = styled.div`
  margin-left: 8px;
`;

const AppealStatusBlock = styled.div<{ option: Option; disabled?: boolean }>`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  color: ${({ disabled, theme }) =>
    disabled ? `${theme.colors.text[6]}40` : theme.colors.text[6]};
`;

const useTableComponent = () => {
  const fetchIdRef = useRef(0);

  const getFetchedData = useCallback(
    (pageSize: any, pageIndex: any, data: any) => {
      // eslint-disable-next-line no-plusplus
      const fetchId = ++fetchIdRef.current;
      const fetchResult: any = [];
      // setTimeout(() => {
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;
        fetchResult.push(data.slice(startRow, endRow));
        fetchResult.push(Math.ceil(data.length / pageSize));
      }
      return fetchResult;
      // }, 100);
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
        backgroundColor = `${singletons.contentBoxGreen}18`;
        color = singletons.green;
        text = '제안 확정';
        break;
      case 'expired':
        icon = 'ClockDone';
        backgroundColor = GrayColors[3];
        color = TextColors[6];
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
    (callEndTime: Date, callStatus: string) => {
      const disabled = callStatus !== 'proceeding';
      return (
        <CallEndTimeBlock disabled={disabled}>
          {`${callEndTime}분 후`}
        </CallEndTimeBlock>
      );
    },
    [],
  );

  const callButtonComponent = useCallback((callStatus: string) => {
    const backgroundColor =
      callStatus === 'proceeding' ? GrayColors[3] : singletons.black;
    const color =
      callStatus === 'proceeding' ? singletons.black : singletons.white;
    const text = callStatus === 'proceeding' ? '다시 제안' : '제안 취소';
    return (
      <CallButtonBlock
        backgroundColor={backgroundColor}
        color={color}
        onClick={e => alert('call')}
      >
        {text}
      </CallButtonBlock>
    );
  }, []);

  const callDeleteButtonComponent = useCallback((callStatus: string) => {
    const color = callStatus === 'proceeding' ? GrayColors[3] : GrayColors[5];
    const disabled = callStatus === 'proceeding';
    return (
      <DeleteButtonBlock disabled={disabled} onClick={e => alert('delete')}>
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
  }, []);

  const rewardStatusComponent = useCallback((rewardStatus: boolean) => {
    const option = {
      name: rewardStatus ? '제공' : '미제공',
      value: rewardStatus ? 'rewarded' : 'notRewarded',
    };
    return (
      <RewardBlock option={option}>
        <Icon
          width={20}
          height={20}
          name={rewardStatus ? 'MarkPointYellow' : 'MarkPointGray'}
        />
        <RewardTextBlock>{option?.name}</RewardTextBlock>
      </RewardBlock>
    );
  }, []);

  const appealStatusComponent = useCallback(
    (appealContent: string, status: string) => {
      let appealStatus = 'empty';
      let appealStatusName = '미작성';
      switch (status) {
        case 'proceeding':
          appealStatus = appealContent?.length > 0 ? 'proceeding' : 'empty';
          appealStatusName = appealContent?.length > 0 ? '미확정' : '미작성';
          break;
        case 'confirmed':
          appealStatus = appealContent?.length > 0 ? 'confirmed' : 'empty';
          appealStatusName = appealContent?.length > 0 ? '완료' : '미작성';
          break;
        default:
          appealStatus = appealContent?.length > 0 ? 'proceeding' : 'empty';
          appealStatusName = appealContent?.length > 0 ? '미확정' : '미작성';
          break;
      }
      const option = {
        value: appealStatus,
        name: appealStatusName,
      };
      return (
        <AppealStatusBlock
          disabled={status === 'expired' || status === 'canceled'}
          option={option}
        >
          {option?.name}
        </AppealStatusBlock>
      );
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
    rewardStatusComponent,
    appealStatusComponent,
    renderRowSubComponent,
  };
};

export { useTableComponent };
