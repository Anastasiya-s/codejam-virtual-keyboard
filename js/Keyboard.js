import { rusKeyboard, engKeyboard } from './keyboards.js';

function createKeyboardContainer() {
  const container = document.querySelector('.container');
  const keyboardContainer = document.createElement('div');
  keyboardContainer.classList.add('keyboard_container');
  container.append(keyboardContainer);
}
export default class Keyboard {
  constructor() {
    this.lang = 'en';
    this.isCapsOn = false;
    this.keyboardSet = [];
  }


  renderKeyboard() {
    const keyboardContainer = document.querySelector('.keyboard_container');
    return this.keyboardSet.map((row) => {
      const el = document.createElement('div');
      Object.entries(row).map((cell) => {
        const elem = document.createElement('span');
        elem.insertAdjacentHTML('afterbegin', `${cell[1]}`);
        elem.classList.add('cell');
        elem.classList.add(`${cell[0]}`);
        elem.dataset.keyCode = `${cell[0]}`;
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

  handleSpecialKeys(keyCode) {
    const textArea = document.querySelector('.textarea');
    switch (keyCode) {
      case 'ContextMenu':
        this.changeLanguage();
        return;
      case 'Space':
        textArea.insertAdjacentHTML('beforeend', ' ');
        return;
      case 'Enter':
        textArea.insertAdjacentText('beforeend', '\n');
        break;
      default:
        break;
    }
  }

  init() {
    createKeyboardContainer();
    this.setLang();
    this.renderKeyboard(this.keyboardSet);
  }
}
