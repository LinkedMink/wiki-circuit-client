import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

import './NavigationMenu.scss';

class NavigationMenu extends React.Component {
  getIconSrc(icon) {
    return `/img/open-iconic.min.svg#${icon}`;
  }

  getIconClass(icon) {
    return `oi oi-${icon}`;
  }

  render() {
    return (
      <Nav defaultActiveKey="/home" className="flex-column navigation-panel">
        {this.props.links.map((value, index) => {
          return (
            <LinkContainer exact={true} key={index} to={value.path} disabled={value.disabled}>
              <Nav.Link>
                <svg viewBox="0 0 8 8">
                  <use href={this.getIconSrc(value.icon)}></use>
                </svg>
                {/*<span class={this.getIconClass(value.icon)} title={value.name} aria-hidden="true"></span>*/}
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