import Keyboard from './Keyboard.js';
import { appInit, handleSpecialKeys, addSymbol } from './helpers.js';

const keyboard = new Keyboard();

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
  appInit(keyboard);
  const textArea = document.querySelector('.textarea');
  const keyboardContainer = document.querySelector('.keyboard_container');
  
  keyboardContainer.addEventListener('click', (e) => {
    const { keyCode } = e.target.dataset;
    if (!keyCode) {
      return;
    }
    if (keyCode === 'CapsLock') {
      const button = document.querySelector(`.${keyCode}`);
      button.classList.toggle('caps')
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
      if (keyCode === 'CapsLock') {
        button.classList.toggle('caps')
      }
      button.classList.add('blur');
    }
  });

  document.addEventListener('keyup', (e) => {
    const keyCode = e.code;
    const button = document.querySelector(`.${keyCode}`);
    if (button) {
      if (specialKeysCode.includes(keyCode)) {
        handleSpecialKeys(keyCode, keyboard, textArea);
      } else {
        addSymbol(keyCode, keyboard, textArea);
      }
      button.classList.remove('blur');
    }
  });
});
