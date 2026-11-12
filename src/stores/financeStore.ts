import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

// Interface principal da estrutura de dados de uma Transação
export interface Transaction {
    id: string;
    description: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    date: string;
}

export const useFinanceStore = defineStore('finance', () => {
    // Estado: Recupera transações do LocalStorage ou define um estado inicial padrão
    const savedTransactions = localStorage.getItem('finvue_transactions');
    const transactions = ref<Transaction[]>(savedTransactions ? JSON.parse(savedTransactions) : [
        { id: '1', description: 'Consultoria Tech', amount: 3350, type: 'income', category: 'Trabalho', date: '2026-11-01' },
        { id: '2', description: 'Licença de Software', amount: 150, type: 'expense', category: 'Ferramentas', date: '2026-11-02' }
    ]);

    // Persistência: Observa a lista de transações e atualiza o LocalStorage a cada modificação
    watch(transactions, (newVal) => {
        localStorage.setItem('finvue_transactions', JSON.stringify(newVal));
    }, { deep: true });

    // Computed: Soma total de Entradas (Receitas)
    const totalIncome = computed(() => {
        return transactions.value
            .filter(t => t.type === 'income')
            .reduce((acc, t) => acc + t.amount, 0);
    });

    // Computed: Soma total de Saídas (Despesas)
    const totalExpenses = computed(() => {
        return transactions.value
            .filter(t => t.type === 'expense')
            .reduce((acc, t) => acc + t.amount, 0);
    });

    // Computed: Saldo Líquido Total (Receitas - Despesas)
    const totalBalance = computed(() => {
        return totalIncome.value - totalExpenses.value;
    });

    // Ação: Adiciona uma nova transação no topo da lista
    function addTransaction(transaction: Transaction) {
        transactions.value.unshift(transaction);
    }

    // Ação: Remove uma transação através do ID fornecido
    function removeTransaction(id: string) {
        transactions.value = transactions.value.filter(t => t.id !== id);
    }

    return {
        transactions,
        totalIncome,
        totalExpenses,
        totalBalance,
        addTransaction,
        removeTransaction
    };
});