--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

CREATE TABLE basket (
    id integer NOT NULL,
    id_detail integer NOT NULL,
    id_order integer NOT NULL,
    cost integer NOT NULL,
    weight integer NOT NULL,
    id_transport integer NOT NULL
);




--
-- Name: client; Type: TABLE; Schema:  Owner: postgres
--

CREATE TABLE client (
    id integer NOT NULL,
    full_name character varying(100) NOT NULL,
    phone_number character varying(12) NOT NULL,
    adress text NOT NULL,
    bonus_lvl integer DEFAULT 0
);




--
-- Name: client_id_seq; Type: SEQUENCE; Schema:  Owner: postgres
--

ALTER TABLE client ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME client_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: deliver_emploee; Type: TABLE; Schema:  Owner: postgres
--

CREATE TABLE deliver_emploee (
    id integer NOT NULL,
    full_name character varying(100) NOT NULL,
    phone_number character varying(12) NOT NULL,
    work_experience integer,
    rating integer
);




--
-- Name: delivery; Type: TABLE; Schema:  Owner: postgres
--

CREATE TABLE delivery (
    id integer NOT NULL,
    id_client integer NOT NULL,
    date_receipt timestamp with time zone NOT NULL,
    date_departure timestamp with time zone NOT NULL,
    id_deliver_emploee integer NOT NULL,
    id_quality_control integer NOT NULL
);




--
-- Name: detail; Type: TABLE; Schema:  Owner: postgres
--

CREATE TABLE detail (
    id integer NOT NULL,
    efficiency numeric NOT NULL,
    model text NOT NULL,
    energy_consumption numeric NOT NULL,
    cost numeric NOT NULL,
    warranty_period numeric NOT NULL
);




--
-- Name: employee; Type: TABLE; Schema:  Owner: postgres
--

CREATE TABLE employee (
    id integer NOT NULL,
    full_name character varying(100) NOT NULL,
    "position" text NOT NULL,
    experience integer NOT NULL,
    persent_for_order numeric NOT NULL
);




--
-- Name: order; Type: TABLE; Schema:  Owner: postgres
--

CREATE TABLE "order" (
    id integer NOT NULL,
    id_detail integer NOT NULL,
    id_client integer NOT NULL,
    id_employee integer NOT NULL,
    priority integer
);




--
-- Name: quality_control; Type: TABLE; Schema:  Owner: postgres
--

CREATE TABLE quality_control (
    id integer NOT NULL,
    employee_number integer NOT NULL,
    quality numeric NOT NULL,
    date_finish timestamp with time zone NOT NULL,
    date_start timestamp with time zone,
    id_basket integer
);




--
-- Name: transport_service; Type: TABLE; Schema:  Owner: postgres
--

CREATE TABLE transport_service (
    id integer NOT NULL,
    date_receipt timestamp with time zone NOT NULL,
    date_departure timestamp with time zone NOT NULL,
    track_number integer
);




--
-- Data for Name: basket; Type: TABLE DATA; Schema:  Owner: postgres
--

COPY basket (id, id_detail, id_order, cost, weight, id_transport) FROM stdin;
1	2	1	400	3	1
2	3	2	300	1	2
4	6	4	1000	8	4
5	3	5	300	1	5
7	9	7	10000	11	7
8	2	8	400	3	8
10	3	10	300	1	10
\.


--
-- Data for Name: client; Type: TABLE DATA; Schema:  Owner: postgres
--

COPY client (id, full_name, phone_number, adress, bonus_lvl) FROM stdin;
4	Ли Петр Никитич\n	74859612377	Самара\n	1
5	Котов Николай Ильич	78945612374\n	Крым	2
7	Спокойный Петр Ярославович	74474744747	Новосибирск	4
8	Нервный Николай Романович	23452123456\n	Подольск	0
9	Дубров Дмитрий Дмитриевич\n	74474556644\n	Павловск	1
10	Пушкин Александр Сергеевич\n	11111111111\n	Екатеринбург	5
11	Шинель Акакий Акакьевич	88005553535	Омск	0
6	Журавлева Александра Алексеевна	74185296374	Москва	3
1	Афанасий Эдуардович Бах	89609418736	Иркутск	0
2	Афанас Эдуардович Бах	89609418736	Иркутск	0
3	Афас Эдуардович Бах	89609418736	Иркутск	0
12	Афас Эдуович Бах	89609418736	Иркутск	0
\.


--
-- Data for Name: deliver_emploee; Type: TABLE DATA; Schema:  Owner: postgres
--

