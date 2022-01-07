<template>
    <v-card class="mx-auto post-card" max-width="444">
        <div class="post-avatar">
            <v-avatar size="45">
                <img alt="user" src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg">
            </v-avatar>
            <div class="post-user">
                <span>
                    John Doe
                </span>
            </div>
        </div>
        <router-link :to="'/post/view/' + id">
            <v-img :src="image" height="200px"></v-img>
        </router-link>

        <v-card-title>
            <span @click="() => hideText = !hideText" class="post-text">
                {{ postText }}
            </span>
        </v-card-title>

        <v-divider></v-divider>
        <v-card-actions>
            <v-btn class="like-button" text>
                Like {{ likesCount }}
            </v-btn>
            <v-btn class="comment-button" @click="() => show = !show" color="orange lighten-2" text>
                Comments {{ commentsCount }}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text class="share-button">
                Share
            </v-btn>
        </v-card-actions>

        <v-expand-transition>
            <div v-show="show" style="padding-bottom: 1px;">
                <v-divider></v-divider>
                <div v-for="(comment, i) in comments" v-bind:key="i" class="comment-body">
                    <v-avatar size="40">
                        <img alt="user" src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg">
                    </v-avatar>
                    <div class="comment-text">

                        <span class="comment-user-name">
                            John Doe
                        </span>
                        {{ comment?.text }}
                    </div>
                </div>
            </div>
        </v-expand-transition>
    </v-card>
</template>

<script lang="ts">
export default {
    name: "PostCard",
    data() {
        return {
            show: false,
            hideText: true,
            postText: ""
        }
    },
    props: {
        id: {
            type: Number,
            default: null
        },
        text: {
            type: String,
            default: null
        },
        image: {
            type: String,
            default: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        },
        likesCount: {
            type: Number,
            default: 0
        },
        commentsCount: {
            type: Number,
            default: 0
        },
        comments: {
            type: Array,
            default: []
        }
    },
    methods: {
        showText() {
            if (this.hideText && this.$props.text.length > 100) {
                this.postText = `${this.$props.text.slice(0, 100)}....... View more.`
            } else {
                this.postText = this.$props.text
            }
        }
    },
    mounted() {
        this.showText()
    },
    watch: {
        // whenever question changes, this function will run
        hideText(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.showText()
            }
        }
    },
}
</script>

<style lang='scss'>
@import '../../css/typography';
@import "../../css/variables";
@import "../../css/styles";

.post-card {
    margin: 1rem;
    border-radius: 10px;
}

.post-text {
    color: darkslategrey;
    font-size: medium;
}

.post-avatar {
    padding-top: 0.5rem;
    margin: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.comment-body {
    margin: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 5px;
}

.post-user {
    margin-left: 1rem;
}

.likes-count {
    margin-right: 0.5rem;
    color: black;
    font-size: medium;
}

.comments-count {
    margin-right: 0.5rem;
    color: black;
    font-size: medium;
}

.like-button {
    background-color: #cfcece26;
    text-transform: capitalize;
    height: 30px !important;
}

.share-button {
    background-color: #cfcece26;
    text-transform: capitalize;
    height: 30px !important;
}

.comment-button {
    background-color: #cfcece26;
    text-transform: capitalize;
    margin-left: 0.5rem;
    height: 30px !important;
}

.comment-text {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    padding: 0.4rem 0.6rem;
    background-color: #cfcece7a;

}

.comment-user-name {
    font-size: small;
    margin-bottom: 1px;
}
</style>