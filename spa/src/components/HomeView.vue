<template>
    <div>
        <div>
            <div
                class="home-header"
            >
                
                <span class="user-name">{{ userName }}</span>
                <i
                    class="material-icons exit-icon clickable"
                    title="Выход"
                    @click="logOut"
                >
                    exit_to_app
                </i>
            </div>
            <div
                class="work-place"
            >
                <button
                    class="ns-button blue ripple"
                    @click="showDialog"
                >
                    Добавить заметку
                </button>
                <div
                    v-for="post in posts"
                    :key="post.id"
                    class="post"
                >
                    <div
                        class="text-place"
                    >
                        <span
                            class="post-text"
                        >
                            {{ post && post .text}}
                        </span>
                        <div class="green-text">
                            {{ post && post.user && post.user.name }}                    
                        </div>
                    </div>
                    <a
                        v-if="post.file_path"
                        :href="`${baseUrl}/${post.file_path}`"
                    >
                        {{ post && post.file_name}}
                    </a>
                </div>
                
            </div>
            <modal             
                v-show="dialog"
                @close="hideDialog"
                @addPost="addPost"
            />
        </div>
    </div>
</template>
<script>
    import Modal from './Modal'
    export default {
        data: () => ({
            posts: [],
            data: null,
            dialog: false
        }),
        computed: {
            baseUrl () {
                return this.$store.state.baseUrl
            },
            userName () {
                return this.user && this.user.name || ''
            },
            user () {
                return this.$store.state.authUser || null
            }
        },
        methods: {
            getPosts () {
                this.axios.post('/api/get_posts')
                    .then(res => this.posts = res.data.reverse())
            },
            addPost (post) {
                this.posts.unshift(post)                
            },
            hideDialog () {
                this.dialog = false
            },
            showDialog () {
                this.dialog = true
            },
            getData () {
                this.axios.post('/api/details')
                    .then(res => this.data = res.data.success)
                    .catch(e => console.dir(e))
            },
            logOut () {
                this.$store.dispatch('logOut')
                this.$router.push('/login')
            }
        },
        mounted () {
            this.getData()
            this.getPosts()
        },
        components: {
            Modal
        }
    }
</script>
<style scoped>
    .text-place {
        display: flex;
        flex-direction: row!important;
        justify-content: space-between;
    }
    .post-text {
        color: #607D8B;        
    }
    .post {
        display: flex;
        flex-direction: column;
        border: 1px solid #47a7f5;
        border-radius: .5em;
        margin-top: .5em;
        padding: .5em;
    }
    .work-place {
        margin-top: 1em;
    }
    i {color: rgba(0,0,0,.54);}
    a {
        text-decoration: none;
        font-size: small;
    }
    input {outline:none;}
    .exit-icon {
        color: #FF6F00;
    }
    .user-name {
        color: #1565C0;
        font-weight: bold;
    }
    .home-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 1em;
        padding-right: 1em;
        height: 4em;
        background-color: #f5f5f5;
        box-shadow: 0.4em 0.4em 5px rgba(122,122,122,0.5);
        border-radius: .3em;
    }    
</style>