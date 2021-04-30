<template>
    <main class="window-body">
        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">Kayıt Ol</div>
                <div class="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close"></button>
                </div>
            </div>
            <form
                @submit.prevent="userRegister"
                class="window-body text-center"
            >
                <span class="fs-6 text-danger">{{ message }}</span>
                <div class="field-row">
                    <input
                        class="w-100 fs-5 py-2"
                        id="username"
                        type="text"
                        placeholder="kullanıcı adı"
                        required
                        v-model="data.username"
                    />
                </div>
                <div class="field-row">
                    <input
                        class="w-100 fs-5 py-2"
                        id="email"
                        type="email"
                        placeholder="email"
                        required
                        v-model="data.email"
                    />
                </div>
                <div class="field-row">
                    <input
                        class="w-100 fs-5"
                        id="password"
                        type="password"
                        placeholder="şifre"
                        required
                        v-model="data.password"
                    />
                </div>
                <div class="field-row">
                    <input
                        class="w-100 fs-5"
                        id="password-again"
                        type="password"
                        placeholder="şifre tekrar"
                        v-model="validate.confirmPassword"
                        required
                    />
                </div>
                <div class="field-row d-flex justify-content-evenly">
                    <input
                        id="woman"
                        type="radio"
                        name="sex"
                        value="woman"
                        v-model="data.gender"
                    />
                    <label class="fs-6" for="woman">Kadın</label>
                    <input
                        id="man"
                        type="radio"
                        name="sex"
                        value="man"
                        v-model="data.gender"
                    />
                    <label class="fs-6" for="man">Erkek</label>
                </div>
                <button type="submit" class="w-100 my-1 fs-5">Kayıt Ol</button>
            </form>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            data: {
                username: '',
                password: '',
                email: '',
                gender: ''
            },
            validate: {
                confirmPassword: ''
            },
            message: ''
        };
    },
    methods: {
        userRegister() {
            if (this.validate.confirmPassword != this.data.password)
                this.message = 'Şifreler eşleşmiyor';
            else if (this.data.gender != 'man' && this.data.gender != 'woman')
                this.message = 'Lütfen cinsiyetinizi seçiniz.';
            else {
                this.$axios
                    .$post('http://localhost:5000/api/users', this.data)
                    .then(res => {
                        this.$store.commit('message/setRegistered', 'Kayıt başarılı, giriş yapabilirsiniz!');
                        this.$router.push({ name: 'login' });
                    })
                    .catch(err => (this.message = err.response.data.error));
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
