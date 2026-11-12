<script setup lang="ts">
import { useFinanceStore } from '@/stores/financeStore';

const store = useFinanceStore();

// Função auxiliar para formatação monetária padrão BRL (R$)
function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
</script>

<template>
  <!-- Grelha Responsiva de 3 Colunas para Métricas -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

    <!-- Cartão 1: Receitas Totais -->
    <div class="bg-white p-5 rounded-3xl shadow-sm border border-stone-200/70 flex items-center justify-between">
      <div>
        <span class="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">Entradas</span>
        <span class="text-xl font-black text-emerald-800">
          {{ formatCurrency(store.totalIncome) }}
        </span>
      </div>
      <div class="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm">
        ↓
      </div>
    </div>

    <!-- Cartão 2: Despesas Totais -->
    <div class="bg-white p-5 rounded-3xl shadow-sm border border-stone-200/70 flex items-center justify-between">
      <div>
        <span class="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">Saídas</span>
        <span class="text-xl font-black text-rose-700">
          {{ formatCurrency(store.totalExpenses) }}
        </span>
      </div>
      <div class="w-10 h-10 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
        ↑
      </div>
    </div>

    <!-- Cartão 3: Saldo Total Líquido -->
    <div class="bg-white p-5 rounded-3xl shadow-sm border border-stone-200/70 flex items-center justify-between">
      <div>
        <span class="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">Saldo Atual</span>
        <span :class="store.totalBalance >= 0 ? 'text-emerald-800' : 'text-rose-700'" class="text-xl font-black">
          {{ formatCurrency(store.totalBalance) }}
        </span>
      </div>
      <div :class="store.totalBalance >= 0 ? 'bg-stone-100 text-stone-700' : 'bg-rose-100 text-rose-800'" class="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm">
        =
      </div>
    </div>

  </div>
</template>