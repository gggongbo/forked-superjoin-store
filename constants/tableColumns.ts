import {
  SelectColumnFilter,
  FilterIncludes,
} from '@components/BasicComponent/Table/Filter';

// 데이터-테이블 매핑 설정, 최소한 필요한 width 지정, 필터링/소트 가능여부 설정 가능
const SendCall = [
  {
    accessor: 'callTitle',
    Header: '제목',
    disableSortBy: true,
  },
  {
    accessor: 'callSendTime',
    Header: '제안 보낸 날짜 / 시간',
    width: 250,
  },
  {
    accessor: 'callEndTime',
    Header: '제안 마감 시간',
    width: 120,
    disableSortBy: true,
  },
  {
    accessor: 'callStatus',
    Header: '제안 상태',
    width: 150,
    Filter: SelectColumnFilter,
    filter: FilterIncludes,
    disableSortBy: true,
  },
  {
    accessor: 'callButton',
    Header: '',
    width: 200,
    disableSortBy: true,
  },
  {
    accessor: 'deleteButton',
    Header: '',
    width: 70,
    disableSortBy: true,
  },
];

const ReceiveCall = [
  {
    accessor: 'callTitle',
    Header: '제목',
    disableSortBy: true,
  },
  {
    accessor: 'callSendUser',
    Header: '제안 보낸 사람',
    width: 200,
    disableSortBy: true,
  },
  {
    accessor: 'callReceiveTime',
    Header: '제안 받은 날짜 / 시간',
    width: 250,
  },
  {
    accessor: 'callEndTime',
    Header: '제안 마감 시간',
    width: 120,
    disableSortBy: true,
  },
  {
    accessor: 'callStatus',
    Header: '제안 상태',
    width: 150,
    Filter: SelectColumnFilter,
    filter: FilterIncludes,
    disableSortBy: true,
  },
  {
    accessor: 'appealStatus',
    Header: '어필 여부',
    width: 200,
    Filter: SelectColumnFilter,
    filter: FilterIncludes,
    disableSortBy: true,
  },
];

const VisitedMember = [
  {
    accessor: 'memberId',
    Header: 'ID',
  },
  {
    accessor: 'memberName',
    Header: '닉네임',
    width: 200,
    disableSortBy: true,
  },
  {
    accessor: 'memberNumOfConfirm',
    Header: '제안 보낸 횟수',
    width: 200,
    disableSortBy: true,
  },
  {
    accessor: 'memberNumOfCancel',
    Header: '방문 취소 횟수',
    width: 200,
    disableSortBy: true,
  },
  {
    accessor: 'memberNumOfVisit',
    Header: '방문 확정 횟수',
    width: 200,
    disableSortBy: true,
  },
  {
    accessor: 'memberNumOfReward',
    Header: '지급 리워드 횟수',
    width: 200,
    Filter: SelectColumnFilter,
    filter: FilterIncludes,
    disableSortBy: true,
  },
];

const ReservedMember = [
  {
    accessor: 'memberId',
    Header: 'ID',
  },
  {
    accessor: 'memberName',
    Header: '닉네임',
    width: 200,
    disableSortBy: true,
  },
  {
    accessor: 'callTitle',
    Header: '제안 제목',
    width: 200,
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
    width: 200,
    disableSortBy: true,
  },
  {
    accessor: 'visit',
    Header: '방문 확인',
    width: 200,
    tooltip:
      '확인을 누르시면 리워드가 제공되므로 고객이 방문하여 결제할 때 확인을 눌러주세요!',
    disableSortBy: true,
  },
];

export { SendCall, ReceiveCall, VisitedMember, ReservedMember };
