import React from "react"
import { PropTypes } from "prop-types"

class PlayerPreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      image: ""
    }
  }
  render() {
    return (
      <div>
        <div className="column">
          <img
            src={this.props.avatar}
            alt={"Avatar for " + this.props.username}
            className="avatar"
          />
          <h2 className="username">@{this.props.username}</h2>
        </div>
        {this.props.children}
      </div>
    )
  }
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}

export default PlayerPreview
