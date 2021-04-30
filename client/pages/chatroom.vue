<template>
    <div id="chatroom">
        <ul class="tree-view text-wrap mx-auto h-100">
            <li v-for="(item, i) in messages" :key="i">
                <span
                    v-if="item.message == 'odaya katıldı'"
                    class="text-success d-block text-center"
                >
                    {{ item.username }} {{ item.message }}
                </span>
                <span
                    v-else-if="item.message == 'odadan ayrıldı'"
                    class="text-danger d-block text-center"
                >
                    {{ item.username }}: {{ item.message }}
                </span>
                <span v-else>
                    <span
                        v-if="item.username == activeUsername"
                    >
                        <span class="fw-bold text-danger">{{ item.username }}</span
                        >: {{ item.message }}
                    </span>
                    <span
                        v-else
                        class=""
                    >
                        <span class="fw-bold">{{ item.username }}</span
                        >: {{ item.message }}
                    </span>
                </span>
            </li>
        </ul>
        <form @submit.prevent="sendMessage" id="form" class="w-100 d-flex">
            <input id="message" type="text" class="w-100" v-model="message" />
            <button type="submit">
                Gönder
            </button>
        </form>
    </div>
</template>

<script>
import io from 'socket.io-client';

export default {
    data() {
        return {
            activeUsername: this.$auth.user.username,
            message: '',
            messages: [],
            socket: undefined
        };
    },
    mounted() {
        this.socket = io.connect('http://localhost:4000');
        this.socket.auth = this.$auth.user
        this.socket.emit('online');

        this.socket.on('new message', ({ username, message }) => {
            this.messages.push({ username, message });
        });

        this.socket.on('online', username => {
            this.messages.push({ username, message: 'odaya katıldı' });
        });

        this.socket.on('offline', username => {
            this.messages.push({ username, message: 'odadan ayrıldı' });
        });
    },
    beforeDestroy() {
        this.socket.disconnect();
    },
    methods: {
        sendMessage() {
            if (this.message != '') {
                this.socket.emit('new message', this.message);
                const container = this.$el.querySelector('.tree-view');
                container.scrollTop = container.scrollHeight + 10;
                this.message = '';
            }
        }
    }
};
</script>

<style scoped>
#chatroom {
    width: 600px;
    height: 70vh;
}
.tree-view {
    overflow-wrap: anywhere;
    overflow-y: auto;
}
</style>
