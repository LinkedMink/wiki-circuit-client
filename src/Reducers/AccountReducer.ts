import * as jwt from "jsonwebtoken";
import { Reducer } from "redux";
import store from "../Store";
import { AccountAction, AccountActionType } from "../Actions/AccountAction";
import { Claim } from "../Constants/Account";

export interface JwtPayload {
  aud: string;
  claims: Set<Claim>;
  email: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
}

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
    const jwtToken = action.payload as string;
    const signerKey = store.getState().config?.signerKey;
    const decodedToken = (signerKey
      ? jwt.verify(jwtToken, signerKey)
      : jwt.decode(jwtToken)) as JwtPayload;
    decodedToken.claims = new Set(decodedToken.claims);
    return Object.assign({}, state, {
      jwtToken,
      decodedToken,
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
