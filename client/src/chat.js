import React, { Component } from 'react';
import io from "socket.io-client";
import './chat.css';


class Chat extends Component {
    constructor(props) {
        super(props);
        this.addMessage = this.addMessage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.showTyping = this.showTyping.bind(this);

        this.state = {
            messages: [],
            input: '',
            isTyping: ''
        }
        this.socket = io('/chat');
        this.socket.on('connect', () => {
            this.socket.on('new-message', this.addMessage);
        })
        this.socket.on('typing', this.showTyping)
    }

    showTyping = (data) => {
        let _this = this;
        this.setState({ isTyping: 'active' })
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(() => {
            _this.setState({ isTyping: '' })
        }, 1000)
        console.log("typing...");
    }

    addMessage = (message) => {
        let owner = '';
        if (message.username === this.props.username) {
            owner = 'owner'
        }
        let messageElement =
            <div className={'chat-message ' + owner} key={message.id}>
                <div className = 'chat-message-username'>{message.username}</div>
                <div className='chat-message-text' >{message.text}</div>
            </div>

        var messages = this.state.messages;
        messages.push(messageElement);
        this.setState({ messages: messages });
    }

    onKeyPress = (e) => {
        if (e.charCode === 13) {
            this.sendMessage(e);
        }
    }

    onChange = (e) => {
        this.setState({ input: e.target.value })
        this.socket.emit('typing');
    }

    sendMessage = (e) => {
        let messageText = this.state.input.trim();
        if (messageText) {
            let message = {
                username: this.props.username,
                text: messageText
            }
            console.log("Sending " + JSON.stringify(message))
            this.socket.emit('send', message);
            this.setState({ input: '' });
        }
    }

    scrollToBottom() {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        return (
            <div className='chat'>
                <div ref={(div) => {
                    this.messageList = div;
                }} className='chat-messages'>
                    {this.state.messages}
                </div>
                <div className={'chat-typing-indicator ' + this.state.isTyping}>
                </div>
                <div className='chat-input'>
                    <input onKeyPress={this.onKeyPress} onChange={this.onChange} value={this.state.input} />
                    <button onClick={this.sendMessage}>Send</button>
                </div>
            </div>
        )
    }
}

export default Chat;