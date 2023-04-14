import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import SubTextLink from '@components/BasicComponent/SubTextLink';
import routerName from '@constants/router';

const NavbarBlock = styled.div<{ selectedMenu?: string }>`
  display: flex;
  flex-direction: column;
  min-width: ${({ theme }) => theme.componentSizes.sideNavbar.width}px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.singletons.backgroundGray};
  border-color: ${({ theme }) => theme.colors.gray[300]};
  border-style: solid;
  border-width: 0px;
  border-right-width: 1px;
`;

const SideNavbar: FC = function SideNavbar() {
  const router = useRouter();
  const [selectedRouter, setSelectedRouter] = useState<string>('');

  useEffect(() => {
    const currentPage = router.pathname.split('/').pop();
    setSelectedRouter(currentPage || '');
  }, [router.pathname]);

  return (
    <NavbarBlock>
      <SubTextLink
        title="방문 제안 (지금 만나요)"
        icon="UserNow"
        routerName={routerName.CreateCall}
        selectedRouter={selectedRouter}
      />
      <SubTextLink
        title="제안 관리"
        icon="Offer"
        routerName={routerName.Call}
        selectedRouter={selectedRouter}
      />
      <SubTextLink
        title="고객 관리"
        icon="UserList"
        routerName={routerName.Member}
        selectedRouter={selectedRouter}
      />
      <SubTextLink
        title="리워드 관리"
        icon="Point2"
        routerName={routerName.Reward}
        selectedRouter={selectedRouter}
      />
      <SubTextLink
        title="고객 센터"
        icon="Qa"
        routerName={routerName.Support}
        selectedRouter={selectedRouter}
      />
    </NavbarBlock>
  );
};
export default SideNavbar;
