// Глобальные переменные для хранения последних данных и inputId
let lastResponseBody = null;
let lastInputId = null;

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

    let pdfButtonContainer = document.getElementById('pdfButtonContainer');

    // После получения ответа от сервера и перед созданием таблицы
    if (inputId === "find_item_1" || inputId === "find_item_2") {
        pdfButtonContainer.style.display = ''; // Показываем кнопку
        lastInputId = inputId;
    } else if (inputId === "find_item_3") {
        pdfButtonContainer.style.display = 'none'; // Скрываем кнопку
        lastInputId = null;
    }

    // Получаем информацию из текстового поля
    let orderId = document.getElementById(inputId).value.trim();
    console.log('orderID:');
    console.log(orderId);
    //a += " " + orderId;
    //alert(a);
    // Проверяем, что введено число
    let forTable;
    if ((!isNaN(orderId) && orderId) || inputId === "find_item_2" || inputId === "find_item_3") {
        // Формируем запрос к базе данных
        let query;
        // Проверяем идентификатор текстового поля и формируем соответствующий запрос
        if (inputId === "find_item_1") {
	//query = `select * from client;`;
        query = `select 
                     client.full_name as "ФИО клиента", 
                     client.phone_number as Телефон, 
                     client.adress as "Адрес", 
                     employee.full_name as "ФИО работника доставки", 
                     employee.experience as "Опыт работника", 
                     "order".id as "Идентификационный номер заказа", 
                     "order".priority as "Приоритет заказа",
		             detail.model as "Модель детали", 
                     detail.cost as Стоимость
		from "order", detail, client, employee 
		where "order".id = ${orderId} and "order".id_detail = detail.id and "order".id_client = client.id and "order".id_employee = employee.id;`;

		forTable = "ФИО клиента,Телефон,Адрес,ФИО работника доставки,Опыт работника,Идентификационный номер заказа,Приоритет заказа,Модель детали,Стоимость\n";
	    
        // query = `select "order".id as "Идентификационный номер заказа", 
        //              "order".priority as "Приоритет заказа",
		//              detail.id as "Идентификационный номер детали", 
		//              detail.model as "Модель детали", 
        //              detail.cost as Стоимость, 
		//              client.id as "Идентификационный номер клиента", 
        //              client.full_name as "ФИО клиента", 
        //              client.phone_number as Телефон, 
        //              client.adress as Адрес, 
        //              deliver_emploee.id as "Идентификационный номер работника доставки",
        //              deliver_emploee.full_name as "ФИО работника доставки"
		// from "order", detail, client, deliver_emploee, delivery, quality_control, basket
		// where "order".id = ${orderId} and "order".id_detail = detail.id and "order".id_client = client.id 
        // and deliver_emploee.id = delivery.id_deliver_emploee and delivery.id_quality_control = quality_control.id and quality_control.id_basket = basket.id and basket.id_order = "order".id;`;

        // query = `SELECT 
            // "order".id AS "Идентификационный номер заказа", 
            // "order".priority AS "Приоритет заказа",
            // detail.id AS "Идентификационный номер детали", 
            // detail.model AS "Модель детали", 
            // detail.cost AS "Стоимость", 
            // client.id AS "Идентификационный номер клиента", 
            // client.full_name AS "ФИО клиента", 
            // client.phone_number AS "Телефон", 
            // client.adress AS "Адрес", 
            // deliver_emploee.id AS "Идентификационный номер работника доставки",
            // deliver_emploee.full_name AS "ФИО работника доставки"
        // FROM 
        //     "order"
        // JOIN detail ON "order".id_detail = detail.id 
        // JOIN client ON "order".id_client = client.id 
        // LEFT JOIN basket ON "order".id = basket.id_order
        // LEFT JOIN quality_control ON basket.id = quality_control.id_basket
        // LEFT JOIN delivery ON quality_control.id = delivery.id_quality_control
        // LEFT JOIN deliver_emploee ON delivery.id_deliver_emploee = deliver_emploee.id 
        // WHERE 
        //     "order".id = ${orderId};`
        

        // query = `SELECT 
        //     "order".id AS "Идентификационный номер заказа", 
        //     "order".priority AS "Приоритет заказа",
        //     detail.id AS "Идентификационный номер детали", 
        //     detail.model AS "Модель детали", 
        //     detail.cost AS "Стоимость", 
        //     client.id AS "Идентификационный номер клиента", 
        //     client.full_name AS "ФИО клиента", 
        //     client.phone_number AS "Телефон", 
        //     client.adress AS "Адрес", 
        //     deliver_emploee.id AS "Идентификационный номер работника доставки",
        //     deliver_emploee.full_name AS "ФИО работника доставки"
        // FROM 
        //     "order"
        // JOIN detail ON "order".id_detail = detail.id 
        // JOIN client ON "order".id_client = client.id 
        // LEFT JOIN delivery ON client.id = delivery.id_client
        // LEFT JOIN deliver_emploee ON delivery.id_deliver_emploee = deliver_emploee.id 
        // WHERE 
        //     "order".id = ${orderId};`;

		//forTable = "Идентификационный номер заказа,Приоритет заказа,Идентификационный номер детали,Модель детали,Стоимость,Идентификационный номер клиента,ФИО клиента,Телефон,Адрес,Идентификационный номер работника доставки,ФИО работника доставки\n";
	    
        // query = `select client.id, client.full_name, delivery.id from client LEFT JOIN delivery ON client.id = delivery.id_client;`;
        // query = `select
        //             client.id, client.full_name
        //     from client;`;
        // forTable = "";

        //alert(query); 
        } else if (inputId === "find_item_2") {
        

            query = `select 
                     client.full_name as "ФИО клиента", 
                     client.phone_number as Телефон, 
                     client.adress as Адрес, 
                     employee.full_name as "ФИО работника доставки", 
                     employee.experience as "Опыт работника",
                     "order".id as "Идентификационный номер заказа",
                     "order".priority as "Приоритет заказа",  
		             detail.model as "Модель детали", 
                     detail.cost as Стоимость
		from "order", detail, client, employee 
		where "order".id_detail = detail.id and "order".id_client = client.id and client.full_name LIKE '%${orderId}%' and "order".id_employee = employee.id
        order by "order".id asc;`;

        forTable = "ФИО клиента,Телефон,Адрес,ФИО работника доставки,Опыт работника,Идентификационный номер заказа,Приоритет заказа,Модель детали,Стоимость\n";

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
            query = `select deliver_emploee.id as "Идентификационный номер", 
                            employee.full_name as "ФИО работника доставки", 
                            deliver_emploee.phone_number as "Телефон", 
                            deliver_emploee.work_experience as "Опыт работы", 
                            deliver_emploee.rating as "Рейтинг" 
                     from public.deliver_emploee, employee
                     where employee.full_name LIKE '%${orderId}%' and employee.id = deliver_emploee.id
                     order by deliver_emploee.id asc;`;

		forTable = "Идентификационный номер,ФИО работника доставки,Телефон,Опыт работы,Рейтинг\n";
        }

        // Отправляем запрос и получаем ответ
	//alert(query);
        console.log(query);
        let response = await findItems(query); // Эта функция должна быть в request.js
        console.log(response.body);
        //alert(response.body.length);
        //let a = 'data = ' + response.data;
	//alert(a);
        // Обрабатываем ответ и создаем таблицу
        if (response && response.status === 'ok') {
            if (response.body.length === 0){
                alert('Нет подходящих данных в базе данных')
            } else{
                if (inputId === "find_item_1" || inputId === "find_item_2"){
                    lastResponseBody = response.body;
                    lastInputId = inputId;
                    //let PDF = fillPdfTemplate(response.body, inputId);
                    //console.log(PDF);
                } else if (inputId === "find_item_3"){
                    lastResponseBody = null;
                    lastInputId = inputId;
                }
                let headers = forTable.split(',');
                let completeData = [headers].concat(response.body);
                // Функция createTableFromResponse должна быть реализована для создания таблицы на основе ответа
                let table = createTableFromResponse(completeData, inputId); 
                document.getElementById(resultId).appendChild(table);
                if (inputId === "find_item_3"){
                    // Получаем и добавляем список лучших работников после таблицы
                    let bestWorkersListElement = await getBestWorkersList();
                    console.log(bestWorkersListElement);
                    if (bestWorkersListElement) {
                        document.getElementById(resultId).appendChild(bestWorkersListElement);
                    }
                }
            }
        } else {
            alert('Ошибка: Не удалось получить данные.');
        }
    } else {
        alert('Пожалуйста, введите корректный ID заказа.');
    }

}

