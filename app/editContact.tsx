import ContactForm from '@/components/ContactForm'
import { useContact } from '@/components/ContactProvider'

export default function EditContact() {
	const { contactData } = useContact()

	return <ContactForm data={contactData} />
}
