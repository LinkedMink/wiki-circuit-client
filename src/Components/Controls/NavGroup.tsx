import React, { CSSProperties, HTMLProps } from "react";
import { Nav, NavProps } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { RouteComponentProps } from "react-router-dom";

export interface LinkData {
  path: string;
  name: string;
  icon: string;
  disabled: boolean;
}

export interface NavGroupStateProps {
  links?: LinkData[];
}

export interface NavGroupProps
  extends NavGroupStateProps,
    NavProps,
    RouteComponentProps {}

class NavGroup extends React.Component<NavGroupProps> {
  getIconClass(icon: string): string {
    return icon ? `oi oi-${icon}` : "";
  }

  render(): React.ReactNode {
    if (!this.props.links) {
      return <Nav></Nav>;
    }

    return (
      <Nav>
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

export default NavGroup;
