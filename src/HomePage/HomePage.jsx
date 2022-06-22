import React from "react";
import { connect } from "react-redux";


class HomePage extends React.Component {
    
  render() {
    const { user } = this.props;
    console.log(user.firstName);
    return (
      <div>
          <h1>This is Home Page</h1>
      </div>
    );
    
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users,
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
