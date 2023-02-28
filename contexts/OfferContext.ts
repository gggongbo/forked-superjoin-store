import { createContext } from 'react';

interface OfferInitialStateType {
  setGlobalFilter: Function;
}
const OfferInitialState = {
  setGlobalFilter: () => {},
};

const OfferContext = createContext<OfferInitialStateType>(OfferInitialState);

export { OfferContext };
