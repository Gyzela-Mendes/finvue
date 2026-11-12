<script setup lang="ts">
import FinanceChart from '@/components/FinanceChart.vue';
import CategoryChart from '@/components/CategoryChart.vue';
import TransactionForm from '@/components/TransactionForm.vue';
import TransactionList from '@/components/TransactionList.vue';
import SummaryCards from '@/components/SummaryCards.vue';
import { useFinanceStore } from '@/stores/financeStore';

const store = useFinanceStore();
</script>

<template>
  <div class="space-y-6">
    <!-- Cabeçalho da View Principal -->
    <header class="flex flex-col md:flex-row justify-between items-start md:items-center bg-stone-50/80 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-stone-200/60 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-stone-900 tracking-tight">FinVue Dashboard</h1>
        <p class="text-xs font-medium text-stone-500">Gestão financeira, analytics e histórico em tempo real</p>
      </div>
      <div class="flex items-center space-x-2 bg-white px-3.5 py-1.5 rounded-full border border-stone-200 shadow-sm">
        <span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
        <span class="text-xs font-semibold text-stone-600">Sistema Ativo</span>
      </div>
    </header>

    <!-- Cartões de Resumo (KPIs) -->
    <SummaryCards />

    <!-- Grelha Principal de Analytics e Operações -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div class="lg:col-span-1">
        <TransactionForm />
      </div>

      <div class="lg:col-span-2 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FinanceChart />
          <CategoryChart />
        </div>
        <TransactionList />
      </div>
    </div>
  </div>
</template>