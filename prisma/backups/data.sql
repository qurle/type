SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict 1rdo01CygOkDV0XUk0AqYyWIcfd6Pf2GqN0ZbgPzqursGzNrTXH0PWhEeKphERc

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") FROM stdin;
\.


--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."custom_oauth_providers" ("id", "provider_type", "identifier", "name", "client_id", "client_secret", "acceptable_client_ids", "scopes", "pkce_enabled", "attribute_mapping", "authorization_params", "enabled", "email_optional", "issuer", "discovery_url", "skip_nonce_check", "cached_discovery", "discovery_cached_at", "authorization_url", "token_url", "userinfo_url", "jwks_uri", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at", "invite_token", "referrer", "oauth_client_state_id", "linking_target_id", "email_optional") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") FROM stdin;
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."instances" ("id", "uuid", "raw_base_config", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_clients" ("id", "client_secret_hash", "registration_type", "redirect_uris", "grant_types", "client_name", "client_uri", "logo_uri", "created_at", "updated_at", "deleted_at", "client_type", "token_endpoint_auth_method") FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_factors" ("id", "user_id", "friendly_name", "factor_type", "status", "created_at", "updated_at", "secret", "phone", "last_challenged_at", "web_authn_credential", "web_authn_aaguid", "last_webauthn_challenge_data") FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_challenges" ("id", "factor_id", "created_at", "verified_at", "ip_address", "otp_code", "web_authn_session_data") FROM stdin;
\.


--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_authorizations" ("id", "authorization_id", "client_id", "user_id", "redirect_uri", "scope", "state", "resource", "code_challenge", "code_challenge_method", "response_type", "status", "authorization_code", "created_at", "expires_at", "approved_at", "nonce") FROM stdin;
\.


--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_client_states" ("id", "provider_type", "code_verifier", "created_at") FROM stdin;
\.


--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."oauth_consents" ("id", "user_id", "client_id", "scopes", "granted_at", "revoked_at") FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_providers" ("id", "resource_id", "created_at", "updated_at", "disabled") FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_providers" ("id", "sso_provider_id", "entity_id", "metadata_xml", "metadata_url", "attribute_mapping", "created_at", "updated_at", "name_id_format") FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_relay_states" ("id", "sso_provider_id", "request_id", "for_email", "redirect_to", "created_at", "updated_at", "flow_state_id") FROM stdin;
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_domains" ("id", "sso_provider_id", "domain", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."webauthn_challenges" ("id", "user_id", "challenge_type", "session_data", "created_at", "expires_at") FROM stdin;
\.


--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."webauthn_credentials" ("id", "user_id", "credential_id", "public_key", "attestation_type", "aaguid", "sign_count", "transports", "backup_eligible", "backed_up", "friendly_name", "created_at", "updated_at", "last_used_at") FROM stdin;
\.


--
-- Data for Name: published; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."published" ("id", "modified", "content", "author", "client_id") FROM stdin;
example	2026-05-23 00:51:55.472+00	IyAqKkZvYWxzKirCoAoKIVtGb2FscyAyMDIyXShodHRwczovL3d3dy5jbGV2ZWxhbmQuY29tL3Jlc2l6ZXIvdjIvV05BM0VYQTRFUkVGVktXSlVJT1ZYU0I3RkUuanBnP2F1dGg9ZDE2NjA2YjFlYzM5MTI3MmQzZjQyYWQ1ZjFhM2I5ZDJiOTdhMzFiNmJmYWNiMjk5N2I0YTJjODlhNzAyYTFjM1wmd2lkdGg9MTI4MFwmc21hcnQ9dHJ1ZVwmcXVhbGl0eT05MCAiRm9hbHMgMjAyMiIpCgpGb2FscyAoc3R5bGlzZWQgaW7CoFthbGwgY2Fwc10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQWxsX2NhcHMgIkFsbCBjYXBzIikpIGFyZSBhIEJyaXRpc2jCoFtyb2NrXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Sb2NrX211c2ljICJSb2NrIG11c2ljIinCoGJhbmQgZm9ybWVkIGluwqBbT3hmb3JkXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9PeGZvcmQgIk94Zm9yZCIpwqBpbiAyMDA1LiBUaGUgYmFuZCdzIGN1cnJlbnQgbGluZS11cCBjb25zaXN0cyBvZiBHcmVlay1ib3JuIGxlYWQgdm9jYWxpc3QgYW5kIGd1aXRhcmlzdMKgW1lhbm5pcyBQaGlsaXBwYWtpc10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvWWFubmlzX1BoaWxpcHBha2lzICJZYW5uaXMgUGhpbGlwcGFraXMiKSwgZHJ1bW1lciBhbmQgcGVyY3Vzc2lvbmlzdCBKYWNrIEJldmFuLCBndWl0YXJpc3QgYW5kIGtleWJvYXJkaXN0IEppbW15IFNtaXRoLCBhbmQgYmFzc2lzdCBXYWx0ZXIgR2VydmVycy4KCioqKgoKRm9hbHMgYXJlIGN1cnJlbnRseSBzaWduZWQgdG_CoFtXYXJuZXIgUmVjb3Jkc10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvV2FybmVyX1JlY29yZHMgIldhcm5lciBSZWNvcmRzIiksW1xbMVxdXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Gb2Fsc19cKGJhbmRcKSNjaXRlX25vdGUtMSnCoGFuZCBoYXZlIHJlbGVhc2VkIHNldmVuIHN0dWRpbyBhbGJ1bXMgdG8gZGF0ZTrCoCpbQW50aWRvdGVzXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BbnRpZG90ZXNfXChhbGJ1bVwpICJBbnRpZG90ZXMgKGFsYnVtKSIpKsKgKDIwMDgpLMKgKltUb3RhbCBMaWZlIEZvcmV2ZXJdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1RvdGFsX0xpZmVfRm9yZXZlciAiVG90YWwgTGlmZSBGb3JldmVyIikqwqAoMjAxMCkswqAqW0hvbHkgRmlyZV0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSG9seV9GaXJlX1woYWxidW1cKSAiSG9seSBGaXJlIChhbGJ1bSkiKSrCoCgyMDEzKSzCoCpbV2hhdCBXZW50IERvd25dKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1doYXRfV2VudF9Eb3duICJXaGF0IFdlbnQgRG93biIpKsKgKDIwMTUpLMKgKltFdmVyeXRoaW5nIE5vdCBTYXZlZCBXaWxsIEJlIExvc3Qg4oCTIFBhcnQgMV0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRXZlcnl0aGluZ19Ob3RfU2F2ZWRfV2lsbF9CZV9Mb3N0XyVFMiU4MCU5M19QYXJ0XzEgIkV2ZXJ5dGhpbmcgTm90IFNhdmVkIFdpbGwgQmUgTG9zdCDigJMgUGFydCAxIikqwqBhbmTCoCpbUGFydCAyXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9FdmVyeXRoaW5nX05vdF9TYXZlZF9XaWxsX0JlX0xvc3RfJUUyJTgwJTkzX1BhcnRfMiAiRXZlcnl0aGluZyBOb3QgU2F2ZWQgV2lsbCBCZSBMb3N0IOKAkyBQYXJ0IDIiKSrCoCgyMDE5KSwgd2l0aCB0aGUgbGF0dGVyIGJlY29taW5nIHRoZSBncm91cCdzIGZpcnN0IGFsYnVtIHRvIHRvcCB0aGXCoFtVSyBBbGJ1bXMgQ2hhcnRdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1VLX0FsYnVtc19DaGFydCAiVUsgQWxidW1zIENoYXJ0IiksIGFuZCB0aGVpciBtb3N0IHJlY2VudCzCoCpbTGlmZSBJcyBZb3Vyc10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGlmZV9Jc19Zb3VycyAiTGlmZSBJcyBZb3VycyIpKsKgKDIwMjIpLiBUaGV5IGhhdmUgYWxzbyByZWxlYXNlZCBvbmXCoFt2aWRlbyBhbGJ1bV0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvVmlkZW9fYWxidW0gIlZpZGVvIGFsYnVtIiksIHNpeMKgW2V4dGVuZGVkIHBsYXlzXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9FeHRlbmRlZF9wbGF5ICJFeHRlbmRlZCBwbGF5IinCoGFuZCAzNcKgW3NpbmdsZXNdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1NpbmdsZV9cKG11c2ljXCkgIlNpbmdsZSAobXVzaWMpIikuCg	type.	-nATaGx66p
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") FROM stdin;
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets_analytics" ("name", "type", "format", "created_at", "updated_at", "id", "deleted_at") FROM stdin;
\.


--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets_vectors" ("id", "type", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."s3_multipart_uploads" ("id", "in_progress_size", "upload_signature", "bucket_id", "key", "version", "owner_id", "created_at", "user_metadata", "metadata") FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."s3_multipart_uploads_parts" ("id", "upload_id", "size", "part_number", "bucket_id", "key", "etag", "owner_id", "version", "created_at") FROM stdin;
\.


--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."vector_indexes" ("id", "name", "bucket_id", "data_type", "dimension", "distance_metric", "metadata_configuration", "created_at", "updated_at") FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

-- \unrestrict 1rdo01CygOkDV0XUk0AqYyWIcfd6Pf2GqN0ZbgPzqursGzNrTXH0PWhEeKphERc

RESET ALL;
