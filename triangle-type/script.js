const icons = {
  equilateral: `<svg viewBox="0 0 100 100"><polygon points="50,15 93,85 7,85" style="fill:#007BFF;stroke:black;stroke-width:2"/></svg>`,
  isosceles: `<svg viewBox="0 0 100 100"><polygon points="50,10 90,90 10,90" style="fill:#007BFF;stroke:black;stroke-width:2"/></svg>`,
  scalene: `<svg viewBox="0 0 100 100"><polygon points="20,10 95,80 5,90" style="fill:#007BFF;stroke:black;stroke-width:2"/></svg>`,
};

const form = document.getElementById("triangle-form");
const sideAInput = document.getElementById("sideA");
const sideBInput = document.getElementById("sideB");
const sideCInput = document.getElementById("sideC");
const resultTextEl = document.getElementById("result-text");
const resultVisualEl = document.getElementById("result-visual");
const btnPt = document.getElementById("btn-pt");
const btnEn = document.getElementById("btn-en");

let currentLang = "pt";
let translations = {};

async function setLanguage(lang) {
  currentLang = lang;
  try {
    const response = await fetch(`lang/${lang}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    translations = await response.json();

    document.querySelectorAll("[data-key]").forEach((elem) => {
      const key = elem.getAttribute("data-key");
      if (translations[key]) {
        elem.textContent = translations[key];
      }
    });

    document.title = translations.pageTitle;
    btnPt.classList.toggle("active", lang === "pt");
    btnEn.classList.toggle("active", lang === "en");
  } catch (error) {
    console.error("Failed to load language file:", error);
    resultTextEl.textContent = "Erro ao carregar o idioma.";
  }
}

function verifyTriangle() {
  const a = parseFloat(sideAInput.value);
  const b = parseFloat(sideBInput.value);
  const c = parseFloat(sideCInput.value);

  resultTextEl.textContent = "";
  resultVisualEl.innerHTML = "";

  if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
    resultTextEl.textContent = translations.invalidInput;
    return;
  }

  if (a + b > c && a + c > b && b + c > a) {
    if (a === b && b === c) {
      resultTextEl.textContent = translations.equilateral;
      resultVisualEl.innerHTML = icons.equilateral;
    } else if (a === b || b === c || a === c) {
      resultTextEl.textContent = translations.isosceles;
      resultVisualEl.innerHTML = icons.isosceles;
    } else {
      resultTextEl.textContent = translations.scalene;
      resultVisualEl.innerHTML = icons.scalene;
    }
  } else {
    resultTextEl.textContent = translations.notATriangle;
  }
}

btnPt.addEventListener("click", () => setLanguage("pt"));
btnEn.addEventListener("click", () => setLanguage("en"));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  verifyTriangle();
});

document.addEventListener("DOMContentLoaded", () => {
  setLanguage(currentLang);
});
