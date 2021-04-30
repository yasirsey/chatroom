<template>
    <main class="window-body">
        <div class="window text-center">
            <div class="title-bar">
                <div class="title-bar-text">Profil Ayarları</div>
                <div class="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close"></button>
                </div>
            </div>
            <span class="fs-6">Yalnızca güncellemek istediğiniz yerleri doldurun.</span>
            <form @submit.prevent="userUpdate" class="window-body text-center">
                <span class="fs-6 text-danger">{{ error }}</span>
                <span class="fs-6 text-success">{{ message }}</span>
                <div class="field-row">
                    <input
                        class="w-100 fs-5 py-2"
                        id="username"
                        type="text"
                        placeholder="kullanıcı adı"
                        v-model="data.username"
                    />
                </div>
                <div class="field-row">
                    <input
                        class="w-100 fs-5 py-2"
                        id="email"
                        type="email"
                        placeholder="email"
                        v-model="data.email"
                    />
                </div>
                <div class="field-row">
                    <input
                        class="w-100 fs-5 py-2"
                        id="password"
                        type="password"
                        placeholder="yeni şifre"
                        v-model="data.password"
                    />
                </div>
                <button type="submit" class="w-100 my-1 fs-5 bg-success text-light">Güncelle</button>
                <button @click="logout" class="w-100 my-1 fs-5 bg-danger text-light">Çıkış Yap</button>
            </form>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            data: {
                username: this.$auth.user.username,
                password: '',
                email: this.$auth.user.email
            },
            send: {

            },
            error: '',
            message: ''
        }
    },
    methods: {
        userUpdate() {
            this.message = ''
            this.error = ''

            if(this.data.username != '' && this.data.username != this.$auth.user.username) this.send.username = this.data.username
            if(this.data.email != '' && this.data.email != this.$auth.user.email) this.send.email = this.data.email
            if(this.data.password != '') this.send.password = this.data.password
            
            this.$axios
                    .$patch('http://localhost:5000/api/me', this.send)
                    .then(res => {
                        this.message = res.message
                        this.$auth.setUser(res.user)
                    })
                    .catch(err => (this.error = err.response.data.error));
        },
        async logout() {
            await this.$auth.logout()
        }
    }
}
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
