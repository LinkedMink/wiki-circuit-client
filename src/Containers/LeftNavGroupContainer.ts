import { connect, MapStateToProps } from "react-redux";
import { withRouter } from "react-router-dom";
import NavGroup, {
  LinkData,
  NavGroupProps,
  NavGroupStateProps,
} from "../Components/Controls/NavGroup";
import { RootState } from "../Reducers/RootReducer";

const getGuestLinks = (): LinkData[] => {
  return [{ path: "/about", name: "About", icon: "", disabled: false }];
};

const getAuthLinks = (): LinkData[] => {
  return [
    {
      path: "/visualization",
      name: "Visualization",
      icon: "",
      disabled: false,
    },
    { path: "/about", name: "About", icon: "", disabled: false },
  ];
};

const mapStateToProps: MapStateToProps<
  NavGroupStateProps,
  NavGroupProps,
  RootState
> = (state: RootState, ownProps: NavGroupProps) => {
  const links = state.account.jwtToken ? getAuthLinks() : getGuestLinks();

  return { links };
};

const container = connect(mapStateToProps, null, null, { pure: false })(
  NavGroup
);
const LeftNavGroupContainer = withRouter(container);

export default LeftNavGroupContainer;
