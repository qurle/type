type MenuAction = {
	id: string,
	name: string,
	shortcut?: string[],
	shortcutMac?: string[],
	hidden?: boolean,
	aliases?: string,
	callback?: (...args: any) => void
}

const ctrl = 'Ctrl'
const shift = 'Shift'
const cmd = '⌘'
const shiftMac = '⇧'

export const menuActions: MenuAction[] = [
	{
		id: 'open',
		name: 'Open document',
		shortcut: [ctrl, 'O'],
		aliases: 'upload|file'
	},
	{
		id: 'publish',
		name: 'Publish',
		shortcut: [ctrl, shift, 'P']
	},
	{
		id: 'copyAndEdit',
		name: 'Copy and edit',
		shortcut: [ctrl, shift, 'E']
	},
	{
		id: 'download',
		name: 'Download',
		shortcut: [ctrl, shift, 'S']
	},
	{
		id: 'export-all',
		name: 'Export all',
	},
	{
		id: 'font',
		name: 'Change font',
	},
	{
		id: 'fontSans',
		name: 'Use sans-serif font',
	},
	{
		id: 'fontSerif',
		name: 'Use serif font',
	},
	{
		id: 'fontMono',
		name: 'Use monospace font',
	},
	{
		id: 'theme',
		name: 'Change theme',
	},
	{
		id: 'themeLight',
		name: 'Use light theme',
	},
	{
		id: 'themeDark',
		name: 'Use dark theme',
	},
	{
		id: 'spellOn',
		name: 'Turn spellcheck on',
	},
	{
		id: 'spellOff',
		name: 'Turn spellcheck off',
	},
	{
		id: 'mdHandbook',
		name: 'How to markdown',
	},
	{
		id: 'shortcuts',
		name: 'Show all shortcuts',
	},
	{
		id: 'about',
		name: 'About type.',
	},
]