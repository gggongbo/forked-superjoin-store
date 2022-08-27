import type { NextPage } from 'next';
import { useMemo, useState, useCallback } from 'react';
import styled from 'styled-components';
import Divider from '@components/basicComponent/Divider';
import Header from '@components/basicComponent/Header';
import SelectInputText from '@components/basicComponent/SelectInputText';
import InputText from '@components/basicComponent/InputText';
import Icon from '@components/Icon';
import { Search } from '~/types/basicComponent';
import { debounce } from 'lodash';
import ReceiveOffer from './ReceiveOffer';
import SendOffer from './SendOffer';

const optionList = [
  { name: '제목', value: 'title' },
  { name: '내용', value: 'content' },
];

const OfferBlock = styled.main`
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderText = styled.div<{ offerType: string; defaultValue: string }>`
  font-size: 24px;
  letter-spacing: -0.55px;
  font-weight: ${props => props.offerType === props.defaultValue && 500};
  color: ${props =>
    props.offerType === props.defaultValue
      ? props.theme.colors.text[6]
      : props.theme.colors.text[2]};
`;

const HeaderDivider = styled(Divider)`
  margin: 0px 20px 0px 20px;
  height: 24px;
  border-color: ${props => props.theme.colors.gray[6]};
`;

const HeaderRightBlock = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const Offer: NextPage = function Offer() {
  const [offerType, setOfferType] = useState<string>('send');
  const [input, setInput] = useState<Search>();
  const [search, setSearch] = useState<Search>();

  const onInputChange = useCallback((event: any) => {
    setInput(event.target.valueObject);
  }, []);

  const debounceSetInput = useMemo(
    () => debounce(onInputChange, 300),
    [onInputChange],
  );

  const handleInputChange = useCallback(
    (e: any) => {
      debounceSetInput(e);
    },
    [debounceSetInput],
  );

  const headerLeftComponent = useMemo(() => {
    return (
      <HeaderBlock>
        <HeaderText
          onClick={() => setOfferType('send')}
          offerType={offerType}
          defaultValue="send"
        >
          보낸 제안 관리
        </HeaderText>
        <HeaderDivider isVertical />
      </HeaderBlock>
    );
  }, [offerType]);

  const headerRightComponent = useMemo(() => {
    return (
      <HeaderRightBlock>
        {offerType === 'send' ? (
          <InputText
            width={280}
            placeholder="제목 검색"
            valueType={optionList[0].value}
            onChange={handleInputChange}
            rightComponent={
              <Icon
                width={20}
                height={20}
                name="Search"
                color="realBlack"
                onClick={() => {
                  setSearch(input);
                }}
              />
            }
          />
        ) : (
          // todo: change handelr test and 수정하기
          <SelectInputText
            optionList={optionList}
            onChange={handleInputChange}
          />
        )}
      </HeaderRightBlock>
    );
  }, [input, offerType, handleInputChange]);

  const headertitleComponent = useMemo(() => {
    return (
      <HeaderBlock>
        <HeaderText
          onClick={() => setOfferType('receive')}
          offerType={offerType}
          defaultValue="receive"
        >
          받은 제안 관리
        </HeaderText>
      </HeaderBlock>
    );
  }, [offerType]);

  return (
    <OfferBlock>
      <Header
        titleComponent={headertitleComponent}
        leftComponent={headerLeftComponent}
        rightComponent={headerRightComponent}
      />
      {offerType === 'send' ? (
        <SendOffer search={search} />
      ) : (
        <ReceiveOffer search={search} />
      )}
    </OfferBlock>
  );
};

export default Offer;