async function preGenerateTable(resultId){
    let forTable;
    let query;
    query = `select 
                     client.full_name as "ФИО клиента", 
                     client.phone_number as Телефон, 
                     client.adress as Адрес, 
                     employee.full_name as "ФИО работника доставки", 
                     employee.experience as "Опыт работника",
                     "order".id as "Идентификационный номер заказа", 
                     "order".priority as "Приоритет заказа",
		             detail.model as "Модель детали", 
                     detail.cost as Стоимость
		from "order", detail, client, employee 
		where "order".id_detail = detail.id and "order".id_client = client.id and "order".id_employee = employee.id
        order by client.full_name asc;`;

	forTable = "ФИО клиента,Телефон,Адрес,ФИО работника доставки,Опыт работника,Идентификационный номер заказа,Приоритет заказа,Модель детали,Стоимость\n";
	let response = await findItems(query);
    if (response && response.status === 'ok') {
        if (response.body.length === 0){
            alert('Нет данных в базе данных')
        } else{
            let headers = forTable.split(',');
            let completeData = [headers].concat(response.body);
            let table = createTableFromResponse(completeData); 
            document.getElementById(resultId).appendChild(table);
        }
    } else {
        alert('Ошибка: Не удалось получить данные.');
    }

}



document.addEventListener('DOMContentLoaded', preGenerateTable);
document.addEventListener('DOMContentLoaded', function() {
    // Проверка наличия кнопки и добавление обработчика событий
    var generatePdfButton = document.getElementById('generate_pdf');
    if (generatePdfButton) {
        generatePdfButton.addEventListener('click', handlePdfGeneration);
    }
});

