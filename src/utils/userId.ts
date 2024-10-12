export function setUserId(userId: string) {
	localStorage.setItem('userId', userId)
	return userId
}

export function getUserId() {
	return localStorage.getItem('userId') || ''
}