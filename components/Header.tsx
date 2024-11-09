import { StatusBar, StyleSheet, Text, View } from 'react-native'
import RedirectButton from './RedirectButton'

export default function Header() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Contacts</Text>
			<RedirectButton
				href="/addContact"
				style={styles.addButton}
			>
				<Text style={styles.addButtonText}>Add</Text>
			</RedirectButton>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: (StatusBar.currentHeight || 0) + 25,
		paddingBottom: 25,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#000',
	},

	title: {
		fontSize: 20,
		color: '#fff',
	},

	addButton: {
		width: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20,
		backgroundColor: '#ffffff',
	},

	addButtonText: {
		fontSize: 14,
	},
})
