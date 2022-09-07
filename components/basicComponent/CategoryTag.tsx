import { FC } from 'react';
import styled, { CSSProp } from 'styled-components';
import * as CategoryList from 'constants/category';
import { Category } from '~/types/category';

const CategoryTagBlock = styled.div<{
  backgroundColor: string;
  padding: string;
  customStyle?: CSSProp;
}>`
  display: flex;
  align-items: 'center';
  justify-content: 'center';
  border-radius: 6px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: ${({ padding }) => padding};
  ${({ customStyle }) => customStyle};
`;

const CategoryTextBlock = styled.div<{
  fontSize: number;
}>`
  color: ${({ theme }) => theme.colors.singletons.white};
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: 500;
  text-align: center;
`;

interface CategoryListType {
  [key: string]: Category;
}

const categoryList: CategoryListType = {
  ...CategoryList,
};

interface styleListType {
  [key: string]: any;
}

interface CategoryTagProps {
  customStyle?: CSSProp;
  size?: string;
  value?: string;
}

const CategoryTag: FC<CategoryTagProps> = function CategoryTag(props) {
  const { customStyle, size = 'medium', value = 'etc' } = props;
  //   const { colors } = useColors();
  const categoryInfo = categoryList[value?.toUpperCase()] || categoryList.ETC;
  const styleList: styleListType = {
    large: {
      fontSize: 13,
      padding: '3px 8px 3px 8px',
    },
    medium: {
      fontSize: 12,
      padding: '3px 8px 3px 8px',
    },
    small: {
      fontSize: 11,
      padding: '3px 8px 3px 8px',
    },
  };

  const { fontSize, padding } = styleList[size];

  return (
    <CategoryTagBlock
      backgroundColor={categoryInfo.color}
      padding={padding}
      customStyle={customStyle}
    >
      <CategoryTextBlock fontSize={fontSize}>
        {categoryInfo.name}
      </CategoryTextBlock>
    </CategoryTagBlock>
  );
};

CategoryTag.defaultProps = {
  customStyle: {},
  size: 'medium',
  value: 'etc',
};

export { CategoryTag };
