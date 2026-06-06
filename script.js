const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const leadRate = document.getElementById('leadRate');
const prospectRate = document.getElementById('prospectRate');
const leadRateValue = document.getElementById('leadRateValue');
const prospectRateValue = document.getElementById('prospectRateValue');
const leadRateLabel = document.getElementById('leadRateLabel');
const customerRateLabel = document.getElementById('customerRateLabel');
const leadsOutput = document.getElementById('leads');
const customersOutput = document.getElementById('customers');
const prospectsOutput = document.getElementById('prospects');

function formatPercent(value) {
  return `${value.toFixed(2)}%`;
}

function parseDateDMY(value) {
  const parts = value.split('/').map((part) => Number(part));
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return null;
  }

  const [day, month, year] = parts;
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }

  return date;
}

function validateDateInput(input) {
  const date = parseDateDMY(input.value);
  input.style.borderColor = date ? '#a5d6a7' : '#ef5350';
  return date;
}

function updateStats() {
  const leadPercent = Number(leadRate.value);
  const prospectPercent = Number(prospectRate.value);
  const prospects = 125;
  const leads = Math.round((prospectPercent / 100) * prospects);
  const customers = Math.round((leadPercent / 100) * leads);

  leadRateValue.textContent = formatPercent(leadPercent);
  prospectRateValue.textContent = formatPercent(prospectPercent);
  leadRateLabel.textContent = `${leadPercent}%`;
  customerRateLabel.textContent = `${Math.round((customers / prospects) * 100)}%`;
  leadsOutput.textContent = leads;
  customersOutput.textContent = customers;
  prospectsOutput.textContent = prospects;

  validateDateInput(startDateInput);
  validateDateInput(endDateInput);
}

leadRate.addEventListener('input', updateStats);
prospectRate.addEventListener('input', updateStats);
startDateInput.addEventListener('input', updateStats);
endDateInput.addEventListener('input', updateStats);

updateStats();
