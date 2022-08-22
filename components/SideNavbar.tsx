import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import routerName from '@constants/router';
import LinkSubText from './basicComponent/LinkSubText';

const NavbarBlock = styled.div<{ selectedMenu?: string }>`
  display: flex;
  flex-direction: column;
  width: 312px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.singletons.backgroundGray};
  border-color: ${({ theme }) => theme.colors.gray[3]};
  border-style: solid;
  border-width: 0px;
  border-right-width: 1px;
`;

const SideNavbar: FC = function SideNavbar() {
  const router = useRouter();
  const [selectedRouter, setSelectedRouter] = useState<string>(''); // TODO: redux store로 관리

  useEffect(() => {
    const currentPage = router.pathname.split('/').pop();
    setSelectedRouter(currentPage || '');
  }, [router.pathname]);

  return (
    <NavbarBlock>
      <LinkSubText
        title="방문 제안(지금 만나요)"
        icon="UserNow"
        routerName={routerName.MakeOffer}
        selectedRouter={selectedRouter}
      />
      <LinkSubText
        title="제안 관리"
        icon="Offer"
        routerName={routerName.Offer}
        selectedRouter={selectedRouter}
      />
      <LinkSubText
        title="고객 관리"
        icon="UserList"
        routerName={routerName.Customer}
        selectedRouter={selectedRouter}
      />
      <LinkSubText
        title="리워드 관리"
        icon="Point2"
        routerName={routerName.Reward}
        selectedRouter={selectedRouter}
      />
      <LinkSubText
        title="고객 센터"
        icon="Qa"
        routerName={routerName.Support}
        selectedRouter={selectedRouter}
      />
    </NavbarBlock>
  );
};
export default SideNavbar;
