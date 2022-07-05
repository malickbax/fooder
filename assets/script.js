 // declaring DOM variables that are global
 
 var userFormEl = document.querySelector("#user-form");
 var nameInputEl = document.querySelector("#input1");
 
 // declaring global variables
 var latLong;
 var input1;
 

 // Form Submit Handler function

 var formSubmitHandler = function(event) {
  event.preventDefault();
  input1 = nameInputEl.value.trim();
 // validate form input();
  if (validateinput() === true) {
    findSearch(input1);
    console.log ("hello");
    
    // Make search sticky
    var inputSticky = document.getElementById("input1").value;
    localStorage.setItem ("input1", inputSticky);
    nameInputEl.textContent = inputSticky;
    
}
 

//Validate form for invalid

}
validateinput =function (){
    if (input1) {
        return true;
      } else {
        alert("Please enter your query for Food, Restaurants etc. and then submit");
        return false;
      }
 }

 // Get geo Location
var getgeolocation = function(){
navigator.geolocation.getCurrentPosition(showPosition);
function showPosition(position) {
   var latitude= position.coords.latitude;
   var longitude = position.coords.longitude;
   console.log ("latitude" + latitude);
   console.log ("longitude" + longitude);
   return latLong = latitude +","+longitude;
}
}


// set geo Location

var latLong= getgeolocation();

// set options for Tripadvisor get API

const options = {method: 'GET', headers: {Accept: 'application/json'}};


// Search Input function 

var findSearch = function(input1) {
    // format the Tripasvisor api url
    var apiUrl = "https://cors-anywhere.herokuapp.com/"+"https://api.content.tripadvisor.com/api/v1/location/search?searchQuery=" +input1+ "&latLong="+latLong+ "&count=50"+"&language=en&key=E90622A0EE3D4595BC63F7155C76C764";
  
    // make a request to the API url
    fetch(apiUrl, options)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          // Call Display results function
          displayResults(data, input1);
        });
      } 
      // Search didn't yield any results
      else {
        alert('Error: Search String Not Found');
      }
    })
    .catch(function(error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect to Tripadvisor");
    });
  };
  
  
  // Diplay results
  var displayResults = function(results, query) {
    // check if api returned any results
  if (results.length === 0) {
      console.log ("No results")
    return;
  }

  // Declare dom variables

  var resultsTitleContainer = document.querySelector ("#containerResults");
  resultsTitleContainer.textContent = "";
  
  //loop through results
  for (var i = 0; i < results.data.length; i++) {
    //parse fields for display
    var resultsName = results.data[i].name;
    var resultsCityName = results.data[i].address_obj.city;
    var resultsPostalCode = results.data[i].address_obj.postalcode;
    var resultsStreet1 = results.data[i].address_obj.street1;
    var resultsState = results.data[i].address_obj.state;
    var resultsDistance = results.data[i].address_obj.distance;
  

    // console.log (resultsName);
    // console.log (resultsCityName);
    // console.log (resultsPostalCode);

    var resultsTitleContainer = document.querySelector ("#containerResults");
    
    //create html element
    var resultsTitle = document.createElement("h1");
   //set class, ID and text for the html element
    resultsTitle.className = "title is-6 has-text-centered";
    resultsTitle.id = "foodSearchTitle"
    resultsTitle.textContent = resultsName + " " + resultsStreet1 +" "+ resultsCityName + " " + resultsState + " " + resultsPostalCode;
    
    //append each html element to the div
    resultsTitleContainer.append (resultsTitle);
  }
}

// event listener for search form submission
userFormEl.addEventListener("submit", formSubmitHandler);


// DOM variables for the filter buttons
  const nameButton1 = document.getElementById("btnMile1");
  const nameButton2 = document.getElementById("btnMile2");
  const nameButton3 = document.getElementById("btnMile3");
  var mButton1=false;
  
  // listener for Button 1
  nameButton1.addEventListener("click", (e) => {
      mButton1 = 1;
      //Validate search input
      if (validateinput() === true) {
        // Call filter results function
          filterResults (input1, mButton1);  
      }
      
  }, { capture: false });

  // listener for Button 2

  nameButton2.addEventListener("click", (e) => {
      mButton1 = 3;
       //Validate search input

      if (validateinput() === true) {
        // Call filter results function

        filterResults (input1, mButton1);  
    }
  }, { capture: false });

  // listener for Button 3

  nameButton3.addEventListener("click", (e) => {
      mButton1 = 5;
      if (validateinput() === true) {
        // Call filter results function
        filterResults (input1, mButton1);  
    }
  }, { capture: false });


  //Filter results function

  function filterResults (query, distance){
      // format the Tripasvisor api url
      var apiUrl = "https://cors-anywhere.herokuapp.com/"+"https://api.content.tripadvisor.com/api/v1/location/search?searchQuery="+ query +"&latLong="+latLong+"&radius=" + distance +"&radiusUnit=mi&language=en&key=E90622A0EE3D4595BC63F7155C76C764";
  
      // set options for the API call
      const options = {method: 'GET', headers: {Accept: 'application/json'}};
      // make a request to the url
      fetch(apiUrl, options)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
            //Call Display Results
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
  }