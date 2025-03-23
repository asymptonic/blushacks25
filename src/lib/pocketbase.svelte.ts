// src/lib/pocketbase.svelte.ts

import PocketBase, { type RecordModel } from 'pocketbase';
import { PUBLIC_API_URL } from '$env/static/public';
import { browser } from '$app/environment';
import type { TypedPocketBase } from './types/db';

export const pb = new PocketBase(PUBLIC_API_URL) as TypedPocketBase;

export const user = $state({ record: pb.authStore.record });
userRefresh();

pb.authStore.onChange((auth) => {
	user.record = pb.authStore.record;
	exportAuthStoreToCookie();
});

function exportAuthStoreToCookie() {
	if (!browser) return;
	try {
		document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
	} catch {}
}

export function logOut() {
	pb.authStore.clear();
	eraseCookie('pb_auth');
}

export function eraseCookie(name: string) {
	document.cookie = name + '=; Max-Age=-99999999;';
}

export async function userRefresh() {
	try {
		if (pb.authStore.isValid) await pb.collection('users').authRefresh();
	} catch {
		logOut();
	}
}

export function use<T>(fetcher: Promise<T> | (() => Promise<T>)) {
	const state = $state<{ response: T | null }>({ response: null });

	(typeof fetcher === 'function' ? fetcher() : fetcher).then((r) => (state.response = r));

	return state;
}

export function realtimeList<T extends RecordModel>(collection: string, filter?: string) {
	const state = $state<{ records: T[] }>({ records: [] });

	$effect(() => {
		pb.collection(collection)
			.getFullList({ ...(filter !== undefined ? { filter } : {}) })
			.then((r) => {
				state.records = r as T[];

				pb.collection(collection).subscribe(
					'*',
					(e) => {
						if (e.action === 'create') {
							state.records.unshift(e.record as T);
						} else {
							const index = state.records.findIndex((i) => i.id === e.record.id);

							if (e.action === 'update') {
								if (index >= 0) state.records[index] = e.record as T;
							} else if (e.action === 'delete') {
								state.records.splice(index, 1);
							}
						}
					},
					{ filter }
				);
			});
		// return () => pb.collection('collection').unsubscribe('*');
	});

	return state;
}

export function realtimeRecord<T extends RecordModel>(
	collection: string,
	id: string,
	{ expand }: { expand?: string }
) {
	const state = $state<{ record: T | null }>({ record: null });

	$effect(() => {
		pb.collection(collection)
			.getOne(id, { ...(expand !== undefined ? { expand } : {}) })
			.then((r) => {
				state.record = r as T;

				pb.collection(collection).subscribe(
					id,
					(e) => {
						if (e.action === 'update') {
							state.record = e.record as T;
						} else if (e.action === 'delete') {
							state.record = null;
						}
					},
					{ expand }
				);
			});
		// return () => pb.collection('collection').unsubscribe(id);
	});

	return state;
}