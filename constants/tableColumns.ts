import {
  SelectColumnFilter,
  FilterIncludes,
} from '@components/basicComponent/Table/Filter';

const SendOffer = [
  {
    accessor: 'title',
    Header: '제목',
    disableSortBy: true,
  },
  {
    accessor: 'callSendTime',
    Header: '제안 보낸 날짜 / 시간',
    width: 240,
  },
  {
    accessor: 'callEndTime',
    Header: '제안 마감 시간',
    width: 160,
    disableSortBy: true,
  },
  {
    accessor: 'callStatus',
    Header: '제안 상태',
    width: 200,
    Filter: SelectColumnFilter,
    filter: FilterIncludes,
    disableSortBy: true,
  },
  {
    accessor: 'callButton',
    Header: '',
    width: 120,
    disableSortBy: true,
  },
  {
    accessor: 'deleteButton',
    Header: '',
    width: 60,
    disableSortBy: true,
  },
];

const ReceiveOffer = [
  {
    accessor: 'title',
    Header: '제목',
    disableSortBy: true,
  },
  {
    accessor: 'callSendUser',
    Header: '제안 보낸 사람',
    width: 240,
    disableSortBy: true,
  },
  {
    accessor: 'callReceiveTime',
    Header: '제안 받은 날짜 / 시간',
    width: 240,
  },
  {
    accessor: 'callEndTime',
    Header: '제안 마감 시간',
    width: 160,
    disableSortBy: true,
  },
  {
    accessor: 'callStatus',
    Header: '제안 상태',
    width: 200,
    Filter: SelectColumnFilter,
    filter: FilterIncludes,
    disableSortBy: true,
  },
  {
    accessor: 'appealStatus',
    Header: '어필 여부',
    width: 180,
    Filter: SelectColumnFilter,
    filter: FilterIncludes,
    disableSortBy: true,
  },
];

const ConfirmedCustomer = [
  {
    accessor: 'id',
    Header: 'ID',
  },
  {
    accessor: 'nickname',
    Header: '닉네임',
    width: 350,
    disableSortBy: true,
  },
  {
    accessor: 'callCount',
    Header: '제안 보낸 횟수',
    width: 200,
    disableSortBy: true,
  },
  {
    accessor: 'confirmCount',
    Header: '방문 확정 횟수',
    width: 200,
    disableSortBy: true,
  },
  {
    accessor: 'rewardStatus',
    Header: '지급 리워드',
    width: 200,
    Filter: SelectColumnFilter,
    filter: FilterIncludes,
    disableSortBy: true,
  },
];

const ExpectedCustomer = [
  {
    accessor: 'id',
    Header: 'ID',
  },
  {
    accessor: 'nickname',
    Header: '닉네임',
    width: 350,
    disableSortBy: true,
  },
  {
    accessor: 'reserveTime',
    Header: '방문 제안 날짜 / 시간',
    width: 250,
    tooltip: '제안 마감 시간으로 정확하지 않을 수 있습니다.',
    disableSortBy: true,
  },
  {
    accessor: 'reward',
    Header: '지급 예정 리워드',
    width: 175,
    disableSortBy: true,
  },
  {
    accessor: 'visit',
    Header: '방문 확인',
    width: 175,
    tooltip:
      '확인을 누르시면 리워드가 제공되므로 고객이 방문하여 결제할 때 확인을 눌러주세요!',
    disableSortBy: true,
  },
];

export { SendOffer, ReceiveOffer, ConfirmedCustomer, ExpectedCustomer };
