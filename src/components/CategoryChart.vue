<script setup lang="ts">
import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useFinanceStore } from '@/stores/financeStore';

// Registo dos componentes necessários do Chart.js para gráficos em anel/pizza
ChartJS.register(ArcElement, Tooltip, Legend);

const store = useFinanceStore();

// Computed: Agrupa e calcula o total de despesas por cada categoria
const categoryTotals = computed(() => {
  const totals: Record<string, number> = {};

  store.transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    });

  return totals;
});

// Dados formatados para o Chart.js
const chartData = computed(() => {
  const labels = Object.keys(categoryTotals.value);
  const data = Object.values(categoryTotals.value);

  return {
    labels: labels.length ? labels : ['Sem Despesas'],
    datasets: [
      {
        data: data.length ? data : [1],
        // Paleta elegante de verdes musgo e tons neutros
        backgroundColor: [
          '#065f46', // Emerald 800 (Verde Musgo principal)
          '#047857', // Emerald 700
          '#10b981', // Emerald 500
          '#78716c', // Stone 500
          '#a8a29e', // Stone 400
          '#d6d3d1'  // Stone 300
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: '#57534e',
        font: { size: 11, weight: 'bold' as const },
        usePointStyle: true,
        boxWidth: 8
      }
    }
  }
};
</script>

<template>
  <div class="bg-white p-6 rounded-3xl shadow-sm border border-stone-200/70">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-base font-bold text-stone-900">Despesas por Categoria</h3>
      <span class="text-xs font-semibold text-stone-400 uppercase tracking-wider">Distribuição</span>
    </div>

    <!-- Renderização do Gráfico em Anel -->
    <div class="h-64 w-full flex items-center justify-center">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>