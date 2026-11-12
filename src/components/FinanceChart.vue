<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
} from 'chart.js';
import { useFinanceStore } from '@/stores/financeStore';

// Registo dos módulos necessários da biblioteca Chart.js para renderização do gráfico de linhas
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler);

const store = useFinanceStore();

// Computed: Transforma o histórico de transações da store no formato esperado pelo Chart.js
const chartData = computed(() => ({
  labels: store.transactions.map(t => t.date),
  datasets: [
    {
      label: 'Valor (R$)',
      data: store.transactions.map(t => t.amount),
      borderColor: '#065f46', // Verde Musgo (Emerald 800)
      backgroundColor: 'rgba(6, 95, 70, 0.08)', // Preenchimento suave sob a linha
      fill: true,
      tension: 0.35, // Curvatura suave da linha
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBackgroundColor: '#065f46',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2
    }
  ]
}));

// Configurações visuais e de responsividade do gráfico
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false } // Oculta a legenda padrão para manter o layout limpo
  },
  scales: {
    y: {
      grid: { color: 'rgba(231, 229, 228, 0.6)' },
      ticks: { color: '#78716c', font: { size: 11 } }
    },
    x: {
      grid: { display: false },
      ticks: { color: '#78716c', font: { size: 11 } }
    }
  }
};
</script>

<template>
  <div class="bg-white p-6 rounded-3xl shadow-sm border border-stone-200/70">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-base font-bold text-stone-900">Fluxo de Caixa</h3>
      <span class="text-xs font-semibold text-stone-400 uppercase tracking-wider">Analytics</span>
    </div>
    <!-- Contêiner com altura fixa para evitar estiramento do gráfico -->
    <div class="h-72 w-full">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>