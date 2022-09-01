// ES6 or Vanilla JavaScript
const contentsToHide = document.getElementsByClassName('nhsuk-contents-list__list--nested')
for (let ele of contentsToHide) {
  ele.classList.add("nhsuk-u-visually-hidden")
}

const allNestestContents = document.querySelectorAll('.nhsuk-contents-list__link--nested');
allNestestContents.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    link.parentNode.querySelector('.nhsuk-contents-list__list--nested').classList.toggle('nhsuk-u-visually-hidden');
    link.parentNode.querySelector('.nhsuk-contents-list__list--nested').setAttribute("aria-expanded", "true")
  });
});

// JS to handle the register journey hide/show
if (document.getElementById('send-verification-code')) {
  const sendVerificationCodeButton = document.getElementById('send-verification-code');
  const verifyCodeButton = document.getElementById('verifyCodeButton');
  const verifyCodeDiv = document.getElementById('verify-code');
  const changeEmail = document.getElementById('change-email');
  const email = document.getElementById('email');
  sendVerificationCodeButton.addEventListener('click', e => {
    email.disabled = true;
    sendVerificationCodeButton.classList.add('verify-hidden');
    verifyCodeDiv.classList.remove('verify-hidden')
  });
  verifyCodeButton.addEventListener('click', e => {
    verifyCodeDiv.classList.add('verify-hidden');
    changeEmail.classList.remove('verify-hidden');
  });
  changeEmail.addEventListener('click', e => {
    email.disabled = false;
    changeEmail.classList.add('verify-hidden');
    sendVerificationCodeButton.classList.remove('verify-hidden');
  });
}

if(document.getElementById("filter")) {
  const filterDiv = document.getElementById("filter");
  const showFilterButton = document.getElementById('show-filter-button')
  filterDiv.style.display = "none";
  showFilterButton.addEventListener('click', e => {
    e.preventDefault();
    if (showFilterButton.getAttribute('aria-expanded') === 'false') {
      showFilterButton.setAttribute("aria-expanded", 'true'); 
    } else {
      showFilterButton.setAttribute("aria-expanded", 'false'); 
    }
    showFilterButton.textContent = showFilterButton.textContent === 'Filter and sort' ? 'Close filter' : 'Filter and sort';
    filterDiv.style.display = filterDiv.style.display === 'none' ? 'block' : 'none';
  });
}

if(document.getElementById("notAcceptingPatients")) {
  const notAcceptingPatientsCheckbox = document.getElementById("notAcceptingPatients");
  const checkboxes = document.getElementsByClassName("nhsuk-checkboxes__input");
  for(let i = 0; i < checkboxes.length - 1; i++) {
    checkboxes[i].addEventListener('click', function () {
      notAcceptingPatientsCheckbox.checked = false;
    })
  }
  notAcceptingPatientsCheckbox.addEventListener("click", function() {
    for(let i = 0; i < checkboxes.length - 1; i++) {
      checkboxes[i].checked = false;
    }
  })
}

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
    console.log('lat', latitude)
    console.log('long', longitude)
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