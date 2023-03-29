import { createContext } from 'react';

interface CallInitialStateType {
  setGlobalFilter: Function;
}
const CallInitialState = {
  setGlobalFilter: () => {},
};

const CallContext = createContext<CallInitialStateType>(CallInitialState);

export { CallContext };
