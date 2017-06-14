import React from 'react';
import {Link} from 'react-router';

class Index extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
        <div>
            <div className={"app__container"}>
                <div className={"app__content"}>
                    <Link className={"app__form"} to="/fk" >Forældrekøb</Link>
                    <Link className={"app__form"} to="/budget" >Budget</Link>
                </div>
            </div>
        </div>
    );
  }
}

export default Index;
