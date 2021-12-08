var repoNameEl = document.querySelector("#repo-name");
var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");   //DOM reference to html div container on line 27
// var repoNameEl = document.querySelector("#repoName");

var getRepoName = function () {
    var queryString = document.location.search;  //is grabbing the repo name from the url query string
    var repoName = queryString.split("=")[1];
    console.log(repoName);

    if (repoName) {    //if the repos name is typed in, then the repo's issues will be displayed on the pg 
        repoNameEl.textContent = repoName;
        getRepoIssues(repoName);
    
    } else {   // if no repo was given then redirect to the homepage
        document.location.replace("./index.html");
}
};

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        //request was successful 
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data);      
                
                 //check if api has paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                    // console.log(displayWarning(repo);
                }//calls the variable on line 17
            });
        }
        else {
            document.location.replace("./index.html");  //if the attempt was un successful return to the home pg
        }
        
    });
    
};

    
var displayIssues = function(issues) {   // is showing the issues  for the repos 
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    for (var i = 0; i <issues.length; i ++) {   
        console.log(issues[i]);
        //create link to element to take users to the issues on github 
        var issueEl = document.createElement("a");  // creates the issue element via DOM 
        issueEl.classList = "list-item flew-row justify-space-between align-center";  //css selectors
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
};

var displayWarning = function(repo) {
    //add text to warning <div> container on line 27 html single pg
    limitWarningEl.textContent = "TO see more than thirty issues, visit ";

    var linkEl = document.createElement("a");
    linkEL.textContent = "GitHUb.com";
    linkEL.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEL.setAttribute("target", "_blank");

    //append to warning container 
    limitWarningEl.appendChild(linkEl);
};



getRepoName();

