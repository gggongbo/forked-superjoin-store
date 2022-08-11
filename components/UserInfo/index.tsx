import {
  FC,
  useState,
  useCallback,
  Component,
  HTMLAttributes,
  ReactNode,
} from 'react';
import styled from 'styled-components';
import Icon from '../Icon';
import SubText from '../basicComponent/SubText';

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

const IconBlock = styled.a<{ logoutVisible: boolean }>`
  border-radius: 100px;
  border-style: solid;
  border-width: 0px;
  padding: 8px;
  background-color: ${props =>
    props.logoutVisible
      ? `${props.theme.colors.singletons.pressGreen}60`
      : props.theme.colors.singletons.defaultBackground};
  :hover {
    background-color: ${props =>
      `${props.theme.colors.singletons.pressGreen}24`};
  }
  :active,
  :visited {
    background-color: ${props =>
      `${props.theme.colors.singletons.pressGreen}60`};
  }
`;

// const LogoutBlock = styled.div`
//   width: 100px;
//   height: 100px;
//   background-color: red;
//   position: absolute;
//   margin-top: 10px;
// `;

// const LogoutBlock = styled(SubText)`
//   /* width: 100px;
//   height: 100px; */
//   /* position: absolute; */
//   margin-top: 30px;
// `;

// interface UserInfoPropType extends HTMLAttributes<HTMLDivElement> {
//   userId: string;
//   logoutVisible: boolean;
// }

interface UserInfoPropType {
  userId: string;
  logoutVisible: boolean;
  onClick: Function;
}

// TODO: onclick event add
const UserInfo: FC<UserInfoPropType> = function UserInfo(props) {
  const { userId, logoutVisible, onClick } = props;
  console.log('tt', logoutVisible);
  const userImage = null; // TODO: userId => get usermage login add
  return (
    <UserInfoBlock onClick={onClick?.()}>
      <UserImage userImage={userImage} />
      <UserId>{userId}</UserId>
      <IconBlock logoutVisible={logoutVisible}>
        <Icon name="ChevronDown" width={18} height={18} color="black" />
      </IconBlock>
    </UserInfoBlock>
    // {/* {logoutVisible && (
    //   <LogoutBlock
    //     title="logout"
    //     icon={{ name: 'Out', width: 18, height: 18 }}
    //     onClick={() => {}}
    //   />
    // )} */}
  );
};

export default UserInfo;
