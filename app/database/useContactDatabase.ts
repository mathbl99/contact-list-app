import { useSQLiteContext } from 'expo-sqlite'

export type ContactDatabase = {
	id: number
	name: string
	phone: string | null
	email: string | null
}

export function useContactDatabase() {
	const database = useSQLiteContext()

	async function create(data: Omit<ContactDatabase, 'id'>) {
		const statement = await database.prepareAsync(
			'INSERT INTO contacts (name, phone, email) VALUES ($name, $phone, $email)',
		)

		try {
			const result = await statement.executeAsync({
				$name: data.name,
				$phone: data.phone,
				$email: data.email,
			})

			const insertedRowId = result.lastInsertRowId.toLocaleString()

			return { insertedRowId }
		} catch (error) {
			console.log(error)
			throw error
		} finally {
			await statement.finalizeAsync()
		}
	}

	async function listAll() {
		try {
			const query = 'SELECT * FROM contacts'

			const response = await database.getAllAsync<ContactDatabase>(query)

			return response
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	return {
		create,
		listAll,
	}
}
