<template>
    <div>
        <div v-if="this.$auth.loggedIn" class="status-bar fixed-bottom row p-0">
            <nuxt-link class="col p-0" to="/chatroom">
                <button
                    v-if="this.$route.name == 'chatroom'"
                    class="fs-4 w-100"
                    disabled
                >
                    Chatroom
                </button>
                <button v-else class="fs-4 w-100">Chatroom</button>
            </nuxt-link>
            <nuxt-link class="col p-0" to="/profile">
                <button
                    v-if="this.$route.name == 'profile'"
                    class="fs-4 w-100"
                    disabled
                >
                    Profil
                </button>
                <button v-else class="fs-4 w-100">Profil</button>
            </nuxt-link>
        </div>
        <div v-else class="status-bar fixed-bottom row p-0">
            <nuxt-link class="col p-0" to="/login">
                <button
                    v-if="this.$route.name == 'login'"
                    class="fs-4 w-100"
                    disabled
                >
                    Giriş Yap
                </button>
                <button v-else class="fs-4 w-100">Giriş Yap</button>
            </nuxt-link>
            <nuxt-link class="col p-0" to="/register">
                <button
                    v-if="this.$route.name == 'register'"
                    class="fs-4 w-100"
                    disabled
                >
                    Kayıt Ol
                </button>
                <button v-else class="fs-4 w-100">Kayıt Ol</button>
            </nuxt-link>
        </div>
    </div>
</template>

<script></script>
