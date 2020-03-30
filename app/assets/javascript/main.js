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