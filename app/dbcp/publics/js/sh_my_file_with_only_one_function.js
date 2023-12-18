function SendPostRequest(obj) {
    return new Promise(function (resolve) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://31.31.202.46:8000/details');
        xhr.onload = function () {
            let status = xhr.status;
            if (status == 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(status);
            }
        };
        xhr.send(JSON.stringify(obj));
    }); 
}