import { addMinutes } from 'date-fns';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import Button from '@components/basicComponent/Button';
import Header from '@components/basicComponent/Header';
import InputText from '@components/basicComponent/InputText';
import SelectBox from '@components/basicComponent/Selectbox';
import VerticalSubText from '@components/basicComponent/VerticalSubText';
import { categoryList } from '@constants/categoryList';
import type { MakeOfferType } from '@constants/types/offer';
import { CurrentStoreUserType, ReduxStoreType } from '@constants/types/redux';
import { offerService } from '@services/offer';

const MakeOfferBlock = styled.main`
  display: flex;
  flex-direction: column;
  padding: 24px;
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

const MakeOffer: NextPage = function MakeOffer() {
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
  const [reward, setReward] = useState<number>(0);

  const submit = () => {
    if (
      !title?.length ||
      !category?.length ||
      !description?.length ||
      userNum < 1 ||
      userNum > 10 ||
      !deadline ||
      reward < 1
    )
      return;
    const data: MakeOfferType = {
      title,
      category,
      description,
      userNum,
      deadline,
      reward,
      email,
    };
    offerService
      .createOffer(data, currentStoreUser)
      .then(() => router.replace('/offer', '/offer', { shallow: true }));
  };

  return (
    <MakeOfferBlock>
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
          title="제공할 보상"
          customStyle={inputTextNumberStyle}
          content={
            <InputText
              type="number"
              onChange={e => setReward(e.target.value)}
              placeholder="최소 1포인트"
              range={{ min: 1 }}
            />
          }
          rightText="포인트"
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
            reward < 1
          }
          customStyle={buttonStyle}
        />
      </ButtonBlock>
    </MakeOfferBlock>
  );
};

export default MakeOffer;
