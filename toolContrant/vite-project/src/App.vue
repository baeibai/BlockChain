<script setup>
import useWeb3 from "@/hooks/useWeb3.js";

// 從 useWeb3 中獲取 web3 實例與合約等信息
const { web3, socialContract } = useWeb3();

const queryBalance = async () => {
  const num = await socialContract.methods.getBalance().call();
  console.log(num);
}
</script>

<template>
  <button @click="queryBalance()">Query Balance></button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
