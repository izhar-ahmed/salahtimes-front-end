const BASE_URL = 'http://ec2-16-171-146-39.eu-north-1.compute.amazonaws.com'
export const consts = {
	// API's
	IMG_URL: (filename) => `${BASE_URL}/uploads/${filename}`,
	GET_MASJID_BY_ID_PUBLIC: (slug) => `${BASE_URL}/api/public/masjid/masjid-by-slug/${slug}`,
	CREATE_CONTACT_API_PUBLIC: `${BASE_URL}/api/contact`,
	LOGIN_API_PUBLIC: `${BASE_URL}/api/login`,
	// Admin API's
	GET_ALL_MASJIDS_API_PUBLIC: `${BASE_URL}/api/public/masjid`,
	GET_BANNER_API: `${BASE_URL}/api/banner`,
	ADD_BANNER_API: `${BASE_URL}/api/banner/add`,
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
	DELETE_CONTACT_API: (id) => `${BASE_URL}/api/contact/delete-contact/${id}`,
	GET_CSRF_TOKEN: (uniqueStr) => `${BASE_URL}/api/csrf-token/${uniqueStr}`,
	GET_ALL_DASHBOARD_API: `${BASE_URL}/api/dashboard`,
	VALIDATE_API: `${BASE_URL}/api/validate-token`,
}