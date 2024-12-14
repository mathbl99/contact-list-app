import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'

type ModalProps = React.ComponentProps<typeof Modal> & {
	text: string
	onConfirm: () => void
	onCancel: () => void
}

export default function ConfirmationModal({
	text,
	onConfirm,
	onCancel,
	...rest
}: ModalProps) {
	return (
		<Modal {...rest}>
			<View style={styles.container}>
				<View style={styles.modalWrapper}>
					<Text style={styles.text}>{text}</Text>
					<View style={styles.buttonWrapper}>
						<Pressable
							style={styles.button}
							onPress={onConfirm}
						>
							<Text style={styles.text}>Confirmar</Text>
						</Pressable>
						<Pressable
							style={styles.button}
							onPress={onCancel}
						>
							<Text style={styles.text}>Cancelar</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
		width: '100%',
		height: '100%',
		backgroundColor: '#0006',
	},

	modalWrapper: {
		position: 'absolute',
		width: 325,
		top: '50%',
		left: '50%',
		transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
		backgroundColor: '#e8e8e8',
		borderRadius: 15,
		padding: 15,
		gap: 20,
	},

	buttonWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},

	button: {
		backgroundColor: '#ccc',
		paddingHorizontal: 25,
		paddingVertical: 8,
		borderRadius: 5,
	},

	text: {
		color: '#000',
		textAlign: 'center',
		fontSize: 16,
	},
})
