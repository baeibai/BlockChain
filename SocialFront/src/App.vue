<template>
  <router-view />
</template>
<script setup>
import { useStore } from 'vuex';
const store = useStore();
store.dispatch('initializeStore');

</script>

<style lang="scss">
@import "./assets/scss/socialv.scss";
@import "./assets/scss/customizer.scss";
@import url("./plugins/Leaflet/leaflet.css");
@import url("./plugins/fullcalendar/core/main.css");
@import url("./plugins/fullcalendar/daygrid/main.css");
@import url("./plugins/fullcalendar/timegrid/main.css");
@import url("./plugins/fullcalendar/list/main.css");

.chain-info-highlight {
    color: #FFC300;  /* 亮橙色 */
    font-size: 32px;
    line-height: 1.5;
    vertical-align: middle;
    transition: transform 0.3s ease, color 0.3s ease;
    // animation: blink-animation 1s infinite;
    
}
// @keyframes blink-animation {
//     0% { color: #FF851B; }
//     50% { color: #FFC300; }
//     100% { color: #FF851B; }
// }
.chain-info-highlight:hover {
    transform: scale(1.2);  /* 放大 1.2 倍 */
    color: #FF851B;  /* 更亮的顏色 */
    // box-shadow: 0px 0px 15px rgba(255, 200, 0, 0.7);  /* 亮黃色光暈 */
}
</style>
