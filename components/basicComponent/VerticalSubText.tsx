import { FC, ReactNode, Ref, forwardRef } from 'react';
import styled, { CSSProp } from 'styled-components';

const VerticalSubTextBlock = styled.div<{
  ref?: Ref<HTMLDivElement>;
  customStyle?: CSSProp;
}>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.singletons.defaultBackground};
  ${({ customStyle }) => customStyle};
`;

const SubTextTitle = styled.div<{ customStyle?: CSSProp }>`
  font-size: 14px;
  font-weight: 500px;
  margin-bottom: 8px;
  ${({ customStyle }) => customStyle};
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

const RightText = styled.div<{ customStyle?: CSSProp }>`
  display: flex;
  flex: 1;
  font-size: 14px;
  margin-left: 12px;
  ${({ customStyle }) => customStyle};
`;

interface SubTextPropTypes {
  ref?: Ref<HTMLDivElement>;
  title: string;
  content: ReactNode;
  rightText?: string;
  customStyle?: CSSProp;
}

const VerticalSubText: FC<SubTextPropTypes> = forwardRef((props, ref) => {
  const { title, content, rightText, customStyle } = props;
  return (
    <VerticalSubTextBlock ref={ref} customStyle={customStyle}>
      <SubTextTitle customStyle={customStyle}>{title}</SubTextTitle>
      <SubTextContentBlock>
        <ContentBlock>{content}</ContentBlock>
        {rightText && rightText?.length > 0 && (
          <RightText customStyle={customStyle}>{rightText}</RightText>
        )}
      </SubTextContentBlock>
    </VerticalSubTextBlock>
  );
});

VerticalSubText.defaultProps = {
  ref: null,
  rightText: undefined,
  customStyle: {},
};

export default VerticalSubText;
