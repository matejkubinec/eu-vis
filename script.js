// constants
const PALETTES = {
  red: ['#ffebee', '#b71c1c'],
  pink: ['#fce4ec', '#880e4f'],
  purple: ['#f3e5f5', '#4a148c'],
  deepPurple: ['#ede7f6', '#311b92'],
  indigo: ['#e8eaf6', '#1a237e'],
  blue: ['#e3f2fd', '#0d47a1'],
  lightBlue: ['#e1f5fe', '#01579b'],
  cyan: ['#e0f7fa', '#006064'],
  teal: ['#e0f2f1', '#004d40'],
  green: ['#e8f5e9', '#1b5e20'],
  lightGreen: ['#f1f8e9', '#33691e'],
  lime: ['#f9fbe7', '#827717'],
  yellow: ['#fffde7', '#f57f17'],
  amber: ['#fff8e1', '#ff6f00'],
  orange: ['#fff3e0', '#e65100'],
  deepOrange: ['#fbe9e7', '#bf360c'],
  brown: ['#efebe9', '#3e2723'],
  grey: ['#fafafa', '#212121'],
  blueGrey: ['#eceff1', '#263238'],
};

// mutables
let palette = PALETTES.blue;
let data = [
  {
    country: 'BE',
    value: 5.4,
  },
  {
    country: 'BG',
    value: 4.2,
  },
  {
    country: 'CZ',
    value: 2,
  },
  {
    country: 'DK',
    value: 5,
  },
  {
    country: 'DE',
    value: 3.2,
  },
  {
    country: 'EE',
    value: 4.4,
  },
  {
    country: 'IE',
    value: 5,
  },
  {
    country: 'EL',
    value: 17.3,
  },
  {
    country: 'ES',
    value: 14.1,
  },
  {
    country: 'FR',
    value: 8.5,
  },
  {
    country: 'HR',
    value: 6.6,
  },
  {
    country: 'IT',
    value: 10,
  },
  {
    country: 'CY',
    value: 7.1,
  },
  {
    country: 'LV',
    value: 6.3,
  },
  {
    country: 'LT',
    value: 6.3,
  },
  {
    country: 'LU',
    value: 5.6,
  },
  {
    country: 'HU',
    value: 3.4,
  },
  {
    country: 'MT',
    value: 3.4,
  },
  {
    country: 'NL',
    value: 3.4,
  },
  {
    country: 'AT',
    value: 4.5,
  },
  {
    country: 'PL',
    value: 3.3,
  },
  {
    country: 'PT',
    value: 6.5,
  },
  {
    country: 'RO',
    value: 3.9,
  },
  {
    country: 'SI',
    value: 4.5,
  },
  {
    country: 'SK',
    value: 5.8,
  },
  {
    country: 'FI',
    value: 6.7,
  },
  {
    country: 'SE',
    value: 6.8,
  },
];

const upload = document.querySelector('#upload-data');
const uploadButton = document.querySelector('#upload-data-button');
const downloadButton = document.querySelector('#download-chart');
const downloadLink = document.querySelector('#download-link');
const paletteSelect = document.querySelector('#palette-select');
const Chart = {
  map: document.querySelector('svg'),
  legend: {
    lowerBound: document.querySelector('#text-lower-bound'),
    upperBound: document.querySelector('#text-upper-bound'),
  },
};

const drawScale = (scale, min, max) => {
  const MAX = 100;
  const step = (max - min) / MAX;

  for (let i = MAX; i >= 0; i--) {
    const rect = document.querySelector(`#r${i}`);
    const scaledValue = i * step + min;
    rect.setAttribute('fill', scale(scaledValue));
  }

  const removeFractional = (num) => num.toString().split('.')[0];

  Chart.legend.lowerBound.innerHTML = removeFractional(min);
  Chart.legend.upperBound.innerHTML = removeFractional(max);
};

const mapCountryCode = (code) => {
  switch (code) {
    case 'EL':
      return 'gr';
    default:
      return code.toLowerCase();
  }
};

const getColor = (value, scale) => {
  return scale(value);
};

const getCountry = (code) => {
  const id = '#' + mapCountryCode(code);
  const country = document.querySelector(id);

  if (!country) {
    console.log('missing country: ' + code);
  }

  return country;
};

const applyColor = (code, color) => {
  const country = getCountry(code);
  if (country) {
    country.style.fill = color;
  }
};

const drawData = (data) => {
  const min = Math.min(...data.map(({ value }) => value));
  const max = Math.max(...data.map(({ value }) => value));
  const scale = d3.scaleLinear().domain([min, max]).range(palette);
  drawScale(scale, min, max);
  data.forEach(({ country, value }) =>
    applyColor(country, getColor(value, scale))
  );
};

const valueToNumber = (value) =>
  Number.parseFloat(value.replace(/\"/g, '').replace(',', '.'));

const parseRow = (row) => ({
  country: row.slice(0, 2),
  value: valueToNumber(row.slice(3)),
});

const parseData = (csv) => csv.trim().split('\n').filter(Boolean).map(parseRow);

const onDataLoad = ({ target: { result } }) => {
  const data = parseData(result);
  console.log('loaded data: ', data);
  drawData(data);
};

const onDataChange = (e) => {
  const { files } = e.target;

  if (files && files.length) {
    const reader = new FileReader();
    reader.readAsText(files[0]);
    reader.onload = onDataLoad;
  }
};

const onDownloadChartClick = () => {
  const data = new Blob([Chart.map.outerHTML]);
  downloadLink.href = URL.createObjectURL(data);
  downloadLink.click();
};

const onUploadButtonClick = () => {
  upload.click();
};

const onPaletteChange = (e) => {
  const { value } = e.target;
  palette = PALETTES[value];
  drawData(data);
};

upload.addEventListener('change', onDataChange);
uploadButton.addEventListener('click', onUploadButtonClick);
downloadButton.addEventListener('click', onDownloadChartClick);
paletteSelect.addEventListener('change', onPaletteChange);

drawData(data);
