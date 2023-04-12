import React, { FC, ReactNode, useMemo } from 'react';
import styled, { CSSProp } from 'styled-components';

const ListBoxBlock = styled.div<{
  customStyle?: CSSProp;
}>`
  width: 100%;
  ${({ customStyle }) => customStyle};
`;

const ListItemBlock = styled.div<{
  customStyle?: CSSProp;
}>`
  display: inline-flex;
  ${({ customStyle }) => customStyle};
`;

interface ListBoxPropTypes {
  data: any[];
  loading?: boolean;
  renderItem: Function;
  listEmptyComponent?: ReactNode;
  customStyle?: CSSProp;
}

const ListBox: FC<ListBoxPropTypes> = function ListBox(props) {
  const {
    data,
    loading = false,
    renderItem,
    listEmptyComponent,
    customStyle,
  } = props;

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

  if (loading) return null;
  return (
    <ListBoxBlock customStyle={customStyle}>
      {data?.length > 0 ? dataComponent : listEmptyComponent}
    </ListBoxBlock>
  );
};

ListBox.defaultProps = {
  loading: false,
  listEmptyComponent: null,
  customStyle: {},
};

export default ListBox;
