const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const leadRate = document.getElementById('leadRate');
const prospectRate = document.getElementById('prospectRate');
const languageSelect = document.getElementById('languageSelect');
const currencySelect = document.getElementById('currencySelect');
const leadRateValue = document.getElementById('leadRateValue');
const prospectRateValue = document.getElementById('prospectRateValue');
const leadRateLabel = document.getElementById('leadRateLabel');
const customerRateLabel = document.getElementById('customerRateLabel');
const prospectsMeter = document.getElementById('prospectsMeter');
const leadsMeter = document.getElementById('leadsMeter');
const customersMeter = document.getElementById('customersMeter');
const leadsOutput = document.getElementById('leads');
const customersOutput = document.getElementById('customers');
const prospectsOutput = document.getElementById('prospects');
const languageLabel = document.getElementById('languageLabel');
const currencyLabel = document.getElementById('currencyLabel');
const campaignStartLabel = document.getElementById('campaignStartLabel');
const campaignEndLabel = document.getElementById('campaignEndLabel');
const revenueLabel = document.getElementById('revenueLabel');
const orderValueLabel = document.getElementById('orderValueLabel');
const prospectsTitle = document.getElementById('prospectsTitle');
const leadsTitle = document.getElementById('leadsTitle');
const customersTitle = document.getElementById('customersTitle');
const leadResponseLabel = document.getElementById('leadResponseLabel');
const prospectResponseLabel = document.getElementById('prospectResponseLabel');
const appTitle = document.getElementById('appTitle');

function formatPercent(value) {
  return `${value.toFixed(2)}%`;
}

const translation = {
  en: {
    pageTitle: 'LeadPredictor',
    brandName: 'LeadPredictor',
    language: 'Language',
    currency: 'Currency',
    campaignStart: 'Campaign Start',
    campaignEnd: 'Campaign End',
    totalRevenue: 'Total Revenue',
    avgOrderValue: 'Avg. Order Value',
    prospects: 'Prospects',
    leads: 'Leads',
    customers: 'Customers',
    leadResponse: 'Lead Response Rate',
    prospectResponse: 'Prospect Response Rate',
    currencies: ['$ US Dollar', 'Euro', 'BGN Lev']
  },
  bg: {
    pageTitle: 'Предсказател на лийдове',
    brandName: 'ЛийдПредиктор',
    language: 'Език',
    currency: 'Валута',
    campaignStart: 'Начало на кампанията',
    campaignEnd: 'Край на кампанията',
    totalRevenue: 'Общ приход',
    avgOrderValue: 'Средна стойност на поръчка',
    prospects: 'Перспективи',
    leads: 'Лийдове',
    customers: 'Клиенти',
    leadResponse: 'Процент отговор на лийд',
    prospectResponse: 'Процент отговор на перспектива',
    currencies: ['$ Щатски долар', 'Евро', 'BGN Лев']
  }
};

function translatePage() {
  const locale = languageSelect.value;
  const texts = translation[locale] || translation.en;

  document.documentElement.lang = locale;
  document.title = texts.pageTitle;
  appTitle.textContent = texts.brandName;
  languageLabel.textContent = texts.language;
  currencyLabel.textContent = texts.currency;
  campaignStartLabel.textContent = texts.campaignStart;
  campaignEndLabel.textContent = texts.campaignEnd;
  revenueLabel.textContent = texts.totalRevenue;
  orderValueLabel.textContent = texts.avgOrderValue;
  prospectsTitle.textContent = texts.prospects;
  leadsTitle.textContent = texts.leads;
  customersTitle.textContent = texts.customers;
  leadResponseLabel.textContent = texts.leadResponse;
  prospectResponseLabel.textContent = texts.prospectResponse;

  const currencyOptions = currencySelect.querySelectorAll('option');
  currencyOptions.forEach((option, index) => {
    option.textContent = texts.currencies[index] || option.textContent;
  });
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

  prospectsMeter.style.width = '100%';
  leadsMeter.style.width = `${Math.round((leads / prospects) * 100)}%`;
  customersMeter.style.width = `${Math.round((customers / prospects) * 100)}%`;

  validateDateInput(startDateInput);
  validateDateInput(endDateInput);
}

leadRate.addEventListener('input', updateStats);
prospectRate.addEventListener('input', updateStats);
startDateInput.addEventListener('input', updateStats);
endDateInput.addEventListener('input', updateStats);
languageSelect.addEventListener('change', () => {
  translatePage();
  updateStats();
});

translatePage();
updateStats();
