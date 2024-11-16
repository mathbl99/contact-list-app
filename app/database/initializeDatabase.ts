import type { SQLiteDatabase } from 'expo-sqlite'

export async function initializeDatabase(database: SQLiteDatabase) {
	await database.execAsync(
		`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT,
        email TEXT
      )  
    `,
	)
}
