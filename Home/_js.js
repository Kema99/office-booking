document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault()
    let buttonSendRequest = document.getElementById("send-request")
    buttonSendRequest.disabled = true 
    const formData = new FormData(this);
    await fetch('https://script.google.com/macros/s/AKfycbxtILUVOleKAK5lCYXVQCHTnTLnukil7nwaiH3Plu3W-GRgO4uhrsr7ITEEMvQfXD-yyA/exec', {
        method: 'POST',
        body: formData,
        mode: 'cors'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
        alert(data);
        buttonSendRequest.disabled = false
        history.replaceState(null, '', window.location.pathname);
    })
    .catch(error => {
        console.error('Error:', error);
        console.log('Error al enviar: ' + error);
    });

});
