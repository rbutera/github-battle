import React from "react"
import PropTypes from "prop-types"

function SelectLanguage(props) {
  var languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"]
  return (
    <ul className="languages">
      {languages.map(language => {
        return (
          <li
            style={
              language === props.selectedLanguage ? { color: "#d0021b" } : null
            }
            key={language}
            onClick={props.updateLanguage.bind(null, language)}
          >
            {language}
          </li>
        )
      })}
    </ul>
  )
}

class Popular extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLanguage: "All"
    }
    this.updateLanguage = this.updateLanguage.bind(this)
  }
  updateLanguage(newLanguage) {
    this.setState(() => {
      return { selectedLanguage: newLanguage }
    })
  }
  render() {
    return (
      <div>
        <SelectLanguage
          updateLanguage={this.updateLanguage}
          selectedLanguage={this.state.selectedLanguage}
        />
      </div>
    )
  }
}

export default Popular
