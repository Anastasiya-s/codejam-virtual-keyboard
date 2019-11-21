import Keyboard from './Keyboard.js';
import { handleSpecialKeys, addSymbol } from './helpers.js';

const keyboard = new Keyboard();

const textArea = document.createElement('textarea');
const specialKeysCode = [
  'Backquote',
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
  'ContextMenu',
];

document.addEventListener('DOMContentLoaded', () => {
  const createContainer = () => {
    const body = document.querySelector('body');
    const container = document.createElement('div');
    container.classList.add('container');
    body.prepend(container);
  };
  
  const createTextArea = () => {
    const textAreaContainer = document.querySelector('.container');
    textArea.placeholder = 'Write something here... \nChange language by pressing Menu button';
    textArea.classList.add('textarea');
    textAreaContainer.append(textArea);
  };
  
  const appInit = () => {
    createContainer();
    createTextArea();
    keyboard.init();
  };  
  
  appInit();

  const keyboardContainer = document.querySelector('.keyboard_container');
  
  keyboardContainer.addEventListener('click', (e) => {
    const { keyCode } = e.target.dataset;
    if (!keyCode) {
      return;
    }
    if (specialKeysCode.includes(keyCode)) {
      handleSpecialKeys(keyCode, keyboard, textArea);
    } else {
      addSymbol(keyCode, keyboard, textArea)
    }
  });

  document.addEventListener('keydown', (e) => {
    const keyCode = e.code;
    const button = document.querySelector(`.${keyCode}`);
    if (button) {
      button.classList.add('blur');
      if (specialKeysCode.includes(keyCode)) {
        handleSpecialKeys(keyCode, keyboard, textArea);
      } else {
        addSymbol(keyCode, keyboard, textArea);
      }
    }
  });

  document.addEventListener('keyup', (e) => {
    const keyCode = e.code;
    const button = document.querySelector(`.${keyCode}`);
    if (button) {
      button.classList.remove('blur');
    }
  });
});
