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
    species_id integer,
    image_url character varying
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
    individual_id integer
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
    id integer NOT NULL,
    image_url character varying,
    description character varying
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

COPY public.individuals (nickname, scientist, record_timestamp, id, species_id, image_url) FROM stdin;
Stinger	Dr. Robert Black	2024-09-16 11:01:28.87852-07	1	3	/images/stinger_bee.png
Buzz	Dr. Alice White	2024-09-16 11:01:28.87852-07	2	3	/images/buzz_bee.png
Bruno	Dr. James Brown	2024-09-16 11:01:28.87852-07	3	2	/images/bruno_slothbear.png
Baloo	Dr. Emily Green	2024-09-16 11:01:28.87852-07	4	2	/images/baloo_slothbear.png
Shadow	Dr. John Smith	2024-09-16 11:01:28.87852-07	5	1	/images/shadow_redwolf.png
Scarlet	Dr. Jane Doe	2024-09-16 11:01:28.87852-07	6	1	/images/scarlet_redwolf.png
Charlie	Dr. Chevaeux 	2024-09-17 16:29:54.015952-07	8	2	/images/charlie_slothbear.png
Betsy	Dr. Dre	2024-09-17 16:17:20.132563-07	7	3	/images/betsy_bee.png
Bruce	Dr. Kathy Givens	2024-09-18 17:57:19.40861-07	10	1	/images/bruce_redwolf.png
Betsy	Dr. Dre	2024-09-19 21:25:42.908567-07	12	1	\N
\.


--
-- Data for Name: sightings; Type: TABLE DATA; Schema: public; Owner: mj
--

COPY public.sightings (date_of_sighting, location, is_healthy, sighter_email, record_timestamp, id, individual_id) FROM stdin;
2024-07-01 01:00:00-07	Ganges Riverbank	t	james.brown@example.com	2024-09-16 11:08:19.214212-07	3	3
2024-09-18 00:00:00-07	Compton, CA	t	test@test.com	2024-09-17 19:55:33.571742-07	17	7
2024-06-15 10:40:00-07	California	t	alice.white@example.com	2024-09-16 11:08:19.214212-07	4	2
2024-05-05 07:20:00-07	Yellowstone North Gate	f	robert.black@example.com	2024-09-16 11:08:19.214212-07	5	1
2024-04-01 02:45:00-07	37.791278, -122.394680	t	robert.black@example.com	2024-09-16 11:08:19.214212-07	6	1
2024-03-01 04:30:00-08	Yellowstone North Gate	t	jane.doe@example.com	2024-09-16 11:08:19.214212-07	7	6
2024-09-19 00:00:00-07	Compton, CA	t	test@test.com	2024-09-19 10:28:09.654777-07	25	10
2024-08-22 04:25:00-07	Yellowstone East Entrance	t	emily.green@example.com	2024-09-16 11:08:19.214212-07	2	4
2024-09-18 00:00:00-07	Compton, CA	t	test@test.com	2024-09-17 19:46:20.261232-07	16	8
2024-09-13 00:00:00-07	Compton, CA	t	test@test.com	2024-09-17 19:56:45.68754-07	18	8
2024-07-01 01:00:00-07	Ganges Riverbank	f	james.brown@example.com	2024-09-17 20:08:13.051627-07	20	4
2020-02-10 00:00:00-08	Yellowstone North Gate	t	john.smith@example.com	2024-09-19 16:13:33.694389-07	33	5
2023-01-02 00:00:00-08	Yellowstone North Gate	f	john.smith@example.com	2024-09-19 16:15:29.325612-07	35	5
2024-07-19 00:00:00-07	Yellowstone North Gate	t	john.smith@example.com	2024-09-19 16:15:52.292098-07	36	5
2018-02-02 00:00:00-08	Yellowstone North Gate	f	jane.doe@example.com	2024-09-19 16:16:38.240664-07	37	6
2021-11-10 00:00:00-08	Yellowstone West Gate	t	jane.doe@example.com	2024-09-19 16:17:16.305164-07	38	6
2020-01-07 00:00:00-08	Ganges Riverbank	f	james.brown@example.com	2024-09-19 16:18:34.659672-07	39	3
2022-12-04 00:00:00-08	Yellowstone South Gate	f	john.smith@example.com	2024-09-19 16:15:03.862794-07	34	5
\.


--
-- Data for Name: species; Type: TABLE DATA; Schema: public; Owner: mj
--

COPY public.species (common_name, scientific_name, number_in_wild, conservation_status_code, record_timestamp, id, image_url, description) FROM stdin;
Red Wolf	canis rufus	27	Critically Endangered (CR)	2024-01-08 04:05:06-08	1	/images/red_wolf.png	The red wolf is a critically endangered canine native to the southeastern United States. Highly intelligent and sociable animals, red wolves were once abundant throughout their native range, but habitat loss and persecution by humans drove this species to the brink of extinction in the 20th century.
Sloth Bear	melursus ursinus	19999	Vulnerable (VU)	2024-03-11 08:15:43-07	2	/images/sloth_bear.png	Sloth bears are native to low-altitude grasslands and forests in India, Bhutan, Nepal, Bangladesh and Sri Lanka. Scientists estimate that fewer than 10,000 of these bears remain in the wild, and the IUCN ranks them as vulnerable. 
Rusty Patched Bumblebee	Bombus affinis	471	Critically Endangered (CR)	2024-09-16 08:41:06-07	3	/images/bee.png	The rusty patched bumble bee is a species of bumble bee native to eastern North America. Its workers and males have a small rust-colored patch on the middle of their second abdominal segment. This bee was once commonly distributed throughout the east and upper Midwest of the United States, but has declined from an estimated 87% of its historic range in recent years. 
\.


--
-- Name: individuals_individual.id_seq; Type: SEQUENCE SET; Schema: public; Owner: mj
--

SELECT pg_catalog.setval('public."individuals_individual.id_seq"', 12, true);


--
-- Name: sightings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mj
--

SELECT pg_catalog.setval('public.sightings_id_seq', 40, true);


--
-- Name: species_species.id_seq; Type: SEQUENCE SET; Schema: public; Owner: mj
--

SELECT pg_catalog.setval('public."species_species.id_seq"', 6, true);


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
    ADD CONSTRAINT "individuals_species.id_fkey" FOREIGN KEY (species_id) REFERENCES public.species(id) NOT VALID;


--
-- Name: sightings sightings_individual.id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mj
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT "sightings_individual.id_fkey" FOREIGN KEY (individual_id) REFERENCES public.individuals(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

