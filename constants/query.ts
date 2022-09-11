import axios from 'axios';

// TODO url 설정 필요
const getSendOffer = (uid: any) => {
  return axios.get(`http://localhost:3002/store/sendoffers/${uid.queryKey[0]}`);
};

export { getSendOffer };
