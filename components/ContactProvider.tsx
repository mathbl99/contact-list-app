import { type ReactNode, createContext, useContext, useState } from 'react'

type ContactData = {
	id: number
	name: string
	phone?: string
	email?: string
}

type ContactContextType = {
	contactData: ContactData | null
	setContactData: React.Dispatch<React.SetStateAction<ContactData | null>>
}

type ContactProviderProps = {
	children: ReactNode
}

const ContactContext = createContext<ContactContextType | undefined>(undefined)

function ContactProvider({ children }: ContactProviderProps) {
	const [contactData, setContactData] = useState<ContactData | null>(null)

	return (
		<ContactContext.Provider value={{ contactData, setContactData }}>
			{children}
		</ContactContext.Provider>
	)
}

function useContact(): ContactContextType {
	const context = useContext(ContactContext)
	if (!context) {
		throw new Error('useContact must be used within a ContactProvider')
	}
	return context
}

export { ContactProvider, useContact }
