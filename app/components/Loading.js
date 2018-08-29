import React from "react"
import { PropTypes } from "prop-types"
import { S_IFDIR } from "constants"

const styles = {
  content: { textAlign: "center", fontSize: "35px" }
}

class Loading extends React.Component {
  componentDidMount = () => {
    const stopper = this.props.text + "..."
    this.interval = window.setInterval(() => {
      if (this.state.text === stopper) {
        this.setState(() => {
          text: this.props.text
        })
      } else {
        this.setState(prevState => {
          return { text: prevState.text + "." }
        })
      }
    }, this.props.speed)
  }
  componentWillUnmount = () => {
    window.clearInterval(this.interval)
  }
  constructor(props) {
    super(props)
    this.state = {
      text: props.text
    }
  }
  render() {
    return <p style={styles.content}>{this.state.text}</p>
  }
}

Loading.defaultProps = {
  text: "Loading",
  speed: 300
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
}

export default Loading
