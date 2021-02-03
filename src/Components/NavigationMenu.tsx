import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./NavigationMenu.scss";

export interface NavLink {
  path: string;
  name: string;
  icon: string;
  disabled: boolean;
}

export interface NavigationMenuProps {
  links: NavLink[];
}

class NavigationMenu extends React.Component<NavigationMenuProps> {
  getIconClass(icon: string): string {
    return `oi oi-${icon}`;
  }

  render(): React.ReactNode {
    return (
      <Nav defaultActiveKey="/home" className="flex-column navigation-panel">
        {this.props.links.map((value, index) => {
          return (
            <LinkContainer
              exact={true}
              key={index}
              to={value.path}
              disabled={value.disabled}
            >
              <Nav.Link active={false}>
                <span
                  className={this.getIconClass(value.icon)}
                  title={value.name}
                  aria-hidden="true"
                ></span>
                {value.name}
              </Nav.Link>
            </LinkContainer>
          );
        })}
      </Nav>
    );
  }
}

export default NavigationMenu;
