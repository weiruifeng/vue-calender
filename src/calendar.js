/**
 * Created by ruifengwei on 2017/2/24.
 */
'use strict';

const TABEL_ROW = 7;
const LAST_WEEK = 6;

/*
* @param {Number=} year
* @param {Number=} month 为js时间,比显示时间小1
* @returns {Object}
*/
function getDay(year, month) {
    return {
        // 当月第一天为周几
        firstDayOfMonth: new Date(year, month, 1).getDay(),
        // 当月最后一天为几号
        lastDateOfMonth: new Date(year, month + 1, 0).getDate(),
        // 当月最后一天为周几
        lastDayOfMonth: new Date(year, month + 1, 0).getDay(),
        // 前一个月最后一天为几号
        lastDateOfLastMonth: new Date(year, month, 0).getDate()
    };
}

/*
 * 创建显示的日历数组
 * @param {Number=} year
 * @param {Number=} month 为js时间,比显示时间小1
 * @param {Object=} selected
 * @param {Number=} selected.year
 * @param {Number=} selected.month
 * @returns {Array}
 */
function createData(year, month, selected) {
    const { firstDayOfMonth, lastDateOfMonth, lastDayOfMonth, lastDateOfLastMonth } = getDay(year, month);
    const dayArr = [];
    const doubleArr = [];

    const prevMonth = {
        year: new Date(year, month, 0).getFullYear(),
        month: new Date(year, month, 0).getMonth()
    };

    const nextMonth = {
        year: new Date(year, month + 1, 1).getFullYear(),
        month: new Date(year, month + 1, 1).getMonth()
    };

    // 将当前月份的数据写入
    for (let i = 0; i < lastDateOfMonth; i++) {
        const dayObj = {
            day: i + 1,
            disabled: false,
            selected: false
        };

        if (selected.year === year && selected.month === month && selected.day === dayObj.day) {
            dayObj.selected = true;
        }
        dayArr.push(dayObj);
    }

    // 往前插入
    for (let i = 0; i < firstDayOfMonth; i++) {
        const dayObj = {
            day: lastDateOfLastMonth - i,
            disabled: true,
            selected: false
        };

        if (selected.year === prevMonth.year && selected.month === prevMonth.month && selected.day === dayObj.day) {
            dayObj.selected = true;
        }
        dayArr.unshift(dayObj);
    }

    // 往后插入
    for (let i = 0; i < LAST_WEEK - lastDayOfMonth; i++) {
        const dayObj = {
            day: i + 1,
            disabled: true,
            selected: false
        };

        if (selected.year === nextMonth.year && selected.month === nextMonth.month && selected.day === dayObj.day) {
            dayObj.selected = true;
        }
        dayArr.push(dayObj);
    }

    // 如果没有第六行，补全第六行
    if (dayArr.length < LAST_WEEK * TABEL_ROW) {
        const firstDay = dayArr[dayArr.length - 1].day + 1;
        for (let i = 0; i < TABEL_ROW; i++) {
            const dayObj = {
                day: firstDay + i,
                disabled: true,
                selected: false
            };

            if (selected.year === nextMonth.year && selected.month === nextMonth.month && selected.day === dayObj.day) {
                dayObj.selected = true;
            }
            dayArr.push(dayObj);
        }
    }

    for (let i = 0; i < dayArr.length / TABEL_ROW; i++) {
        doubleArr.push([]);
    }

    // 将一维改为二维数组
    for (let i = 0, len = dayArr.length; i < len; i++) {
        const index = Math.floor(i / TABEL_ROW);
        doubleArr[index].push(dayArr[i]);
    }
    return doubleArr;
}

/*
 * 将月数和天数小于10的前面加0
 * @param {Number=} value
 * @returns {String}
 */
function stringNum(value) {
    return value < 10 ? `0${value}` : value;
}

function filterHour(value) {
    return value < 24 ? Number(value) : 23;
}

function filterMinute(value) {
    return value < 60 ? Number(value) : 59;
}

function filterSecond(value) {
    return value < 60 ? Number(value) : 59;
}

export { createData, stringNum, filterHour, filterMinute, filterSecond };
