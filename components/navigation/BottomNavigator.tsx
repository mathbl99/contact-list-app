import { useContactDatabase } from '@/app/database/useContactDatabase'
import { router } from 'expo-router'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import { useContact } from '../ContactProvider'
import RedirectButton from '../RedirectButton'

export default function BottomNavigator() {
	const { remove } = useContactDatabase()
	const { contactData } = useContact()

	const handleDeleteButton = (id: number | undefined) => {
		if (id) {
			remove(id)
		}

		router.back()
	}

	return (
		<View style={styles.container}>
			<RedirectButton
				style={styles.button}
				href={'/editContact'} //change this
			>
				<Text style={styles.text}>Edit</Text>
			</RedirectButton>

			<Pressable
				style={styles.button}
				onPress={() => handleDeleteButton(contactData?.id)}
			>
				<Text style={styles.text}>Delete</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		width: '100%',
		height: 50,
		backgroundColor: '#000',
		position: 'absolute',
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},

	button: {
		width: Dimensions.get('window').width / 2,
		backgroundColor: '#000',
		paddingVertical: 16,
		borderRadius: 6,
		alignItems: 'center',
		justifyContent: 'center',
	},

	text: {
		color: '#fff',
	},
})
