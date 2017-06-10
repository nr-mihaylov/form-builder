import React from 'react';
import {Link} from 'react-router';

class Index extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <div>
        <Link to="/fk" >One</Link>
        <Link to="dr" >Two</Link>
      </div>
    );
  }
}

export default Index;
