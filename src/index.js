import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import JsPlumbDemo from './components/JsPlumb';
import JointJSDemo from './components/JointJS';
import LifeCircle from './components/lifeCircle';
import { Router, Route, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import './styles/style.less';

const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <div>
      <Route path="/" exact render={ () => <Redirect to="/demo1" /> } />
      <Route path="/jsplumb" component={JsPlumbDemo}/>
      <Route path="/jointjs" component={JointJSDemo}/>
      <Route path="/lifecircle" component={LifeCircle}/>
    </div>
  </Router>,
document.getElementById('app'));
