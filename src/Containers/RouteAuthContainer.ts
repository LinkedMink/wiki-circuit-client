import { connect, MapStateToProps } from "react-redux";

import RouteAuth from "../Components/RouteAuth";
import { RootState } from "../Reducers/RootReducer";

const mapStateToProps: MapStateToProps<unknown, unknown, RootState> = (
  state: RootState
) => {
  return {
    isLoggedIn: state.account.jwtToken ? true : false,
    claims:
      state.account.decodedToken && state.account.decodedToken.claims
        ? state.account.decodedToken.claims
        : [],
  };
};

const RouteAuthContainer = connect(mapStateToProps)(RouteAuth);

export default RouteAuthContainer;
