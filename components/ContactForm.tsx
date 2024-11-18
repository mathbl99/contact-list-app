import { useContactDatabase } from '@/app/database/useContactDatabase'
import { phoneNumberMask } from '@/utils/utils'
import { router } from 'expo-router'
import { useState } from 'react'
import {
	Alert,
	Pressable,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import type { ContactProps } from './Contact'
import { useContact } from './ContactProvider'

type ContactFormProps = {
	data?: ContactProps | null
}

type InputProps = string | null

export default function ContactForm({ data = null }: ContactFormProps) {
	const contactDatabase = useContactDatabase()
	const { setContactData } = useContact()

	const [name, setName] = useState<InputProps | undefined>(data?.name)
	const [phone, setPhone] = useState<InputProps | undefined>(data?.phone)
	const [email, setEmail] = useState<InputProps | undefined>(data?.email)

	const handleOnChangeInput = (text: InputProps, indentifier: string) => {
		switch (indentifier) {
			case 'name':
				setName(text)
				break
			case 'phone': {
				const maskedPhone = phoneNumberMask(text)
				setPhone(maskedPhone)
				break
			}
			case 'email':
				setEmail(text)
		}
	}

	const handleSaveButton = async () => {
		if (name) {
			try {
				if (!data) {
					const response = await contactDatabase.create({
						name: name,
						phone: phone ?? null,
						email: email ?? null,
					})

					console.log(response)
				} else {
					await contactDatabase.update(data.id, {
						name: name,
						phone: phone ?? null,
						email: email ?? null,
					})

					const newData = await contactDatabase.searchById(data.id)

					setContactData(newData)
				}

				return router.back()
			} catch (error) {
				console.log(error)
			}
		}

		Alert.alert('Warning: ' + 'Name should not be empty.')
	}

	const handleCancelButton = () => {
		router.back()
	}

	return (
		<View style={styles.container}>
			<View>
				<TextInput
					style={styles.input}
					autoCapitalize="words"
					placeholder="Name"
					placeholderTextColor="#ccc"
					onChangeText={(text) => handleOnChangeInput(text, 'name')}
					defaultValue={data?.name || ''}
					autoFocus
				/>

				<TextInput
					style={styles.input}
					keyboardType="phone-pad"
					placeholder="Phone"
					placeholderTextColor="#ccc"
					maxLength={15}
					onChangeText={(text) => handleOnChangeInput(text, 'phone')}
					defaultValue={data?.phone || ''}
					value={phone ?? ''}
				/>

				<TextInput
					style={styles.input}
					placeholder="Email"
					placeholderTextColor="#ccc"
					onChangeText={(text) => handleOnChangeInput(text, 'email')}
					defaultValue={data?.email || ''}
				/>
			</View>

			<View style={styles.buttonWrapper}>
				<Pressable
					style={styles.button}
					onPress={handleCancelButton}
				>
					<Text style={styles.buttonText}>Cancel</Text>
				</Pressable>

				<Pressable
					style={styles.button}
					onPress={handleSaveButton}
				>
					<Text style={styles.buttonText}>Save</Text>
				</Pressable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: (StatusBar.currentHeight || 0) + 50,
		justifyContent: 'space-between',
		backgroundColor: '#000000',
	},

	input: {
		height: 52,
		margin: 12,
		marginBottom: 6,
		padding: 10,
		paddingStart: 25,
		borderRadius: 25,
		fontSize: 18,
		textDecorationLine: 'none',
		backgroundColor: '#1b1b1b',
		color: '#fff',
		includeFontPadding: false,
		textAlignVertical: 'center',
	},

	buttonWrapper: {
		width: '100%',
		justifyContent: 'space-around',
		flexDirection: 'row',
		backgroundColor: '#000',
	},

	button: {
		width: '48%',
		margin: 6,
		padding: 10,
		paddingLeft: 50,
		paddingRight: 50,
		backgroundColor: '#000',
		borderRadius: 28,
		alignItems: 'center',
	},

	buttonText: {
		fontSize: 18,
		color: '#eeeeee',
	},
})
