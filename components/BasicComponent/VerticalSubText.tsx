import { FC, ReactNode, Ref, forwardRef } from 'react';
import { Tooltip } from 'react-tooltip';
import styled, { css, CSSProp } from 'styled-components';

import Icon from '../Icon';

import { TooltipType } from '@constants/types/components';

const VerticalSubTextBlock = styled.div<{
  ref?: Ref<HTMLDivElement>;
  customStyle?: CSSProp;
}>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.singletons.defaultBackground};
  ${({ customStyle }) => customStyle};
`;

const SubTextTitleBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const SubTextTitle = styled.div<{ customStyle?: CSSProp }>`
  font-size: 14px;
  font-weight: 500px;
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
`;

const CustomTooltipBlock = styled.div`
  margin-left: 10px;
`;

const CustomTooltip = styled(Tooltip)<{
  marginPosition?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}>`
  position: absolute;
  margin: ${({ marginPosition }) =>
    `${marginPosition?.top || 0}px 
    ${marginPosition?.right || 0}px 
    ${marginPosition?.bottom || 0}px
    ${marginPosition?.left || 0}px`};
  padding: 2px 8px 2px 8px;
  background-color: ${({ theme }) => theme.colors.green[200]};
  border: 1px solid ${({ theme }) => theme.colors.green[300]};
  border-radius: 4px;
  -webkit-box-shadow: 0px 1px 8px 0px
    ${({ theme }) => `${theme.colors.singletons.realBlack}20`};
  box-shadow: 0px 1px 8px 0px
    ${({ theme }) => `${theme.colors.singletons.realBlack}20`};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text[600]};
`;

const tooltipIconStyle = css`
  :hover {
    background-color: ${({ theme }) => theme.colors.singletons.green};
  }
`;

interface SubTextPropTypes {
  ref?: Ref<HTMLDivElement>;
  title: string;
  content: ReactNode;
  rightText?: string;
  tooltip?: TooltipType | null;
  customStyle?: CSSProp;
}

const VerticalSubText: FC<SubTextPropTypes> = forwardRef((props, ref) => {
  const { title, content, rightText, tooltip, customStyle } = props;
  return (
    <VerticalSubTextBlock ref={ref} customStyle={customStyle}>
      <SubTextTitleBlock>
        <SubTextTitle customStyle={customStyle}>{title}</SubTextTitle>
        {!!tooltip && (
          <CustomTooltipBlock
            data-tooltip-id="vertical-sub-text-tooltip"
            data-tooltip-content={tooltip.value}
          >
            <Icon
              name="Help"
              width={16}
              height={16}
              customStyle={tooltipIconStyle}
              color="gray"
              colorIndex={500}
            />
            <CustomTooltip
              id="vertical-sub-text-tooltip"
              place="bottom"
              offset={4}
              noArrow
              marginPosition={tooltip?.position}
            />
          </CustomTooltipBlock>
        )}
      </SubTextTitleBlock>
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
  tooltip: null,
  customStyle: {},
};

export default VerticalSubText;
