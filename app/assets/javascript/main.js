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
