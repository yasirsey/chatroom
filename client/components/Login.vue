<template>
    <main class="window-body">
        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">Giriş Yap</div>
                <div class="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close"></button>
                </div>
            </div>
            <form @submit.prevent="userLogin" class="window-body text-center">
                <span class="fs-6 text-success">{{
                    this.$store.state.message.registered
                }}</span>
                <span class="fs-6 text-danger">{{ message }}</span>
                <div class="field-row">
                    <input
                        class="w-100 fs-5 py-2"
                        id="who"
                        type="text"
                        placeholder="kullanıcı adı"
                        v-model="login.who"
                        required
                    />
                </div>
                <div class="field-row">
                    <input
                        class="w-100 fs-5"
                        id="password"
                        type="password"
                        placeholder="şifre"
                        v-model="login.password"
                        required
                    />
                </div>
                <button type="submit" class="w-100 my-1 fs-5">Giriş Yap</button>
                <nuxt-link class="fs-6" to="/forgot-password"
                    >Şifreni mi unuttun?</nuxt-link
                >
            </form>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            login: {
                who: '',
                password: ''
            },
            message: ''
        };
    },
    methods: {
        async userLogin() {
            this.$store.commit('message/setRegistered', '');
            try {
                await this.$auth.loginWith('local', {
                    data: this.login
                });
            } catch (err) {
                this.message = err.response.data.error;
            }
        }
    }
};
</script>

<style scoped>
.window-body input {
    height: 1.7rem;
}

@media all and(max-width: 720px) {
    main {
        width: 95% !important;
    }
}
</style>
