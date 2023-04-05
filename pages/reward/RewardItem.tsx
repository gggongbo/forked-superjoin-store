import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';

import IconButton from '@components/basicComponent/IconButton';
import InputText from '@components/basicComponent/InputText';
import SubText from '@components/basicComponent/SubText';

const RewardItemBlock = styled.div`
  display: flex;
  width: 344px;
  height: 72px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.singletons.backgroundGray};
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  margin: 0px 16px 16px 0px;
  padding: 0px 24px 0px 24px;
`;

const TitleBlock = styled(SubText)`
  display: flex;
  flex: 1;
`;

const InputTextBlock = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ButtonBlock = styled.div`
  display: flex;
  flex-direction: row;
`;

const UpdateButtonBlock = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 8px;
`;

const inputStyle = css`
  background-color: ${({ theme }) => theme.colors.singletons.white};
  border-color: ${({ theme }) => theme.colors.green[600]};

  :hover {
    border-color: ${({ theme }) => theme.colors.green[600]};
  }
`;

const titleStyle = css`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text[600]};
`;

const buttonStyle = css`
  background-color: #00000000;
  border-width: 0px;
  border-radius: 18px;
  :hover {
    background-color: ${({ theme }) => theme.colors.gray[300]};
  }
  :active {
    background-color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

interface RewardItemPropTypes {
  id: string | number;
  name: string;
  onUpdateClick: Function;
  onDeleteClick: Function;
}

// TODO : 중복 체크, 각 리워드 데이터별로 unique id 필요 / 예외처리 주석 제거
/* eslint-disable no-unused-vars */
const RewardItem: FC<RewardItemPropTypes> = function RewardItem(props) {
  const { id, name, onUpdateClick, onDeleteClick } = props;
  const [isUpdatedClicked, setUpdatedClicked] = useState<boolean>(false);
  const [updateReward, setUpdateReward] = useState<string>();

  return (
    <RewardItemBlock>
      {!isUpdatedClicked ? (
        <TitleBlock
          title={name}
          titleStyle={titleStyle}
          icon={{ name: 'ServiceGiftColor', width: 20, height: 20 }}
        />
      ) : (
        <InputTextBlock>
          <InputText
            defaultValue={name}
            onChange={e => setUpdateReward(e.target.value)}
            customStyle={inputStyle}
          />
        </InputTextBlock>
      )}
      {!isUpdatedClicked ? (
        <ButtonBlock>
          <IconButton
            icon={{
              name: 'Edit',
              width: 20,
              height: 20,
              color: 'gray',
              colorIndex: 500,
            }}
            onClick={() => setUpdatedClicked(!isUpdatedClicked)}
            customStyle={buttonStyle}
          />
          <IconButton
            icon={{
              name: 'Trash',
              width: 20,
              height: 20,
              color: 'gray',
              colorIndex: 500,
            }}
            onClick={() => onDeleteClick?.(id)}
            customStyle={buttonStyle}
          />
        </ButtonBlock>
      ) : (
        <UpdateButtonBlock>
          <IconButton
            icon={{
              name: 'Check',
              width: 20,
              height: 20,
              color: 'green',
            }}
            onClick={() => onUpdateClick?.({ id, name: updateReward })}
            customStyle={buttonStyle}
          />
          <IconButton
            icon={{
              name: 'Close',
              width: 20,
              height: 20,
              color: 'gray',
              colorIndex: 500,
            }}
            onClick={() => setUpdatedClicked(false)}
            customStyle={buttonStyle}
          />
        </UpdateButtonBlock>
      )}
    </RewardItemBlock>
  );
};

RewardItem.defaultProps = {};

export default RewardItem;
