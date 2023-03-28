import type { NextPage } from 'next';
import { useCallback, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';

import RewardItem from './RewardItem';

import Button from '@components/basicComponent/Button';
import Header from '@components/basicComponent/Header';
import InputText from '@components/basicComponent/InputText';
import ListBox from '@components/basicComponent/ListBox';
import { RewardItemType } from '@constants/types/reward';
import emptyImage from '@resources/svg/img/service-gift-gray.svg';

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

const Reward: NextPage = function Reward() {
  // eslint-disable-next-line no-unused-vars
  const [newReward, setNewReward] = useState<string>();

  const renderRewardItem = useCallback(({ item }: RewardItemType) => {
    if (!item) return null;
    return (
      <RewardItem
        id={item.id}
        value={item.value}
        onUpdateClick={() => {}}
        onDeleteClick={() => {}}
      />
    );
  }, []);

  // TODO: dummy => fetch
  const data = useMemo(
    () => [
      { id: 1, value: '음료수' },
      { id: 2, value: '음료수2' },
      { id: 3, value: '음료수3' },
      { id: 4, value: '음료수4' },
      { id: 5, value: '음료수5' },
    ],
    [],
  );

  return (
    <RewardBlock>
      <Header title="리워드 관리" />
      <RewardInputBlock>
        <InputTextBlock>
          <InputText
            placeholder="제공할 리워드를 입력해주세요. (10자)"
            onChange={e => setNewReward(e.target.value)}
            customStyle={inputStyle}
          />
        </InputTextBlock>
        <InputButton width={90} text="추가" color="green" />
      </RewardInputBlock>
      <RewardContentBlock>
        <TextBlock>리워드</TextBlock>
        <RewardListBlock>
          <ListBox
            data={data}
            renderItem={renderRewardItem}
            listEmptyComponent={
              <EmptyBlock>
                <EmptyImageBlock />
                <EmptyTextBlock>
                  제공할 리워드가 없습니다. 리워드를 추가해보세요!
                </EmptyTextBlock>
              </EmptyBlock>
            }
          />
        </RewardListBlock>
      </RewardContentBlock>
    </RewardBlock>
  );
};

export default Reward;
