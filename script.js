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
}

leadRate.addEventListener('input', updateStats);
prospectRate.addEventListener('input', updateStats);

updateStats();
