import React from "react"
import PropTypes from "prop-types"
import api from "../utils/api"

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

function RepoGrid(props) {
  return (
    <ul className="popular-list">
      {props.repos.map((repo, index) => {
        return (
          <li key={repo.name} className="popular-item">
            <div className="popular-rank">#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <img
                  className="avatar"
                  src={repo.owner.avatar_url}
                  alt={"Avatar for " + repo.owner.login}
                />
              </li>
              <li>
                <a href={repo.html_url}>{repo.name}</a>
              </li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLanguage: "All",
      repos: null
    }
    this.updateLanguage = this.updateLanguage.bind(this)
  }
  updateLanguage(newLanguage) {
    this.setState(() => {
      return { selectedLanguage: newLanguage, repos: null }
    })
    api.fetchPopularRepos(this.state.selectedLanguage).then(res => {
      console.log(
        `Popular: updating state with ${this.state.selectedLanguage} repos`
      )
      this.setState(() => {
        return { repos: res }
      })
      console.log(`new state:`)
      console.log(this.state)
    })
  }
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }
  render() {
    return (
      <div>
        <SelectLanguage
          updateLanguage={this.updateLanguage}
          selectedLanguage={this.state.selectedLanguage}
        />
        {!this.state.repos ? (
          <p>Loading</p>
        ) : (
          <RepoGrid repos={this.state.repos} />
        )}
      </div>
    )
  }
}

export default Popular
