export default class SortableTable {
  element;
  subElements = {};
  header = [];
  data = [];

  constructor(header, data) {
    this.header = header;
    this.data = data.data;

    this.render();
  }

  render() {
    const element = document.createElement('div')
    element.innerHTML = this.template;
    this.element = element.firstElementChild;

    this.subElements = this.getSubElements(element);
  }

  get headerTpl() {
    return `<div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.headerRow}
    </div>`;
  }

  get headerRow() {
    return this.header.map(item =>
      `<div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}"><span>${item.title}</span>
        ${this.sortingArrowTpl}
       </div>`
    ).join('');
  }

  get sortingArrowTpl() {
    return `
        <span class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>`;
  }

  get bodyTpl() {
    return `<div data-element="body" class="sortable-table__body">
      ${this.bodyRows}
    </div>`;
  }

  get bodyRows() {
    return this.data.map(rowItem => {
      const cells = this.header.map(cellItem => {
        return cellItem.hasOwnProperty('template') ?
          `${cellItem.template(rowItem.images)}` :
          `<div class="sortable-table__cell" >${rowItem[cellItem.id]}</div>`;
      }).join('');

      return `<a href="/products/${rowItem.id}" class="sortable-table__row">
        ${cells}
      </a>`;
    }).join('');
  }

  get template() {
    return `<div class="sortable-table">
      ${this.headerTpl}
      ${this.bodyTpl}
    </div>`;
  }

  sort(column, order) {
    const sortType = this.header.find(item => item.id === column).sortType;
    const sign = order === 'asc' ? 1 : -1;

    const allColumns = document.querySelectorAll('.sortable-table__cell[data-id]');
    const currentColumn = document.querySelector(`.sortable-table__cell[data-id="${column}"]`);

    allColumns.forEach(column => {
      column.dataset.order = '';
    });
    currentColumn.dataset.order = order;

    this.data.sort((item1, item2) => {
      switch (sortType) {
      case 'number':
        return sign * (item1[column] - item2[column]);
      case 'string':
        return sign * item1[column].localeCompare(item2[column], 'ru');
      }
    });

    this.subElements.body.innerHTML = this.bodyRows;
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');
    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;
      return accum;
    });
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

