import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { FC, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';

import { ReceiveCall } from './ReceiveCall';
import { SendCall } from './SendCall';

import SubText from '@components/basicComponent/SubText';
import { SubRowProps } from '@constants/types/components';

const SubRowBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const subTextStyle = css`
  margin-top: 6px;
`;

const SubRow: FC<SubRowProps> = function SubRow({ row, type }) {
  const {
    callId,
    title,
    address,
    description,
    maxNumOfUser,
    deadline,
    status,
    reward,
    requestMemberList,
    callMemberList,
    isUserMax,
    commentList,
    storeInfo,
  } = row.original;

  const [disabled] = useState<boolean>(
    (status === 'proceeding' && !isUserMax && deadline <= new Date()) ||
      status === 'expired' ||
      status === 'canceled',
  );

  const buttonDisabled = useMemo(() => {
    const now = new Date();
    let callStatus = null;
    if (status === 'proceeding' && deadline <= now) {
      callStatus = isUserMax ? 'confirmed' : 'expired';
    } else {
      callStatus = status;
    }
    return callStatus !== 'proceeding';
  }, [deadline, isUserMax, status]);

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
          type === 'send' ? `${maxNumOfUser}명 모집` : `${maxNumOfUser}명 방문`
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
      {type === 'send' ? (
        <SendCall
          callId={callId}
          title={title}
          reward={reward}
          requestMemberList={requestMemberList}
          callMemberList={callMemberList}
          disabled={disabled}
          buttonDisabled={buttonDisabled}
        />
      ) : (
        <ReceiveCall
          callId={callId}
          status={status}
          commentList={commentList}
          storeInfo={storeInfo}
          disabled={disabled}
          buttonDisabled={buttonDisabled}
        />
      )}
    </SubRowBlock>
  );
};

export { SubRow };
