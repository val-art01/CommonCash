<template>
   <div>
    <navbar />
   </div>
</template>

<script setup>

import { ref } from 'vue';
import navbar from './navbar.vue';







const drawer = ref(null);



const toggleDrawer = () => {
drawer.value = !drawer.value; // Inverse la valeur actuelle (true devient false, et vice versa)
};
</script>

<style>

.v-theme--light .bg-gray{
  background: linear-gradient(to left, black, rgb(99, 99, 236));
 
} 
</style>

