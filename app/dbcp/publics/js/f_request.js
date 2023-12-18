function downloadURI(uri) {
    var link = document.createElement("a");
    link.setAttribute('download', "doc.pdf");
    link.href = uri;
    link.target = '_blank'; // Добавляем это для открытия в новой вкладке
    document.body.appendChild(link);
    link.click();
    link.remove();
}
/* ещё какой-то пример, как это используется
async function createNewProject() {
    let obj = new Object();
    obj.type = "update";
    obj.aim = "Project";
    obj.name = document.getElementById("project_name_input_field").value;
               document.getElementById("project_name_input_field").value = "";
    let response = await SendPostRequest("/serv", obj);
    if (JSON.stringify(response).length != 0 && response.status == "ok") {
        updateCreatedProjects();
    } else {
        console.log("Ошибка создания карточки")
    }
    return response;
}
*/

// обфзательно слово async
async function findItems(query) {
    /*
    // выбираем какие вам нужно данные с вашей страницы
    // я тут достаю параметры для сортировки результатов
    let filters = document.querySelector("#filters");
    if (filters == undefined) return null;
    filters = filters.querySelectorAll("input[type=checkbox]");
    let keys = [];
    options.forEach((el) => {
        if (el.checked) {
            keys.push(el.id)
        }     
    });
    // в keys лежат слова по которым я хочу сортить
    // Далее как-то генерируете SQL запрос, который отправите мне на сервер.
    let query = "select * from details"
    if (keys.length > 0) {
        query += "order by ";
        for (let i = 0; i < keys.length; ++i) {
            query += keys[i];
            if (i != keys.length - 1) {
                query += ", ";
            }
        }
    }
    // query = "select * from details order by weight, price..."
    // ну я не помню есть ли такие поля в таблице, это пример из головы. Жду от вас валидный sql код, который на нашей базе должен сработать!!!
    */
    //alert('1');

    let message = new Object()
    //alert('2');
    message.query = query // тут ничего не меняем
    //alert(message);
    // придумайте свой url, везде его юзайте первым аргументом
    //alert(message);
    //alert('3');
    let response = await SendPostRequest(message);
    //alert('*');
    //let a = 'body: ' + response.body;
    //alert(a);
    if (JSON.stringify(response).length == 0 || response.status != "ok") { // этот иф не трогать
        // вы послали плохой запрос, сервер ничего не ответил((((
        alert("https://youtube.com/shorts/aI-PT_8JD_U?si=MfRad0DTTnAtbQX4");
        return;
    }
    // всё отлично доставайте свои данные
    // как именно их доставать пока не знаю
    // напишите пока просто
    return response;
}

/*
SQL-запросы, мб рабочие, но это не точно:

Для информации о заказе:
select order.id as Идентификационный номер заказа, detail.id as Идентификационный номер детали, detail.model as Модель детали, detail.cost as Стоимость, client.id as Идентификационный номер клиента, client.full_name as ФИО клиента, client.phone_number as Телефон, client.adress as Адрес, employee.id as Идентификационный номер работника, employee.full_name as ФИО работника, employee.experience as Опыт работника from order, detail, client, employee where order.id = [какому-то конкретному значению] and order.id_detail = detail.id and order.id_client = client.id and order.id_employee = employee.id;

Для информации о клиенте:
select id as Идентификационный номер, full_name as ФИО клиента, phone_number as Телефон, adress as Адрес, bonus_lvl as Бонусный уровень from client where id = [какому-то конкретному значению];

Для информации о сотрудниках доставки:
select id as Идентификационный номер, full_name as ФИО работника доставки, phone_number as Телефон, work_experience as Опыт работы, rating as Рейтинг from deliver_employee where id = [какому-то конкретному значению];


*/
