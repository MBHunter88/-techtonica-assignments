--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Homebrew)
-- Dumped by pg_dump version 14.12 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: events; Type: TABLE; Schema: public; Owner: mj
--

CREATE TABLE public.events (
    id integer NOT NULL,
    name character varying(255),
    date date,
    category character varying(255)
);


ALTER TABLE public.events OWNER TO mj;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: mj
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_id_seq OWNER TO mj;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mj
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: students; Type: TABLE; Schema: public; Owner: tpl1122_19
--

CREATE TABLE public.students (
    id integer NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    is_current boolean
);


ALTER TABLE public.students OWNER TO tpl1122_19;

--
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_19
--

CREATE SEQUENCE public.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.students_id_seq OWNER TO tpl1122_19;

--
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1122_19
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: mj
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: students id; Type: DEFAULT; Schema: public; Owner: tpl1122_19
--

ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: mj
--

COPY public.events (id, name, date, category) FROM stdin;
1	Tech Conference	2024-01-15	Conference
2	Music Festival	2024-02-20	Music
3	Art Exhibition	2024-03-05	Exhibition
4	Food Fair	2024-04-10	Food
5	Startup Pitch Night	2024-05-22	Business
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: tpl1122_19
--

COPY public.students (id, firstname, lastname, is_current) FROM stdin;
\.


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mj
--

SELECT pg_catalog.setval('public.events_id_seq', 5, true);


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_19
--

SELECT pg_catalog.setval('public.students_id_seq', 1, false);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: mj
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_19
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

