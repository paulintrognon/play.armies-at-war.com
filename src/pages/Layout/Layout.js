import React from 'react';

import './base.css';
import './layout.css';

import config from 'config';

const forumLink = `${config.laravelHost}/forum`;
const logoutLink = `${config.laravelHost}/logout`;

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <nav className="main-nav navbar navbar-dark">
          <div className="container">
            <a className="navbar-brand" href="/">
            Armies At War
          </a>
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <a class="nav-link active" href="/">Jouer</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href={forumLink}>Forum</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href={logoutLink}>
              Déconnection
            </a>
        </li>
      </ul>
    </div>
  </nav>
  <div className="container main-content">
    {this.props.children}
  </div>
</div>
)
}
}
