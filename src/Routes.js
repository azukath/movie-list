import React, { Component } from 'react'
import './index.less';
import './styles/global.css'
import { BrowserRouter as Router, Switch, Route }  from "react-router-dom";
import { connect } from 'react-redux'
import { Home, MyList, NotFound } from './containers';

export class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/my-list" exact component={MyList} />
          <Route path="*" component={NotFound} />
        </Switch> 
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
