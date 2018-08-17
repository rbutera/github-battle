var axios = require("axios")

module.exports = {
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
