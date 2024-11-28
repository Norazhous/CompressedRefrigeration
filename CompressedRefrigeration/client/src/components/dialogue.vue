<template>
    <!-- loading animation -->
    <div class="loading">
        <div></div>
        <div></div>
        <div></div>
    </div>
    <!-- markdown format to show the messages -->
    <div id='message-container'>

        <div v-for='message, index in message_list' :key='index' :id='index'>
            <div :class="['message-row', message.sender === 'user' ? 'right' : 'left']">
                <div class="row">
                    <!-- <div class="avatar-wrapper">
                    <el-avatar v-if="message.sender === 'user'" :src="avatar" class="avatar" shape="square" />
                    <el-avatar v-else :src="logo" class="avatar" shape="square" />
                </div> -->
                    <div style="width: 100%;" class="toast show" role="alert" aria-live="assertive" aria-atomic="true"
                        data-bs-autohide='false'>
                        <div class="message">
                            <!-- <MdPreview :id="'preview-only'" :preview-theme="'smart-blue'" :model-value="message.content" :style="{
                        backgroundColor:
                            message.sender === 'user' ? 'rgb(231, 248, 255)' : '#f4f4f5',
                    }" v-if="message.content"></MdPreview>
                    <TextLoading v-else></TextLoading> -->
                            <div :class='getHeaderClass(message.sender)'>
                                <strong class="me-auto">{{ message.sender }}</strong>
                                <small>{{ getFormattedTime(message.time) }}</small>
                            </div>
                            <!-- Message body -->
                            <div :class="getMessageClass(message.sender)">
                                <!-- <strong>{{ message.text }}</strong> -->
                                <MarkdownRenderer :content="message.text" />
                                <!-- <p>{{ message.text }}</p> -->
                                <!-- <div id='response-buttons' class='col-12'>
                            <button class='btn btn-outline-primary' v-for='button in message.buttons' :key='button.title' @click='saveResponse(button.title)'>{{ button.title }}</button>
                        </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id='bottom-container'></div>
    </div>

    <div class="input-group mt-3">
        <input type="text" class="form-control" v-model='user_input' @keydown.enter="sendMessage"
            placeholder="Enter message..." aria-label="message input" aria-describedby="user-input">
        <button class="button-toolbar button-primary" type="button" id="user-input-submit" @click="sendMessage">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send"
                viewBox="0 0 16 16">
                <path
                    d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
            </svg>
        </button>
    </div>
    <!-- <button @click="console.log(this.dialogue_height)">dialogue_height</button>
    <button @click="this.testFeedbackPost">test Feedback Post</button>
    <button @click="getSessionsList"> get the session list</button> -->

</template>


<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';
import MarkdownRenderer from "./MarkdownRenderer.vue"

