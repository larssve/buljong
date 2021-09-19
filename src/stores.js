import { writable } from "svelte/store";

export const water = writable(1000);
export const waterTemperature = writable(4);
export const burnerOverlap = writable([0, 0]);
export const flavourTown = writable(false);