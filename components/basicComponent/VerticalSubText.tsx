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

const SubTextContentBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ContentBlock = styled.div`
  display: flex;
  flex: 1;
`;

const RightText = styled.div`
  display: flex;
  flex: 1;
  font-size: 14px;
  margin-left: 12px;
`;

interface SubTextPropTypes {
  title: string;
  content: ReactNode;
  rightText?: string;
  customStyle?: CSSProp;
}

const VerticalSubText: FC<SubTextPropTypes> = function VerticalSubText(props) {
  const { title, content, rightText, customStyle } = props;

  return (
    <VerticalSubTextBlock customStyle={customStyle}>
      <SubTextTitle>{title}</SubTextTitle>
      <SubTextContentBlock>
        <ContentBlock>{content}</ContentBlock>
        {rightText && rightText?.length > 0 && (
          <RightText>{rightText}</RightText>
        )}
      </SubTextContentBlock>
    </VerticalSubTextBlock>
  );
};

VerticalSubText.defaultProps = {
  rightText: undefined,
  customStyle: {},
};

export default VerticalSubText;