export default {
    name: 'dialogue',
    props: {
        message_list: Array,
        message_count: Number,
    },
    emits: ['onMessageSent'],
    data() {
        return {
            user_input: '',
            msg: "",
            
        }
    },
    components:{
        MarkdownRenderer,
    },
    computed: {
        ...mapGetters([
            'getLogUUID',
            'getMessages',
            // 'getNumMessages', // this is for single session use
            'getMessageIndex',
            'getNumActiveSessionMessages',
            'getActiveSession',
            'getActiveSessionID',
            'getActiveSessionTopic',
            'getSessions',
        ])

    },
    watch: {
        message_count() {
            let element = document.getElementById('bottom-container');
            element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    },
    methods: {
        ...mapActions([
            // 'addMessage', // this is for single session use
            'setMessageIndex',
            // 'updateMessage', // this is for single session use
            'addActiveSessionMessage',
            'updateActiveSessionMessage', 
        ]),
        // getMessage() {
        //     const path = 'http://127.0.0.1:5000/chatbox';
        //     axios.get(path)
        //         .then((res) => {
        //             this.msg = res.data;
        //             console.log(this.msg);
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         })
        // },

        async postMessage(payload) {
            // payload.preventDefault();
            // const path = 'http://127.0.0.1:5000/chatbox?username=UUID1';
            const path = 'https://app.practable.io/ed-log-dev/analytics/chatbot/api/v1/chatbox?username=sijie2';
            // 'https://app.practable.io/ed-log-dev/analytics/chatbot/api/v1/chatbox?username=sijie';
            let messageID = null;

            // initial temporary message
            let tempMessage = {
                UUID:this.getLogUUID, 
                sessionID:this.getActiveSessionID,
                sender: "chatbot",
                time: new Date().getTime(),
                text: '',
            };


            try {
                await this.$store.dispatch("addActiveSessionMessage", tempMessage);
                messageID = this.getNumActiveSessionMessages - 1;
                this.$store.dispatch('setMessageIndex', messageID)

                // Initiate the POST request with Fetch API
                const response = await fetch(path, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });

                // Check if the response body exists
                if (!response.body) {
                    throw new Error('ReadableStream not supported');
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder("utf-8");
                let done = false;

                // Process the stream
                while (!done) {
                    const { value, done: doneReading } = await reader.read();
                    done = doneReading;
                    if (value) {
                        const textChunk = decoder.decode(value, { stream: true });
                        console.log(textChunk);
                        if (this.getMessageIndex = messageID) {
                            //update message in the vuex 
                            this.$store.dispatch('updateActiveSessionMessage', textChunk);
                        }
                        this.setLocalStorage_chat();
                        // two payloads have problem in the vuex. the index and text is undefine
                        // this.$store.dispatch('updateMessage', {messageID, textChunk});

                        // this.msg += textChunk;
                        // console.log(this.msg);

                        // let chatbotMessage = {
                        //     sender: "chatbot",
                        //     time: new Date().getTime(),
                        //     text: this.msg,
                        // };
                        // this.$store.dispatch('updateMessage', chatbotMessage);
                        // console.log(textChunk);  // For debugging
                        // this.msg = '';
                    }
                }

                // Finalize decoding
                const finalText = decoder.decode();
                if (finalText) {
                    if (this.getMessageIndex = messageID) {
                    this.$store.dispatch('updateActiveSessionMessage', textChunk);
                    }
                    this.setLocalStorage_chat();
                    // two payloads have problem in the vuex. the index and text is undefine
                    // this.$store.dispatch('updateMessage', {messageID, finalText})

                    // this.msg += finalText;
                    // let chatbotMessage = {
                    //     sender: "chatbot",
                    //     time: new Date().getTime(),
                    //     text: finalText
                    // };
                    // this.$store.dispatch('addMessage', chatbotMessage);
                    // console.log(finalText);  // For debugging

                }

            } catch (error) {
                console.error('Error occurred while posting message:', error);

                // Optionally alert the user
                // alert(`An error occurred: ${error.message}`);

                // Handle specific error cases or statuses
                if (error.response) {
                    console.error('Server response error:', error.response.data);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error in setup:', error.message);
                }
            }
        },

        // postMessage(payload) {
        //     const path = 'http://127.0.0.1:5000/chatbox';
        //     axios.post(path, payload)
        //         .then((res) => {
        //             this.msg = res.data;
        //             let chatbotMessage = {sender: "chatbot", time: new Date().getTime(), text: res.data.chatbot};
        //             this.$store.dispatch('addMessage',chatbotMessage);
        //             console.log(res.data);
        //             // this.getMessage();
        //         })
        //         .catch((error) => {

        //             console.log(error);
        //             // alert(error.response.data);
        //             // this.getMessage();
        //         });
        // },

        
        // send message to server 
        // for active session, change the message to active session.messages 
        sendMessage() {
            // let currentActiveSession = this.getActiveSession;
            // more information needs to be add in the message to send to server to categorize
            // classify different session: activeSessionID, the ID from sessions.id rather then index of the activesession (sessions)/ sessionTopic: the same to id(sessions)
            // classify differemt user: username: UUID(sessions)/ sender: UUID(messages)
            // get the time of sending: time(messages) / updateAt (sessions)
            let message = { UUID:this.getLogUUID, sessionID:this.getActiveSessionID, sender: "user", time: new Date().getTime(), text: this.user_input }

            // currentActiveSession.messages.push(message);
            // console.log(currentActiveSession);

            this.$emit('onMessageSent', message);
            this.user_input = '';
            this.postMessage(message); // send a single message 
            // this.postMessage(currentActiveSession); // send a session's information 
            console.log(this.getActiveSession);
            // console.log(this.getSessions);
            // this.setLocalStorage_chat();
            // console.log(JSON.parse(localStorage.getItem('chat')));
        },


        postFeedback(payload) {
            const path = 'https://app.practable.io/ed-log-dev/analytics/chatbot/api/v1/feedback?username=sijie2'
            // const path = 'http://127.0.0.1:5000/feedback';
            axios.post(path, payload)
                .then((res) => {
                    this.msg = res.data;
                    console.log(res.data);
                    // this.getMessage();
                })
                .catch((error) => {

                    console.log(error);
                    // alert(error.response.data);
                    // this.getMessage();
                });
        },

        testFeedbackPost(){
            let message ={UUID:this.getLogUUID, sessionID:this.getActiveSessionID, messageID:"", messageContent:"", time: new Date().getTime(), rate:1 }
            this.postFeedback(message);
        },

        getMessageClass(sender) {
            if (sender == this.getLogUUID) {
                return 'toast-body text-end';
            } else {
                return 'toast-body text-start'
            }
        },

        getHeaderClass(sender) {
            if (sender == 'system') {
                return 'toast-header header-system'
            } else if (sender == 'chatbot') {
                return 'toast-header header-chatbot'
            } else {
                return 'toast-header header-standard'
            }

        },
        
        saveResponse(response) {
            console.log(response);
        },
        getFormattedTime(time_ms) {
            let date = new Date(time_ms);
            if (Date.now() - date.getTime() > 24 * 60 * 60 * 1000) {
                return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
            } else {
                return `${date.toLocaleTimeString()}`;
            }
        },

        getSessionsList() {
            // console.log("test");
            console.log(this.getSessions);
        },

        setLocalStorage_chat(){
            localStorage.setItem('chat',JSON.stringify(this.getSessions));
        },
    }
}

