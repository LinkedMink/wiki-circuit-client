import { ConfirmAction, ConfirmActionType } from "../Actions/ConfirmAction";

export interface Confirmation {
  active: {
    key: string;
    message: string;
  };
  inactive: Record<string, unknown>;
}

export type ConfirmationReduced = Confirmation | Record<string, never>;

const confirmReducer = (
  state: ConfirmationReduced = {},
  action: ConfirmAction
): ConfirmationReduced => {
  if (action.type === ConfirmActionType.ClearKey) {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      [action.payload.key as string]: tempKey,
      ...inactive
    } = state.inactive;
    return Object.assign({}, state, { inactive });
  } else if (action.type === ConfirmActionType.OpenDialog) {
    return Object.assign({}, state, {
      active: action.payload,
    });
  } else if (action.type === ConfirmActionType.SetValue) {
    const inactive = Object.assign({}, state.inactive);
    inactive[state.active.key] = action.payload.value;
    return Object.assign({}, state, { inactive, active: undefined });
  } else {
    return state;
  }
};

export default confirmReducer;
