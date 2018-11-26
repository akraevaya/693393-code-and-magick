'use strict';

var WIZARDS_COUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarWizards = userDialog.querySelector('.setup-similar');
similarWizards.classList.remove('hidden');

var similarList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomElement = function (arr) {
  var randomIndex = Math.floor(Math.random() * (arr.length - 1));
  return arr[randomIndex];
};

var createRandomWizard = function () {
  var randomWizard = {
    name: getRandomElement(WIZARD_NAMES) + '\n' + getRandomElement(WIZARD_SURNAMES),
    coatColor: getRandomElement(COAT_COLORS),
    eyesColor: getRandomElement(EYES_COLORS)
  };
  return randomWizard;
};

var createWizardsArr = function () {
  var wizardsArr = [];
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    wizardsArr.push(createRandomWizard());
  }
  return wizardsArr;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderSimilarWizards = function () {
  var wizards = createWizardsArr();
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarList.appendChild(fragment);
};

renderSimilarWizards();
