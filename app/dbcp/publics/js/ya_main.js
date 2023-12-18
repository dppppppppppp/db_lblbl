async function submitForm(event) {

    var employeeNumber = document.getElementById("employee_number").value;
    var quality = document.getElementById("quality").value;
    var dateStar = document.getElementById("date_start").value;
    var dateFinis = document.getElementById("date_finish").value;
    var idBasket = document.getElementById("id_basket").value;

    if (employeeNumber == "" || quality == "" || dateStar == "" || dateFinis == "" || idBasket == "") {
        alert("Пожалуйста, заполните все поля!");
        return;
    }
    if (quality > 100) {
        alert("Качество не может быть больше 100%");
        return;
    }
    let query_id = "SELECT MAX(id) FROM quality_control;"
    let response = await findItems(query_id);
    let res = response.body;
    let idNumber = Number(res[0][0]) + 1;
    String(idNumber);
    let dateStart = "'" + dateStar + "'";
    let dateFinish = "'" + dateFinis + "'";
    console.log(dateStart);
    var data = {    
        id: idNumber,
        employee_number: employeeNumber,
        quality: quality,
        date_start: dateStart,
        date_finish: dateFinish,
        id_basket: idBasket
    };
    let query;
    query = "insert into quality_control values (" + data.id + "," + data.employee_number + "," + data.quality + "," + data.date_finish + "," + data.date_start + "," + data.id_basket + ")";
    console.log(query);
    findItems(query);
    //document.myForm.reset();
    getQuality_control();
    getPDF(idNumber);
}


async function getQuality_control() {
    var query = "SELECT * FROM quality_control;";
    let response = await findItems(query);
    if (response && response.status === 'ok') {
        let res = response.body
        displayQuality_control(res);
    }
}
function displayQuality_control(res) {
    var employeeList = document.getElementById("employee_list");
    employeeList.innerHTML = "";
    
    for (var j = 0; j < res.length; j++) {
      let dat = res[j];
      var li = document.createElement("li");
      li.innerHTML =
        "ID: " + dat[0] + "<br>" +
        "Номер работника: " + dat[1] + "<br>" +
        "Итоговое качество: " + dat[2] + "<br>" +
        "Дата и время начала: " + dat[4] + "<br>" +
        "Дата и время окончания: " + dat[3] + "<br>" +
        "ID корзины: " + dat[5];
  
      employeeList.appendChild(li);
    }
    
  }
 window.onload = function() {
    getQuality_control();
  }

  async function getPDF(idNumber) {
  var query = `SELECT * FROM quality_control WHERE id = ${idNumber};`;
    let response = await findItems(query);
    let res = response.body;
    var productCheck = {
        id: res[0][0],
        employee_number: res[0][1],
        date_start: res[0][4],
        date_finish: res[0][3],
        id_basket: res[0][5],
        quality: res[0][2]
      };
    let O = Object();
    O.file =`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
          <style> 
          body {
              text-align: center;
          }
          .container {
              text-align: left;
          }
          .first-line {
              text-indent: 2em;
              font-size: larger;
          }
          .first-line2 {
              text-indent: 2em;
              font-size: larger;
              text-decoration: underline;
          }
          .percentage-value {
              text-decoration: underline;
              font-size: larger;
          }
          .print-location {
              text-align: right;
          }
          </style>
      </head>
      <body>
          <h1>АКТ О ИТОГОВОЙ ПРОВЕРКЕ ПРОДУКТА</h1>
          <div class="container">
              <br />
              <p class="first-line2"> Данные о ходе проверки: </p>
              <p class="first-line">Проводилась проверка под внутренним номером <u>${productCheck.id} </u>. Был ответственным за проведение проверки сотрудник с внутренним номером <u>${productCheck.employee_number} </u>. Полное время поступления товара <u>${productCheck.date_start} </u>. Полное время окончания проверки товара <u>${productCheck.date_finish} </u>. По данным транспортных перевозок изначально данный товар содержался в корзине <u>${productCheck.id_basket} </u>. В ходе проверки были проверены заявленные производителем габариты товара, его вес, его соответствие внешнему виду на упаковке, заявленные производителем технические характеристики.</p>
              <br />
              <p class="first-line">Процентное значение проверки качества товара: <u class="percentage-value"> ${productCheck.quality} </u></p>
              <br />
              <p class="print-location">Место для печати смены</p>
          </div>

      </body>
      </html>

      
      
      `;
    await SendPostRequest(O);
    downloadURI("/doc")
    return "aboba";

  }
