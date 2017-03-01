<template>
    <div class="calendar-body">
        <div class="one">
            <calendar-component @select-change="getDatetime"></calendar-component>
        </div>

        <div class="two">
            <calendar-component :date="initDate" @select-change="getDatetime"></calendar-component>
        </div>

        <div class="three">
            <calendar-component :type="type[0]" :weeks="weeks" @select-change="getDatetime"></calendar-component>
        </div>

        <div class="four">
            <calendar-component :type="type[1]" @select-change="getDatetime"></calendar-component>
        </div>

    </div>
</template>
<style lang="scss">
    .calendar-body {
        >div {
            width: 240px;
            position: absolute;
        }

        .one {
            top: 20px;
            left: 20px;
        }

        .two {
            top: 20px;
            left: 400px;
        }

        .three {
            top: 400px;
            left: 20px;
        }

        .four {
            top: 400px;
            left: 400px;
        }
    }
</style>

<script src="./app.js"></script>
