import type { NextPage } from 'next';
import withRouter, { WithRouterProps } from 'next/dist/client/with-router';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import Button from '@components/basicComponent/Button';
import Header from '@components/basicComponent/Header';
import InputText from '@components/basicComponent/InputText';
import SelectBox from '@components/basicComponent/Selectbox';
import VerticalSubText from '@components/basicComponent/VerticalSubText';
import * as CategoryItemList from '@constants/category';
import { categoryList } from '@constants/categoryList';
import type {
  CreateCallParamType,
  CreateCallRouterType,
} from '@constants/types/call';
import { CurrentStoreUserType, ReduxStoreType } from '@constants/types/redux';
import { RewardInfo } from '@constants/types/reward';
import { callService } from '@services/call';
import { callKeys } from '~/constants/queryKeys';
import { useReactMutation } from '~/hooks/useReactMutation';

const CreateCallBlock = styled.main`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.componentSizes.pagePadding}px;
`;

const ContentBlock = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  margin-left: 8px;
`;

const ButtonBlock = styled.div`
  margin-left: 8px;
  margin-top: 32px;
`;

const inputTextStyle = css`
  width: 50%;
`;

const selectBoxStyle = css`
  margin-top: 16px;
  width: 30%;
`;

const areaStyle = css`
  margin-top: 16px;
  width: 50%;
`;

const inputTextNumberStyle = css`
  margin-top: 16px;
  width: 60%;
`;

const buttonStyle = css`
  width: 50%;
`;

const noneReward = { id: '0', value: 0, name: '없음' };

const CreateCall: NextPage<WithRouterProps> = function CreateCall({
  router: routerProps,
}) {
  const { query } = routerProps as CreateCallRouterType;

  const router = useRouter();
  const currentStoreUser = useSelector<ReduxStoreType, CurrentStoreUserType>(
    ({ storeUser }) => storeUser.currentStoreUser,
  );

  const [title, setTitle] = useState<string | undefined>(
    query?.title || undefined,
  );
  const [category, setCategory] = useState<string | undefined>(
    query?.category || undefined,
  );
  const [description, setDescription] = useState<string | undefined>(
    query?.description || undefined,
  );
  const [maxNumOfUser, setMaxNumOfUser] = useState<number | undefined>(
    query?.maxNumOfUser || undefined,
  );
  const [deadline, setDeadline] = useState<number>(0);
  const [reward, setReward] = useState<RewardInfo | null>(
    query?.reward ? JSON.parse(query.reward) : undefined,
  );
  const { mutate } = useReactMutation<CreateCallParamType>(
    callKeys.createCall,
    callService.createCall,
    () => {
      router.push('/call');
    },
  );

  const submit = () => {
    if (
      !title?.length ||
      !category?.length ||
      !description?.length ||
      !maxNumOfUser ||
      maxNumOfUser < 1 ||
      maxNumOfUser > 10 ||
      deadline < 1 ||
      deadline > 60 ||
      !reward
    )
      return;
    const params: CreateCallParamType = {
      title,
      category,
      description,
      maxNumOfUser,
      deadline,
      reward: reward?.id !== '0' ? reward : null,
      storeInfo: currentStoreUser,
    };
    mutate(params);
  };

  // TODO: dummy => fetch
  const rewardData = useMemo(
    () => [
      { id: 1, name: '음료수' },
      { id: 2, name: '음료수2' },
      { id: 3, name: '음료수3' },
      { id: 4, name: '음료수4' },
      { id: 5, name: '음료수5' },
      { id: '0', name: '없음' },
    ],
    [],
  );

  return (
    <CreateCallBlock>
      <Header title="방문 제안" />
      <ContentBlock>
        <VerticalSubText
          title="제목"
          customStyle={inputTextStyle}
          content={
            <InputText
              defaultValue={title}
              placeholder="제목을 입력해주세요."
              onChange={e => setTitle(e.target.value)}
            />
          }
        />
        <VerticalSubText
          title="카테고리"
          customStyle={selectBoxStyle}
          content={
            <SelectBox
              defaultOption={
                category
                  ? CategoryItemList[
                      category.toUpperCase() as keyof typeof CategoryItemList
                    ]
                  : undefined
              }
              optionList={categoryList}
              onChange={e => {
                setCategory(e.target.selectValue);
              }}
              placeholder="카테고리 선택"
            />
          }
        />
        <VerticalSubText
          title="설명"
          customStyle={areaStyle}
          content={
            <InputText
              defaultValue={description}
              height={116}
              isArea
              maxLength={500}
              onChange={e => setDescription(e.target.value)}
              placeholder={`설명을 입력해주세요.\n(구체적인 약속 시간, 약속 장소, 활동 내용을 입력하면 멤버를 모집하는데 도움이 됩니다!)`}
            />
          }
        />
        <VerticalSubText
          title="모집 인원"
          customStyle={inputTextNumberStyle}
          content={
            <InputText
              type="number"
              defaultValue={maxNumOfUser}
              onChange={e => setMaxNumOfUser(e.target.value)}
              placeholder="최대 10명"
              range={{ max: 10, min: 1 }}
            />
          }
          rightText="명"
        />
        <VerticalSubText
          title="제안 마감 시간"
          customStyle={inputTextNumberStyle}
          content={
            <InputText
              type="number"
              onChange={e => setDeadline(e.target.value)}
              placeholder="1 ~ 60분"
              range={{ max: 60, min: 1 }}
            />
          }
          rightText="분 후"
        />
        <VerticalSubText
          title="제공할 리워드"
          customStyle={selectBoxStyle}
          tooltip={{
            value:
              '리워드 관리에서 제공할 리워드를 추가하고 제공할 리워드를 선택해보세요!',
            position: { left: 200 },
          }}
          content={
            <SelectBox
              defaultOption={
                reward
                  ? {
                      value: reward.id,
                      name: reward.name,
                    }
                  : noneReward
              }
              optionList={rewardData?.map((rewardItem: any) => {
                return {
                  value: rewardItem.id,
                  name: rewardItem.name,
                };
              })}
              onChange={e => {
                const { selectValue } = e.target;
                if (!selectValue)
                  setReward({ id: noneReward.id, name: noneReward.name });
                else {
                  const selectedReward = rewardData?.find(
                    rewardItem => rewardItem.id === selectValue,
                  );
                  setReward(selectedReward as RewardInfo);
                }
              }}
              placeholder="리워드 선택"
            />
          }
        />
      </ContentBlock>
      <ButtonBlock>
        <Button
          text="제안 보내기"
          type="submit"
          onClick={submit}
          disabled={
            !title?.length ||
            !category?.length ||
            !description?.length ||
            !maxNumOfUser ||
            maxNumOfUser < 1 ||
            maxNumOfUser > 10 ||
            deadline < 1 ||
            deadline > 60 ||
            !reward
          }
          customStyle={buttonStyle}
        />
      </ButtonBlock>
    </CreateCallBlock>
  );
};

export default withRouter(CreateCall);
