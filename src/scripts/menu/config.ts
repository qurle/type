import { openFilePicker } from '@scripts/header/listeners'
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

const allActionsData: Partial<MenuAction>[] = [
	{
		id: 'open',
		name: 'Open document',
		shortcut: [ctrl, 'O'],
		aliases: 'upload|file',
		callback: openFilePicker
	},
	{
		id: 'publish',
		name: 'Publish',
		shortcut: [ctrl, shift, 'P'],
		aliases: 'share',
		hidden: true,
	},
	{
		id: 'copyAndEdit',
		name: 'Copy and edit',
		shortcut: [ctrl, shift, 'E'],
		aliases: 'duplicate',
		hidden: false
	},
	{
		id: 'download',
		name: 'Download',
		shortcut: [ctrl, shift, 'S'],
		aliases: 'save|export',
	},
	{
		id: 'exportAll',
		name: 'Export all',
		aliases: 'save',
	},
	{
		id: 'font',
		name: 'Change font',
	},
	{
		id: 'fontSans',
		name: 'Use sans-serif font',
		searchOnly: true
	},
	{
		id: 'fontSerif',
		name: 'Use serif font',
		searchOnly: true,
	},
	{
		id: 'fontMono',
		name: 'Use monospace font',
		searchOnly: true,
	},
	{
		id: 'theme',
		name: 'Change theme',
	},
	{
		id: 'themeLight',
		name: 'Use light theme',
		searchOnly: true,
	},
	{
		id: 'themeDark',
		name: 'Use dark theme',
		searchOnly: true,
	},
	{
		id: 'themeDigital',
		name: 'Use really digital theme',
		searchOnly: true,
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
] as const;

export type MenuActionId = typeof allActionsData[number]['id'];

export const allActions: MenuAction[] = (allActionsData as unknown as Partial<MenuAction>[])
	.map(x => new MenuAction(x));