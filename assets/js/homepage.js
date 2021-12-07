var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");   //lines 1 & 2 rep the second div box in the <main> to reference DOM elements with the writtenJS

var getUserRepos = function (user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";  //url format rule to pull up a user
    fetch(apiUrl).then(function (response) {            //pulls the server api 
            if (response.ok) {                  //if the repo or user exists = success
        response.json().then(function (data) {          //computers response when fetch is implemented 
            displayRepos(data, user);                    // displays the repository
        });
    } else {                                            //else send this error window alert
        alert("Error: GitHub User Not Found");
    }
        })
        .catch(function(error) {            //notice this '.catch()' getting chained 2 end pf thr .then() *statement* fetch api way of handling errors, errors sent to .catch(), 200's sent to .then()
alert("Unable to connect to GitHub");
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
        for (var i =0; i < repos.length; i++) {     //for() taking  each repository repo[i] then writing some of its data 2 the pg,  
            //format repo name
            var repoName = repos[i].owner.login + "/" + repos[i].name;  //this is the repos name reformatted
            
            //create container for each repo
            var repoEl = document.createElement("a");   // dynamically created a <a> el 
            repoEl.classList = "list-item flex-row justify-space-between align-center";    // dynamically making containers for the repos
            repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);  //passes information from index.html to sing0le-repo.html used to pass information via the api url 


            //create a span element to hold repository
            var titleEl = document.createElement("span");    //new span el like in html 33   holds formatted repo name 
            titleEl.textContent = repoName;
                                                                        //added the <div> to the container created earlier
            //append to container
            repoEl.appendChild(titleEl);  //pinning title  it to the container

            //create status element 
            var statusEl = document.createElement("span");
            statusEl.classList = "flex-row align-center";   //creating a status element within a <span> w/ some scc styling 

            //check if current repo has issues or not
            if (repos[i].open_issues_count > 0) {  //used to check how many issue repo has "if number < 0 then will display the number of issues w/ icons"
                statusEl.innerHTML ="<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";  //dynamic html styling- adding icons 
            }else {
                statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";     //creating more icons with dynamically generated html 
            }   //icons from Font Awesome -css styling

            //append to container
            repoEl.appendChild(statusEl);
            //append container to the DOM
            repoContainerEl.appendChild(repoEl); //pinning the container element to the repository element

            //check if api returned any repos  
            if (repos.length === 0) {       //if repos are = 0 
                repoContainerEl.textContent = "No repositories found.";    //then no repos found
                return;
            }
        }
};      