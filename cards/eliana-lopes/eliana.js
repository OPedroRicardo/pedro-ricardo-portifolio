const shareButton = document.querySelector('#share-btn')
const qrButton = document.querySelector('#qr-btn')
const qrContainer = document.querySelector('.background')
const shareData = {
    title: 'Eliana Z. Lopes - Cartão',
    text: 'Veja as informações de contato de Eliana Z. Lopes.',
    url: 'https://youtu.be/Bv-1BnoB75k',
}

shareButton.addEventListener('click', async () => {
    try {
        await navigator.share(shareData)
    } catch(err) {
        shareData.url.select()
        shareData.url.setSelectionRange(0, 99999)
        document.execCommand("copy")
        alert("Link copiado para área de transferência")
    }
})

qrButton.addEventListener('click', function() {
    qrContainer.classList.add('active')
})

qrContainer.addEventListener('click', function() {
    qrContainer.classList.remove('active')
})