</script>


<style scoped>
    /* max-height 700 in full */
    /* max height to show the message, 500px is too much for laptop */
    /* width: 90%; */
    /* pass the max-height to parent, so can adjust according to the window size */
 
#message-container {
    overflow: scroll;
    max-height: var(--dialogue-height);
    padding-left: 20px;
    padding-right: 20px;
    background-color: var(--background-color);
    color: var(--text-color);
}


/* loading animation */
.loading {

    display: flex;
    justify-content: space-around;
    color: #000;
    width: 54px;
    padding: 15px;

    div {
        background-color: currentColor;
        border: 0 solid currentColor;
        width: 5px;
        height: 5px;
        border-radius: 100%;
        animation: ball-beat 0.7s -0.15s infinite linear;
    }

    div:nth-child(2n-1) {
        animation-delay: -0.5s;
    }
}


@keyframes ball-beat {
    50% {
        opacity: 0.2;
        transform: scale(0.75);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

.message-row {
    display: flex;

    &.right {
        justify-content: flex-end;

        .row {
            .avatar-wrapper {
                display: flex;
                justify-content: flex-end;
            }

            .message {
                background-color: rgb(231, 248, 255);
            }
        }
    }

    .row {
        .avatar-wrapper {
            .avatar {
                box-shadow: 20px 20px 20px 3px rgba(0, 0, 0, 0.03);
                margin-bottom: 20px;
            }
        }

        .message {
            font-size: 15px;
            padding: 1.5px;
            max-width: 800px;
            border-radius: 7px;
            border: 1px solid rgba(black, 0.1);
            box-shadow: 20px 20px 20px 1px rgba(0, 0, 0, 0.01);
        }
    }
}

:deep(.md-editor-preview-wrapper) {
    padding: 0 10px;

    .smart-blue-theme p {
        line-height: unset;
    }
}

.header-system{
    background-color: var(--background-color-warning);
    color: var(--text-color-inverted);
}

.header-chatbot{
    background-color: var(--button-color-primary);
    color: var(--text-color-inverted);
}

.header-standard{
    background-color: var(--button-color-secondary);
    color: var(--text-color-inverted);
}
</style>
