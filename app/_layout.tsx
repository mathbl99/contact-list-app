import { ContactProvider } from '@/components/ContactProvider'
import Header from '@/components/Header'
import { Stack } from 'expo-router'
import { SQLiteProvider } from 'expo-sqlite'
import { initializeDatabase } from './database/initializeDatabase'

export default function RootLayout() {
	return (
		<SQLiteProvider
			databaseName="sqlite_contacts.db"
			onInit={initializeDatabase}
		>
			<ContactProvider>
				<Stack
					screenOptions={{
						headerStyle: {
							backgroundColor: '#000',
						},
						headerTintColor: '#fff',
					}}
				>
					<Stack.Screen
						options={{ header: Header }}
						name="index"
					/>
					<Stack.Screen
						options={{ headerShown: false }}
						name="addContact"
					/>
					<Stack.Screen
						options={{ headerShown: true, title: '' }}
						name="contactDetail"
					/>
				</Stack>
			</ContactProvider>
		</SQLiteProvider>
	)
}
