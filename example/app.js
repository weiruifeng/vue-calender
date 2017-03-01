/**
 * Created by ruifengwei on 2017/2/28.
 */

import calenderComponent from '../src/index.vue';

export default {
    data() {
        return {
            initDate: {
                year: 2020,
                month: 2,
                day: 23,
                hour: 12,
                minute: 22,
                second: 32
            },
            type: ['date', 'time'],

            weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

            datetime: {}
        };
    },

    mounted() {},

    components: {
        'calendar-component': calenderComponent
    },

    methods: {
        getDatetime(valueObj) {
            this.datetime = valueObj;
            console.log(this.datetime);
        }
    }
};
