import type { GetServerSideProps, NextPage } from 'next';
import { useCallback, useState } from 'react';
import { dehydrate } from 'react-query';
import styled, { css } from 'styled-components';

import RewardItem from './RewardItem';

import Button from '@components/BasicComponent/Button';
import Header from '@components/BasicComponent/Header';
import InputText from '@components/BasicComponent/InputText';
import ListBox from '@components/BasicComponent/ListBox';
import { rewardKeys } from '@constants/queryKeys';
import {
  RewardInfo,
  RewardItemType,
  RewardType,
} from '@constants/types/reward';
import { useConfirm } from '@hooks/useConfirm';
import { useReactMutation } from '@hooks/useReactMutation';
import { useReactQuery } from '@hooks/useReactQuery';
import emptyImage from '@resources/svg/img/service-gift-gray.svg';
import { rewardService } from '@services/reward';
import queryClient from '@utils/queryUtils';

const RewardBlock = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: ${({ theme }) => theme.componentSizes.pagePadding}px;
`;

const RewardInputBlock = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  border-radius: 6px;
  margin-top: 32px;
  padding: 16px;
`;

const InputTextBlock = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const inputStyle = css`
  background-color: ${({ theme }) => theme.colors.singletons.white};
`;

const InputButton = styled(Button)`
  justify-content: center;
`;

const RewardContentBlock = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 42px;
`;

const TextBlock = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const RewardListBlock = styled.div`
  display: flex;
  flex: 1;
  margin-top: 22px;
`;

const EmptyBlock = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin-top: 78px;
`;

const EmptyImageBlock = styled.div`
  width: 160px;
  aspect-ratio: 1;
  background-image: url(${emptyImage.src});
  background-position: center;
  background-size: cover;
`;

const EmptyTextBlock = styled.div`
  margin-top: 24px;
  color: ${({ theme }) => `${theme.colors.text[200]}80`};
  font-size: 16px;
`;

export const getServerSideProps: GetServerSideProps = async () => {
  await queryClient.prefetchQuery(
    rewardKeys.getRewardList,
    () => rewardService.getRewardList,
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

const Reward: NextPage = function Reward() {
  const { confirm } = useConfirm();

  const [newReward, setNewReward] = useState<string>();
  const [rewardList, setRewardList] = useState<RewardType[]>();

  const fetchRewardList = useCallback((rewardData: RewardType[]) => {
    if (!rewardData) return;
    setRewardList(rewardData);
  }, []);

  const { refetch, isLoading: isGetLoading } = useReactQuery(
    rewardKeys.getRewardList,
    () => rewardService.getRewardList(),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    (resultData: RewardType[]) => {
      fetchRewardList(resultData);
    },
  );

  const { mutate: createMutate, isLoading: isCreateLoading } =
    useReactMutation<string>(
      rewardKeys.createReward,
      rewardService.createReward,
      () => {
        refetch();
      },
    );

  const { mutate: updateMutate, isLoading: isUpdateLoading } =
    useReactMutation<RewardInfo>(
      rewardKeys.updateReward,
      rewardService.updateReward,
      () => {
        refetch();
      },
    );

  const { mutate: deleteMutate, isLoading: isDeleteLoading } =
    useReactMutation<string>(
      rewardKeys.deleteReward,
      rewardService.deleteReward,
      () => {
        refetch();
      },
    );

  const renderRewardItem = useCallback(
    ({ item }: RewardItemType) => {
      if (!item) return null;
      return (
        <RewardItem
          id={item.id}
          name={item.name}
          loading={isUpdateLoading || isDeleteLoading || isCreateLoading}
          onUpdateClick={(rewardInfo: RewardInfo) => {
            if (
              !rewardInfo ||
              !rewardInfo?.name?.length ||
              rewardInfo?.name?.length > 10
            ) {
              alert('입력한 리워드를 확인해주세요.');
            } else {
              updateMutate(rewardInfo);
            }
          }}
          onDeleteClick={(rewardId: string) => {
            confirm('리워드를 삭제하시겠습니까?', () => deleteMutate(rewardId));
          }}
        />
      );
    },
    [
      confirm,
      deleteMutate,
      isCreateLoading,
      isDeleteLoading,
      isUpdateLoading,
      updateMutate,
    ],
  );

  return (
    <RewardBlock>
      <Header title="리워드 관리" />
      <RewardInputBlock>
        <InputTextBlock>
          <InputText
            placeholder="제공할 리워드를 입력해주세요. (10자)"
            maxLength={10}
            onChange={e => setNewReward(e.target.value)}
            customStyle={inputStyle}
          />
        </InputTextBlock>
        <InputButton
          width={90}
          text="추가"
          color="green"
          disabled={isCreateLoading || isUpdateLoading || isDeleteLoading}
          loading={isCreateLoading || isUpdateLoading || isDeleteLoading}
          onClick={() => {
            if (!newReward || !newReward?.length || newReward?.length > 10) {
              alert('입력한 리워드를 확인해주세요.');
            } else {
              createMutate(newReward);
            }
          }}
        />
      </RewardInputBlock>
      <RewardContentBlock>
        <TextBlock>리워드</TextBlock>
        <RewardListBlock>
          {!!rewardList && (
            <ListBox
              data={rewardList}
              renderItem={renderRewardItem}
              loading={isGetLoading}
              listEmptyComponent={
                <EmptyBlock>
                  <EmptyImageBlock />
                  <EmptyTextBlock>
                    제공할 리워드가 없습니다. 리워드를 추가해보세요!
                  </EmptyTextBlock>
                </EmptyBlock>
              }
            />
          )}
        </RewardListBlock>
      </RewardContentBlock>
    </RewardBlock>
  );
};

export default Reward;
