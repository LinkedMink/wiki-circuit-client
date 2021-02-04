import { connect, MapStateToProps } from "react-redux";
import { withRouter } from "react-router-dom";
import NavGroup, {
  LinkData,
  NavGroupProps,
  NavGroupStateProps,
} from "../Components/Controls/NavGroup";
import { RootState } from "../Reducers/RootReducer";

const getGuestLinks = (): LinkData[] => {
  return [{ path: "/login", name: "Login", icon: "", disabled: false }];
};

const getAuthLinks = (): LinkData[] => {
  return [
    { path: "/account", name: "Account", icon: "", disabled: false },
    { path: "/logout", name: "Logout", icon: "", disabled: false },
  ];
};

const mapStateToProps: MapStateToProps<
  NavGroupStateProps,
  NavGroupProps,
  RootState
> = (state: RootState, ownProps: NavGroupProps) => {
  const links = state.account.jwtToken ? getAuthLinks() : getGuestLinks();

  return { links: links };
};

const container = connect(mapStateToProps, null, null, { pure: false })(
  NavGroup
);
const RightNavGroupContainer = withRouter(container);

export default RightNavGroupContainer;
