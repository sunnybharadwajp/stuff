import { writable } from 'svelte/store';

const initFetchCounter = writable(0);

export { initFetchCounter };
