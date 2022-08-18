import { FC, ReactNode } from 'react';
import styled, { CSSProp } from 'styled-components';

const VerticalSubTextBlock = styled.div<{
  customStyle?: CSSProp;
}>`
  ${({ customStyle }) => customStyle};
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.singletons.defaultBackground};
`;

const SubTextTitle = styled.div`
  font-size: 14px;
  font-weight: 500px;
  margin-bottom: 8px;
`;

interface SubTextPropTypes {
  title: string;
  content: ReactNode;
  customStyle?: CSSProp;
}

const VerticalSubText: FC<SubTextPropTypes> = function VerticalSubText(props) {
  const { title, content, customStyle } = props;

  return (
    <VerticalSubTextBlock customStyle={customStyle}>
      <SubTextTitle>{title}</SubTextTitle>
      {content}
    </VerticalSubTextBlock>
  );
};

VerticalSubText.defaultProps = {
  customStyle: {},
};

export default VerticalSubText;
