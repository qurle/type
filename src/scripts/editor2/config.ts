export const linkConfig = {
	openOnClick: false,
	autolink: true,
	defaultProtocol: 'https',
	protocols: ['http', 'https'],
	isAllowedUri: (url, ctx) => {
		try {
			const parsedUrl = url.includes(':')
				? new URL(url)
				: new URL(`${ctx.defaultProtocol}://${url}`)
			if (!ctx.defaultValidate(parsedUrl.href)) {
				return false
			}
			return true
		} catch {
			return false
		}
	},
}

// https://github.com/aguingand/tiptap-markdown?tab=readme-ov-file#options
export const markdownConfig = {
	linkify: true,              // Create links from "https://..." text
	transformPastedText: true,  // Allow to paste markdown text in the editor
}