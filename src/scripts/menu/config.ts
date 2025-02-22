import { exportAll, exportFile } from '@scripts/actions/export'
import { cycleFonts, useFont } from '@scripts/actions/fonts'
import { openFilePicker } from '@scripts/actions/openFilePicker'
import { publish } from '@scripts/actions/publish'
import { toggleSpellcheck } from '@scripts/actions/spellcheck'
import { cycleThemes, useTheme } from '@scripts/actions/themes'
import { MenuAction } from '@scripts/menu/classes/MenuAction'
import MicroModal from 'micromodal';

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
		closesMenu: true,
		callback: openFilePicker,
	},
	{
		id: 'publish',
		name: 'Publish',
		shortcut: [ctrl, shift, 'P'],
		aliases: 'share',
		hidden: true,
		closesMenu: true,
		callback: publish
	},
	{
		id: 'copyAndEdit',
		name: 'Copy and edit',
		shortcut: [ctrl, shift, 'E'],
		aliases: 'duplicate',
		closesMenu: true,
		hidden: false
	},
	{
		id: 'download',
		name: 'Download',
		shortcut: [ctrl, shift, 'S'],
		aliases: 'save|export',
		closesMenu: true,
		callback: exportFile
	},
	{
		id: 'exportAll',
		name: 'Export all',
		aliases: 'save',
		closesMenu: true,
		callback: exportAll
	},
	{
		id: 'font',
		name: 'Change font',
		callback: cycleFonts
	},
	{
		id: 'fontSans',
		name: 'Use sans-serif font',
		searchOnly: true,
		callback: () => useFont('sans')
	},
	{
		id: 'fontSerif',
		name: 'Use serif font',
		searchOnly: true,
		callback: () => useFont('serif')

	},
	{
		id: 'fontMono',
		name: 'Use monospace font',
		searchOnly: true,
		callback: () => useFont('mono')
	},
	{
		id: 'theme',
		name: 'Change theme',
		callback: cycleThemes
	},
	{
		id: 'themeLight',
		name: 'Use light theme',
		searchOnly: true,
		callback: () => useTheme('light')
	},
	{
		id: 'themeDark',
		name: 'Use dark theme',
		searchOnly: true,
		callback: () => useTheme('dark')
	},
	{
		id: 'themeDigital',
		name: 'Use really digital theme',
		searchOnly: true,
		callback: () => useTheme('digital')

	},
	{
		id: 'spellOn',
		name: 'Turn spellcheck on',
		aliases: 'errors',
		callback: () => toggleSpellcheck(true)
	},
	{
		id: 'spellOff',
		name: 'Turn spellcheck off',
		aliases: 'errors',
		callback: () => toggleSpellcheck(false)
	},
	{
		id: 'mdHandbook',
		name: 'How to markdown',
		closesMenu: true,
		// Inline it
		callback: () => MicroModal.show('modal-instructions'),
	},
	{
		id: 'shortcuts',
		name: 'Show all shortcuts',
		closesMenu: true,
		callback: () => MicroModal.show('modal-shortcuts'),
	},
	{
		id: 'about',
		name: 'About type.',
		closesMenu: true,
		callback: () => window.open('/hello', '_blank')
	},
] as const;

export type MenuActionId = typeof allActionsData[number]['id'];

export const allActions: MenuAction[] = (allActionsData as unknown as Partial<MenuAction>[])
	.map(x => new MenuAction(x));