// Define os tipos permitidos para movimentações financeiras
export type TransactionType = 'income' | 'expense';

// Contrato de dados para uma transação individual
export interface Transaction {
    id: string;
    description: string;
    amount: number;
    type: TransactionType;
    category: string;
    date: string;
}