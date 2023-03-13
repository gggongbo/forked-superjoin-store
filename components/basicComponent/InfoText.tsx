import { FC } from 'react';
import styled from 'styled-components';

const InfoTextBlock = styled.div<{ width: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: ${({ width }) => (width > 0 ? `${width}px` : '100%')};
  min-width: 160px;
  padding: 6px 0px;
  border-radius: 6px;
  background-color: ${({ theme }) => `${theme.colors.green[400]}18`};
`;

const InfoTextContent = styled.div`
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface InfoTextProps {
  width?: number;
  content: string;
}
const InfoText: FC<InfoTextProps> = function InfoText(props) {
  const { width = 0, content } = props;
  return (
    <InfoTextBlock width={width}>
      <InfoTextContent>{content}</InfoTextContent>
    </InfoTextBlock>
  );
};

InfoText.defaultProps = {
  width: 0,
};

export default InfoText;
