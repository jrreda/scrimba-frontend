const copyBtn = document.getElementById("copy-btn");
const passwordOne = document.getElementById("password-one");
const passwordTwo = document.getElementById("password-two");
const generateBtn = document.getElementById("generate");
const form = document.querySelector("form");

const generatePassword = (formData) => {
    const passwordLength = formData.get("length");
    const isSymbols = formData.get("symbols");
    const isNumbers = formData.get("numbers");
    const isUppercase = formData.get("uppercase");

    let password = "";
    const lowerCharset = "abcdefghijklmnopqrstuvwxyz";
    const upperCharset = isUppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
    const symbols = isSymbols ? "!@#$%^&*()_+~|}{[]:;?><,./-=" : "";
    const numbers = isNumbers ? "0123456789" : "";
    const passwordContent = symbols + numbers + upperCharset + lowerCharset;

    for (let i = 0; i < passwordLength; ++i) {
        const randomIndex = Math.floor(Math.random() * passwordContent.length);
        password += passwordContent[randomIndex];
    }

    return password;
};

const copyPassword = (password, id) => {
    navigator.clipboard.writeText(password);

    const style = document.createElement("style");
        style.innerHTML = `
        #${id}::after {
            content: "📋";
        }
    `;

    document.body.appendChild(style);
    setTimeout(() => {
        style.remove();
    }, 1000);
};

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form, generateBtn);

    passwordOne.textContent = generatePassword(formData);
    passwordTwo.textContent = generatePassword(formData);
});

passwordOne.addEventListener('click', (e) => {
    console.log(e.target.textContent, e.target.id);
    copyPassword(e.target.textContent, e.target.id);
});

passwordTwo.addEventListener('click', (e) => {
    copyPassword(e.target.textContent, e.target.id);
});
