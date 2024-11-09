import { ContactProvider } from '@/components/ContactProvider'
import Header from '@/components/Header'
import { Stack } from 'expo-router'
import React from 'react'

export default function RootLayout() {
	return (
		<ContactProvider>
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: '#000',
					},
					headerTintColor: '#fff',
				}}
			>
				<Stack.Screen
					options={{ header: Header }}
					name="index"
				/>
				<Stack.Screen
					options={{ headerShown: false }}
					name="addContact"
				/>
				<Stack.Screen
					options={{ headerShown: true, title: '' }}
					name="contactDetail"
				/>
			</Stack>
		</ContactProvider>
	)
}
