import React, { FC, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import styled, { css } from 'styled-components';

import IconButton from '@components/BasicComponent/IconButton';
import InputText from '@components/BasicComponent/InputText';
import SubText from '@components/BasicComponent/SubText';
import { singletons } from '@styles/theme/colors';

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

const LoadingBlock = styled.div`
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  loading?: boolean;
  onUpdateClick: Function;
  onDeleteClick: Function;
}

/* eslint-disable no-unused-vars */
const RewardItem: FC<RewardItemPropTypes> = function RewardItem(props) {
  const { id, name, loading = false, onUpdateClick, onDeleteClick } = props;
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
            maxLength={10}
            onChange={e => setUpdateReward(e.target.value)}
            customStyle={inputStyle}
          />
        </InputTextBlock>
      )}
      {!isUpdatedClicked ? (
        <ButtonBlock>
          {!loading ? (
            <>
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
                disabled={loading}
                onClick={() => onDeleteClick?.(id)}
                customStyle={buttonStyle}
              />
            </>
          ) : (
            <LoadingBlock>
              <ClipLoader />
            </LoadingBlock>
          )}
        </ButtonBlock>
      ) : (
        <UpdateButtonBlock>
          {!loading ? (
            <>
              <IconButton
                icon={{
                  name: 'Check',
                  width: 20,
                  height: 20,
                  color: 'green',
                }}
                disabled={loading}
                onClick={() => {
                  onUpdateClick?.({ id, name: updateReward });
                  setUpdatedClicked(false);
                }}
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
            </>
          ) : (
            <LoadingBlock>
              <ClipLoader size={20} color={singletons.green} />
            </LoadingBlock>
          )}
        </UpdateButtonBlock>
      )}
    </RewardItemBlock>
  );
};

RewardItem.defaultProps = {
  loading: false,
};

export default RewardItem;
