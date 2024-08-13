class Message {
    constructor(chatId, type, messageId, content, date) {
        this.chatId = chatId;
        this.type = type;
        this.messageId = messageId;
        this.content = content;
        this.date = date;
        this.fileSize = null;
        this.fileId = null;
        this.fileName = null;
        this.fileMimeType = null;
    }
}

export default Message;