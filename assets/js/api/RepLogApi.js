import Http from "./Http";

export default class RepLogApi extends Http {
    getRepLogs(init, callback) {
       this.http("/reps", init, callback);
    }

    deleteRepLog(id, callback) {
        this.http(`/reps/${id}`, { method: "DELETE" }, callback);
    }

    createRepLog(repLog, callback) {
        this.http(`/reps`, { method: "POST", body: JSON.stringify(repLog) }, callback);
    }
}