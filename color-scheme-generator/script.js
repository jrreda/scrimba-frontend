// selecting the elements
const colorPicker = document.getElementById("color-picker");
const schemeMode = document.getElementById("scheme-mode");
const getSchemeButton = document.getElementById("get-scheme");
const colorSchemeContainer = document.getElementById("color-scheme-container");
const colorCodeContainer = document.getElementById("color-codes");
const errorText = document.getElementById("error-text");

// function to get the colors
async function fetchColors() {
    const color = colorPicker.value.slice(1);
    const mode = schemeMode.value;

    const url = `https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=5`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.colors;
    } catch (error) {
        console.error(error);
        showError(error);
    }
}

// handle error function
function showError(err) {
    errorText.textContent = "";
    errorText.textContent = err;
}

// function to displays fetched colors and attaches interaction
function displayColors(colors) {
    colorSchemeContainer.innerHTML = "";
    colorCodeContainer.innerHTML = "";
    errorText.textContent = "";

    colors.forEach((color) => {
        // color box
        const colorBox = document.createElement("div");
        colorBox.className = "color-box";
        colorBox.style.backgroundColor = color.hex.value;
        colorBox.setAttribute("title", `Click to copy ${color.hex.value}!`);
        colorBox.innerHTML = `<p>${color.name.value}</p>`;

        colorBox.addEventListener("click", () => {
            copyToClipboard(color.hex.value);
            colorBox.classList.add("copied");
            setTimeout(() => colorBox.classList.remove("copied"), 3000);
        });

        colorSchemeContainer.appendChild(colorBox);

        // color code
        const colorCode = document.createElement("p");
        colorCode.className = "color-code";
        colorCode.innerText = color.hex.value;
        colorCodeContainer.appendChild(colorCode);
    });
}

// function to copy the color to the clipboard
function copyToClipboard(color) {
    navigator.clipboard.writeText(color);
}

// Initializes fetching and rendering of colors
async function initialColorScheme() {
    const colors = await fetchColors();
    displayColors(colors);
}

// handle the get scheme button click
getSchemeButton.addEventListener("click", initialColorScheme);

// get the color scheme on page load
window.addEventListener("DOMContentLoaded", initialColorScheme);
