import { MenuAction } from '@scripts/menu/classes/MenuAction'

const ctrl = 'Ctrl'
const shift = 'Shift'
const cmd = '⌘'
const shiftMac = '⇧'

export const fuzzySortOptions = {
	keys: ['name', 'aliases'],
	limit: 100,
	threshold: 0.3,
}

export const menuActions: MenuAction[] = [
	{
		id: 'open',
		name: 'Open document',
		shortcut: [ctrl, 'O'],
		aliases: 'upload|file',
	},
	{
		id: 'publish',
		name: 'Publish',
		shortcut: [ctrl, shift, 'P'],
		hidden: true
	},
	{
		id: 'copyAndEdit',
		name: 'Copy and edit',
		shortcut: [ctrl, shift, 'E'],
		hidden: false
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
].map(el => new MenuAction(el))