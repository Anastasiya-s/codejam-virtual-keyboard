import { rusKeyboard, engKeyboard } from './keyboards.js';
import { createKeyboardContainer } from './helpers.js';
export default class Keyboard {
  constructor() {
    this.lang = 'ru';
    this.isCapsOn = false;
    this.keyboardSet = rusKeyboard;
  }

  renderKeyboard() {
    const keyboardContainer = document.querySelector('.keyboard_container');
    return this.keyboardSet.map((row) => {
      const el = document.createElement('div');
      Object.entries(row).forEach((cell) => {
        const elem = document.createElement('span');
        elem.insertAdjacentHTML('afterbegin', cell[1]);
        elem.classList.add('cell');
        elem.classList.add(cell[0]);
        elem.dataset.keyCode = cell[0];
        el.append(elem);
        return elem;
      });
      el.classList.add('row');
      return keyboardContainer.append(el);
    });
  }

  setLang() {
    const lang = localStorage.getItem('lang');
    if (!lang) {
      localStorage.setItem('lang', 'ru');
      this.keyboardSet = rusKeyboard;
    }
    if (lang === 'ru') {
      this.keyboardSet = rusKeyboard;
    }
    if (lang === 'eng') {
      this.keyboardSet = engKeyboard;
    }
    return this.keyboardSet;
  }

  changeLanguage() {
    const keyboardContainer = document.querySelector('.keyboard_container');
    const lang = localStorage.getItem('lang');
    if (lang === 'ru') {
      localStorage.setItem('lang', 'eng');
      this.keyboardSet = engKeyboard;
    } else if (lang === 'eng') {
      localStorage.setItem('lang', 'ru');
      this.keyboardSet = rusKeyboard;
    }
    while (keyboardContainer.hasChildNodes()) {
      keyboardContainer.removeChild(keyboardContainer.lastChild);
    }
    this.renderKeyboard(this.keyboardSet);
  }

  init() {
    createKeyboardContainer();
    this.setLang();
    this.renderKeyboard(this.keyboardSet);
  }
}
