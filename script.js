const upload = document.querySelector('#upload-data');
const uploadButton = document.querySelector('#upload-data-button');
const downloadButton = document.querySelector('#download-chart');
const downloadLink = document.querySelector('#download-link');
const map = document.querySelector('svg');

const mapCountryCode = (code) => {
  switch (code) {
    case 'EL':
      return 'gr';
    default:
      return code.toLowerCase();
  }
};

const getColor = (value, min, max) => {
  const scaled = ((value - min) / max) * 255;
  const color = 'rgba(0, 0, ' + scaled + ', 0.5)';
  return color;
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

  data.forEach(({ country, value }) =>
    applyColor(country, getColor(value, min, max))
  );
};

const valueToNumber = (value) =>
  Number.parseFloat(value.replace(/\"/g, '').replace(',', '.'));

const parseRow = (row) => ({
  country: row.slice(0, 2),
  value: valueToNumber(row.slice(3)),
});

const parseData = (csv) => csv.split('\n').filter(Boolean).map(parseRow);

const onDataLoad = ({ target: { result } }) => {
  const data = parseData(result);
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
  const data = new Blob([map.outerHTML]);
  downloadLink.href = URL.createObjectURL(data);
  downloadLink.click();
};

const onUploadButtonClick = () => {
  upload.click();
};

upload.addEventListener('change', onDataChange);
uploadButton.addEventListener('click', onUploadButtonClick);
downloadButton.addEventListener('click', onDownloadChartClick);
