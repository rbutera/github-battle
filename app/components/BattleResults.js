import React from "react"
import queryString from "query-string"
import api from "../utils/api"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import PlayerPreview from "./PlayerPreview"

function Profile(props) {
  const info = props.info
  return (
    <PlayerPreview avatar={info.avatar_url} username={info.login}>
      <ul className="space-list-items">
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        {info.followers && <li>Followers: {info.followers}</li>}
        {info.following && <li>Following: {info.following}</li>}
        {info.public_repos && <li>Public Repositories: {info.public_repos}</li>}
        {info.blog && <li>{info.blog}</li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

function BattleResultPlayer(props) {
  return (
    <div>
      <h1 className="header">{props.label}</h1>
      <h3 className="battle-results-score">Score: {props.score}</h3>
      <Profile info={props.profile} />
    </div>
  )
}

BattleResultPlayer.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

class BattleResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  componentDidMount = () => {
    var players = queryString.parse(this.props.location.search)
    api.battle([players.playerOneName, players.playerTwoName]).then(results => {
      if (results === null) {
        return this.setState(() => {
          return {
            error:
              "Looks like there was an error. Check that both users exist on Github",
            loading: false
          }
        })
      } else {
        const winner = results[0]
        const loser = results[1]
        console.log("winner: ", winner)
        console.log("loser: ", loser)
        this.setState(() => {
          return { winner, loser, loading: false }
        })
      }
    })
  }
  render() {
    const { error, winner, loser, loading } = this.state
    if (!!loading) {
      return <p>Loading</p>
    }
    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="/battle">Try Again (reset)</Link>
        </div>
      )
    }
    return (
      <div className="row">
        <BattleResultPlayer
          label="Winner"
          score={winner.score}
          profile={winner.profile}
        />
        <BattleResultPlayer
          label="Loser"
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}
export default BattleResults
