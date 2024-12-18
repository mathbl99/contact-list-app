import { Ionicons } from '@expo/vector-icons'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import RedirectButton from './RedirectButton'

export default function Header() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Contatos</Text>
			<RedirectButton
				href="/addContact"
				style={styles.addButton}
			>
				<Ionicons
					name="add"
					size={28}
					color={'white'}
				/>
			</RedirectButton>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: StatusBar.currentHeight || 0,
		paddingBottom: 25,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#000',
	},

	title: {
		fontSize: 24,
		color: '#fff',
		includeFontPadding: false,
		textAlignVertical: 'center',
	},

	addButton: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20,
		backgroundColor: '#000',
	},

	addButtonText: {
		fontSize: 14,
	},
})
