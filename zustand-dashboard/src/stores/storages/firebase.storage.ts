import type { StateStorage, createJSONStorage } from "zustand/middleware";

const firebaseUrl =
	"https://react-firebase-testing-20244-default-rtdb.firebaseio.com/zustand";

const storageApi: StateStorage = {
	getItem: async function (name: string): Promise<string | null> {
		try {
			const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) =>
				res.json(),
			);
			return JSON.stringify(data);
		} catch (error) {
			throw error;
		}
	},
	setItem: async function (name: string, value: string): Promise<void> {
		await fetch(`${firebaseUrl}/${name}.json`, {
			method: "PUT",
			body: value,
		}).then((res) => res.json());
		return;
	},
	removeItem: function (name: string): void | Promise<void> {
		sessionStorage.removeItem(name);
	},
};

export const firebaseStorage = createJSONStorage(() => storageApi);
