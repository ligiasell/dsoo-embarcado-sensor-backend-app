import React from 'react';

class Auth extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    return(
      <div className="not-found">
        {/* NotFoundRoute */}
        <h1 className="title">404 ERROR</h1>
        <h3 className="description">Page Not Found</h3>
      </div>
    );
  }
}

export default Auth;
