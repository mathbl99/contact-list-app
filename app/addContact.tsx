import { router } from 'expo-router'
import { useRef } from 'react'
import {
	Pressable,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import { useContactDatabase } from './database/useContactDatabase'

export default function AddContact() {
	const contactDatabase = useContactDatabase()

	const nameInputRef = useRef<string | null>(null)
	const phoneInputRef = useRef<string | null>(null)
	const emailInputRef = useRef<string | null>(null)

	const handleOnChangeInput = (
		text: string | null,
		input: React.MutableRefObject<string | null>,
	) => {
		input.current = text
	}

	const handleSaveButton = async () => {
		if (nameInputRef.current) {
			try {
				const response = await contactDatabase.create({
					name: nameInputRef.current,
					phone: phoneInputRef.current,
					email: emailInputRef.current,
				})

				console.log(response)
				return router.back()
			} catch (error) {
				console.log(error)
			}
		}

		alert('Name should not be empty.')
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
					onChangeText={(text) => handleOnChangeInput(text, nameInputRef)}
					autoFocus
				/>

				<TextInput
					style={styles.input}
					keyboardType="numeric"
					placeholder="Phone"
					placeholderTextColor="#ccc"
					maxLength={11}
					onChangeText={(text) => handleOnChangeInput(text, phoneInputRef)}
				/>

				<TextInput
					style={styles.input}
					placeholder="Email"
					placeholderTextColor="#ccc"
					onChangeText={(text) => handleOnChangeInput(text, emailInputRef)}
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
