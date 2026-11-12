<script setup lang="ts">
import { ref } from 'vue';
import { useFinanceStore } from '@/stores/financeStore';
import type { TransactionType } from '@/types/finance';

const store = useFinanceStore();

// Estados reativos para os campos do formulário
const description = ref('');
const amount = ref<number | ''>('');
const type = ref<TransactionType>('income');
const category = ref('Trabalho');

// Lista predefinida de categorias para organizar as transações
const categories = [
  'Trabalho',
  'Freelance',
  'Alimentação',
  'Moradia',
  'Lazer',
  'Investimentos',
  'Outros'
];

// Função de submissão do formulário
function handleSubmit() {
  // Validação básica para garantir que os campos obrigatórios estão preenchidos
  if (!description.value || !amount.value) return;

  // Adiciona a nova transação através da store do Pinia
  store.addTransaction({
    id: Date.now().toString(),
    description: description.value,
    amount: Number(amount.value),
    type: type.value,
    category: category.value,
    date: new Date().toISOString().split('T')[0]
  });

  // Limpa os campos do formulário após o registo bem-sucedido
  description.value = '';
  amount.value = '';
  category.value = 'Trabalho';
}
</script>

<template>
  <div class="bg-white p-6 rounded-3xl shadow-sm border border-stone-200/70">
    <h3 class="text-base font-bold text-stone-900 mb-4">Nova Transação</h3>

    <form @submit.prevent="handleSubmit" class="space-y-4">

      <!-- Campo de Descrição -->
      <div>
        <label class="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">Descrição</label>
        <input
          v-model="description"
          type="text"
          placeholder="Ex: Consultoria Tech..."
          class="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700 focus:bg-white transition"
          required
        />
      </div>

      <!-- Grelha para Valor e Tipo -->
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">Valor (R$)</label>
          <input
            v-model="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            class="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700 focus:bg-white transition"
            required
          />
        </div>

        <div>
          <label class="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">Tipo</label>
          <select
            v-model="type"
            class="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700 focus:bg-white transition"
          >
            <option value="income">Receita (+)</option>
            <option value="expense">Despesa (-)</option>
          </select>
        </div>
      </div>

      <!-- Seletor de Categoria -->
      <div>
        <label class="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">Categoria</label>
        <select
          v-model="category"
          class="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700 focus:bg-white transition"
        >
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <!-- Botão de Submissão -->
      <button
        type="submit"
        class="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-emerald-900/10 hover:shadow-lg transition-all duration-200 text-sm mt-2 active:scale-[0.98]"
      >
        Adicionar Transação
      </button>

    </form>
  </div>
</template>