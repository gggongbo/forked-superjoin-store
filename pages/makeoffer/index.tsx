import type { NextPage } from 'next';

import styled, { css } from 'styled-components';

import InputText from '@components/basicComponent/InputText';
import VerticalSubText from '@components/basicComponent/VerticalSubText';
import Button from '@components/basicComponent/Button';
import Header from '@components/basicComponent/Header';
import SelectBox from '@components/basicComponent/Selectbox';
import { categoryList } from '@constants/category';

const MakeOfferBlock = styled.main`
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

const ContentBlock = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px 8px;
  width: 576px;
`;

const subjectStyle = css`
  margin-top: 16px;
`;

const mediumContentStyle = css`
  margin-top: 16px;
`;

const smallContentStyle = css`
  margin-top: 16px;
  width: 272px;
`;

const buttonStyle = css`
  margin-top: 32px;
`;

const MakeOffer: NextPage = function MakeOffer() {
  return (
    <MakeOfferBlock>
      <Header title="방문 제안" />

      <ContentBlock>
        <VerticalSubText
          title="제목"
          content={<InputText placeholder="제목을 입력해주세요." />}
          customStyle={subjectStyle}
        />
        <VerticalSubText
          title="카테고리"
          content={
            <SelectBox optionList={categoryList} placeholder="카테고리 선택" />
          }
          customStyle={smallContentStyle}
        />
        <VerticalSubText
          title="설명"
          content={
            <InputText
              height={116}
              isArea
              placeholder={`설명을 입력해주세요.\n(구체적인 약속 시간, 약속 장소, 활동 내용을 입력하면 멤버를 모집하는데 도움이 됩니다!)`}
            />
          }
          customStyle={mediumContentStyle}
        />
        <VerticalSubText
          title="모집 인원"
          content={
            <InputText type="number" width={272} placeholder="최대 10명" />
          }
          rightText="명"
          customStyle={mediumContentStyle}
        />
        <VerticalSubText
          title="제안 마감 시간"
          content={
            <InputText type="number" width={272} placeholder="1 ~ 60분" />
          }
          rightText="분 후"
          customStyle={mediumContentStyle}
        />
        <VerticalSubText
          title="제공할 보상"
          content={
            <InputText type="number" width={272} placeholder="최소 1포인트" />
          }
          rightText="포인트"
          customStyle={mediumContentStyle}
        />
        <Button
          text="제안 보내기"
          type="button"
          onClick={() => {
            alert('click');
          }}
          customStyle={buttonStyle}
        />
      </ContentBlock>
    </MakeOfferBlock>
  );
};

export default MakeOffer;
