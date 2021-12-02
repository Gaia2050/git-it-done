var getUserRepos = function() {
    fetch("https://api.github.com/users/octocat/repos")
    console.log("fuction was called");
}

getUserRepos();