// import { rusKeyboard, engKeyboard } from './keyboards.js';
import Keyboard from './Keyboard.js';

const keyboard = new Keyboard();

const body = document.querySelector('body');
const textArea = document.createElement('textarea');
const specialKeysCode = [
  'Backspace',
  'Tab',
  'CapsLock',
  'ShiftRight',
  'ShiftLeft',
  'ControlLeft',
  'ControlRight',
  'AltLeft',
  'AltRight',
  'Space',
  'Enter',
  'Menu',
  'Backspace',
  'ContextMenu'];

const createContainer = () => {
  const container = document.createElement('div');
  container.classList.add('container');
  body.prepend(container);
};

const createTextArea = () => {
  const textAreaContainer = document.querySelector('.container');
  textArea.placeholder = 'Write something here...';
  textArea.classList.add('textarea');
  textAreaContainer.append(textArea);
};

const createKeyboardContainer = () => {
  const container = document.querySelector('.container');
  const keyboardContainer = document.createElement('div');
  keyboardContainer.classList.add('keyboard_container');
  container.append(keyboardContainer);
};

const handleSpecialKeys = (keyCode) => {
  switch (keyCode) {
    case 'ContextMenu':
      keyboard.changeLanguage();
      break;
    case 'Space':
      textArea.insertAdjacentHTML('beforeend', ' ');
      break;
    case 'Enter':
      textArea.insertAdjacentText('beforeend', '\n');
      break;
    default:
      break;
  }
};

const keyboardInit = () => {
  createContainer();
  createTextArea();
  createKeyboardContainer();
  keyboard.setLang();
  keyboard.renderKeyboard(keyboard.keyboardSet);
};

document.addEventListener('DOMContentLoaded', () => {
  const keyboardContainer = document.querySelector('.keyboard_container');
  keyboardContainer.addEventListener('click', (e) => {
    const { keyCode } = e.target.dataset;
    if (!keyCode) {
      return;
    }
    if (specialKeysCode.includes(keyCode)) {
      handleSpecialKeys(keyCode);
    } else {
      const a = keyboard.keyboardSet.filter((item) => Object.prototype.hasOwnProperty.call(item, `${keyCode}`));
      const b = a[0][keyCode];
      textArea.insertAdjacentHTML('beforeend', `${b || ''}`);
    }
  });
  document.addEventListener('keydown', (e) => {
    const keyCode = e.code;
    const button = document.querySelector(`.${keyCode}`);
    button.classList.add('blur');
    if (specialKeysCode.includes(keyCode)) {
      handleSpecialKeys(keyCode);
    } else {
      const a = keyboard.keyboardSet.filter((item) => Object.prototype.hasOwnProperty.call(item, `${keyCode}`));
      const b = a[0][keyCode];
      textArea.insertAdjacentHTML('beforeend', `${b || ''}`);
    }
  });
  document.addEventListener('keyup', (e) => {
    const keyCode = e.code;
    const button = document.querySelector(`.${keyCode}`);
    button.classList.remove('blur');
  });
});

keyboardInit();
