import { snapshotChanges } from './snapshot-changes';
import { createStateChanges } from './state-changes';
import { createAuditTrail } from './audit-trail';
import { createDataOperationMethod } from './data-operation';
import { createRemoveMethod } from './remove';
export function createListReference(query, afDatabase) {
    return {
        query: query,
        update: createDataOperationMethod(query.ref, 'update'),
        set: createDataOperationMethod(query.ref, 'set'),
        push: function (data) { return query.ref.push(data); },
        remove: createRemoveMethod(query.ref),
        snapshotChanges: function (events) {
            var snapshotChanges$ = snapshotChanges(query, events);
            return afDatabase.scheduler.keepUnstableUntilFirst(snapshotChanges$);
        },
        stateChanges: createStateChanges(query, afDatabase),
        auditTrail: createAuditTrail(query, afDatabase),
        valueChanges: function (events) {
            var snapshotChanges$ = snapshotChanges(query, events);
            return afDatabase.scheduler.keepUnstableUntilFirst(snapshotChanges$)
                .map(function (actions) { return actions.map(function (a) { return a.payload.val(); }); });
        }
    };
}
//# sourceMappingURL=create-reference.js.map