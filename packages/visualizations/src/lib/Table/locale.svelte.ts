export const locale = $state({
	locale: typeof window !== 'undefined' ? navigator.language : 'en-US'
});
