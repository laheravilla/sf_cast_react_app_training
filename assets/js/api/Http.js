export default class Http {
    http (url, init = {}, callback) {
        fetch(url, {
                method: init.method || "GET",
                headers : new Headers({
                    'Content-Type': 'application/json',
                    'Accept-Charset' : 'utf-8',
                    'X-Requested-With': 'XMLHttpRequest'
                }),
                mode: 'cors',
                credentials: "same-origin",
                cache: 'default',
                body: init.body
            }
        ).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                let error = new Error('Something went wrong on api server!');
                error.response = response;
                throw error;
            }
        }).then(data => {
            if (typeof callback === 'function') {
                callback(data);
            }
        }).catch(error => console.log(error));
    }
}