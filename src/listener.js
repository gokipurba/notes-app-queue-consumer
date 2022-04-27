class Listener {
    constructor(notesService, mailSender){
        this._notesService = notesService;
        this._mailSender = mailSender;

        this.listen = this.listen.bind(this);
    }

    async listen(message){
        try {
            const { userId, targetEmail } = JSON.parse(message.content.toString()); // mendapatkan nilai dari message yang dikirim. Message bertipe consumeMessage saat ini 
            
            const notes = await this._notesService.getNotes(userId);
            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(notes)); // Fungsi send email hanya menerima conten dalam bentuk string. itu alasan menggunakan JSON.stringfy pada pengiriman notes.
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Listener;