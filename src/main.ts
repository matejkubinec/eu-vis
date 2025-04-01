import { DataItem, MODE, Palette } from './types';
import { SAMPLE_DATA } from './constants';
import * as Chart from './charts/index';

class Page {
  paletteSelect: HTMLSelectElement;
  modeSelect: HTMLSelectElement;
  selectDataInput: HTMLInputElement;
  selectDataButton: HTMLButtonElement;
  downloadChartButton: HTMLButtonElement;
  downloadChartLink: HTMLAnchorElement;
  mapSvg: SVGElement;
  data: DataItem[] = SAMPLE_DATA;
  displayInfoButton: HTMLButtonElement;
  infoDialog: HTMLDialogElement;

  onPaletteChange = () => {
    this.redrawChart();
  };

  onModeChange = () => {
    this.redrawChart();
  };

  onSelectData = () => {
    this.selectDataInput.click();
  };

  onDataChange = async (e: Event) => {
    const input = e.target as HTMLInputElement;

    if (input.files) {
      const reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = this.onDataLoaded;
    }
  };

  onDataLoaded = (e: ProgressEvent<FileReader>) => {
    const csv = String(e.target.result);
    const rows = csv.split('\n').map((row) => ({
      country: row.slice(0, 2),
      value: Number.parseFloat(
        row.slice(3).replace(/\"/g, '').replace(',', '.')
      ),
    })) as DataItem[];
    this.data = rows;
    this.redrawChart();
  };

  onDownloadChart = () => {
    const data = new Blob([this.mapSvg.outerHTML]);
    this.downloadChartLink.href = URL.createObjectURL(data);
    this.downloadChartLink.click();
  };

  redrawChart = () => {
    if (this.data.length === 0) return;

    const palette = this.paletteSelect.value as Palette;
    const mode = this.modeSelect.value as MODE;

    if (mode == MODE.Bins) {
      Chart.drawBins(this.mapSvg, this.data, palette);
    } else if (mode === MODE.Continous) {
      Chart.drawContinous(this.mapSvg, this.data, palette);
    }
  };

  onOpenInfoModal = () => {
    this.infoDialog.showModal();
  };

  initElements = () => {
    this.selectDataInput = document.querySelector('#upload-data-input');
    this.selectDataButton = document.querySelector('#upload-data-button');
    this.downloadChartButton = document.querySelector('#download-chart-button');
    this.downloadChartLink = document.querySelector('#download-chart-link');
    this.paletteSelect = document.querySelector('#palette-select');
    this.modeSelect = document.querySelector('#mode-select');
    this.mapSvg = document.querySelector('#eu-map');
    this.infoDialog = document.querySelector('#info-dialog');
    this.displayInfoButton = document.querySelector('#display-info-button');
  };

  initListeners = () => {
    this.selectDataButton.addEventListener('click', this.onSelectData);
    this.selectDataInput.addEventListener('change', this.onDataChange);
    this.downloadChartButton.addEventListener('click', this.onDownloadChart);
    this.paletteSelect.addEventListener('click', this.onPaletteChange);
    this.modeSelect.addEventListener('click', this.onModeChange);
    this.displayInfoButton.addEventListener('click', this.onOpenInfoModal);
  };
}

const main = () => {
  const page = new Page();
  page.initElements();
  page.initListeners();
  page.redrawChart();
};

document.addEventListener('DOMContentLoaded', () => {
  main();
});
