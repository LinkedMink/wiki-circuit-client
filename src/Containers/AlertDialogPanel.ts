import {
  connect,
  MapDispatchToPropsFunction,
  MapStateToProps,
} from "react-redux";
import { Dispatch } from "redux";

import DialogPanel from "../Components/DialogPanel";
import { alertClear } from "../Actions/AlertAction";
import { RootState } from "../Reducers/RootReducer";

const mapStateToProps: MapStateToProps<unknown, unknown, RootState> = (
  state: RootState
) => {
  return {
    show: state.alert.severity ? true : false,
    title: state.alert.severity,
    text: state.alert.message,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<unknown, unknown> = (
  dispatch: Dispatch
) => {
  return {
    close: () => {
      dispatch(alertClear());
    },
  };
};

const AlertDialogPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogPanel);

export default AlertDialogPanel;
