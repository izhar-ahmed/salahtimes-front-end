// util.js
export const imgUrl = 'http://localhost:8080/uploads/';
export const getBanner = 'http://localhost:8080/api/banner';
export const addBannerAPI = 'http://localhost:8080/api/banner/add';
export const getAllMasjids = 'http://localhost:8080/api/public/masjid';
export const getMasjidById = 'http://localhost:8080/api/public/masjid/masjid-by-slug/';
export const getAllMasjidAPI = 'http://localhost:8080/api/masjid/';
export const createMasjidAPI = 'http://localhost:8080/api/masjid/add';
export const addNamazTimeAPI = 'http://localhost:8080/api/namaz-time/add';
export const editNamazTimeAPI = 'http://localhost:8080/api/namaz-time/update/';
export const getAllUserAPI = 'http://localhost:8080/api/users';
export const addUserAPI = 'http://localhost:8080/api/users/add';
export const getUserAPI = 'http://localhost:8080/api/users/get-user/';
export const deleteUserAPI = 'http://localhost:8080/api/users/delete-user/';
export const getRoleAPI = 'http://localhost:8080/api/role';
export const getLogsAPI = 'http://localhost:8080/api/logs';
export const getAllContactAPI = 'http://localhost:8080/api/contact/get-all-contacts/';
export const deleteContactAPI = 'http://localhost:8080/api/contact/delete-contact/';
export const createContact = 'http://localhost:8080/api/contact';

const BASE_URL = 'http://localhost:8080'
export const consts = {
	// API's
	IMG_URL: (filename) => `${BASE_URL}/uploads/${filename}`,
	GET_BANNER_API: `${BASE_URL}/api/banner`,
	ADD_BANNER_API: `${BASE_URL}/api/banner/add`,
	GET_ALL_MASJIDS_API: `${BASE_URL}/api/public/masjid`,
	GET_MASJID_BY_ID: (slug) => `${BASE_URL}/api/public/masjid/masjid-by-slug/${slug}`,
	GET_ALL_MASJID_API: `${BASE_URL}/api/masjid/`,
	CREATE_MASJID_API: `${BASE_URL}/api/masjid/add`,
	ADD_NAMAZ_TIME_API: `${BASE_URL}/api/namaz-time/add`,
	EDIT_NAMAZ_TIME_API: (id) => `${BASE_URL}/api/namaz-time/update/${id}`,
	GET_ALL_USER_API: `${BASE_URL}/api/users`,
	ADD_USER_API: `${BASE_URL}/api/users/add`,
	GET_USER_API: (id) => `${BASE_URL}/api/users/get-user/${id}`,
	DELETE_USER_API: (id) => `${BASE_URL}/api/users/delete-user/${id}`,
	GET_ROLE_API: `${BASE_URL}/api/role`,
	GET_ALL_LOGS_API: `${BASE_URL}/api/logs`,
	GET_ALL_CONTACT_API: `${BASE_URL}/api/contact/get-all-contacts/`,
	DELETE_CONTACT_API: (id) => `${BASE_URL}/api/contact/delete-contact/${id}`
}