COPY deliver_emploee (id, full_name, phone_number, work_experience, rating) FROM stdin;
1	Алексеев Алексей Иванович	11111111111	4	4
2	Алексеев Владимир Иванович	22222222222	1	1
3	Алексеев Иван Иванович	33333333333\n	23	10
4	Алексеев Петр Иванович	44444444444	0	0
5	Алексеев Павел Иванович	55555555555	12	8
6	Андреев Иван Алексеевич	66666666666	2	6
7	Андреев Андрей Александрович	77777777777	5	4
8	Андрюшин Олег Вадимович	88888888888	7	7
9	Андрюшина Елена Борисовна	99999999999	10	10
10	Алексеева Мария Алексеевна	12336665447	3	10
\.


--
-- Data for Name: delivery; Type: TABLE DATA; Schema:  Owner: postgres
--

COPY delivery (id, id_client, date_receipt, date_departure, id_deliver_emploee, id_quality_control) FROM stdin;
4	4	1999-01-12 19:35:20+03	1999-01-12 21:35:20+03	5	4
5	8	1999-01-13 12:12:20+03	1999-01-13 18:12:20+03	1	5
7	10	1999-01-15 17:12:20+03	1999-01-17 12:35:51+03	4	7
8	9	1999-01-16 18:13:20+03	1999-01-17 23:13:20+03	2	8
10	5	1999-01-17 04:11:53+03	1999-01-17 23:13:36+03	7	10
\.


--
-- Data for Name: detail; Type: TABLE DATA; Schema:  Owner: postgres
--

COPY detail (id, efficiency, model, energy_consumption, cost, warranty_period) FROM stdin;
1	1000	V500PSuper	3784	798	1
2	1500	ESP200	3215	400	2
3	1200	RW500QW	2000	300	1
4	1300	QDAE124	1000	200	0
5	1313	ERR404	1999	445	5
6	1312	ASWER3456	3450	1000	3
7	1234	KGH1857	1857	1040	2
8	1080	MG1000WE	1956	900	1
9	1122	QW500RTY	2500	10000	3
10	1414	OP890SDF	1070	3000	2
\.


--
-- Data for Name: employee; Type: TABLE DATA; Schema:  Owner: postgres
--

COPY employee (id, full_name, "position", experience, persent_for_order) FROM stdin;
1	Ткаченко Егор Юрьевич	техник	5	15
2	Соболин Тимофей Сергеевич	сантехник	0	1
3	Погожев Максим Юрьевич	мастер	10	20
4	Краткий Олег Егорович	стажер	0	0
5	Черноус Алексей Тимофеевич	техник	2	12
6	Хватит Иван Денисович	программист	1	11
7	Шумилова Александра Алексеевна	мастер	2	7
8	Меркулов Федор Алексеевич	программист	10	20
9	Шумилов Даниил Анатольевич	техник	3	0
10	Рылов Анатолий Денисович	стажер	0	0
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema:  Owner: postgres
--

COPY "order" (id, id_detail, id_client, id_employee, priority) FROM stdin;
1	2	6	3	2
2	4	5	2	5
4	3	8	1	6
5	5	10	2	10
7	9	7	9	9
8	10	4	8	4
10	7	9	4	8
\.


--
-- Data for Name: quality_control; Type: TABLE DATA; Schema:  Owner: postgres
--

COPY quality_control (id, employee_number, quality, date_finish, date_start, id_basket) FROM stdin;
1	200	80	1999-01-09 09:05:06+03	1999-01-09 07:05:06+03	1
2	300	70	1999-01-09 14:05:06+03	1999-01-09 12:05:06+03	2
4	246	89	1999-01-12 19:35:20+03	1999-01-12 16:35:20+03	4
5	123	80	1999-01-13 12:12:20+03	1999-01-12 14:35:20+03	5
7	1234	99	1999-01-15 17:12:20+03	1999-01-15 15:12:20+03	7
8	22	60	1999-01-16 18:13:20+03	1999-01-16 12:13:20+03	8
10	214	90	1999-01-17 04:11:53+03	1999-01-17 02:11:53+03	10
\.


--
-- Data for Name: transport_service; Type: TABLE DATA; Schema:  Owner: postgres
--

