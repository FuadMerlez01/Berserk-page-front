const idiomasElements = document.getElementById("idiomas");
const textsToChange = document.querySelectorAll("[data-section]");
const card = document.querySelector(".card");
const button = document.querySelector('[data-button]'), alert = document.querySelector('[data-alert]');
button.addEventListener('click', () => {
    alert.style.display = 'block';
});

function calculateAngle(x1, y1, x2, y2) {
  const dy = y2 - y1;
  const dx = x2 - x1;
  const rad = Math.atan2(dy, dx); // Radians
  const deg = rad * (180 / Math.PI); // Degrees
  return deg;
}

window.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect()
  const angle = calculateAngle(rect.x, rect.y, e.offsetX, e.offsetY)
  card.style.setProperty("--angle", angle + "deg");
});


const changeLanguage = async (language) => {
    try {
        const requestJson = await fetch(`language/${language}.json`);
        if (!requestJson.ok) {
            throw new Error('Network response was not ok');
        }
        const texts = await requestJson.json();
        
        // Aquí puedes utilizar los textos cargados del JSON
        console.log(`Contenido del archivo ${language}.json:`);
        
        textsToChange.forEach(text => {
            const section = text.dataset.section;
            const value = text.dataset.value;

            text.innerHTML = texts[section][value];
        });
        
        // Ejemplo: Actualización de contenido basado en el idioma
        // updateContent(texts);
    } catch (error) {
        console.error('Error fetching language JSON:', error);
    }
};

idiomasElements.addEventListener("click", (e) => {
    const language = e.target.closest("a").dataset.language;
    
    if (language) {
        changeLanguage(language);
    }
});
