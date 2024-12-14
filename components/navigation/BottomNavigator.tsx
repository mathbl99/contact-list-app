import { useContactDatabase } from '@/app/database/useContactDatabase'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { router } from 'expo-router'
import { useState } from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import ConfirmationModal from '../ConfirmationModal'
import { useContact } from '../ContactProvider'
import RedirectButton from '../RedirectButton'

export default function BottomNavigator() {
	const { remove } = useContactDatabase()
	const { contactData } = useContact()

	const [showModal, setShowModal] = useState<boolean>(false)

	const handleDeleteContact = (id: number | undefined) => () => {
		if (id) {
			remove(id)
		}

		router.back()
	}

	const handleCancel = () => {
		setShowModal(false)
	}

	return (
		<View style={styles.container}>
			<RedirectButton
				style={styles.button}
				href={'/editContact'}
			>
				<MaterialIcons
					name="mode-edit-outline"
					size={22}
					color="white"
				/>
				<Text style={styles.text}>Editar</Text>
			</RedirectButton>

			<Pressable
				style={styles.button}
				onPress={() => setShowModal(true)}
			>
				<Ionicons
					name="trash-outline"
					size={22}
					color={'white'}
				/>
				<Text style={styles.text}>Excluir</Text>
			</Pressable>

			<ConfirmationModal
				animationType="fade"
				transparent={true}
				visible={showModal}
				onRequestClose={handleCancel}
				text="O contato será excluído permanentemente. Tem Certeza que deseja continuar?"
				onConfirm={handleDeleteContact(contactData?.id)}
				onCancel={handleCancel}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		width: '100%',
		height: 70,
		backgroundColor: '#000',
		position: 'absolute',
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},

	button: {
		width: Dimensions.get('window').width / 2,
		backgroundColor: '#000',
		paddingVertical: 8,
		borderRadius: 6,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 2,
	},

	text: {
		color: '#fff',
		fontSize: 12,
	},
})
