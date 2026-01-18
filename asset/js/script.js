/* select and store DOM elements */
const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('fromCurrency');
const toSelect = document.getElementById('toCurrency');
const form = document.getElementById('converterForm');
const resultDiv = document.getElementById('result');
const themeToggle = document.getElementById('themeToggle');
const swapBtn = document.getElementById('swapBtn');

/* function to fetch exchange rates and perform conversion */
async function convertCurrency(amount, fromCurrency, toCurrency) {
    try {
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
        const data = await response.json();

        for (const code in currencies) {
            const optionFrom = document.createElement('option');
            optionFrom.value = code;
            optionFrom.textContent = `${code} - ${currencies[code]}`;

            const optionTO = optionFrom.cloneNode(true);  
            
            fromSelect.appendChild(optionFrom);
            toSelect.appendChild(optionTO);
         }
        } catch {
            showError("Unable to load currency data. Please try again later.");
    }
        }
/* function to set currency options in select elements */
function setDefaults() {
    fromSelect.value = 'USD';
    toSelect.value = 'EUR';
}
