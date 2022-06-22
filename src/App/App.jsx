import React from "react";
import { Route, Router, BrowserRouter } from "react-router-dom"
import { connect } from "react-redux";

import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { UsersPage } from "../UsersPage";
import { DetailPage } from "../DetailPage";
import Navbar from "../layouts/Navbar";
import Sidebar from "../layouts/Sidebar";
class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const defaultLayout = () => (
      <div className="wrapper">
        <Navbar />
        <Sidebar/>
        <div className="content-wrapper">
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute exact path="/users" component={UsersPage} />
          <PrivateRoute path="/users/detail" component={DetailPage} />
        </div>
      </div>
    );
    const { alert } = this.props;
    return (
      <div>
        {alert.message && (
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        )}
        <BrowserRouter>
          <Router history={history}>
            <div> 
              <Route path="/login" component={LoginPage} />
              <PrivateRoute exact path ="/" component={defaultLayout} />
              <PrivateRoute path ="/users" component={defaultLayout} />
            </div>
          </Router>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert,
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