function createTableFromResponse(data, inputId) {
    let table = document.createElement('table');
    let previousValues = {}; // Объект для хранения предыдущих значений
    if (inputId === 'find_item_3'){
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
    } else {
        data.forEach((row, rowIndex) => {
            let tr = document.createElement('tr');
            row.forEach((cell, cellIndex) => {
                if (cellIndex === 6 || cellIndex === 7 || cellIndex === 8) { // Индекс столбца "Приоритет заказа"
                    let td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                    return; // Пропускаем объединение для этого столбца
                }
                // Проверка, нужно ли объединять ячейки
                if (rowIndex > 0 && data[rowIndex - 1][cellIndex] === cell) {
                    // Если текущее значение совпадает с предыдущим и не первая строка (заголовок)
                    if (previousValues[cellIndex]) {
                        // Увеличиваем количество объединенных строк для предыдущей ячейки
                        previousValues[cellIndex].rowSpan++;
                    }
                } else {
                    // Если значения не совпадают или первая строка, создаем новую ячейку
                    let td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                    // Сохраняем ссылку на ячейку и устанавливаем rowSpan в 1
                    previousValues[cellIndex] = td;
                    td.rowSpan = 1;
                }
            });
            table.appendChild(tr);
        });

        return table;
    }
}

function handlePdfGeneration() {
    if (lastResponseBody && lastInputId) {
        fillPdfTemplate(lastResponseBody, lastInputId);
    } else {
        alert('Сначала выполните поиск для получения данных о заказах.');
    }
}

