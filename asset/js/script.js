/* DOM Elements */
const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('fromCurrency');
const toSelect = document.getElementById('toCurrency');
const form = document.getElementById('converterForm');
const resultInput = document.getElementById('result');
const themeToggle = document.getElementById('themeToggle');
const swapBtn = document.getElementById('swapBtn');
const errorMessage = document.getElementById('errorMessage');
const rateText = document.getElementById('rateText');

let currenciesList = [];

/* Fetch available currencies from Frankfurter API */
async function loadCurrencies() {
    try {
        const response = await fetch('https://api.frankfurter.app/currencies');
        const data = await response.json();
        currenciesList = Object.keys(data).sort();
        populateCurrencySelects();
    } catch (error) {
        console.error('Error loading currencies:', error);
        showError('Failed to load currency data. Please refresh the page.');
    }
}

/* Populate currency select dropdowns */
function populateCurrencySelects() {
    // Clear existing options
    fromSelect.innerHTML = '<option value="">Select currency</option>';
    toSelect.innerHTML = '<option value="">Select currency</option>';

    // Add all currencies
    currenciesList.forEach(currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.textContent = currency;

        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.textContent = currency;

        fromSelect.appendChild(optionFrom);
        toSelect.appendChild(optionTo);
    });

    // Set defaults
    setDefaults();
}

/* Set default currencies */
function setDefaults() {
    fromSelect.value = 'USD';
    toSelect.value = 'EUR';
}

/* Validate user input */
function isValidInput(amount, from, to) {
    if (!amount || isNaN(amount) || amount <= 0) return false;
    if (!from || !to) return false;
    if (from === to) return false;
    return true;
}

/* Clear error message */
function clearError() {
    errorMessage.textContent = '';
    errorMessage.classList.remove('error');
}

/* Show error message */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('error');
    resultInput.value = '';
    rateText.textContent = 'Enter valid amounts to see the rate';
}

/* Perform currency conversion */
async function convertCurrency(amount, from, to) {
    try {
        clearError();
        
        const response = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
        );
        
        if (!response.ok) {
            throw new Error('Conversion failed');
        }

        const data = await response.json();
        const converted = data.rates[to];
        
        if (!converted) {
            throw new Error('Invalid conversion result');
        }

        displayResult(amount, from, to, converted);
    } catch (error) {
        console.error('Conversion error:', error);
        showError('Unable to fetch exchange rate. Please try again.');
    }
}

/* Display conversion result */
function displayResult(amount, from, to, converted) {
    const rate = (converted / amount).toFixed(6);
    resultInput.value = converted.toFixed(2);
    rateText.textContent = `1 ${from} = ${rate} ${to}`;
    
    // Update comparison table
    updateComparisonTable(amount, from, to, converted, rate);
}

