<template>
    <v-row justify="center">
        <template>
            <v-dialog v-model="dialog" persistent max-width="550px">
                <v-card>
                    <v-card-title>
                        <span class="text-h5">Create Post</span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-container>
                            <div class="post-avatar">
                                <v-avatar size="45">
                                    <img alt="user"
                                        src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg">
                                </v-avatar>
                                <div class="post-user">
                                    <span>
                                        John Doe
                                    </span>
                                </div>
                            </div>

                            <v-row>
                                <v-col cols="12">
                                    <div class="text-area">
                                        <v-text-field autofocus :rules="rules" v-model="postContent"
                                            label="Whats on your mind?">
                                        </v-text-field>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="blue darken-1" text :loading="isSelecting" @click="handleFileImport">
                            Upload File
                        </v-btn>
                        <span v-if="selectedFile?.name" class="selected-image-name">
                            {{ selectedFile?.name }}
                        </span>
                        <span v-else class="selected-image-name">
                            None
                        </span>
                        <input ref="uploader" class="d-none" type="file" @change="onFileChanged">
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">
                            Close
                        </v-btn>
                        <v-btn color="blue darken-1" :disabled="!(postContent.length > 0 && fileString)" text
                            @click="savepost">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>
    </v-row>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
export default {
    name: "CreatePostModal",
    data() {
        return {
            dialog: <boolean>false,
            isSelecting: <boolean>false,
            selectedFile: <any>null,
            fileString: <string>"",
            postContent: <string>"",
            rules: [
                (value: string) => !!value || 'Required.',
                (value: string) => (value || '').length <= 100 || 'Max 100 characters',
            ],
        }
    },
    mounted() {
        this.selectedFile = null;
        this.$root.$on('create-post', () => {
            this.dialog = true;
        })
    },
    methods: {
        ...mapActions(['createPost']),
        handleFileImport() {
            this.isSelecting = true;
            window.addEventListener('focus', () => {
                this.isSelecting = false
            }, { once: true });
            this.$refs?.uploader?.click();
        },
        async savepost() {
            let params = {
                text: this.postContent,
                image: this.fileString
            }
            this.createPost(params).then(() => {
                this.dialog = false;
            })
        },
        onFileChanged(e: any) {
            this.selectedFile = e.target.files[0];
            this.getBase64(e.target.files[0]).then(
                (data: string) => this.fileString = data
            );
        },
        getBase64(file: File) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }
    },
    beforeDestroy() {
        window.removeEventListener('focus', () => {
            this.isSelecting = false
        }, {})
    },
}
</script>
  
<style lang='scss'>
.post-avatar {
    padding-top: 0.5rem;
    margin: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.post-user {
    margin-left: 0.8rem;
    font-size: medium;
    font-weight: 600;
}

.text-area {
    .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)>.v-input__control>.v-input__slot {
        box-shadow: unset !important;
    }
}

.d-none {
    display: none;
}

.selected-image-name {
    font-size: small;
    color: grey;
}
</style>
  