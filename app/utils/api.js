var axios = require("axios")

const github_client_id = "YOUR_CLIENT_ID"
const github_secret = "YOUR_SECRET"
const github_params = `?client_id=${github_client_id}&client_secret=${github_secret}`

console.info("github app parameters will be", github_params)

function getProfile(username) {
  return axios
    .get("https://api.github.com/users/" + username + params)
    .then(user => {
      return user.data
    })
}

function getRepos(username) {
  return axios.get(
    "https://api.github.com/users/" +
      username +
      "/repos" +
      params +
      "&per_page=100"
  )
}

function getStarCount(repos) {
  return repos.data.reduce((accumulator, value) => {
    return accumulator + value.stargazers_count
  }, 0)
}

function calculateScore(profile, repos) {
  var followers = profile.followers
  var totalStars = getStarCount(repos)
  return followers * 3 + totalStars
}

function handleError(error) {
  console.warn(error)
  return null
}

function getUserData(player) {
  return axios.all([getProfile(player), getRepos(player)]).then(data => {
    const profile = data[0]
    const repositories = data[1]

    return { profile: profile, score: calculateScore(profile, repositories) }
  })
}

function sortPlayers(players) {
  return players.sort((a, b) => {
    return b.score - a.score
  })
}

module.exports = {
  battle: function(players) {
    return axios
      .all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  },
  fetchPopularRepos: function(language) {
    var url = window.encodeURI(
      "https://api.github.com/search/repositories?q=stars:>1+language:" +
        language +
        "&sort=stars&order=desc&type=Repositories"
    )

    return axios.get(url).then(
      function(res) {
        return res.data.items
      },
      function(error) {
        console.error(`fetchPopularRepos ERROR ${error}`)
      }
    )
  }
}
