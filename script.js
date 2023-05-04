const getLocationBtn = document.getElementById("location");
const removeLocationBtn = document.getElementById("remove");
const mapDiv = document.getElementById("map");
const getLatitude = document.getElementById("latitude");
const getLongitude = document.getElementById("longitude");


function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    mapDiv.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  localStorage.setItem("lat", latitude);
  localStorage.setItem("long", longitude);
  getLatitude.textContent = `Your Current Latitude : ${position.coords.latitude}`;
  getLongitude.textContent = `Your Current Longitude : ${position.coords.longitude}`;
 
  displayMap(latitude,longitude);
  getLocationBtn.style.display = "none";
  removeLocationBtn.style.display = "block";
}

function displayMap(latitude,longitude) {
  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&key=AIzaSyDPK7mEk3j6E2ESdkA0oehDTePq2Ufhlhc&z=15&output=embed`;
  // mapDiv.innerHTML = `<iframe src="${mapUrl}" alt="Map" height="500" width="1000" > </iframe>`;
  mapDiv.setAttribute("src", mapUrl);
}

function removeLocation() {
  localStorage.removeItem("lat");
  localStorage.removeItem("long");
  getLocationBtn.style.display = "block";
  removeLocationBtn.style.display = "none";
  getLatitude.textContent = ``;
  getLongitude.textContent = ``;
  mapDiv.setAttribute("src", "");
}

// Check if lat and long already exist in local storage
const lat = localStorage.getItem("lat");
const long = localStorage.getItem("long");
if (lat && long) {
  displayMap(lat, long);
  removeLocationBtn.disabled = false;
}


