import { snapshotChanges } from './snapshot-changes';
import { createStateChanges } from './state-changes';
import { createAuditTrail } from './audit-trail';
import { createDataOperationMethod } from './data-operation';
import { createRemoveMethod } from './remove';
export function createListReference(query, afDatabase) {
    return {
        query,
        update: createDataOperationMethod(query.ref, 'update'),
        set: createDataOperationMethod(query.ref, 'set'),
        push: (data) => query.ref.push(data),
        remove: createRemoveMethod(query.ref),
        snapshotChanges(events) {
            const snapshotChanges$ = snapshotChanges(query, events);
            return afDatabase.scheduler.keepUnstableUntilFirst(snapshotChanges$);
        },
        stateChanges: createStateChanges(query, afDatabase),
        auditTrail: createAuditTrail(query, afDatabase),
        valueChanges(events) {
            const snapshotChanges$ = snapshotChanges(query, events);
            return afDatabase.scheduler.keepUnstableUntilFirst(snapshotChanges$)
                .map(actions => actions.map(a => a.payload.val()));
        }
    };
}
//# sourceMappingURL=create-reference.js.map