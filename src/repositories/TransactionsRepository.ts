import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balanceIncome = this.transactions.filter(c => c.type === 'income');
    const balanceOutcome = this.transactions.filter(c => c.type === 'outcome');

    const income = balanceIncome.reduce((prev, next) => prev + next.value, 0);
    const outcome = balanceOutcome.reduce((prev, next) => prev + next.value, 0);

    const balanceTotal = {
      income,
      outcome,
      total: income - outcome,
    };

    return balanceTotal;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
