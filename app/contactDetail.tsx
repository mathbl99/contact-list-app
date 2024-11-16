import { useContact } from '@/components/ContactProvider'
import BottomNavigator from '@/components/navigation/BottomNavigator'
import { StyleSheet, Text, View } from 'react-native'

export default function ContactDetail() {
	const { contactData } = useContact()

	console.log(contactData)

	return (
		<View style={styles.container}>
			<View style={styles.contactNameWrapper}>
				<Text style={styles.title}>{contactData?.name}</Text>
			</View>

			<View style={styles.detailsWrapper}>
				<View style={styles.textWrapper}>
					<Text style={styles.label}>Phone</Text>
					<Text style={styles.text}>{contactData?.phone || '-'}</Text>
				</View>
				<View style={styles.separator} />
				<View style={styles.textWrapper}>
					<Text style={styles.label}>Email</Text>
					<Text style={styles.text}>{contactData?.email || '-'}</Text>
				</View>
			</View>
			<BottomNavigator />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		backgroundColor: '#000',
		alignItems: 'center',
	},

	label: {
		color: '#ccc',
	},

	detailsWrapper: {
		width: '100%',
		backgroundColor: '#1b1b1b',
		borderRadius: 28,
		gap: 20,
		padding: 20,
	},

	textWrapper: {
		gap: 10,
		width: '100%',
		borderRadius: 28,
		justifyContent: 'center',
		backgroundColor: '#1b1b1b',
	},

	contactNameWrapper: {
		width: '100%',
		height: 100,
		borderRadius: 28,
		margin: 25,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#1b1b1b',
	},

	title: {
		fontSize: 25,
		color: '#fff',
	},

	text: {
		fontSize: 18,
		color: '#fafafa',
	},

	separator: {
		width: '100%',
		height: 1,
		backgroundColor: '#ccc',
		opacity: 0.3,
	},
})
