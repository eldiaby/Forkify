import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  handlePaginationBtns(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const target = e.target.closest('.btn--inline');
      if (!target) return;
      handler(+target.dataset.goto);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numberPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );
    // First page and there is other pages
    if (currentPage === 1 && numberPages > 1)
      return `
          <button data-goto="${
            currentPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `;

    // last page
    if (currentPage === numberPages && numberPages > 1)
      return `
          <button data-goto="${
            currentPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
    `;

    // some page and not the first and not the last
    if (currentPage > 1 && numberPages > 1)
      return `  
          <button data-goto="${
            currentPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          <button data-goto="${
            currentPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    `;

    // page number 1 and there is no other pages
    if (currentPage === 1 && numberPages === 1) return ``;
  }
}

export default new PaginationView();