COPY transport_service (id, date_receipt, date_departure, track_number) FROM stdin;
1	1999-01-09 07:05:06+03	1999-01-09 07:05:06+03	11111
2	1999-01-08 04:08:57+03	1999-01-09 12:05:06+03	22222
3	1999-01-09 11:22:06+03	1999-01-10 09:05:06+03	33333
4	1999-01-11 13:05:20+03	1999-01-12 16:35:20+03	44444
5	1999-01-12 11:05:20+03	1999-01-12 14:35:20+03	55555
6	1999-01-14 23:11:22+03	1999-01-15 08:12:20+03	6666
7	1999-01-15 01:11:23+03	1999-01-15 15:12:20+03	7777
8	1999-01-16 02:13:20+03	1999-01-16 12:13:20+03	88888
9	1999-01-16 07:19:52+03	1999-01-16 19:17:54+03	9999
10	1999-01-16 20:16:26+03	1999-01-17 02:11:53+03	1212
\.


--
-- Name: client_id_seq; Type: SEQUENCE SET; Schema:  Owner: postgres
--

SELECT pg_catalog.setval('client_id_seq', 12, true);


--
-- Name: client client_pkey; Type: CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);


--
-- Name: deliver_emploee deliver_emploee_pkey; Type: CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY deliver_emploee
    ADD CONSTRAINT deliver_emploee_pkey PRIMARY KEY (id);


--
-- Name: delivery delivery_pkey; Type: CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY delivery
    ADD CONSTRAINT delivery_pkey PRIMARY KEY (id);


--
-- Name: detail detail_pkey; Type: CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY detail
    ADD CONSTRAINT detail_pkey PRIMARY KEY (id);


--
-- Name: employee employee_pkey; Type: CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (id);


--
-- Name: basket id_pkey; Type: CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY basket
    ADD CONSTRAINT id_pkey PRIMARY KEY (id);


--
-- Name: order order_pkey; Type: CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY "order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);


--
-- Name: quality_control quality_control_pkey; Type: CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY quality_control
    ADD CONSTRAINT quality_control_pkey PRIMARY KEY (id);


--
-- Name: transport_service transport_service_pkey; Type: CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY transport_service
    ADD CONSTRAINT transport_service_pkey PRIMARY KEY (id);


--
-- Name: quality_control fk_basket; Type: FK CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY quality_control
    ADD CONSTRAINT fk_basket FOREIGN KEY (id_basket) REFERENCES basket(id) ON DELETE CASCADE NOT VALID;


--
-- Name: delivery fk_client; Type: FK CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY delivery
    ADD CONSTRAINT fk_client FOREIGN KEY (id_client) REFERENCES client(id) ON DELETE CASCADE NOT VALID;


--
-- Name: delivery fk_delivery; Type: FK CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY delivery
    ADD CONSTRAINT fk_delivery FOREIGN KEY (id_deliver_emploee) REFERENCES deliver_emploee(id) ON DELETE CASCADE NOT VALID;


--
-- Name: basket fk_detail; Type: FK CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY basket
    ADD CONSTRAINT fk_detail FOREIGN KEY (id_detail) REFERENCES detail(id) ON DELETE CASCADE NOT VALID;


--
-- Name: order fk_detail; Type: FK CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY "order"
    ADD CONSTRAINT fk_detail FOREIGN KEY (id_detail) REFERENCES detail(id) ON DELETE CASCADE NOT VALID;


--
-- Name: order fk_id_client; Type: FK CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY "order"
    ADD CONSTRAINT fk_id_client FOREIGN KEY (id_client) REFERENCES client(id) ON DELETE CASCADE NOT VALID;


--
-- Name: order fk_id_emploee; Type: FK CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY "order"
    ADD CONSTRAINT fk_id_emploee FOREIGN KEY (id_employee) REFERENCES employee(id) ON DELETE CASCADE NOT VALID;


--
-- Name: basket fk_order; Type: FK CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY basket
    ADD CONSTRAINT fk_order FOREIGN KEY (id_order) REFERENCES "order"(id) ON DELETE CASCADE NOT VALID;


--
-- Name: delivery fk_quality; Type: FK CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY delivery
    ADD CONSTRAINT fk_quality FOREIGN KEY (id_quality_control) REFERENCES quality_control(id) ON DELETE CASCADE NOT VALID;


--
-- Name: basket fk_transport; Type: FK CONSTRAINT; Schema:  Owner: postgres
--

ALTER TABLE ONLY basket
    ADD CONSTRAINT fk_transport FOREIGN KEY (id_transport) REFERENCES transport_service(id) ON DELETE CASCADE NOT VALID;


--
-- PostgreSQL database dump complete
--

