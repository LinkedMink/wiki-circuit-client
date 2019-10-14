import { connect } from "react-redux";

import DialogPanel from "../Components/DialogPanel";
import { alertClear } from "../Actions/Alert";

function mapDispatchToProps(dispatch) {
  return {
    close: () => { dispatch(alertClear()) }
  };
}

function mapStateToProps (state) {
  return {
    show: state.alert.severity ? true : false,
    title: state.alert.severity,
    text: state.alert.message
  };
}

const AlertDialogPanel = connect(mapStateToProps, mapDispatchToProps)(DialogPanel);

export default AlertDialogPanel;