
  
 var userFormEl = document.querySelector("#user-form");
 var nameInputEl = document.querySelector("#input1");
 
 //var repoContainerEl = document.querySelector("#repos-container");
 //var repoSearchTerm = document.querySelector("#repo-search-term");
 
 var formSubmitHandler = function(event) {
   event.preventDefault();
   // get value from input element
 var input1 = nameInputEl.value.trim();
 //console.log (input1)

 if (input1) {
    findSearch(input1);
    nameInputEl.value = "";
  } else {
    alert("Please enter your query for Food, Restaurants etc.");
  }
}

//navigator.geolocation.getCurrentPosition(coords.latitude);
navigator.geolocation.getCurrentPosition(showPosition);

function showPosition(position) {
   var latitude= position.coords.latitude;
   var longitude = position.coords.longitude;
   console.log ("latitude" + latitude);
   console.log ("longitude" + longitude);
}




//let current_location = document.getElementById("location");

//getLocation ();


// function getLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition.coords.latitude;
//     } else { 
//       x.innerHTML = "Geolocation is not supported by this browser.";
//     }





const options = {method: 'GET', headers: {Accept: 'application/json'}};

// fetch('https://api.content.tripadvisor.com/api/v1/location/search?searchQuery=halal&language=en&key=E90622A0EE3D4595BC63F7155C76C764', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

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
  
  // loop over repos
  console.log (query)
  console.log (results.data)
  console.log (results.data.length)
  for (var i = 0; i < results.data.length; i++) {
    // format repo name
    var resultsName = results.data[i].name;
    console.log (resultsName)
    //console.log ("Hello")
  }
}


userFormEl.addEventListener("submit", formSubmitHandler);

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