document.getElementById('generate_pdf').addEventListener('click', handlePdfGeneration);

async function fillPdfTemplate(responseBody, inputId) {
    let n = 8;
    let clientName = responseBody[0][0];
    let clientAddress = responseBody[0][2];
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


    let currentDate = new Date();
    let formattedDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;

    // Заполняем шаблон данными
    let O = Object();
    O.file = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Акт приема передачи товара</title>
</head>
<body>

<h1 style="text-align:center;">АКТ ПРИЕМА-ПЕРЕДАЧИ ТОВАРА</h1>

<table width="100%">
    <tr>
      <td>Покупатель: <u>${clientName}</u></td>
    </tr>
    <tr>
      <td style="padding-left: 120px;">(ФИО)</td>
    </tr>
</table> 
<p>Адрес: <u>${clientAddress}</u></p>
<p>Продавец передал, а Покупатель принял в собственность надлежащего качества следующий Товар:</p>

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
      <td>Покупатель: <u>${clientName}</u>/ ___________</td>
      <td></td>
      <td><u>${formattedDate}</u></td>
    </tr>
    <tr>
      <td style="padding-left: 120px;">(ФИО/Подпись)</td>
      <td></td>
      <td style="padding-left: 30px;">(дата)</td>
    </tr>
</table> 
</body>
</html>
`;
    await SendPostRequest(O);
    downloadURI("/doc");
    return template;
}

// Функция, выполняющая SQL запрос и формирующая список лучших работников
async function getBestWorkersList() {
    // SQL запрос к базе данных
    let query = `select employee.full_name, deliver_emploee.rating 
                 from employee, deliver_emploee 
                 where employee.id = deliver_emploee.id 
                 order by deliver_emploee.rating desc;`;

    // Выполнение запроса
    let response = await findItems(query);

    // Проверка успешности выполнения запроса
    if (response && response.status === 'ok' && response.body.length > 0) {
        // Формирование списка лучших работников
        let bestWorkers = response.body;
        // Создаем элемент списка для вывода результатов
        let list = document.createElement('div');
        list.className = 'best-workers-list'; // Добавляем класс для стилей
        list.innerHTML = `<h3>Список лучших работников:</h3>`;

        // Получение лучших работников
        let firstPlace = bestWorkers.filter(worker => worker[1] === bestWorkers[0][1]);
        let secondPlace = bestWorkers.filter(worker => worker[1] === bestWorkers[firstPlace.length][1]);
        let thirdPlace = bestWorkers.filter(worker => worker[1] === bestWorkers[firstPlace.length + secondPlace.length][1]);

        // Добавление лучших работников в список
        if (firstPlace.length === 1){
            list.innerHTML += `<p class="gold">Первое место:</p><p> ${firstPlace.map(w => w[0]).join('<br>')}</p>`;
        } else {
            list.innerHTML += `<p class="gold">Первое место делят:</p><p> ${firstPlace.map(w => w[0]).join('<br>')}</p>`;
        }
        if (secondPlace.length === 1){
            list.innerHTML += `<br><p class="silver">Второе место:</p><p> ${secondPlace.map(w => w[0]).join('<br>')}</p>`;
        } else {
            list.innerHTML += `<br><p class="silver">Второе место делят:</p><p> ${secondPlace.map(w => w[0]).join('<br>')}</p>`;
        } if (thirdPlace.length === 1){
            list.innerHTML += `<br><p class="bronze">Третье место:</p><p> ${thirdPlace.map(w => w[0]).join('<br>')}</p>`;
        } else {
            list.innerHTML += `<br><p class="bronze">Третье место делят:</p><p> ${thirdPlace.map(w => w[0]).join('<br>')}</p>`;
        }

        return list;
    } else {
        // В случае ошибки или отсутствия данных
        alert('Ошибка: Не удалось получить данные или нет данных для отображения.');
        return null;
    }
}
