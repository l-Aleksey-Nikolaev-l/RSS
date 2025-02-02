class Button {

  constructor() {}

  createButton(buttonName, buttonText = '') {
    const button = document.createElement('button');
    button.classList.add('header__button', `${buttonName}_button`);
    button.setAttribute('data-id', buttonName);
    button.setAttribute('aria-label', buttonName);
    button.textContent = buttonText;
    return button;
  }
}

export {
  Button
};
