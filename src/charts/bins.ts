import { Country, DataItem, Palette, PALETTES } from '../types';
import { COLORS } from '../constants';
import * as D3 from 'd3';
import * as Helpers from './helpers';

const CONFIG = {
  xOffset: 82,
  yOffset: 5,
  fontSize: '3px',
  fontSizeTitle: '4px',
};

export const drawBins = (
  mapSvg: SVGElement,
  data: DataItem[],
  palette: Palette
) => {
  const bin = D3.bin().value((d: any) => d.value);
  const bins = bin(data as any);

  const scale = D3.scaleLinear()
    .domain([0, bins.length])
    .range(PALETTES[palette] as any);

  bins.forEach((bin, i) => {
    const color = scale(i);

    bin.forEach((item) => {
      const code = (item as any).country as Country;
      const country = Helpers.mapCountryCode(code);
      const element = document.querySelector(`#${country}`) as SVGPathElement;
      if (element) {
        element.style.fill = String(color);
      }
    });
  });

  const legendData = [null, ...bins];
  const legend = D3.select(mapSvg).select('#chart-legend');

  legend.selectAll('*').remove();

  legend
    .append('text')
    .text('Legenda:')
    .attr('x', CONFIG.xOffset + 5)
    .attr('y', CONFIG.yOffset + 4)
    .style('font-size', CONFIG.fontSizeTitle);

  const g = legend.selectAll('item').data(legendData).enter().append('g');

  g.append('rect')
    .attr('x', CONFIG.xOffset + 5)
    .attr('y', (_, i) => CONFIG.yOffset + (i + 1) * 6)
    .attr('width', 5)
    .attr('height', 5)
    .attr('fill', (item, i) => (item ? scale(i) : COLORS.NoData))
    .style('stroke-width', 0.1)
    .style('stroke', '#555');

  g.append('text')
    .attr('x', CONFIG.xOffset + 11)
    .attr('y', (_, i) => CONFIG.yOffset + (i + 1) * 6 + 3.5)
    .style('font-size', CONFIG.fontSize)
    .text((item) => (item ? `${item.x0} - ${item.x1}` : 'Dáta nedostupné'));
};
