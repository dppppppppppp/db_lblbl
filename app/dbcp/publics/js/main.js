function init() {
    let basket = localStorage.getItem("basket");
    if (basket === null || basket === undefined) {
        return;
    }
    let c = document.querySelector("#my_box").value = basket;
}

function clear_search_result() {
    let box = document.querySelector("#search_result");
    while (box.firstChild) {
        box.removeChild(box.lastChild);
    }
}

function response_to_obj(response) {
    let res = Object();
    res.efficiency          = response[1];
    res.name                = response[2];
    res.energy_consumption  = response[3];
    res.cost                = response[4];
    res.warranty_period     = response[5];
    return res;
}


function create_card_discription(obj) {
    let time = "год";
    if (obj.warranty_period % 10 == 1) {
        time = "год";
    } else if (obj.warranty_period % 10 < 4 && obj.warranty_period > 1) {
        time = "года";
    } else {
        time = "лет";
    }
    let res = `Цена: ${obj.cost}$<br>
               Мощность: ${obj.efficiency}Дж/c<br>
               Гарантийный период: ${obj.warranty_period}${time}<br>
               Модель: ${obj.name}<br>
               Потребление: ${obj.energy_consumption}кВт·ч<br>
               `;
    return res;
}

function card_on_click(e) {
    let model = this.querySelector(".card-title").textContent;
    let basket = localStorage.getItem("basket");
    if (basket === null || basket === undefined) {
        localStorage.setItem("basket", model);
    } else {
        localStorage.setItem("basket", basket + ";" + model);
    }
    alert("Модель: " + model + "\nу вас в корзине!\nМожете заказать её в личном кабинете");
}

function create_searc_card(obj) {
    let box = document.createElement("div");
    let title = document.createElement("div");
    let discription = document.createElement("div");
    
    title.textContent = obj.name;
    discription.innerHTML = create_card_discription(obj);

    title.classList.add("card-title");
    discription.classList.add("card-discription");
    
    box.appendChild(title);
    box.appendChild(discription);
    box.classList.add("card");
    box.addEventListener("click", card_on_click);
    return box;
}

function add_search_card(card) {
    let box = document.querySelector("#search_result");
    box.appendChild(card);
}

function add_search_cards_all(arr) {
    let min_match = 7;
    let search_pattern = document.querySelector("#find_item").value.toLowerCase();
    let result = new Array();
    arr.forEach((el) => {
        let card = response_to_obj(el);
        card.match = levenshtein(search_pattern, card.name.toLowerCase());
        result.push(card);
    });
    if (search_pattern.length != 0) {
        result.sort((a, b) => {
            return a.match < b.match ? -1: 1;
        });
    }
    result.forEach((el) => {
        if (search_pattern.length == 0 || min_match >= el.match) {
            card = create_searc_card(el);
            add_search_card(card);
        }
    });
}

/**
 * @param {string} s1 Исходная строка
 * @param {string} s2 Сравниваемая строка
 * @param {object} [costs] Веса операций { [replace], [replaceCase], [insert], [remove] }
 * @return {number} Расстояние Левенштейна
 */
function levenshtein(s1, s2, costs) {
    var i, j, l1, l2, flip, ch, chl, ii, ii2, cost, cutHalf;
    l1 = s1.length;
    l2 = s2.length;

    costs = costs || {};
    var cr = costs.replace || 1;
    var cri = costs.replaceCase || costs.replace || 1;
    var ci = costs.insert || 1;
    var cd = costs.remove || 1;

    cutHalf = flip = Math.max(l1, l2);

    var minCost = Math.min(cd, ci, cr);
    var minD = Math.max(minCost, (l1 - l2) * cd);
    var minI = Math.max(minCost, (l2 - l1) * ci);
    var buf = new Array((cutHalf * 2) - 1);

    for (i = 0; i <= l2; ++i) {
        buf[i] = i * minD;
    }

    for (i = 0; i < l1; ++i, flip = cutHalf - flip) {
        ch = s1[i];
        chl = ch.toLowerCase();

        buf[flip] = (i + 1) * minI;

        ii = flip;
        ii2 = cutHalf - flip;

        for (j = 0; j < l2; ++j, ++ii, ++ii2) {
            cost = (ch === s2[j] ? 0 : (chl === s2[j].toLowerCase()) ? cri : cr);
            buf[ii + 1] = Math.min(buf[ii2 + 1] + cd, buf[ii] + ci, buf[ii2] + cost);
        }
    }
    return buf[l2 + cutHalf - flip];
}


function close_lk() {
    document.querySelector(".lk-bg-wrapper").style.visibility = "hidden";
    document.querySelector(".lk-bg-wrapper").style.opacity = 0;
}

function open_lk() {
    document.querySelector(".lk-bg-wrapper").style.visibility = "visible";
    document.querySelector(".lk-bg-wrapper").style.opacity = 1;
    init();
}













