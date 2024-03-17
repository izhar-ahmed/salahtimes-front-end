const menuOthers = [
	{ name: 'Dashboard', to: '', allowedLinks: ['/m-admin'], display: true },
	{ name: '404', to: '', allowedLinks: ['/m-admin/404'], display: false },
	{ name: 'Masjid', to: 'masjid', allowedLinks: ['/m-admin/masjid/*'], display: true },
	{ name: 'Home Banner', to: 'banner', allowedLinks: ['/m-admin/banner'], display: true },
	{ name: 'Profile', to: 'user-profile', allowedLinks: ['/m-admin/user-profile'], display: true },
];

export default menuOthers;