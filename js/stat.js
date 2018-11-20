'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var CLOUD_X = 150;
var BAR_CHART_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var TEXT_HEIGHT = 30;
var GAP = 10;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getCloudY = function (time, maxTime) {
  var cloudY = TEXT_HEIGHT * 2 + GAP * 4 + (BAR_CHART_HEIGHT - (BAR_CHART_HEIGHT * time / maxTime));
  return cloudY;
};

var getRandomColor = function () {
  var randomColor = 'rgba(0, 0, 255, ' + Math.random().toFixed(2) + ')';
  return randomColor;
};

var getBarColor = function (name) {
  var barColor;
  if (name === 'Вы') {
    barColor = 'rgba(255, 0, 0, 1)';
  } else {
    barColor = getRandomColor();
  }
  return barColor;
};


window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#ffffff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X, TEXT_HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_X, TEXT_HEIGHT + GAP * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var cloudY = getCloudY(times[i], maxTime);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + (BAR_WIDTH + BAR_GAP) * i, cloudY - GAP);
    ctx.fillText(names[i], CLOUD_X + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT);
    ctx.fillStyle = getBarColor(names[i]);
    ctx.fillRect(CLOUD_X + (BAR_WIDTH + BAR_GAP) * i, cloudY, BAR_WIDTH, BAR_CHART_HEIGHT * times[i] / maxTime);
  }

};
