const menuUser = [
	{ name: 'Dashboard', to: '', allowedLinks: ['/m-admin'], display: true },
	{ name: '404', to: '', allowedLinks: ['/m-admin/404'], display: false },
	{ name: 'Profile', to: 'user-profile', allowedLinks: ['/m-admin/user-profile'], display: true },
];

export default menuUser;