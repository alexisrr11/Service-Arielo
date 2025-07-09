function darkMode() {
  const html = document.documentElement;
  const btnModoOscuro = document.getElementById('modoOscuroBtn');
  const modoGuardado = localStorage.getItem("modoOscuro");

  if (modoGuardado === "activado") {
    html.classList.add("dark");
    btnModoOscuro.style.background = "bisque";
    btnModoOscuro.style.color = "black";
    btnModoOscuro.textContent = "☀️";
  } else {
    html.classList.remove("dark");
    btnModoOscuro.style.background = "white";
    btnModoOscuro.style.color = "white";
    btnModoOscuro.textContent = "🌙";
  }

  btnModoOscuro.addEventListener("click", () => {
    html.classList.toggle("dark");

    const estaOscuro = html.classList.contains("dark");

    localStorage.setItem("modoOscuro", estaOscuro ? "activado" : "desactivado");

    setTimeout(() => {
      btnModoOscuro.style.background = estaOscuro ? "bisque" : "white";
      btnModoOscuro.style.color = estaOscuro ? "black" : "white";
      btnModoOscuro.textContent = estaOscuro ? "☀️" : "🌙";
    }, 200);
  });
}

darkMode(); 

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
