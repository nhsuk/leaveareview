
/*
 * HTML5 Geolocation Service Search Functionality
 *
 * Get user coodinates from native browser API and forward to results page.
 * This is added functionality to improve user experience. Any browsers which
 * are not supported can still use the form using the postcode / places search
*/

// Elements shown and hidden to indicate geolocation status
var geoLocateDenied = document.querySelector('.geo-locate--denied');
var geoLocateError = document.querySelector('.geo-locate--error');
var geoLocateSearching = document.querySelector('.geo-locate--searching');

// Form and button elements used to trigger submissions and API calls
var geoLocateButton = document.querySelector('.geo-locate--button');
geoLocateButton.style.display = "block";
var form = document.querySelector('#catchment-area-search-form');

// Hidden inputs to insert coordinates before form submission
var latitudeInput = document.querySelector('#UsersLatitude');
var longitudeInput = document.querySelector('#UsersLongitude');

// Handle feedback to users when geolocation fails
var geolocationError = function(event) {
    geoLocateSearching.style.display = 'none';
    if (event.code === event.PERMISSION_DENIED) {
        geoLocateDenied.style.display = 'block';
    } else {
        geoLocateError.style.display = 'block';
    }
};

// Handle inserting coordinates and submitting form on gelocation success
var geolocationSuccess = function (event) {
    // Set latitude and longitude from event object
    var latitude = event.coords.latitude;
    var longitude = event.coords.longitude;
    // Throw error if latitude or longitude is missing
    if (latitude && longitude) {
        // Set values of hidden inputs to user coordinates
        latitudeInput.value = latitude;
        longitudeInput.value = longitude;
        // Submit form complete with hidden inputs
        form.submit();
    } else {
        geolocationError();
    }
};

// Initialise functionality on DOM loaded event
document.addEventListener('DOMContentLoaded', function () {
    // Check geolocation button exists
    if (geoLocateButton) {
        // Check geolocation is supported by the browser
        if ('geolocation' in navigator) {
            // Add event listener to geolocation button
            geoLocateButton.addEventListener('click', function(event) {
                event.preventDefault();
                // Give feedback to users of geolocation status
                geoLocateError.style.display = 'none';
                geoLocateDenied.style.display = 'none';
                geoLocateSearching.style.display = 'block';
                // Call geolocation API, callbacks handle success and error
                navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
            });
        } else {
            // Hide button if geolocation is not supported
            geoLocateButton.style.display = 'none';
        }
    }
});