export type MakeOffer = {
  title: string;
  category: string;
  deadline: number;
  reward: number;
  userNum: number;
  content: string;
  email: string | null;
  storeInfo?: object;
};
