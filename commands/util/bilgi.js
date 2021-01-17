module.exports = {
    name: 'bilgi',
    description: 'Kişi hakkında bilgi verir.',
    execute(client, message, args) {
        message.chat.sendMessage('Bilgiler alınıyor...').then(() => {
            message.author.fetch().then(e => {
            message.chat.sendMessage(
        `Tam İsim: ${message.author.fullName}
        Kullanıcı Adı: ${message.author.username}
        ID: ${message.author.id}
        Biyografi:\n${message.author.biography}
        Takipçi: ${message.author.followerCount}
        Takip: ${message.author.followingCount}
        Onaylı: ${message.author.isVerified}
        Gizli: ${message.author.isPrivate}
        Paylaşım: ${message.author.mediaCount}
`)
        })
        })

    }
}
