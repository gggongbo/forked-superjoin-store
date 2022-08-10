import { FC } from 'react';
import styled from 'styled-components';
import Icon from '../Icon';

const UserInfoBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserImage = styled.div<{ userImage?: string | null }>`
  width: 36px;
  aspect-ratio: 1;
  background-image: url(${props => props.userImage});
  background-color: gray;
  background-position: center;
  background-size: cover;
  @media ${({ theme }) => theme.media.mobile} {
    width: 15px;
  }
`;

const UserId = styled.div`
  margin: 0px 16px 0px 16px;
  /* opacity: 0.84; */
  font-size: 14px;
  color: ${props => props.theme.colors.singletons.realBlack}84;
  word-break: keep-all;
  @media ${({ theme }) => theme.media.tablet} {
    margin: 0px 8px 0px 8px;
  }
  @media ${({ theme }) => theme.media.mobile} {
    margin: 0px 2px 0px 2px;
    font-size: 10px;
  }
`;

interface UserInfoPropType {
  userId: string;
}

// TODO: onclick event add
const UserInfo: FC<UserInfoPropType> = function UserInfo(props) {
  const { userId } = props;
  const userImage = null; // TODO: userId => get usermage login add
  return (
    <UserInfoBlock>
      <UserImage userImage={userImage} />
      <UserId>{userId}</UserId>
      <Icon
        name="ChevronDown"
        width={18}
        height={18}
        color="realBlack"
        opacity={84}
      />
    </UserInfoBlock>
  );
};

export default UserInfo;
