import { Reducer } from "redux";
import {
  AccountAction,
  AccountActionType,
  AccountTokens,
} from "../Actions/AccountAction";
import { JwtPayload } from "../Constants/Account";

export interface Account {
  jwtToken?: string;
  decodedToken?: JwtPayload;
  profile: Record<string, unknown>;
}

export type AccountReduced = Account | Record<string, never>;

const accountReducer: Reducer<AccountReduced, AccountAction> = (
  state: AccountReduced = {},
  action: AccountAction
): AccountReduced => {
  if (action.type === AccountActionType.SaveSession) {
    const tokens = action.payload as AccountTokens;
    return Object.assign({}, state, {
      jwtToken: tokens.jwtToken,
      decodedToken: tokens.decodedToken,
    });
  } else if (action.type === AccountActionType.DestroySession) {
    return Object.assign({}, state, {
      jwtToken: undefined,
      decodedToken: undefined,
    });
  } else if (action.type === AccountActionType.SaveAccount) {
    return Object.assign({}, state, {
      profile: action.payload,
    });
  } else {
    return state;
  }
};

export default accountReducer;
