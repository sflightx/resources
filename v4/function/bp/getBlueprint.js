import { db } from 'https://sflightx.com/resources/v4/function/serviceAuth/initializeFirebase.js';
import { ref, get, query, orderByChild, limitToLast, endAt } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

export async function getBlueprint(size = 25, reference = "upload/blueprint") {
    let lastKey = null;
    let lastEntryKey = null;
    let isDone = false;

    try {
        const baseRef = ref(db, reference);
        let blueprintQuery;

        if (!lastKey) {
            blueprintQuery = query(
                baseRef,
                orderByChild("date"),
                limitToLast(size)
            );
        } else {
            blueprintQuery = query(
                baseRef,
                orderByChild("date"),
                endAt(lastKey),
                limitToLast(size)
            );
        }

        const snapshot = await get(blueprintQuery);

        if (snapshot.exists()) {
            let entries = Object.entries(snapshot.val()).map(([key, value]) => ({
                key,
                ...value
            }));

            if (lastEntryKey && entries.length) {
                if (entries[0].key === lastEntryKey) {
                    entries.shift();
                }
            }

            if (entries.length === 0) {
                isDone = true;
                return [];
            }

            const lastEntry = entries[entries.length - 1];
            lastKey = lastEntry.date;
            lastEntryKey = lastEntry.key;

            if (entries.length < size) {
                isDone = true;
            }
            console.log("data fetched:", entries);
            return entries; // ✅ return array instead of snapshot.val()
        } else {
            isDone = true;
            return [];
        }
    } catch (error) {
        console.error("Error fetching blueprints:", error);
        throw error;
    }
}
