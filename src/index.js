import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import JsPlumbDemo from './components/JsPlumb';
import JointJSDemo from './components/JointJS';
import LifeCircle from './components/lifeCircle';
import UrlDemo from './components/urlDemo';
import { Router, Route, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import EchartsWord from './components/echartsWord';
import ChinaMap from './components/ChinaMap';
import './styles/style.less';

const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <div>
      <Route path="/" exact render={ () => <Redirect to="/demo1" /> } />
      <Route path="/jsplumb" component={JsPlumbDemo}/>
      <Route path="/jointjs" component={JointJSDemo}/>
      <Route path="/lifecircle" component={LifeCircle}/>
      <Route path="/url" component={UrlDemo}/>
      <Route path="/words" component={EchartsWord}/>
      <Route path="/chinaMap" component={ChinaMap}/>
    </div>
  </Router>,
document.getElementById('app'));
