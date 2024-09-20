import { frontmatterPlugin, headingsPlugin, imagePlugin, linkDialogPlugin, linkPlugin, listsPlugin, markdownShortcutPlugin, quotePlugin, tablePlugin, thematicBreakPlugin } from '@mdxeditor/editor';

export const plugins = [
	listsPlugin(),
	quotePlugin(),
	headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
	linkPlugin(),
	linkDialogPlugin(),
	// этот чертила работает только на одну сессию
	imagePlugin({
		disableImageSettingsButton: true,
		imageUploadHandler: async (file) => {
			return URL.createObjectURL(file)
		}
	}),
	tablePlugin(),
	thematicBreakPlugin(),
	frontmatterPlugin(),
	// этот чертила не работает
	// tablePlugin(),
	// этот чертила ломает всё к херам
	// codeBlockPlugin(),
	markdownShortcutPlugin()
]