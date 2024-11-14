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

	async function remove(id: ContactDatabase['id']) {
		try {
			await database.execAsync(`DELETE FROM contacts WHERE id = ${id}`)
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	async function update(
		id: ContactDatabase['id'],
		{ name, phone, email }: Omit<ContactDatabase, 'id'>,
	) {
		const statement = await database.prepareAsync(
			'UPDATE contacts SET name = $name, phone = $phone, email = $email WHERE id = $id',
		)

		try {
			await statement.executeAsync({
				$id: id,
				$name: name,
				$phone: phone,
				$email: email,
			})
		} catch (error) {
			console.log(error)
			throw error
		} finally {
			await statement.finalizeAsync()
		}
	}

	async function searchById(id: ContactDatabase['id']) {
		try {
			const query = `SELECT * FROM contacts WHERE id = ${id}`

			const response = await database.getFirstAsync<ContactDatabase>(query)

			return response
		} catch (error) {
			console.log(error)
			throw error
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
		remove,
		update,
		searchById,
		listAll,
	}
}
