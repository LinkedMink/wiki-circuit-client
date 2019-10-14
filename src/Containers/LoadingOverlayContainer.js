import { connect } from "react-redux";

import LoadingOverlay from "../Components/LoadingOverlay";

function mapStateToProps (state) {
  return {
    isLoading: state.loading.isLoading,
    percentComplete: state.loading.percentComplete,
    message: state.loading.message
  };
}

const LoadingOverlayContainer = connect(mapStateToProps)(LoadingOverlay);

export default LoadingOverlayContainer;