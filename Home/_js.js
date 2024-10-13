// Nombre id hj99tb2
// correo id hj99tb4 
// numero id hj99tb8
//mensaje hj99tb10

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío normal del formulario

    // Obtiene los datos del formulario
    const formData = new FormData(this);
    
    // Envía los datos al formulario de Google
    fetch('https://docs.google.com/forms/d/e/1FAIpQLSfCGRzdL1pi0sMPA1r5BYnouC6I38CTnHYtSZl3CJ--Ex9WtA/formResponse', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        alert('¡Mensaje enviado con éxito!');
        this.reset(); // Reinicia el formulario
    })
    .catch(error => {
        alert('Error al enviar: ' + error);
    });
});

/*document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    
    fetch('https://script.google.com/macros/s/AKfycbwHEilVoJbwAacMUJrU7IgZVA5G4Jn3jNZp239YP0WUD8j9o0j83Re_fa3cGC6h3lfWpQ/exec', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      alert('¡Mensaje enviado con éxito!');
      this.reset();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al enviar el formulario');
    });

    alert ("FDSFDF")
  });*/