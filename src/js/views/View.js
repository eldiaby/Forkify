import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const DOMMarkup = document
      .createRange()
      .createContextualFragment(newMarkup);
    const currentDom = Array.from(this._parentElement.querySelectorAll('*'));
    const newDom = Array.from(DOMMarkup.querySelectorAll('*'));

    // Updates changed TEXT
    newDom.forEach((ele, i) => {
      if (
        !ele.isEqualNode(currentDom[i]) &&
        ele.firstChild.nodeValue.trim() !== ''
      ) {
        currentDom[i].textContent = ele.textContent;
      }

      // Updates changed TEXT
      if (!ele.isEqualNode(currentDom[i])) {
        Array.from(ele.attributes).forEach(attr =>
          currentDom[i].setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
    <svg>
    <use href="${icons}#icon-loader"></use>
    </svg>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  _clear() {
    this._parentElement.innerHTML = ``;
  }
}
