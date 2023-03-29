import React, { FC, ReactNode, useMemo } from 'react';
import styled, { CSSProp } from 'styled-components';

interface ListBoxPropTypes {
  data: any[];
  renderItem: Function;
  listEmptyComponent?: ReactNode;
  customStyle?: CSSProp;
}

const ListBoxBlock = styled.div<{
  customStyle?: CSSProp;
}>`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  ${({ customStyle }) => customStyle};
`;

const ListItemBlock = styled.div<{
  customStyle?: CSSProp;
}>`
  display: inline-flex;
  ${({ customStyle }) => customStyle};
`;

const ListBox: FC<ListBoxPropTypes> = function ListBox(props) {
  const { data, renderItem, listEmptyComponent, customStyle } = props;

  const dataComponent = useMemo(() => {
    if (!data) return null;
    return data.map((item, index) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <ListItemBlock key={`${index}${item}`} customStyle={customStyle}>
          {renderItem({ item, index })}
        </ListItemBlock>
      );
    });
  }, [customStyle, data, renderItem]);

  return (
    <ListBoxBlock customStyle={customStyle}>
      {data?.length > 0 ? dataComponent : listEmptyComponent}
    </ListBoxBlock>
  );
};

ListBox.defaultProps = {
  listEmptyComponent: null,
  customStyle: {},
};

export default ListBox;
