function do_filters() {
    let box = document.querySelector("#filters");
    let options = box.querySelectorAll("input[type=checkbox]");
    let sort_keys = [];
    options.forEach((el) => {
        if (el.checked) {
            sort_keys.push(el.id)
        }     
    });
    console.log(sort_keys);
}

function create_searc_card(obj) {
    let box = document.createElement("div");
    let img = document.createElement("img");
    img.title = obj.title;
    img.src = "img/sh_bigLogo.png";
    box.appendChild(img)
    return box;
}

function add_search_card(card) {
    let box = document.querySelector("#search_result");
    box.appendChild(card);
}

function createTable(n, m) {
    let table = document.createElement('table');
    for (let i = 0; i < n; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < m; j++) {
            let td = document.createElement('td');
            td.textContent = `${i + 1}, ${j + 1}`;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}

/*
function generateTable(inputId, resultId) {
    // Получаем все текстовые поля
    let inputs = document.querySelectorAll('.find_item');
    // Очищаем все текстовые поля, кроме активного
    inputs.forEach(input => {
        if (input.id !== inputId) {
            input.value = '';
        }
    });

    // Считываем значения из активного текстового поля
    let inputValues = document.getElementById(inputId).value.split(',');
    if(inputValues.length === 2) {
        let n = parseInt(inputValues[0].trim()); // Получаем число n
        let m = parseInt(inputValues[1].trim()); // Получаем число m

        if (!isNaN(n) && n > 0 && !isNaN(m) && m > 0) {
            // Очищаем все существующие таблицы
            let results = document.querySelectorAll('.search-result-wrapper');
            results.forEach(result => {
                result.innerHTML = '';
            });

            // Создаем новую таблицу и добавляем ее в нужный контейнер
            let tableContainer = document.getElementById(resultId);
            tableContainer.appendChild(createTable(n, m));
        } else {
            alert('Пожалуйста, введите два положительных числа, разделенных запятой');
        }
    } else {
        alert('Введите два числа, разделенных запятой. Например: 5, 5');
    }
}*/

async function generateTable(inputId, resultId) {
    //let a = inputId + ' ' + resultId;
    //alert(a);
    // Очистка предыдущих результатов
    let results = document.querySelectorAll('.search-result-wrapper');
    results.forEach(result => {
        result.innerHTML = '';
    });

    // Очистка других текстовых полей
    let inputs = document.querySelectorAll('.fing_input input[type="text"]');
    //alert(inputs.length);
    console.log(inputs);
    inputs.forEach(input => {
        //alert(input.type);
        //alert(input);
        if (input.id !== inputId) {
            input.value = '';
        }
    });

    // Получаем ID заказа из текстового поля
    let orderId = document.getElementById(inputId).value.trim();
    //a += " " + orderId;
    //alert(a);
    // Проверяем, что введено число
    let forTable;
    if ((!isNaN(orderId) && orderId) || inputId === "find_item_3") {
        // Формируем запрос к базе данных
        let query;
        // Проверяем идентификатор текстового поля и формируем соответствующий запрос
        if (inputId === "find_item_1") {
        query = ``
         

        query = `select employee.id as "Идентификационный номер", 
                            employee.full_name as "ФИО работника склада", 
                            employee.position as "Должность", 
                            employee.experience as "Опыт работы", 
                            employee.persent_for_order as "Процент за заказ" 
                     from public.employee 
                     where employee.id = ${orderId};`;

		forTable = "Идентификационный номер,ФИО работника склада,Должность,Опыт работы,Процент за заказ\n";
    /*
        query = `select "order".id as "Идентификационный номер заказа", 
                     "order".priority as "Приоритет заказа",
		             detail.id as "Идентификационный номер детали", 
		             detail.model as "Модель детали", 
                     detail.cost as Стоимость, 
		             client.id as "Идентификационный номер клиента", 
                     client.full_name as "ФИО клиента", 
                     client.phone_number as Телефон, 
                     client.adress as Адрес, 
                     employee.id as "Идентификационный номер работника", 
                     employee.full_name as "ФИО работника", 
                     employee.experience as "Опыт работника" 
		from "order", detail, client, employee 
		where "order".id = ${orderId} and "order".id_detail = detail.id and "order".id_client = client.id and "order".id_employee = employee.id;`;

		forTable = "Идентификационный номер заказа,Приоритет заказа,Идентификационный номер детали,Модель детали,Стоимость,Идентификационный номер клиента,ФИО клиента,Телефон,Адрес,Идентификационный номер работника,ФИО работника,Опыт работника\n";
	    //alert(query); */
        } else if (inputId === "find_item_2") {
        query = `select "order".id as "Идентификационный номер заказа", 
                    "order".priority as "Приоритет заказа",
                    detail.id as "Идентификационный номер детали", 
                    detail.model as "Модель детали", 
                    detail.cost as Стоимость, 
                    client.id as "Идентификационный номер клиента", 
                    client.full_name as "ФИО клиента", 
                    client.phone_number as Телефон, 
                    client.adress as Адрес, 
                    employee.id as "Идентификационный номер работника склада", 
                    employee.full_name as "ФИО работника склада", 
                    employee.experience as "Опыт работника склада",
                    deliver_emploee.id as "Идентификационный номер работника доставки",
                    deliver_emploee.full_name as "ФИО работника доставки"
        from "order", detail, client, employee, deliver_emploee, delivery, quality_control, basket
        where "order".id = ${orderId} and "order".id_detail = detail.id and "order".id_client = client.id and "order".id_employee = employee.id
        and deliver_emploee.id = delivery.id_deliver_emploee and delivery.id_quality_control = quality_control.id and quality_control.id_basket = basket.id and basket.id_order = "order".id;`;

        forTable = "Идентификационный номер заказа,Приоритет заказа,Идентификационный номер детали,Модель детали,Стоимость,Идентификационный номер клиента,ФИО клиента,Телефон,Адрес,Идентификационный номер работника склада,ФИО работника склада,Опыт работника склада,Идентификационный номер работника доставки,ФИО работника доставки\n";

        /*
            query = `select client.id as "Идентификационный номер", 
                            client.full_name as "ФИО клиента", 
                            client.phone_number as "Телефон", 
                            client.adress as "Адрес", 
                            client.bonus_lvl as "Бонусный уровень" 
                     from client 
                     where client.id = ${orderId};`;
        */

		//forTable = "Идентификационный номер,ФИО клиента,Телефон,Адрес,Бонусный уровень\n";
        } else if (inputId === "find_item_3") {
        /*
            query = `select * from "order"`;
            forTable = "";
        */  
            if (orderId === "отправленные"){
                query = `SELECT 
                detail.id AS "Идентификационный номер детали",
                detail.model AS "Модель детали",
                MAX(detail.energy_consumption) AS "Потребление энергии",
                MAX(detail.cost) AS "Стоимость",
                MAX(detail.warranty_period) AS "Гарантийный срок",
                MAX(transport_service.date_receipt) AS "Время отправки"
              FROM 
                detail
              JOIN 
                basket ON detail.id = basket.id_detail
              JOIN 
                transport_service ON basket.id_transport = transport_service.id
              WHERE 
                transport_service.date_receipt IS NOT NULL
              GROUP BY 
                detail.id, 
                detail.model
              ORDER BY detail.id ASC;`;

		        forTable = "Идентификационный номер детали,Модель детали,Потребление энергии,Стоимость,Гарантийный срок,Время отправки\n";
            } else if (orderId === "поступившие"){
                query = `select DISTINCT detail.id as "Идентификационный номер детали", 
                            detail.model as "Модель детали", 
                            detail.energy_consumption as "Потребление энергии",
                            detail.cost as "Стоимость",  
                            detail.warranty_period as "Гарантийный срок"
                     from detail, basket, transport_service
                     where detail.id not IN 
                     (select detail.id as "Идентификационный номер детали"
              from detail, basket, transport_service
              where detail.id = basket.id_detail and basket.id_transport = transport_service.id and transport_service.date_receipt IS not NULL)
              order by detail.id ASC;`;

		        forTable = "Идентификационный номер детали,Модель детали,Потребление энергии,Стоимость,Гарантийный срок\n";
            }
        /*
        query = `select deliver_emploee.id as "Идентификационный номер", 
                            deliver_emploee.full_name as "ФИО работника доставки", 
                            deliver_emploee.phone_number as "Телефон", 
                            deliver_emploee.work_experience as "Опыт работы", 
                            deliver_emploee.rating as "Рейтинг" 
                     from public.deliver_emploee 
                     where deliver_emploee.id = ${orderId};`;

		forTable = "Идентификационный номер,ФИО работника доставки,Телефон,Опыт работы,Рейтинг\n";*/
        }

        // Отправляем запрос и получаем ответ
	//alert(query);
        let response = await findItems(query); // Эта функция должна быть в request.js
        //alert(response.body.length);
        //let a = 'data = ' + response.data;
	//alert(a);
        // Обрабатываем ответ и создаем таблицу
        if (response && response.status === 'ok') {
            if (response.body.length === 0){
                alert('Нет данных в базе данных с таким id')
            } else{
                if (inputId === "find_item_2"){
                    let PDF = fillPdfTemplate(response.body, inputId);
                    console.log(PDF);
                }
                let headers = forTable.split(',');
                let completeData = [headers].concat(response.body);
                //alert(completeData);
                    // Функция createTableFromResponse должна быть реализована для создания таблицы на основе ответа
                    let table = createTableFromResponse(completeData); 
                    document.getElementById(resultId).appendChild(table);
            }
        } else {
            alert('Ошибка: Не удалось получить данные.');
        }
    } else {
        alert('Пожалуйста, введите корректный ID заказа.');
    }

}

//document.addEventListener('DOMContentLoaded', preGenerateTable);

function createTableFromResponse(data) {
    // Создаем элемент таблицы
    let table = document.createElement('table');
    
    // Перебираем все строки данных
    data.forEach(row => {
        // Создаем элемент строки таблицы
        let tr = document.createElement('tr');
        
        // Перебираем все ячейки в строке данных
        row.forEach(cell => {
            // Создаем элемент ячейки таблицы
            let td = document.createElement('td');
            // Задаем текстовое содержимое ячейки
            td.textContent = cell;
            // Добавляем ячейку к строке
            tr.appendChild(td);
        });

        // Добавляем строку к таблице
        table.appendChild(tr);
    });

    return table;
}

async function fillPdfTemplate(responseBody, inputId) {
    let n;
    let clientName;
    let clientAddress;
    clientName = responseBody[0][6];
    clientAddress = responseBody[0][8];
    employeeName = responseBody[0][10]
    deliverEmployeeName = responseBody[0][13]
    n = 4;
    let sum = 0;

    // Создаем строки таблицы товаров
    let productRows = responseBody.map((item, index) => {
        sum += parseFloat(item[n]); // Предполагая, что item[3] содержит стоимость товара
        return `<tr>
                    <td>${index + 1}</td>
                    <td>${item[n - 1]}</td>
                    <td>${item[n]}</td>
                </tr>`;
    }).join('');

    // Заполняем шаблон данными
    let O = Object();
    O.file = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Акт приема-передачи товара</title>
</head>
<body>

<h1 style="text-align:center;">АКТ ПРИЕМА-ПЕРЕДАЧИ ТОВАРА</h1>

<table width="100%">
    <tr>
      <td>Сотрудник склада: <u>${employeeName}</u></td>
    </tr>
    <tr>
      <td style="padding-left: 120px;">(ФИО)</td>
    </tr>
</table> 
<p>Cотрудник склада сформировал заказ и передал сотруднику службы доставки следующие товарные единицы:</p>

<table border="1" width="100%">
    <tr>
        <th>№</th>
        <th>Наименование</th>
        <th>Цена с НДС</th>
    </tr>
    ${productRows}
</table>

<p>Стоимость Товара составляет <u>${sum.toFixed(2)}</u>. </p>
<p><strong>Товар осмотрен. Претензий по качеству, количеству и комплектации не имею.</strong></p>

<table width="100%">
    <tr>
      <td>Сотрудник службы доставки: <u>${deliverEmployeeName}</u>/ ___________</td>
      <td></td>
      <td>__________________</td>
    </tr>
    <tr>
      <td style="padding-left: 120px;">(ФИО/Подпись)</td>
      <td></td>
      <td style="padding-left: 60px;">(дата)</td>
    </tr>
</table> 
</body>
</html>
`;
    await SendPostRequest(O);
    downloadURI("/doc");
    return template;
}
