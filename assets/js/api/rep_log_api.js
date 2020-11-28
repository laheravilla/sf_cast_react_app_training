export function getRepLogs() {
    return fetch("/reps", {
        credentials: "same-origin" // send cookies to any request back to the domain
    })
        .then(response => response.json())
        .then(data => data.items)
        .catch(error => console.error(error));
}