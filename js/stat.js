'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 140;
const CLOUD_Y = 10;
const GAP = 10;
const BAR_GAP = 50;
const FONT_GAP = 10;
const TEXT_HEIGHT = 16;
const BAR_WIDTH = 50;
const TITLE_HEIGHT = TEXT_HEIGHT + FONT_GAP;

let maxBarHeight = CLOUD_HEIGHT - GAP * 2 - TITLE_HEIGHT * 3;

let renderCloud = function(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);

    ctx.beginPath();
    ctx.moveTo(x, y);
};

let getRandomHEX = function() {
    return  "#" + Math.random().toString(16).slice(2, 8);
};

let renderStatItem = function(options) {
    let {ctx, userName, index, time, maxTime, color = '#000'} = options;

    ctx.fillStyle = color;
    ctx.font = '16px';
    ctx.fillText(userName, CLOUD_X + GAP + (BAR_WIDTH + BAR_GAP) * index, CLOUD_Y + CLOUD_HEIGHT - TEXT_HEIGHT - GAP);

    let barHeight = (maxBarHeight * time) / maxTime;
    let barTopGap = maxBarHeight - barHeight + TITLE_HEIGHT * 2;

    if (userName == 'Вы') {
        ctx.fillStyle = '#ee4830';
    } else {
        ctx.fillStyle = getRandomHEX();
    }

    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + BAR_GAP) * index, CLOUD_Y + GAP + barTopGap, BAR_WIDTH, barHeight);
};

window.renderStatistics = function (ctx, usersName, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP,'rgba(0, 0 , 0, .3)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y,'#fff');

    let maxTime = Math.max(...times);

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
    ctx.fillText('Список результатов', CLOUD_X + GAP, CLOUD_Y + GAP + TITLE_HEIGHT);

    if (usersName[0] != 'Вы') {
        let yourName = usersName.splice(usersName.indexOf('Вы'), 1);
        usersName.unshift(yourName);
    }

    usersName.forEach((userName, i) => {
        renderStatItem({
            ctx,
            userName,
            index: i,
            time: times[i],
            maxTime
        });
    });
};