import { type Href, router } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { useContact } from './ContactProvider'

export type ContactProps = {
	id: number
	name: string
	phone: string | null
	email: string | null
}

export function Contact({ data }: { data: ContactProps }) {
	const { setContactData } = useContact()

	const handlePress = (route: Href<string | object>) => {
		setContactData(data)
		router.push(route)
	}

	return (
		<Pressable
			onPress={() => handlePress('/contactDetail')}
			style={({ pressed }) => [
				pressed ? { opacity: 1 } : { opacity: 0.9 },
				styles.container,
			]}
		>
			<Text style={styles.text}>{data.name}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		height: 55,
		padding: 15,
		backgroundColor: '#1b1b1b',
		borderRadius: 28,
		justifyContent: 'center',
	},

	text: {
		fontSize: 18,
		color: '#fff',
	},
})
