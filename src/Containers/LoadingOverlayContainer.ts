import { connect, MapStateToProps } from "react-redux";

import LoadingOverlay, {
  LoadingOverlayaProps,
} from "../Components/LoadingOverlay";
import { RootState } from "../Reducers/RootReducer";

const mapStateToProps: MapStateToProps<
  LoadingOverlayaProps,
  unknown,
  RootState
> = (state: RootState) => {
  return {
    isLoading: state.loading.isLoading,
    percentComplete:
      state.loading.percentComplete === null
        ? undefined
        : state.loading.percentComplete,
    message: state.loading.message,
  };
};

const LoadingOverlayContainer = connect(mapStateToProps)(LoadingOverlay);

export default LoadingOverlayContainer;
