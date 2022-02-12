///// animation for labels in account section
const labels = document.querySelectorAll('.account-card__form label');
export function animateLabels() {
  labels.forEach(label => {
    label.innerHTML = label.innerText
      .split('')
      .map(
        (letter, idx) =>
          `<span style="transition-delay:${idx * 30}ms">${letter}</span>`
      )
      .join('');
  });
}
