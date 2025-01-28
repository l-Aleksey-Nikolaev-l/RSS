class Button {

  constructor() {}

  createButton(buttonName, buttonText = '') {
    const button = document.createElement('button');
    button.classList.add('header__button', `${buttonName}_button`);
    const buttonSpan = document.createElement('span');
    buttonSpan.classList.add(`${buttonName}__button_text`);
    buttonSpan.textContent = buttonText;
    button.append(buttonSpan);
    return button;
  }
}

export {
  Button
};
