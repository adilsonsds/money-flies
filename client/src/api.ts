import type {
  Activity,
  ActivityCreated,
  Transaction,
  TransactionCreated,
  TransactionEdited
} from './types/Activity'
import type { Payer } from './types/Payer'

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

const Api = {
  activities: {
    loadById: async (id: number | string) => {
      return await getObjetct<Activity>(`http://localhost:5264/activities/${id}`)
    },
    create: async (activity: ActivityCreated) => {
      return await post<number>('http://localhost:5264/activities', activity)
    },
    listTransactions: async (activityId: number) => {
      return await getList<Transaction>(
        `http://localhost:5264/activities/${activityId}/transactions`
      )
    },
    addTransaction: async (activityId: number, transaction: TransactionCreated) => {
      return await post<number>(
        `http://localhost:5264/activities/${activityId}/transactions`,
        transaction
      )
    },
    updateTransaction: async (activityId: number, transaction: TransactionEdited) => {
      return await put(
        `http://localhost:5264/activities/${activityId}/transactions/${transaction.id}`,
        transaction
      )
    },
    deleteTransaction: async (activityId: number, transactionId: number) => {
      return await deleteRequest(
        `http://localhost:5264/activities/${activityId}/transactions/${transactionId}`
      )
    }
  },
  payers: {
    list: async () => {
      return await getList<Payer>('http://localhost:5264/payers')
    },
    create: async (name: string) => {
      return await post<number>('http://localhost:5264/payers', { name })
    }
  }
}

export default Api
