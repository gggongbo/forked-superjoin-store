import axios from 'axios';

// 투두:서비스 쓰도록 수정 //테스트용 임시 소스임
const getSendOffer = () =>
  axios.get(`http://localhost:3001/store/admin@superjo.in`);

export { getSendOffer };
