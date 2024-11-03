import type {
  Activity,
  ActivityCreated,
  Transaction as Transaction_Old,
  TransactionCreated,
  TransactionEdited
} from './types/Activity'
import type { Account, RegisterTransaction, Transaction } from './types/Transaction'
import type { Payer } from './types/Payer'
import type { Summary, SummaryFilter, SummaryResultItem } from './types/Summary'

const post = async <T>(url: string, data: any): Promise<T | null> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return (await response.json()) as T
  } catch (error) {
    console.error('Failed to save transaction:', error)
    return null
  }
}

const put = async (url: string, data: any): Promise<void> => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
  } catch (error) {
    console.error('Failed to save transaction:', error)
  }
}

const getObjetct = async <T>(url: string): Promise<T | null> => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return (await response.json()) as T
  } catch (error) {
    console.error('Failed to fetch:', error)
    return null
  }
}

const getList = async <T>(url: string): Promise<T[]> => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return (await response.json()) as T[]
  } catch (error) {
    console.error('Failed to fetch:', error)
    return []
  }
}

const deleteRequest = async (url: string): Promise<void> => {
  try {
    const response = await fetch(url, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
  } catch (error) {
    console.error('Failed to delete:', error)
  }
}

const BASE_API_URL = 'http://localhost:5264/api'

const Api = {
  activities: {
    loadById: async (id: number | string) => {
      return await getObjetct<Activity>(`${BASE_API_URL}/activities/${id}`)
    },
    create: async (activity: ActivityCreated) => {
      return await post<number>(`${BASE_API_URL}/activities`, activity)
    },
    listTransactions: async (activityId: number) => {
      return await getList<Transaction_Old>(`${BASE_API_URL}/activities/${activityId}/transactions`)
    },
    addTransaction: async (activityId: number, transaction: TransactionCreated) => {
      return await post<number>(
        `${BASE_API_URL}/activities/${activityId}/transactions`,
        transaction
      )
    },
    updateTransaction: async (activityId: number, transaction: TransactionEdited) => {
      return await put(
        `${BASE_API_URL}/activities/${activityId}/transactions/${transaction.id}`,
        transaction
      )
    },
    deleteTransaction: async (activityId: number, transactionId: number) => {
      return await deleteRequest(
        `${BASE_API_URL}/activities/${activityId}/transactions/${transactionId}`
      )
    }
  },
  payers: {
    list: async () => {
      return await getList<Payer>(`${BASE_API_URL}/payers`)
    },
    create: async (name: string) => {
      return await post<number>(`${BASE_API_URL}/payers`, { name })
    }
  },
  summaries: {
    load: async () => {
      return await getList<Summary>(`${BASE_API_URL}/summaries`)
    },
    filterResults: async ({ year, month, categoryId, payerId }: SummaryFilter) => {
      const url = new URL(`${BASE_API_URL}/summaries/${year}/${month}`)
      if (categoryId) {
        url.searchParams.append('categoryId', categoryId.toString())
      }
      if (payerId) {
        url.searchParams.append('payerId', payerId.toString())
      }
      return await getList<SummaryResultItem>(url.toString())
    }
  },
  transactions: {
    list: async (page: number, pageSize: number) => {
      return await getList<Transaction>(
        `${BASE_API_URL}/transactions?page=${page}&pageSize=${pageSize}`
      )
    },
    create: async (transaction: RegisterTransaction) => {
      return await post<void>(`${BASE_API_URL}/transactions`, transaction)
    },
    loadById: async (id: number | string) => {
      return await getObjetct<Transaction>(`${BASE_API_URL}/transactions/${id}`)
    },
    update: async (id: number, transaction: RegisterTransaction) => {
      return await put(`${BASE_API_URL}/transactions/${id}`, transaction)
    }
  },
  accounts: {
    list: async () => {
      return await getList<Account>(`${BASE_API_URL}/accounts`)
    }
  }
}

export default Api
