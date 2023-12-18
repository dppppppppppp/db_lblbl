function downloadURI(uri) {
    var link = document.createElement("a");
    link.setAttribute('download', "doc.pdf");
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    link.remove();
}
// обфзательно слово async
async function findItems(query) {

    let message = new Object()
    message.query = query // тут ничего не меняем
    let response = await SendPostRequest(message);
    if (JSON.stringify(response).length == 0 || response.status != "ok") { // этот иф не трогать
        alert("Я лох!!!! сука блять");
        alert("https://youtube.com/shorts/aI-PT_8JD_U?si=MfRad0DTTnAtbQX4");
        return;
    }
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
