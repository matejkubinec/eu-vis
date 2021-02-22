import { DataItem, Palette, PALETTES } from '../types';
import * as Helpers from './helpers';
import * as D3 from 'd3';

export const drawContinous = (
  mapSvg: SVGElement,
  data: DataItem[],
  palette: Palette
) => {
  const [min, max] = D3.extent(data, (d) => d.value);
  const scale = D3.scaleLinear()
    .domain([min, max])
    .range(PALETTES[palette] as any);

  data.forEach(({ country, value }) => {
    const code = Helpers.mapCountryCode(country);
    const element = D3.select(`#${code}`);
    element.style('fill', scale(value));
  });

  const legend = D3.select(mapSvg).select('#chart-legend');

  legend.selectAll('*').remove();
};
