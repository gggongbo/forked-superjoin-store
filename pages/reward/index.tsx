import type { NextPage } from 'next';
import styled from 'styled-components';

import Header from '@components/basicComponent/Header';
import rewardImage from '@resources/svg/img/illust-reward.svg';

const RewardBlock = styled.main`
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

const RewardContentBlock = styled.div`
  display: flex;
  /* flex: 1; */
  margin-top: 30px;
  padding: 10px;
  flex-direction: column;
`;

const ContentTitleBlock = styled.a`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.32px;
  color: ${props => props.theme.colors.singletons.black};
`;

const RewardPointContentBlock = styled(RewardContentBlock)`
  padding-left: 82px;
  align-self: flex-start;
  align-items: center;
`;

const RewardImageBlock = styled.div`
  width: 182px;
  aspect-ratio: 1;
  background-image: url(${rewardImage.src});
  background-position: center;
  background-size: cover;
  margin-bottom: 24px;
`;

const PointTextBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const PointBlock = styled.a`
  font-size: 32px;
  font-weight: bold;
  line-height: 100%;
  letter-spacing: -0.73px;
  color: ${props => props.theme.colors.singletons.black};
  margin-right: 12px;
`;

const TextBlock = styled.a`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.32px;
  color: ${props => props.theme.colors.text[4]};
`;

const Reward: NextPage = function Reward() {
  const point = 2000; // todo : get point logic add
  return (
    <RewardBlock>
      <Header title="리워드 관리" />
      <RewardContentBlock>
        <ContentTitleBlock>보유 리워드</ContentTitleBlock>
      </RewardContentBlock>
      <RewardPointContentBlock>
        <RewardImageBlock />
        <PointTextBlock>
          <PointBlock>{point}</PointBlock>
          <TextBlock>포인트</TextBlock>
        </PointTextBlock>
      </RewardPointContentBlock>
    </RewardBlock>
  );
};

export default Reward;
