export default class ColumnChart {
  constructor(data = {
    data: null,
    value: null,
    link: null,
    label: null
  }) {
    this.props = data;
    this.element = null;
    this.chartHeight = 50;
    this.render();
  }

  render() {
    const data = this.props.data || [];
    const label = this.props.label ? `Total ${this.props.label}` : '';
    const value = this.props.value || '';
    const link = this.props.link ? `<a href="${this.props.link}" class="column-chart__link">View all</a>` : '';
    const chart = this.chart(data);

    const element = document.createElement('div');
    const className = data.length ? `dashboard__chart_${this.props.label}` : `column-chart_loading`;
    element.className = `column-chart ${className}`;
    element.setAttribute('style',`--chart-height: ${this.chartHeight}`)

    element.innerHTML = `<div class="column-chart__title">
                             ${label}
                             ${link}
                          </div>
                          <div class="column-chart__container">
                              <div class="column-chart__header">
                                  ${value}
                              </div>
                              <div class="column-chart__chart">
                                  ${chart}
                              </div>
                          </div>`;

    this.element = element;
  }

  chart(data) {
    const maxElem = Math.max.apply(null, data);
    const scale = this.chartHeight / maxElem;

    return data.map(elem => {
      const value = Math.floor(elem * (scale));
      const tooltip = Math.round((elem / maxElem * 100));

      return `<div style="--value: ${value}" data-tooltip="${tooltip}%"></div>`;
    }).join('');
  }

  update(data) {
    this.props.data = data.bodyData;
    const chart = this.element.querySelector('.column-chart__chart');
    chart.innerHTML = this.chart(this.props.data);
  }

  remove()
  {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy()
  {
    this.remove();
  }
}
