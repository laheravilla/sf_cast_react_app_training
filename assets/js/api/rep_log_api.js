export function getRepLogs() {
    return fetch("/reps")
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}