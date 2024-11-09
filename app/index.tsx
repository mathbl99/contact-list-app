import { Contact } from '@/components/Contact'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import db from './db-test/db'

export default function Index() {
	const contactList = db

	return (
		<View style={styles.container}>
			<View style={styles.roundEdge}>
				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={{ gap: 5 }}
				>
					{contactList.map((data) => (
						<Contact
							key={data.id}
							data={data}
						/>
					))}
				</ScrollView>
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

	scrollView: {
		width: '100%',
		padding: 1,
		backgroundColor: '#000',
	},
})
