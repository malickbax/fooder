var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#input1");


//var repoContainerEl = document.querySelector("#repos-container");
//var repoSearchTerm = document.querySelector("#repo-search-term");

var latLong;
var input1;

var formSubmitHandler = function(event) {
event.preventDefault();
// get value from input element
input1 = nameInputEl.value.trim();
validateinput();
if (validateinput() === true) {
findSearch(input1);
console.log ("hello");
nameInputEl.value = "";

}
//console.log (input1)
}

validateinput =function (){
if (input1) {
    // findSearch(input1);
    //nameInputEl.value = "";
    return true;
    } else {
    alert("Please enter your query for Food, Restaurants etc. and then submit");
    return false;
    }

}

var getgeolocation = function(){

navigator.geolocation.getCurrentPosition(showPosition);

function showPosition(position) {
var latitude= position.coords.latitude;
var longitude = position.coords.longitude;
console.log ("latitude" + latitude);
console.log ("longitude" + longitude);
var latLong = latitude +","+longitude;
}
}

getgeolocation();

const options = {method: 'GET', headers: {Accept: 'application/json'}};

var findSearch = function(input1) {
// format the Tripasvisor api url
var apiUrl = "https://cors-anywhere.herokuapp.com/"+"https://api.content.tripadvisor.com/api/v1/location/search?searchQuery=" +input1+ "&language=en&key=E90622A0EE3D4595BC63F7155C76C764";

// make a request to the url
fetch(apiUrl, options)
.then(function(response) {
    // request was successful
    if (response.ok) {
    response.json().then(function(data) {
        displayResults(data, input1);
    });
    } else {
    alert('Error: Search String Not Found');
    }
})
.catch(function(error) {
    // Notice this `.catch()` getting chained onto the end of the `.then()` method
    alert("Unable to connect to Tripadvisor");
});
};



var displayResults = function(results, query) {
// console.log(repos);
// console.log(searchTerm);
//  repoContainerEl.textContent = "";
// repoSearchTerm.textContent = searchTerm;
// check if api returned any repos
if (results.length === 0) {
    console.log ("No results")
//repoContainerEl.textContent = "No repositories found.";
return;
}

// loop over results
console.log (query)
console.log (results.data)
console.log (results.data.length)
for (var i = 0; i < results.data.length; i++) {
// format repo name
var resultsName = results.data[i].name;
var resultsCityName = results.data[i].city;
var resultsPostalCode = results.data[i].postalcode;
console.log (resultsName)
console.log (resultsCityName)
console.log (resultsPostalCode)
//console.log ("Hello")
}
}


userFormEl.addEventListener("submit", formSubmitHandler);


    const nameButton1 = document.getElementById("btnMile1");
    const nameButton2 = document.getElementById("btnMile2");
    const nameButton3 = document.getElementById("btnMile3");
    var mButton1=false;
    


    nameButton1.addEventListener("click", (e) => {
        mButton1 = 1;
        console.log (mButton1);
        console.log (input1);
        if (validateinput() === true) {
            filterResults (input1, mButton1);
            console.log ("called filterResults");
            
        }
        
    }, { capture: false });


    nameButton2.addEventListener("click", (e) => {
        mButton1 = 3;
        console.log (mButton1);

    }, { capture: false });


    nameButton3.addEventListener("click", (e) => {
        mButton1 = 5;
        console.log (mButton1);
    }, { capture: false });


    function filterResults (query, distance){

        // format the Tripasvisor api url
        var apiUrl = "https://cors-anywhere.herokuapp.com/"+"https://api.content.tripadvisor.com/api/v1/location/search?searchQuery="+ query +"&latLong="+latLong+"&radius=" + distance +"&radiusUnit=mi&language=en&key=E90622A0EE3D4595BC63F7155C76C764";
    
        
        const options = {method: 'GET', headers: {Accept: 'application/json'}};

        // make a request to the url
        fetch(apiUrl, options)
        .then(function(response) {
            // request was successful
            if (response.ok) {
            response.json().then(function(data) {
                displayResults(data, input1);
                console.log ("results with geocodes");
            });
            } else {
            alert('Error: Search String Not Found');
            }
        })
        .catch(function(error) {
            // Notice this `.catch()` getting chained onto the end of the `.then()` method
            alert("Unable to connect to Tripadvisor");
        });
    }


// create a container for each repo
// var repoEl = document.createElement("div");
//repoEl.classList = "list-item flex-row justify-space-between align-center";

// create a span element to hold repository name
// var titleEl = document.createElement("span");
// titleEl.textContent = repoName;


// // append to container
// repoEl.appendChild(titleEl);

// // create a status element
// var statusEl = document.createElement("span");
// statusEl.classList = "flex-row align-center";

// // check if current repo has issues or not
// if (repos[i].open_issues_count > 0) {
//   statusEl.innerHTML =
//     "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
// } else {
//   statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
// }

// // append to container
// repoEl.appendChild(statusEl);


// // append container to the dom
// repoContainerEl.appendChild(repoEl)