import type { NextPage } from 'next';
import styled from 'styled-components';
import { Search } from '~/types/basicComponent';

const OfferBlock = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center; //test setting
  justify-content: center; //test setting
`;

interface ReceiveProps {
  search?: Search;
}

const ReceiveOffer: NextPage<ReceiveProps> = function ReceiveOffer(props) {
  const { search } = props;
  const searchType = search?.type || '';
  const searchValue = search?.value || '';

  return (
    <OfferBlock>
      <p>receive </p>
      <span>
        {searchType}
        {searchValue}
      </span>
      {/* <div>{search}</div> */}
    </OfferBlock>
  );
};

ReceiveOffer.defaultProps = {
  search: { type: '', value: '' },
};
export default ReceiveOffer;
