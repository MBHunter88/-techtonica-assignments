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
-- Name: contacts; Type: TABLE; Schema: public; Owner: mj
--

CREATE TABLE public.contacts (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phone character varying(20),
    notes text
);


ALTER TABLE public.contacts OWNER TO mj;

--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: mj
--

CREATE SEQUENCE public.contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contacts_id_seq OWNER TO mj;

--
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mj
--

ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;


--
-- Name: locations; Type: TABLE; Schema: public; Owner: mj
--

CREATE TABLE public.locations (
    id integer NOT NULL,
    contact_id integer,
    address character varying(200),
    city character varying(100),
    state character varying(50)
   
);


ALTER TABLE public.locations OWNER TO mj;

--
-- Name: locations_id_seq; Type: SEQUENCE; Schema: public; Owner: mj
--

CREATE SEQUENCE public.locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locations_id_seq OWNER TO mj;

--
-- Name: locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mj
--

ALTER SEQUENCE public.locations_id_seq OWNED BY public.locations.id;


--
-- Name: contacts id; Type: DEFAULT; Schema: public; Owner: mj
--

ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);


--
-- Name: locations id; Type: DEFAULT; Schema: public; Owner: mj
--

ALTER TABLE ONLY public.locations ALTER COLUMN id SET DEFAULT nextval('public.locations_id_seq'::regclass);


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: mj
--

COPY public.contacts (id, name, email, phone, notes) FROM stdin;
1	John Doe	john@example.com	123-456-7890	Client prefers email.
2	Jane Smith	jane@example.com	987-654-3210	Referred by a friend.
3	Alice Johnson	alice@example.com	555-666-7777	
4	Louis Brown	louis@example.com	444-333-2222	Met at a conference.
5	Emily Davis	emily@example.com	999-888-7777	Works in tech.
\.


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: mj
--

COPY public.locations (id, contact_id, address, city, state, country) FROM stdin;
1	1	123 Main St	New York	NY	USA
2	2	456 Elm St	Los Angeles	CA	USA
3	3	789 Oak St	Chicago	IL	USA
4	4	101 Pine St	Houston	TX	USA
5	5	202 Maple St	San Francisco	CA	USA
\.


--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mj
--

SELECT pg_catalog.setval('public.contacts_id_seq', 5, true);


--
-- Name: locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mj
--

SELECT pg_catalog.setval('public.locations_id_seq', 5, true);


--
-- Name: contacts contacts_email_key; Type: CONSTRAINT; Schema: public; Owner: mj
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_email_key UNIQUE (email);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: mj
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: mj
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- Name: locations locations_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mj
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_contact_id_fkey FOREIGN KEY (contact_id) REFERENCES public.contacts(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

