// It's hardcoded so hope it will not change soon 
const months = ["jan", "feb", "mar", "apr", "may", "jun",
	"jul", "aug", "sep", "oct", "nov", "dec"
];

export function getShortDate(date: Date): string {
	const showYear = new Date().getFullYear() !== date.getFullYear()
	return `${date.getDate()} ${months[date.getMonth()]} ${showYear ? date.getFullYear().toString().slice(-2) : ''}`
}