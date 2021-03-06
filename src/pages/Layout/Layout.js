import React from 'react';

import './base.css';
import './layout.css';

import config from 'config';
import { authenticate } from '../../services/api';

const forumLink = `${config.laravelHost}/forum`;
const profileLink = `${config.laravelHost}/profile`;
const logoutLink = `${config.laravelHost}/logout`;
const loginLink = `${config.laravelHost}/login`;


export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: undefined };
  }

  componentWillMount() {
    authenticate()
      .then(res => {
        this.setState({ username: res.data.user.name });
      }, err => {
        window.location.href = loginLink;
      });
  }

  render() {
    return (
      <div>
        <nav className="main-nav navbar navbar-dark">
          <div className="container">
            <a className="navbar-brand" href={config.laravelHost}>
              Armies At War
            </a>
            <ul className="nav justify-content-end">
              <li className="nav-item">
                <a className="nav-link active" href="/">Jouer</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={forumLink}>Forum</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={profileLink}>
                  {this.state.username}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={logoutLink}>
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
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
