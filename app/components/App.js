import React from "react"
const ReactRouter = require("react-router-dom")
const Router = ReactRouter.BrowserRouter
const Route = ReactRouter.Route
import Nav from "./nav"
import Home from "./Home"
import Battle from "./Battle"
import Popular from "./Popular"
const Switch = ReactRouter.Switch

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/popular" component={Popular} />
            <Route render={() => <p>Not Found</p>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
