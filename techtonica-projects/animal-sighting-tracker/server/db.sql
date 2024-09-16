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
-- Name: individuals; Type: TABLE; Schema: public; Owner: mj
--

CREATE TABLE public.individuals (
    nickname character varying,
    scientist character varying,
    record_timestamp timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    id integer NOT NULL,
    "species.id" integer
);


ALTER TABLE public.individuals OWNER TO mj;

--
-- Name: individuals_individual.id_seq; Type: SEQUENCE; Schema: public; Owner: mj
--

CREATE SEQUENCE public."individuals_individual.id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."individuals_individual.id_seq" OWNER TO mj;

--
-- Name: individuals_individual.id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mj
--

ALTER SEQUENCE public."individuals_individual.id_seq" OWNED BY public.individuals.id;


--
-- Name: sightings; Type: TABLE; Schema: public; Owner: mj
--

CREATE TABLE public.sightings (
    date_of_sighting timestamp with time zone,
    location character varying,
    is_healthy boolean,
    sighter_email character varying,
    record_timestamp timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    id integer NOT NULL,
    "individual.id" integer
);


ALTER TABLE public.sightings OWNER TO mj;

--
-- Name: sightings_id_seq; Type: SEQUENCE; Schema: public; Owner: mj
--

CREATE SEQUENCE public.sightings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sightings_id_seq OWNER TO mj;

--
-- Name: sightings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mj
--

ALTER SEQUENCE public.sightings_id_seq OWNED BY public.sightings.id;


--
-- Name: species; Type: TABLE; Schema: public; Owner: mj
--

CREATE TABLE public.species (
    common_name character varying,
    scientific_name character varying,
    number_in_wild integer,
    conservation_status_code character varying,
    record_timestamp timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    id integer NOT NULL
);


ALTER TABLE public.species OWNER TO mj;

--
-- Name: species_species.id_seq; Type: SEQUENCE; Schema: public; Owner: mj
--

CREATE SEQUENCE public."species_species.id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."species_species.id_seq" OWNER TO mj;

--
-- Name: species_species.id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mj
--

ALTER SEQUENCE public."species_species.id_seq" OWNED BY public.species.id;


--
-- Name: individuals id; Type: DEFAULT; Schema: public; Owner: mj
--

ALTER TABLE ONLY public.individuals ALTER COLUMN id SET DEFAULT nextval('public."individuals_individual.id_seq"'::regclass);


--
-- Name: sightings id; Type: DEFAULT; Schema: public; Owner: mj
--

ALTER TABLE ONLY public.sightings ALTER COLUMN id SET DEFAULT nextval('public.sightings_id_seq'::regclass);


--
-- Name: species id; Type: DEFAULT; Schema: public; Owner: mj
--

ALTER TABLE ONLY public.species ALTER COLUMN id SET DEFAULT nextval('public."species_species.id_seq"'::regclass);


--
-- Data for Name: individuals; Type: TABLE DATA; Schema: public; Owner: mj
--

COPY public.individuals (nickname, scientist, record_timestamp, id, "species.id") FROM stdin;
Stinger	Dr. Robert Black	2024-09-16 11:01:28.87852-07	1	3
Buzz	Dr. Alice White	2024-09-16 11:01:28.87852-07	2	3
Bruno	Dr. James Brown	2024-09-16 11:01:28.87852-07	3	2
Baloo	Dr. Emily Green	2024-09-16 11:01:28.87852-07	4	2
Shadow	Dr. John Smith	2024-09-16 11:01:28.87852-07	5	1
Scarlet\n	Dr. Jane Doe	2024-09-16 11:01:28.87852-07	6	1
\.


--
-- Data for Name: sightings; Type: TABLE DATA; Schema: public; Owner: mj
--

COPY public.sightings (date_of_sighting, location, is_healthy, sighter_email, record_timestamp, id, "individual.id") FROM stdin;
0024-09-10 05:22:02-07:52:58	37.791278, -122.394680	t	robert.black@example.com	2024-09-16 11:08:19.214212-07	1	5
2024-08-22 04:25:00-07	Yellowstone East Entrance	f	alice.white@example.com	2024-09-16 11:08:19.214212-07	2	4
2024-07-01 01:00:00-07	Ganges Riverbank	t	james.brown@example.com	2024-09-16 11:08:19.214212-07	3	3
2024-06-15 10:40:00-07	California	t	emily.green@example.com	2024-09-16 11:08:19.214212-07	4	2
2024-05-05 07:20:00-07	Yellowstone North Gate	f	john.smith@example.com	2024-09-16 11:08:19.214212-07	5	1
2024-04-01 02:45:00-07	37.791278, -122.394680	t	jane.doe@example.com	2024-09-16 11:08:19.214212-07	6	1
2024-03-01 04:30:00-08	Yellowstone North Gate	t	john.smith@example.com	2024-09-16 11:08:19.214212-07	7	6
\.


--
-- Data for Name: species; Type: TABLE DATA; Schema: public; Owner: mj
--

COPY public.species (common_name, scientific_name, number_in_wild, conservation_status_code, record_timestamp, id) FROM stdin;
Red Wolf	canis rufus	25	CR -critically endangered 	2024-01-08 04:05:06-08	1
Sloth Bear	Melursus ursinus	19999	VU -vulnerable	2024-03-11 08:15:43-07	2
Rust Patched Bumble Bee	Bombus affinis	471	CR -critically endangered	2024-09-16 08:41:06-07	3
\.


--
-- Name: individuals_individual.id_seq; Type: SEQUENCE SET; Schema: public; Owner: mj
--

SELECT pg_catalog.setval('public."individuals_individual.id_seq"', 6, true);


--
-- Name: sightings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mj
--

SELECT pg_catalog.setval('public.sightings_id_seq', 7, true);


--
-- Name: species_species.id_seq; Type: SEQUENCE SET; Schema: public; Owner: mj
--

SELECT pg_catalog.setval('public."species_species.id_seq"', 3, true);


--
-- Name: individuals individuals_pkey; Type: CONSTRAINT; Schema: public; Owner: mj
--

ALTER TABLE ONLY public.individuals
    ADD CONSTRAINT individuals_pkey PRIMARY KEY (id);


--
-- Name: sightings sightings_pkey; Type: CONSTRAINT; Schema: public; Owner: mj
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sightings_pkey PRIMARY KEY (id);


--
-- Name: species species_pkey; Type: CONSTRAINT; Schema: public; Owner: mj
--

ALTER TABLE ONLY public.species
    ADD CONSTRAINT species_pkey PRIMARY KEY (id);


--
-- Name: individuals individuals_species.id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mj
--

ALTER TABLE ONLY public.individuals
    ADD CONSTRAINT "individuals_species.id_fkey" FOREIGN KEY ("species.id") REFERENCES public.species(id) NOT VALID;


--
-- Name: sightings sightings_individual.id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mj
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT "sightings_individual.id_fkey" FOREIGN KEY ("individual.id") REFERENCES public.individuals(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