/* Update price comparison table */
function updateComparisonTable(amount, from, to, converted, rate) {
    // Calculate provider markups (simulated)
    const barclaysMarkup = 0.018; // 1.8% markup
    const santanderMarkup = 0.025; // 2.5% markup
    const paypalMarkup = 0.041; // 4.1% markup
    
    // Calculate rates with markups
    const barclaysRate = (parseFloat(rate) * (1 - barclaysMarkup)).toFixed(5);
    const santanderRate = (parseFloat(rate) * (1 - santanderMarkup)).toFixed(5);
    const paypalRate = (parseFloat(rate) * (1 - paypalMarkup)).toFixed(5);
    
    // Calculate fees (simulated)
    const flowfxFee = amount >= 1000 ? amount * 0.0039 : 3.88; // 0.39% or min fee
    const barclaysFee = 0; // No transfer fee but higher markup
    const santanderFee = 0;
    const paypalFee = amount * 0.03; // 3% fee
    
    // Calculate recipient gets
    const flowfxRecipient = converted;
    const barclaysRecipient = (amount * barclaysRate);
    const santanderRecipient = (amount * santanderRate);
    const paypalRecipient = ((amount - paypalFee) * paypalRate);
    
    // Update rate label
    document.getElementById('rateLabel').textContent = `(1 ${from} → ${to})`;
    
    // Update Flow FX column
    document.getElementById('flowfxRecipient').textContent = `${flowfxRecipient.toFixed(2)} ${to}`;
    document.getElementById('flowfxRate').textContent = rate;
    document.getElementById('flowfxMarkup').textContent = `0 ${from}`;
    document.getElementById('flowfxFee').textContent = `${flowfxFee.toFixed(2)} ${from}`;
    document.getElementById('flowfxTotal').textContent = `${flowfxFee.toFixed(2)} ${from}`;
    
    // Update Barclays column
    const barclaysMarkupAmount = amount * barclaysMarkup;
    document.getElementById('barclaysRecipient').textContent = `${barclaysRecipient.toFixed(2)} ${to}`;
    document.getElementById('barclaysRate').textContent = barclaysRate;
    document.getElementById('barclaysMarkup').textContent = `${barclaysMarkupAmount.toFixed(2)} ${from}`;
    document.getElementById('barclaysFee').textContent = `${barclaysFee} ${from}`;
    document.getElementById('barclaysTotal').textContent = `${barclaysMarkupAmount.toFixed(2)} ${from}`;
    
    // Update Santander column
    const santanderMarkupAmount = amount * santanderMarkup;
    document.getElementById('santanderRecipient').textContent = `${santanderRecipient.toFixed(2)} ${to}`;
    document.getElementById('santanderRate').textContent = santanderRate;
    document.getElementById('santanderMarkup').textContent = `${santanderMarkupAmount.toFixed(2)} ${from}`;
    document.getElementById('santanderFee').textContent = `${santanderFee} ${from}`;
    document.getElementById('santanderTotal').textContent = `${santanderMarkupAmount.toFixed(2)} ${from}`;
    
    // Update PayPal column
    const paypalMarkupAmount = amount * paypalMarkup;
    const paypalTotalCost = paypalFee + paypalMarkupAmount;
    document.getElementById('paypalRecipient').textContent = `${paypalRecipient.toFixed(2)} ${to}`;
    document.getElementById('paypalRate').textContent = paypalRate;
    document.getElementById('paypalMarkup').textContent = `${paypalMarkupAmount.toFixed(2)} ${from}`;
    document.getElementById('paypalFee').textContent = `${paypalFee.toFixed(2)} ${from}`;
    document.getElementById('paypalTotal').textContent = `${paypalTotalCost.toFixed(2)} ${from}`;
}

/* Handle form submission */
function handleSubmit(event) {
    event.preventDefault();

    const amount = parseFloat(amountInput.value);
    const from = fromSelect.value;
    const to = toSelect.value;

    if (!isValidInput(amount, from, to)) {
        showError('Please enter a valid amount and select different currencies.');
        return;
    }

    convertCurrency(amount, from, to);
}

/* Handle real-time conversion as user types */
function handleAmountChange() {
    const amount = parseFloat(amountInput.value);
    const from = fromSelect.value;
    const to = toSelect.value;

    if (isValidInput(amount, from, to)) {
        convertCurrency(amount, from, to);
    } else {
        clearError();
        resultInput.value = '';
        rateText.textContent = 'Enter amount to see the rate';
    }
}

/* Handle currency selection change */
function handleCurrencyChange() {
    const amount = parseFloat(amountInput.value);
    const from = fromSelect.value;
    const to = toSelect.value;

    if (from === to) {
        showError('Please select different currencies.');
        return;
    }

    if (isValidInput(amount, from, to)) {
        convertCurrency(amount, from, to);
    } else {
        clearError();
        resultInput.value = '';
        rateText.textContent = 'Enter amount to see the rate';
    }
}

/* Handle theme toggle */
function toggleTheme() {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

/* Handle currency swap */
function swapCurrencies() {
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;

    const amount = parseFloat(amountInput.value);
    if (isValidInput(amount, fromSelect.value, toSelect.value)) {
        convertCurrency(amount, fromSelect.value, toSelect.value);
    }
}

/* Load saved theme preference */
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
}

/* Event Listeners */
form.addEventListener('submit', handleSubmit);
amountInput.addEventListener('input', handleAmountChange);
fromSelect.addEventListener('change', handleCurrencyChange);
toSelect.addEventListener('change', handleCurrencyChange);
themeToggle.addEventListener('click', toggleTheme);
swapBtn.addEventListener('click', swapCurrencies);

/* Initialize Application */
async function init() {
    loadThemePreference();
    await loadCurrencies();
    
    // Load default conversion on page load
    setTimeout(() => {
        const defaultAmount = 1000;
        amountInput.value = defaultAmount;
        if (fromSelect.value && toSelect.value) {
            convertCurrency(defaultAmount, fromSelect.value, toSelect.value);
        }
    }, 100);
}

init();