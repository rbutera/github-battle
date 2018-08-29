import React from "react"
import PlayerInput from "./PlayerInput"

class Battle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerOneName: "",
      playerOneImage: null,
      playerTwoName: "",
      playerTwoImage: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(id, username) {
    this.setState(() => {
      var newState = {}
      newState[id + "Name"] = username
      newState[id + "Image"] =
        "https://github.com/" + username + ".png?size=200"
      console.info(`updating ${id} state to:` + newState)
      return newState
    })
  }
  render() {
    var playerOneName = this.state.playerOneName
    var playerTwoName = this.state.playerTwoName
    return (
      <div>
        <div className="row">
          {!playerOneName && (
            <PlayerInput
              id="playerOne"
              label="Player One"
              onSubmit={this.handleSubmit}
            />
          )}
          {!playerTwoName && (
            <PlayerInput
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Battle
