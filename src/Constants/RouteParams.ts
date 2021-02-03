import { RouteComponentProps } from "react-router-dom";

export interface IdParams {
  id: string;
}

export type RouteComponentIdProps = RouteComponentProps<IdParams>;

export interface ClaimsParams {
  claims: string;
}

export type RouteComponentClaimsProps = RouteComponentProps<ClaimsParams>;

export interface SetPasswordParams {
  email: string;
  resetToken: string;
}

export type RouteSetPasswordComponentProps = RouteComponentProps<SetPasswordParams>;
