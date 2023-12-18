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

function downloadURI(uri) {
    var link = document.createElement("a");
    link.setAttribute('download', "doc.pdf");
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    link.remove();
}

function create_table(e) {
    let table = "";
    for (let i = 0; i < e.length; ++i) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${e[i][0]}</td>
            <td>${e[i][1]}</td>
        </tr>
        `
    }
    return table;
}

function sum_kost(e) {
    let r = 0;
    for (let i = 0; i < e.length; ++i) {
        r += parseInt(e[i][1], 10);
    }
    return r;
}

async function save_pdf() {
    let fio = document.querySelector("#full_name").value;
    let num = document.querySelector("#phone_number").value;
    let adr = document.querySelector("#adress").value;
    if (Math.min(fio.length, num.length, adr.length) == 0) {
        alert("Необходимо хаполнить все поля");
        return;
    }
    let obj = Object();
    obj.query = `select model, cost, warranty_period from detail where id in (select id_detail from "order" where id_client in (select id from client where full_name = '${fio}' and phone_number = '${num}' and adress = '${adr}'));`
    let r = await SendPostRequest(obj);
    let O = Object();
    let table = create_table(r.body);
    O.file =`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Товарный чек </title>
    </head>
    <body>

    <h1 style="text-align:center;"> регистрационный номер чека ${Math.floor(Math.random()*219468+1000000)} от ${new Date().toJSON().slice(0, 10).replaceAll('-', '.')} г.</h1>

    <table border="1" width="100%">
        <tr>
            <th>№</th>
            <th>Наименование</th>
            <th>Цена с НДС</th>
        </tr>
        ${table}
    </table>

    <p>Всего оплачено товаров на сумму <u>${sum_kost(r.body)}</u>. </p>
    <p>Товар оплачен.</p>
    <p>Покупатель: ${fio} </p>
    <br><br>
    <p>Электронную копию документа считать верной.</p>
    </body>
    </html>`
    await SendPostRequest(O);
    downloadURI("/doc")
}

async function buy() {
    let fio = document.querySelector("#full_name").value;
    let num = document.querySelector("#phone_number").value;
    let adr = document.querySelector("#adress").value;
    let box = document.querySelector("#my_box").value;
    if (Math.min(fio.length, num.length, adr.length, box.length) == 0) {
        alert("Необходимо хаполнить все поля");
    } else {
        let obj = Object();
        obj.query = `select id from detail where model in (` + box.split(";").map(e => `'${e}'`).join(",") + ")";
        let r = await SendPostRequest(obj);
        ids_detail = r.body;
        obj.query = `select id from client where full_name = '${fio}' and phone_number = '${num}' and adress = '${adr}'`;
        r = await SendPostRequest(obj);
        id_client = r.body[0][0];
        
        for (let i = 0; i < ids_detail.length; ++i) {
            obj.query = `insert into "order" (id, id_detail, id_client) values (${Math.floor(Math.random() * 219468)}, ${ids_detail[i]}, ${id_client})`
            r = await SendPostRequest(obj);
        }
        localStorage.removeItem("basket");
        document.querySelector("#my_box").value = "";
    }
}

async function do_search() {
    clear_search_result();
    let filters = document.querySelector("#filters");
    if (filters == undefined) return null;
    filters = filters.querySelectorAll("input[type=checkbox]");
    let keys = [];
    filters.forEach((el) => {
        if (el.checked) {
            keys.push(el.id)
        }     
    });
    let query = "select * from detail"
    if (keys.length > 0) {
        query += " order by ";
        for (let i = 0; i < keys.length; ++i) {
            query += keys[i];
            if (i != keys.length - 1) {
                query += ", ";
            }
        }
    }

    let massage = Object()
    massage.query = query
    let response = await SendPostRequest(massage);
    if (JSON.stringify(response).length == 0 || response.status != "ok") {
        alert("https://youtube.com/shorts/aI-PT_8JD_U?si=MfRad0DTTnAtbQX4");
        return;
    }
    add_search_cards_all(response.body);
}
