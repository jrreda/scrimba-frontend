/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const convertBtn = document.getElementById("convert-btn");
const inputEl = document.getElementById("input-el");
const lengthEl = document.getElementById("length-el");
const volumeEl = document.getElementById("volume-el");
const massEl = document.getElementById("mass-el");

convertBtn.addEventListener("click", function () {
    let inputValue = inputEl.value;
    lengthEl.textContent = `${inputValue} meters = ${parseFloat(
        inputValue * 3.281
    ).toFixed(3)} feet | ${inputValue} feet = ${parseFloat(
        inputValue / 3.281
    ).toFixed(3)} meters`;
    volumeEl.textContent = `${inputValue} liters = ${parseFloat(
        inputValue * 0.264
    ).toFixed(3)} gallons | ${inputValue} gallons = ${parseFloat(
        inputValue / 0.264
    ).toFixed(3)} liters`;
    massEl.textContent = `${inputValue} kilos = ${parseFloat(
        inputValue * 2.204
    ).toFixed(3)} pounds | ${inputValue} pounds = ${parseFloat(
        inputValue / 2.204
    ).toFixed(3)} kilos`;
});
