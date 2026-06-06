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
    currencies: ['$ US Dollar', 'Euro', 'BGN Lev'],
    languageOptions: ['English', 'Bulgarian']
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
    currencies: ['$ Щатски долар', 'Евро', 'BGN Лев'],
    languageOptions: ['Английски', 'Български']
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

  const languageOptions = languageSelect.querySelectorAll('option');
  languageOptions.forEach((option, index) => {
    option.textContent = texts.languageOptions[index] || option.textContent;
  });

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

function drawChart(prospects, leads, customers) {
  const svg = document.getElementById('chart');
  if (!svg) return;
  const w = 760;
  const h = 430;
  const padding = 28;
  const chartW = w - padding * 2;
  const chartH = h - padding * 2 - 30; // leave room for labels

  const max = Math.max(prospects, leads, customers, 1);

  // clear
  while (svg.firstChild) svg.removeChild(svg.firstChild);

  // background rounded rect (keeps existing style but ensures visibility)
  const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bg.setAttribute('x', 0);
  bg.setAttribute('y', 0);
  bg.setAttribute('width', w);
  bg.setAttribute('height', h);
  bg.setAttribute('rx', 20);
  bg.setAttribute('fill', 'none');
  svg.appendChild(bg);

  const names = ['Prospects', 'Leads', 'Customers'];
  const values = [prospects, leads, customers];
  const colors = ['#2e7d32', '#1e90ff', '#7bca6b'];

  const barSlot = chartW / 6;
  const barWidth = barSlot * 1.6;

  values.forEach((val, i) => {
    const x = padding + barSlot * (i * 2 + 1) - barWidth / 2;
    const barH = Math.round((val / max) * chartH);
    const y = padding + (chartH - barH);

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', barWidth);
    rect.setAttribute('height', barH);
    rect.setAttribute('rx', 8);
    rect.setAttribute('fill', colors[i]);
    svg.appendChild(rect);

    // value label
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x + barWidth / 2);
    text.setAttribute('y', y - 8);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', '#ffffff');
    text.setAttribute('font-size', '14');
    text.textContent = String(val);
    svg.appendChild(text);

    // name label
    const name = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    name.setAttribute('x', x + barWidth / 2);
    name.setAttribute('y', padding + chartH + 20);
    name.setAttribute('text-anchor', 'middle');
    name.setAttribute('fill', '#cfead1');
    name.setAttribute('font-size', '12');
    name.textContent = names[i];
    svg.appendChild(name);
  });
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

  // update svg chart
  drawChart(prospects, leads, customers);

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
