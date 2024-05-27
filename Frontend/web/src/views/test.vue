<template>
    <v-container>
      <v-card>
        <v-card-title>Graphique des Soldes</v-card-title>
        <v-card-text>
          <apexchart
            type="line"
            height="350"
            :options="chartOptions"
            :series="series"
          />
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const series = ref([
    {
      name: "Solde",
      data: [100, 200, 150, 300, 250, 400, 350]
    }
  ]);
  
  const chartOptions = ref({
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false
      }
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    yaxis: {
      title: {
        text: 'Solde (€)'
      }
    },
    title: {
      text: 'Evolution des Soldes',
      align: 'left'
    }
  });
  </script>
  
  <style scoped>
  .v-card {
   height: 400px;
  }
  </style>
  