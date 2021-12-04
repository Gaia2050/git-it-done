var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        //request was successful 
        if (response.ok) {
            response.json().then(function(data) {
                // displayIssues(data);        //calls the variable on line 17
            });
        }
        else {
            alert("There was a problem with your request!");
        }
    });
    console.log(repo);
};

var displayIssues = function(issues) {   // is showing the issues  for the repos 
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    for (var i = 0; i <issues.length; i ++) {   
        //create link to element to take users to the issues on github 
        var issueEl = document.createElement("a");  // creates the issue element via DOM 
        issueEl.classList = "list-item flew-row justify-space-between align-center";  //vss selectors
        issueEl.setAttribute("href", issues[i].html_url);   //links the to the full issue on github 
        issueEl.setAttribute("target", "_blank");        //opens the new link in a new tab without replacing current webpage

        //create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container 
        issueEl.appendChild(titleEl);

        //create type element 
        var typeEl = document.createElement("span");


        //check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";   //37-40 creates check of if it is one thing or another, i.e pull request or issue
        } else {
            typeEl.textContent = "(Issue)";
        }

        // append to container 
        issueEl.appendChild(typeEl); // attaches to the container div element created above keeping front end design together

        issueContainerEl.appendChild(issueEl);
        console.log(data);

    }
}

getRepoIssues("facebook/react");