import { type Href, Link } from 'expo-router'
import {
	type ImageProps,
	Pressable,
	type StyleProp,
	type TextProps,
	type ViewStyle,
} from 'react-native'

type RedirectProps = {
	children:
		| React.ReactElement<TextProps | ImageProps>
		| React.ReactElement<TextProps | ImageProps>[]
	href: Href<string | object>
	style: StyleProp<ViewStyle>
}

export default function RedirectButton({
	children,
	href,
	style,
}: RedirectProps) {
	return (
		<Link
			href={href}
			asChild
		>
			<Pressable style={style}>{children}</Pressable>
		</Link>
	)
}
