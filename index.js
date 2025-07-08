function darkMode() {
  const html = document.documentElement;
  const btnModoOscuro = document.getElementById('modoOscuroBtn');

  btnModoOscuro.addEventListener('click', () => {
    html.classList.toggle('dark');
    setTimeout(() => {
      btnModoOscuro.style.background = (btnModoOscuro.style.background === "bisque" ? "white" : "bisque");
      btnModoOscuro.style.color = (btnModoOscuro.style.color === "black" ? "white" : "black");
      btnModoOscuro.textContent = (btnModoOscuro.textContent === "☀️" ? "🌙" : "☀️");
    }, 200);
  });
}
console.log(darkMode());

//Efecto smooth sobre href
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});
