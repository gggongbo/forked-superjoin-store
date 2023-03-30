import { addMinutes } from 'date-fns';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import Button from '@components/basicComponent/Button';
import Header from '@components/basicComponent/Header';
import InputText from '@components/basicComponent/InputText';
import SelectBox from '@components/basicComponent/Selectbox';
import VerticalSubText from '@components/basicComponent/VerticalSubText';
import { categoryList } from '@constants/categoryList';
import type { CreateCallType } from '@constants/types/call';
import { CurrentStoreUserType, ReduxStoreType } from '@constants/types/redux';
import { RewardItemType } from '@constants/types/reward';
import { callService } from '@services/call';

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

const CreateCall: NextPage = function CreateCall() {
  const router = useRouter();
  const email = useSelector<ReduxStoreType, string | null>(
    ({ auth }) => auth?.currentUser?.email,
  );
  const currentStoreUser = useSelector<ReduxStoreType, CurrentStoreUserType>(
    ({ storeUser }) => storeUser.currentStoreUser,
  );
  const [title, setTitle] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [userNum, setUserNum] = useState<number>(0);
  const [deadline, setDeadline] = useState<Date>();
  const [reward, setReward] = useState<RewardItemType>();

  const submit = () => {
    if (
      !title?.length ||
      !category?.length ||
      !description?.length ||
      userNum < 1 ||
      userNum > 10 ||
      !deadline ||
      !reward
    )
      return;
    const data: CreateCallType = {
      title,
      category,
      description,
      userNum,
      deadline,
      reward,
      email,
    };
    callService
      .createStoreCall(data, currentStoreUser)
      .then(() => router.replace('/call', undefined, { shallow: true }));
  };

  // TODO: dummy => fetch
  const rewardData = useMemo(
    () => [
      { id: 1, name: '음료수', value: '음료수' },
      { id: 2, name: '음료수2', value: '음료수2' },
      { id: 3, name: '음료수3', value: '음료수3' },
      { id: 4, name: '음료수4', value: '음료수4' },
      { id: 5, name: '음료수5', value: '음료수5' },
      { id: undefined, name: '없음', value: '없음' },
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
              onChange={e => setUserNum(e.target.value)}
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
              onChange={e => {
                const now = new Date();
                setDeadline(addMinutes(now, e.target.value));
              }}
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
              optionList={rewardData}
              onChange={e => {
                setReward(e.target.selectValue);
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
            userNum < 1 ||
            userNum > 10 ||
            !deadline ||
            !reward
          }
          customStyle={buttonStyle}
        />
      </ButtonBlock>
    </CreateCallBlock>
  );
};

export default CreateCall;
