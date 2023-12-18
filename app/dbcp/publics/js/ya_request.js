async function findItems(query) {
    let message = Object()
    message.query = query
    let response = await SendPostRequest(message);
    
    if (JSON.stringify(response).length == 0 || response.status != "ok") {
        alert(" ");
        return;
    }
    return response;
}

function downloadURI(uri) {
    var link = document.createElement("a");
    link.setAttribute('download', "doc.pdf");
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    link.remove();
}
