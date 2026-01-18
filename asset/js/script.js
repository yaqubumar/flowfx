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
/* validate user input and show error messages */
function isVialidInput(amount, from , to) {
    if (!amount || amount <= 0) return false;
    if (from === to) return false;
    return true;
}
/* this section implements currency conversion logic */
async function convertCurrency(amount, from, to) {
    try  {
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
        const data = await response.json();
        return data.rates[to];
    }
    catch {
        showError("Exchange rate unavailable. Please try again later");
    }
}

/* update UI with result and error */
function displayResult(amount, from, to, converted) {
  resultDiv.classList.remove("error");
  resultDiv.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
}

function showError(message) {
  resultDiv.classList.add("error");
  resultDiv.textContent = message;
}
/* handle form submission */
function handleSubmit(event) {
  event.preventDefault();

  const amount = amountInput.value;
  const from = fromSelect.value;
  const to = toSelect.value;

  if (!isValidInput(amount, from, to)) {
    showError("Please enter a valid amount and select different currencies.");
    return;
  }

  convertCurrency(amount, from, to);
}
/* handle theme toggle */
function toggleTheme() {
  document.body.classList.toggle("dark");
}

/* handle currency swap functionality */
function swapCurrencies() {
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;

  if (amountInput.value) {
    convertCurrency(amountInput.value, fromSelect.value, toSelect.value);
  }
}
