import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import NavigationMenu from "../Components/NavigationMenu";
import { RootState } from "../Reducers/RootReducer";

export interface NavLink {
  path: string;
  name: string;
  icon: string;
  disabled: boolean;
}

export interface NavigationMenuProps {
  links: NavLink[];
}

function getGuestLinks(): NavLink[] {
  return [
    { path: "/home", name: "Home", icon: "home", disabled: false },
    {
      path: "/visualization",
      name: "Visualization",
      icon: "graph",
      disabled: true,
    },
    { path: "/about", name: "About", icon: "info", disabled: false },
  ];
}

const mapStateToProps: MapStateToProps<
  NavigationMenuProps,
  RouteComponentProps,
  RootState
> = (state: RootState, ownProps: RouteComponentProps) => {
  const links = getGuestLinks();
  const location = ownProps.location;

  if (location && location.pathname.startsWith(links[1].path)) {
    links[1].path = location.pathname;
    links[1].disabled = false;
  } else {
    links[1].disabled = true;
  }

  return {
    links: links,
  };
};

const container = connect(mapStateToProps, null, null, { pure: false })(
  NavigationMenu
);
const NavigationMenuContainer = withRouter(container);

export default NavigationMenuContainer;
