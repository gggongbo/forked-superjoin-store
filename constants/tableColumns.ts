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

const NearCustomer = [
  {
    accessor: 'id',
    Header: 'ID',
  },
  {
    accessor: 'nickname',
    Header: '닉네임',
    width: 455,
    disableSortBy: true,
  },
  {
    accessor: 'callCount',
    Header: '제안 보낸 횟수',
    width: 200,
  },
  {
    accessor: 'confirmCount',
    Header: '방문 확정 횟수',
    width: 200,
  },
  {
    accessor: 'rewardStatus',
    Header: '리워드 제공 여부',
    width: 200,
    Filter: SelectColumnFilter,
    filter: FilterIncludes,
    disableSortBy: true,
  },
];

export { SendOffer, ReceiveOffer, NearCustomer };
