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
  const pressedKeys = [];
  
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
      pressedKeys.push(keyCode);
      button.classList.add('blur');
      if (pressedKeys.includes('ShiftLeft' || 'ShiftRight') && pressedKeys.includes('ControlLeft' || 'ControlRight')) {
        keyboard.changeLanguage();
      }
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
    pressedKeys.pop(keyCode);
    if (button) {
      button.classList.remove('blur');
    }
  });
});
