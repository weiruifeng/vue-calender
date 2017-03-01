/**
 * Created by ruifengwei on 2017/2/24.
 */

import { createData, stringNum, filterHour, filterMinute, filterSecond } from './calendar';

const monthLength = 12;

const type = {
    datetime: 'datetime',
    date: 'date',
    time: 'time'
};

export default {
    props: {
        type: {
            type: String,
            default: 'datetime'
        },

        weeks: {
            type: Array,
            default: function() {
                return ['日', '一', '二', '三', '四', '五', '六'];
            }
        },

        date: {
            year: Number,
            month: Number,
            day: Number,
            hour: Number,
            minute: Number,
            second: Number
        }
    },

    data() {
        return {
            showFlag: false,
            days: [],
            year: Number,
            month: Number,
            day: Number,
            hour: Number,
            minute: Number,
            second: Number,

            initDate: this.date || {},

            selected: {
                year: Number,
                month: Number,
                day: Number
            },

            showDatetime: {
                year: Number,
                month: Number,
                day: Number,
                hour: Number,
                minute: Number,
                second: Number
            },

            hourValue: Number,
            minuteValue: Number,
            secondValue: Number
        };
    },

    computed: {

        showCalender() {
            return this.showFlag;
        },

        selectDate() {
            const month = stringNum(this.month + 1);
            return `${this.year} 年 ${month} 月`;
        },

        showDate() {
            return ~this.type.indexOf('date');
        },
        showTime() {
            return ~this.type.indexOf('time');
        },

        datetime() {
            const month = stringNum(this.showDatetime.month + 1);
            const day = stringNum((this.showDatetime.day));
            const hour = stringNum((this.showDatetime.hour));
            const minute = stringNum((this.showDatetime.minute));
            const second = stringNum((this.showDatetime.second));
            if (this.type === type.date) {
                return `${this.showDatetime.year}-${month}-${day}`;
            } else if (this.type === type.time) {
                return `${hour}:${minute}:${second}`;
            }
            return `${this.showDatetime.year}-${month}-${day} ${hour}:${minute}:${second}`;
        }
    },

    watch: {
        hourValue(val, oldVal) {
            const self = this;
            self.hourValue = filterHour(val);
        },

        minuteValue(val, oldVal) {
            const self = this;
            self.minuteValue = filterMinute(val);
        },

        secondValue(val, oldVal) {
            const self = this;
            self.secondValue = filterSecond(val);
        }
    },

    created() {
        const self = this;

        if (!type[self.type]) {
            console.log('type选项只能是"date","time"和"datetime"');
            return;
        }
        const date = new Date();

        if (self.initDate.month) {
            self.initDate.month = self.initDate.month - 1;
        }

        self.showDatetime.year = self.selected.year = self.year = self.initDate.year || date.getFullYear();
        self.showDatetime.month = self.selected.month = self.month = self.initDate.month || date.getMonth();
        self.showDatetime.day = self.selected.day = self.day = self.initDate.day || date.getDate();

        self.hourValue = self.showDatetime.hour = self.hour = self.initDate.hour || date.getHours();
        self.minuteValue = self.showDatetime.minute = self.minute = self.initDate.minute || date.getMinutes();
        self.secondValue = self.showDatetime.second = self.second = self.initDate.second || date.getSeconds();

        self.days = createData(self.year, self.month, self.selected);
    },

    methods: {

        showClick() {
            this.showFlag = true;
        },

        prevClick() {
            this.year = this.month ? this.year : this.year - 1;
            this.month = (this.month + monthLength - 1) % monthLength;
            this.days = createData(this.year, this.month, this.selected);
        },

        nextClick() {
            this.month = (this.month + 1) % monthLength;
            this.year = this.month ? this.year : this.year + 1;
            this.days = createData(this.year, this.month, this.selected);
        },

        // 选中日期
        selectEvent(child) {
            const self = this;
            self.selected.year = self.year;
            self.selected.month = self.month;
            self.selected.day = child.day;

            self.days = createData(self.year, self.month, self.selected);

            if (self.type === type.date) {
                self.showDatetime.year = self.selected.year;
                self.showDatetime.month = self.selected.month;
                self.showDatetime.day = self.selected.day;

                self.showFlag = false;

                self.$emit('select-change', {
                    year: self.selected.year,
                    month: self.selected.month + 1,
                    day: self.selected.day
                });
            }
        },

        ensureClick() {
            const self = this;
            self.showDatetime.year = self.selected.year;
            self.showDatetime.month = self.selected.month;
            self.showDatetime.day = self.selected.day;

            self.showDatetime.hour = self.hourValue;
            self.showDatetime.minute = self.minuteValue;
            self.showDatetime.second = self.secondValue;

            this.showFlag = false;

            const selectOption = {
                hour: self.showDatetime.hour,
                minute: self.showDatetime.minute,
                second: self.showDatetime.second
            };

            if (self.type === type.datetime) {
                selectOption.year = self.selected.year;
                selectOption.month = self.selected.month + 1;
                selectOption.day = self.selected.day;
            }

            self.$emit('select-change', selectOption);
        },

        cancelClick() {
            this.showFlag = false;
        }
    }
};
