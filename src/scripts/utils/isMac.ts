// MDN says it's okay
export function isMac() {
	return navigator.appVersion.includes('Mac')
		|| navigator.platform.startsWith("Mac")
		|| navigator.platform.includes("iPhone")
}
