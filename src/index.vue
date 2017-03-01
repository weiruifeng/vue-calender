<template>
    <div class="calendar-box" @click.stop="">
        <div class="showDate" @click="showClick">{{datetime}}</div>

        <div class="calendar" v-show="showCalender">
            <div class="calendar-tools flex-center" v-if="showDate">
                <span class="calendar-prev calendar-button" @click="prevClick"></span>
                <div class="text center">
                    {{selectDate}}
                </div>
                <span class="calendar-next calendar-button"  @click="nextClick"></span>
            </div>

            <table v-if="showDate">
                <thead>
                <tr>
                    <td v-for="week in weeks" class="week">{{week}}</td>
                </tr>
                </thead>
                <tr v-for="(colDays,col) in days">
                    <td v-for="(child,row) in colDays"
                        :class="{'selected': child.selected, 'disabled':child.disabled}"
                        @click="selectEvent(child)">
                        <span>{{child.day}}</span>
                    </td>
                </tr>
            </table>

            <div class="day-time flex-center" v-if="showTime">
                <input type=number v-model="hourValue"/>
                <div class="day-time-text">时</div>
                <input type=number v-model="minuteValue"/>
                <div class="day-time-text">分</div>
                <input type=number v-model="secondValue"/>
                <div class="day-time-text">秒</div>

            </div>

            <div class="button-box flex-center" v-if="showTime">
                <span class="major-button" @click="ensureClick">确定</span>
                <span class="cancel-button" @click="cancelClick">取消</span>
            </div>
        </div>
    </div>

</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index"></script>
