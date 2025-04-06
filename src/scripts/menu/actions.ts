import { exportAll, exportFile } from '@scripts/actions/export'
import { cycleFonts, useFont } from '@scripts/actions/fonts'
import { openFilePicker } from '@scripts/actions/openFilePicker'
import { publish } from '@scripts/actions/publish'
import { toggleSpellcheck } from '@scripts/actions/spellcheck'
import { cycleThemes, useTheme } from '@scripts/actions/themes'
import { Action } from '@scripts/menu/classes/Action'
import { state } from '@scripts/state'
import { isMac } from '@scripts/utils/isMac'

// MDN says it's okay
const ctrl = isMac() ? '⌘' : 'Ctrl'
const shift = 'Shift'

const hideNewMenu = localStorage.getItem('saw-new-menu') === 'true'

export const fuzzySortOptions = {
	keys: ['name', 'aliases'],
	limit: 100,
	threshold: 0.3,
}

const allActionsData: Partial<Action>[] = [
	{
		id: 'newMenu',
		name: 'A few words about new menu',
		icon: 'MaterialSymbolsLightWavingHandOutlineRounded',
		needDivider: true,
		callback: () => state.menu.openView('newMenu'),
	},
	{
		id: 'open',
		name: 'Upload file(s)',
		icon: 'MaterialSymbolsLightUploadFileOutlineRounded',
		shortcut: [ctrl, 'O'],
		aliases: 'upload|file|гздщфв|открыть',
		closesMenu: true,
		callback: openFilePicker,
	},
	{
		id: 'publish',
		name: 'Publish',
		icon: 'MaterialSymbolsLightLinkRounded',
		shortcut: [ctrl, shift, 'P'],
		aliases: 'share|ырфку|опубликовать',
		hidden: true,
		closesMenu: true,
		callback: publish
	},
	{
		id: 'copyAndEdit',
		name: 'Copy and edit',
		icon: 'MaterialSymbolsLightFileCopyOutlineRounded',
		shortcut: [ctrl, shift, 'E'],
		aliases: 'duplicate|сщзн|копировать',
		closesMenu: true,
		hidden: false
	},
	{
		id: 'download',
		name: 'Download',
		icon: 'MaterialSymbolsLightCloudDownloadOutlineRounded',
		shortcut: [ctrl, shift, 'S'],
		aliases: 'save|export|вщцтдщфв|загрузить',
		closesMenu: true,
		callback: exportFile
	},
	{
		id: 'exportAll',
		name: 'Export all',
		icon: 'MaterialSymbolsLightFolderZipOutlineRounded',
		aliases: 'save|учзщке|экспорт',
		closesMenu: true,
		callback: exportAll
	},
	{
		id: 'font',
		name: 'Change font',
		icon: 'MaterialSymbolsLightInsertTextOutlineRounded',
		aliases: 'ащте|шрифт',
		callback: cycleFonts
	},
	{
		id: 'fontSans',
		name: 'Use sans-serif font',
		icon: 'MaterialSymbolsLightFontDownloadOutlineRounded',
		aliases: 'гыу',
		searchOnly: true,
		callback: () => useFont('sans')
	},
	{
		id: 'fontSerif',
		name: 'Use serif font',
		icon: 'MaterialSymbolsLightSerifOutlineRounded',
		aliases: 'гыу',
		searchOnly: true,
		callback: () => useFont('serif')

	},
	{
		id: 'fontMono',
		name: 'Use monospace font',
		icon: 'MaterialSymbolsLightSlabSerifOutlineRounded',
		aliases: 'гыу',
		searchOnly: true,
		callback: () => useFont('mono')
	},
	{
		id: 'theme',
		name: 'Change theme',
		icon: 'MaterialSymbolsLightPaletteOutline',
		aliases: 'color|срфтпу',
		callback: cycleThemes
	},
	{
		id: 'themeLight',
		name: 'Use light theme',
		icon: 'MaterialSymbolsLightSunnyOutlineRounded',
		aliases: 'color|гыу',
		searchOnly: true,
		callback: () => useTheme('light')
	},
	{
		id: 'themeDark',
		name: 'Use dark theme',
		icon: 'MaterialSymbolsLightDarkModeOutlineRounded',
		aliases: 'color|гыу',
		searchOnly: true,
		callback: () => useTheme('dark')
	},
	{
		id: 'themeDigital',
		name: 'Use really digital theme',
		icon: 'MaterialSymbolsLightChargerOutlineRounded',
		aliases: 'color|гыу|retropunk',
		searchOnly: true,
		callback: () => useTheme('digital')

	},
	{
		id: 'spellcheckOn',
		name: 'Turn spellcheck on',
		icon: 'MaterialSymbolsLightFormatUnderlinedSquiggleRounded',
		aliases: 'errors|егкт',
		callback: () => toggleSpellcheck(true)
	},
	{
		id: 'spellcheckOff',
		name: 'Turn spellcheck off',
		icon: 'MaterialSymbolsLightFormatUnderlinedSquiggleRounded',
		aliases: 'errors|егкт',
		callback: () => toggleSpellcheck(false)
	},
	{
		id: 'mdHandbook',
		name: 'How to markdown',
		icon: 'MaterialSymbolsLightMarkdownOutlineRounded',
		aliases: 'help|рщц ещ',
		callback: () => state.menu.openView('mdHandbook'),

	},
	{
		id: 'shortcuts',
		name: 'Show all shortcuts',
		icon: 'MaterialSymbolsLightKeyboardAltOutlineRounded',
		aliases: 'hotkeys|ырщц|ырщкесгеы',
		callback: () => state.menu.openView('shortcuts'),
	},
	{
		id: 'about',
		name: 'About type.',
		icon: 'MaterialSymbolsLightFavoriteOutlineRounded',
		aliases: 'qurle|help|фищге|meow|hi',
		closesMenu: true,
		callback: () => window.open('/hello', '_blank')
	},
] as const

export type MenuActionId = typeof allActionsData[number]['id']

export const allActions: Action[] = (allActionsData as unknown as Partial<Action>[])
	.map(x => new Action(x))