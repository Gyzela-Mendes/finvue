<script setup lang="ts">
import { ref, computed } from 'vue';
import { useFinanceStore } from '@/stores/financeStore';

const store = useFinanceStore();

// Estado reativo para controlar o filtro selecionado ('all' | 'income' | 'expense')
const currentFilter = ref<'all' | 'income' | 'expense'>('all');

// Computed: Retorna a lista filtrada com base na categoria selecionada pelo utilizador
const filteredTransactions = computed(() => {
  if (currentFilter.value === 'income') {
    return store.transactions.filter(t => t.type === 'income');
  }
  if (currentFilter.value === 'expense') {
    return store.transactions.filter(t => t.type === 'expense');
  }
  return store.transactions; // 'all'
});

// Função para formatar valores monetários no padrão BRL (R$)
function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
</script>

<template>
  <div class="bg-white p-6 rounded-3xl shadow-sm border border-stone-200/70 space-y-4">

    <!-- Cabeçalho e Botões de Filtro -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <div>
        <h3 class="text-base font-bold text-stone-900">Histórico de Transações</h3>
        <span class="text-xs font-semibold text-stone-400 uppercase tracking-wider">
          {{ filteredTransactions.length }} registos encontrados
        </span>
      </div>

      <!-- Abas de Filtro Interativas -->
      <div class="flex bg-stone-100 p-1 rounded-xl border border-stone-200/60 text-xs font-semibold">
        <button
          @click="currentFilter = 'all'"
          :class="currentFilter === 'all' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'"
          class="px-3 py-1.5 rounded-lg transition-all"
        >
          Todas
        </button>
        <button
          @click="currentFilter = 'income'"
          :class="currentFilter === 'income' ? 'bg-white text-emerald-800 shadow-sm' : 'text-stone-500 hover:text-stone-800'"
          class="px-3 py-1.5 rounded-lg transition-all"
        >
          Receitas
        </button>
        <button
          @click="currentFilter = 'expense'"
          :class="currentFilter === 'expense' ? 'bg-white text-rose-700 shadow-sm' : 'text-stone-500 hover:text-stone-800'"
          class="px-3 py-1.5 rounded-lg transition-all"
        >
          Despesas
        </button>
      </div>
    </div>

    <!-- Estado Vazio: Exibido quando o filtro não retorna resultados -->
    <div v-if="filteredTransactions.length === 0" class="text-center py-8 text-stone-400 text-sm">
      Nenhuma transação encontrada para este filtro.
    </div>

    <!-- Lista de Transações com Scroll Personalizado -->
    <div v-else class="space-y-3 max-h-[300px] overflow-y-auto pr-1">
      <div
        v-for="transaction in filteredTransactions"
        :key="transaction.id"
        class="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50/60 border border-stone-100 hover:bg-stone-50 transition-all duration-200"
      >
        <!-- Detalhes do Item (Ícone, Descrição, Data e Categoria) -->
        <div class="flex items-center space-x-3">
          <div :class="transaction.type === 'income' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'" class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm">
            {{ transaction.type === 'income' ? '↓' : '↑' }}
          </div>
          <div>
            <h4 class="text-sm font-semibold text-stone-800">{{ transaction.description }}</h4>
            <span class="text-[11px] text-stone-400 font-medium">{{ transaction.date }} • {{ transaction.category }}</span>
          </div>
        </div>

        <!-- Valor Monetário e Ação de Exclusão -->
        <div class="flex items-center space-x-3">
          <span :class="transaction.type === 'income' ? 'text-emerald-800' : 'text-rose-700'" class="text-sm font-bold">
            {{ transaction.type === 'income' ? '+' : '-' }} {{ formatCurrency(transaction.amount) }}
          </span>
          <button
            @click="store.removeTransaction(transaction.id)"
            class="text-stone-300 hover:text-rose-600 transition p-1 text-xs font-bold"
            title="Eliminar transação"
          >
            ✕
          </button>
        </div>
      </div>
    </div>

  </div>
</template>