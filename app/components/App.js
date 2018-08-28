import React from "react"
const ReactRouter = require("react-router-dom")
const Router = ReactRouter.BrowserRouter
const Route = ReactRouter.Route
import Nav from "./nav"
import Home from "./Home"
import Battle from "./Battle"
import Popular from "./Popular"

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Route exact path="/" component={Home} />
          <Route path="/popular" component={Popular} />
          <Route path="/battle" component={Battle} />
        </div>
      </Router>
    )
  }
}

export default App
