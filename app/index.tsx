import { Contact } from '@/components/Contact'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import {
	type ContactDatabase,
	useContactDatabase,
} from './database/useContactDatabase'

export default function Index() {
	const [contacts, setContacts] = useState<ContactDatabase[]>([])
	const contactDatabase = useContactDatabase()

	const listContacts = async () => {
		try {
			const response = await contactDatabase.listAll()

			setContacts(response)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		listContacts()
	})

	return (
		<View style={styles.container}>
			<View style={styles.roundEdge}>
				{(contacts.length && (
					<FlatList
						style={styles.listView}
						data={contacts}
						keyExtractor={(item) => String(item.id)}
						renderItem={({ item }) => <Contact data={item} />}
						contentContainerStyle={{ gap: 5 }}
					/>
				)) || (
					<View style={styles.textWrapper}>
						<Text style={styles.text}>No contacts</Text>
					</View>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
		alignItems: 'center',
	},

	roundEdge: {
		width: '100%',
		borderRadius: 28,
		backgroundColor: '#000',
		overflow: 'hidden',
	},

	listView: {
		width: '100%',
		padding: 1,
		backgroundColor: '#000',
	},

	textWrapper: {
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},

	text: {
		color: '#fff',
		fontSize: 20,
		opacity: 0.8,
		marginBottom: 150,
	},
})
