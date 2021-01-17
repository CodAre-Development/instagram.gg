module.exports = async (user) => {
  if (!user.privateChat) await user.fetchPrivateChat()
  user.privateChat.sendMessage(`Beni takip ettiğiniz için teşekkürler ${user.username}, daima hizmetinizde olacağım 🎉`)
}
