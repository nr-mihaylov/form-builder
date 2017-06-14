// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import {Link} from 'react-router';

export default class App extends Component {
    props: {
        children: Children
    };

    render() {
        return (
            <div className={"app"}>
                <nav className={"app__menu"}>
                    <Link className={"ion-log-out"} to="/" ></Link>
                </nav>
                {this.props.children}
            </div>
        );
    }
}
