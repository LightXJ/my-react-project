import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import DemoOne from './components/DemoOne';
import { Router, Route, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import './styles/style.less';

const history = createBrowserHistory()

// Render the main component into the dom
ReactDOM.render(
  <Router history={history}>
    <div>
      <Route path="/" exact render={ () => <Redirect to="/demo1" /> } />
      <Route path="/demo1" component={DemoOne}/>
      <Route path="/demo2" component={DemoOne}/>
    </div>
  </Router>,
document.getElementById('app'));
