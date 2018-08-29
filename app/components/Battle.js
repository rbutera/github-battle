import React from "react"
import PlayerInput from "./PlayerInput"
import PlayerPreview from "./PlayerPreview"
import { Link } from "react-router-dom"

class Battle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerOneName: "",
      playerOneImage: null,
      playerTwoName: "",
      playerTwoImage: null
    }
  }
  handleSubmit = (id, username) => {
    this.setState(() => {
      var newState = {}
      newState[id + "Name"] = username
      newState[id + "Image"] =
        "https://github.com/" + username + ".png?size=200"
      console.info(`updating ${id} state to:`, newState)
      return newState
    })
  }
  handleReset = id => {
    this.setState(() => {
      var newState = {}
      newState[id + "Name"] = ""
      newState[id + "Image"] = null
      return newState
    })
  }
  render() {
    var match = this.props.match

    var playerOneName = this.state.playerOneName
    var playerOneImage = this.state.playerOneImage
    var playerTwoName = this.state.playerTwoName
    var playerTwoImage = this.state.playerTwoImage
    return (
      <div>
        <div className="row">
          {!playerOneName ? (
            <PlayerInput
              id="playerOne"
              label="Player One"
              onSubmit={this.handleSubmit}
            />
          ) : (
            <PlayerPreview
              id="playerOne"
              username={this.state.playerOneName}
              avatar={this.state.playerOneImage}
              onReset={this.handleReset}
            />
          )}
          {!playerTwoName ? (
            <PlayerInput
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />
          ) : (
            <PlayerPreview
              id="playerTwo"
              username={this.state.playerTwoName}
              avatar={this.state.playerTwoImage}
              onReset={this.handleReset}
            />
          )}
        </div>

        {playerOneImage &&
          playerTwoImage &&
          playerOneName &&
          playerTwoName && (
            <Link
              className="button"
              to={{
                pathname: match.url + "/results",
                search: `?playerOneName=${
                  this.state.playerOneName
                }&playerTwoName=${this.state.playerTwoName}`
              }}
            >
              Battle!
            </Link>
          )}
      </div>
    )
  }
}

export default Battle
