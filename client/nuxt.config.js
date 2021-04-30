export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'morposit',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/css/vendors/bootstrap-reboot.min.css',
        '@/assets/css/vendors/bootstrap-grid.min.css',
        '@/assets/css/vendors/bootstrap-utilities.min.css',
        '98.css',
        '@/assets/css/main.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],

    axios: {
        baseURL: 'http://localhost:5000/api'
    },

    router: {
        middleware: ['auth']
    },

    auth: {
        redirect: {
            home: '/chatroom'
        },
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: '/auth/login',
                        method: 'post',
                        propertyName: 'token'
                    },
                    logout: { url: '/auth/logout', method: 'post' },
                    user: { url: '/me', method: 'get' }
                }
            }
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
};
