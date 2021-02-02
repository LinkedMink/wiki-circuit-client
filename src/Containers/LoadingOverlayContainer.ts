import { connect, MapStateToProps } from "react-redux";

import LoadingOverlay from "../Components/LoadingOverlay";
import { RootState } from "../Reducers/RootReducer";

const mapStateToProps: MapStateToProps<unknown, unknown, RootState> = (
  state: RootState
) => {
  return {
    isLoading: state.loading.isLoading,
    percentComplete: state.loading.percentComplete,
    message: state.loading.message,
  };
};

const LoadingOverlayContainer = connect(mapStateToProps)(LoadingOverlay);

export default LoadingOverlayContainer;
