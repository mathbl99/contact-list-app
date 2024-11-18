function phoneNumberMask(input: string | null) {
	if (!input) return ''

	const cleanedInput = input.replace(/\D/g, '')

	const part1 = cleanedInput.slice(0, 2)
	const part2 = cleanedInput.slice(2, 7)
	const part3 = cleanedInput.slice(7, 11)

	if (part3) return `(${part1}) ${part2}-${part3}`
	if (part2) return `(${part1}) ${part2}`
	if (part1) return `(${part1}`

	return ''
}

export { phoneNumberMask }
