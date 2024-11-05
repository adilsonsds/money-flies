import type {
  Account,
  RegisterTransaction,
  Transaction,
  TransactionsFilter
} from './types/Transaction'
import type { Summary } from './types/Summary'

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
  summaries: {
    load: async () => {
      return await getList<Summary>(`${BASE_API_URL}/summaries`)
    }
  },
  transactions: {
    list: async (page: number, pageSize: number, filter: TransactionsFilter) => {
      const url = new URL(`${BASE_API_URL}/transactions`)
      url.searchParams.set('page', page.toString())
      url.searchParams.set('pageSize', pageSize.toString())

      if (filter.year) {
        url.searchParams.set('year', filter.year.toString())
      }

      if (filter.month) {
        url.searchParams.set('month', filter.month.toString())
      }

      if (filter.categoryId) {
        url.searchParams.set('categoryId', filter.categoryId.toString())
      }

      return await getList<Transaction>(url.toString())
    },
    create: async (transaction: RegisterTransaction) => {
      return await post<void>(`${BASE_API_URL}/transactions`, transaction)
    },
    loadById: async (id: number | string) => {
      return await getObjetct<Transaction>(`${BASE_API_URL}/transactions/${id}`)
    },
    update: async (id: number, transaction: RegisterTransaction) => {
      return await put(`${BASE_API_URL}/transactions/${id}`, transaction)
    },
    delete: async (id: number) => {
      return await deleteRequest(`${BASE_API_URL}/transactions/${id}`)
    }
  },
  accounts: {
    list: async () => {
      return await getList<Account>(`${BASE_API_URL}/accounts`)
    }
  }
}

export default Api
