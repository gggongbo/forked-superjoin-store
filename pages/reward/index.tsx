import type { NextPage } from 'next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import ConfirmedReward from './ConfirmedReward';
import ExpectedReward from './ExpectedReward';

import Header from '@components/basicComponent/Header';
import * as Columns from '@constants/tableColumns';
import rewardImage from '@resources/svg/img/illust-reward-no-circle.svg';
import Divider from '~/components/basicComponent/Divider';
import SelectInputText from '~/components/basicComponent/SelectInputText';
import { SearchType } from '~/constants/types/components';

const optionList = [
  { name: 'ID', value: 'id' },
  { name: '닉네임', value: 'nickname' },
];

const RewardBlock = styled.main`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.componentSizes.pagePadding}px;
`;

const RewardPointBlock = styled.div`
  width: 440px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => `${theme.colors.green[400]}10`};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.green[700]};
`;

const RewardImageBlock = styled.div`
  width: 125px;
  aspect-ratio: 1;
  background-image: url(${rewardImage.src});
  background-position: center;
  background-size: cover;
`;

const RewardPointContentBlock = styled.div``;

const PointTitleBlock = styled.a`
  font-size: 14px;
  letter-spacing: -0.32px;
  color: ${({ theme }) => theme.colors.green[500]};
`;

const PointTextBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 8px;
`;

const PointBlock = styled.a`
  font-size: 32px;
  font-weight: bold;
  line-height: 100%;
  letter-spacing: -0.73px;
  color: ${({ theme }) => theme.colors.singletons.black};
  margin-right: 12px;
`;

const TextBlock = styled.a`
  font-size: 14px;
  letter-spacing: -0.32px;
  color: ${({ theme }) => theme.colors.text[400]};
`;

const RewardTableBlock = styled.div`
  min-width: ${({ theme }) => theme.componentSizes.table.width}px;
  margin-top: 37px;
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderText = styled.div<{ rewardType: string; defaultValue: string }>`
  display: flex;
  font-size: 20px;
  letter-spacing: -0.45px;
  font-weight: ${props => props.rewardType === props.defaultValue && 500};
  color: ${props =>
    props.rewardType === props.defaultValue
      ? props.theme.colors.text[600]
      : props.theme.colors.text[200]};
`;

const HeaderDivider = styled(Divider)`
  margin: 0px 16px 0px 16px;
  height: 20px;
  border-color: ${props => props.theme.colors.gray[600]};
`;

const HeaderRightBlock = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const Reward: NextPage = function Reward() {
  const point = 2000; // todo : get point logic add
  const [rewardType, setRewardType] = useState<'expected' | 'confirmed'>(
    'confirmed',
  );
  const [input, setInput] = useState<SearchType>();
  const [search, setSearch] = useState<SearchType>();

  useEffect(() => {
    setSearch(undefined);
  }, [rewardType]);

  const handleInputChange = useCallback((e: any) => {
    setInput(e.target.valueObject);
  }, []);

  const headerLeftComponent = useMemo(() => {
    return (
      <HeaderBlock>
        <HeaderText
          onClick={() => setRewardType('confirmed')}
          rewardType={rewardType}
          defaultValue="confirmed"
        >
          지급 리워드
        </HeaderText>
        <HeaderDivider isVertical />
      </HeaderBlock>
    );
  }, [rewardType]);

  const headertitleComponent = useMemo(() => {
    return (
      <HeaderBlock>
        <HeaderText
          onClick={() => setRewardType('expected')}
          rewardType={rewardType}
          defaultValue="expected"
        >
          지급 예정 리워드
        </HeaderText>
      </HeaderBlock>
    );
  }, [rewardType]);

  const headerRightComponent = useMemo(() => {
    return (
      <HeaderRightBlock>
        <SelectInputText
          optionList={optionList}
          onChange={handleInputChange}
          onClick={() => {
            setSearch(input);
          }}
        />
      </HeaderRightBlock>
    );
  }, [input, handleInputChange]);

  return (
    <RewardBlock>
      <Header title="리워드 관리" />
      <RewardPointBlock>
        <RewardImageBlock />
        <RewardPointContentBlock>
          <PointTitleBlock>보유 리워드</PointTitleBlock>
          <PointTextBlock>
            <PointBlock>{point}</PointBlock>
            <TextBlock>포인트</TextBlock>
          </PointTextBlock>
        </RewardPointContentBlock>
      </RewardPointBlock>
      <RewardTableBlock>
        <Header
          titleComponent={headertitleComponent}
          leftComponent={headerLeftComponent}
          rightComponent={headerRightComponent}
        />
        {rewardType === 'confirmed' ? (
          <ConfirmedReward columns={Columns.ConfirmedReward} search={search} />
        ) : (
          <ExpectedReward columns={Columns.ExpectedReward} search={search} />
        )}
      </RewardTableBlock>
    </RewardBlock>
  );
};

export default Reward;
