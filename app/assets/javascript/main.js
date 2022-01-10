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
  notAcceptingPatientsCheckbox.addEventListener("click", function() {
    for(let i = 0; i < checkboxes.length - 1; i++) {
      checkboxes[i].checked = false;
    }
  })
}
