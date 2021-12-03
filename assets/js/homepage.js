var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");   //lines 1 & 2 rep the second div box in the <main> to reference DOM elements with the writtenJS

var getUserRepos = function (user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            displayRepos(data, user);
        });
    });
};


var userFormEl = document.querySelector("#user-form"); //main, 1st form. 4 12-13
var nameInputEl = document.querySelector("#username"); //value of input html stored in var ("#username")

var formSubmitHandler = function (event) {
    event.preventDefault();
    //get value form input element
    var username = nameInputEl.value.trim();  //making username set to line 13 -> html 23-30, calling!

    if (username) {              //pulling value from input of html 27, sending 2 .js line 1m-> main variable if name is not entered, (from line 1 var) then u get alert
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter Github username");
    }
    console.log(event);
};

userFormEl.addEventListener("submit", formSubmitHandler); //called var on 12

var displayRepos = function(repos, searchTerm) {  //this receives data from var getUserRepos i.e type bar i.e input
    console.log(repos);                           //lines 4-12 call on this function to display the elements and terms in this function 
    console.log(searchTerm);
        //clear old content
        repoContainerEl.textContent = "";
        repoSearchTerm.textContent = searchTerm;

       
        //loops over repos
        for (var i =0; i < repos.length; i++) {
            //format repo name
            var repoName = repos[i].owner.login + "/" + repos[i].name;  //this is the repos name reformatted
            
            //create container for each repo
            var repoEl = document.createElement("div");
            repoEl.classList = "list-item flex-row justify-space-between align-center";    // dynamically making containers for the repos
            
            //create a span element to hold repository
            var titleEl = document.createElement("span");    //new span el like in html 33
            titleEl.textContent = repoName;

            //append to container
            repoEl.appendChild(titleEl);  //pinning title  it to the container

            //append container to the DOM
            repoContainerEl.appendChild(repoEl); //pinning the container element to the repository element
        }
};