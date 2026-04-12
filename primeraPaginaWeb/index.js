// Función para cambiar idioma
const traducciones = {
    es: {
        intro: "Un café de gatos (猫カフェ) es un establecimiento público en el que sus clientes pueden jugar con gatos u observarlos. En nuestro café creemos que los pequeños momentos pueden convertirse en algo especial: una taza de café caliente, un espacio acogedor y la compañía tranquila de un gatito. Nacimos con la idea de crear un lugar donde las personas puedan desconectarse del ritmo diario y reconectar con lo simple.",
        secundario: "Amamos a los gatos y valoramos profundamente su bienestar, por eso nuestro espacio está pensado para que se sientan seguros, respetados y libres de ser ellos mismos. Cada uno de nuestros michis tiene su propia personalidad, y forman parte de esta familia que hemos construido con cariño. Aquí promovemos la convivencia responsable, el respeto hacia los animales y la creación de un ambiente relajado para todos. Más que una cafetería, somos un rincón para descansar, sonreír y compartir momentos especiales entre café y ronroneos.",
        final: "En nuestra Catfetería, hay varios gatitos listos para conocerte. ¡Ven a visitarnos!",
    },

    en: {
        intro: "A cat café is a public establishment where customers can play with or observe cats. At our café, we believe that small moments can become something special: a warm cup of coffee, a cozy space, and the quiet company of a kitten. We were born with the idea of creating a place where people can disconnect from the daily grind and reconnect with the simple things in life.",
        secundario: "We love cats and deeply value their well-being, which is why our space is designed for them to feel safe, respected, and free to be themselves. Each of our kitties has their own personality and is part of this family we've lovingly built. Here, we promote responsible pet ownership, respect for animals, and a relaxed atmosphere for everyone. More than just a café, we're a place to unwind, smile, and share special moments over coffee and purrs.",
        final: "In our Catfeteria, there are several kittens ready to meet you. Come visit us!",
    }
};

function traducir(idioma) {
    const t = traducciones[idioma];
    document.getElementById("texto-intro").textContent = t.intro;
    document.getElementById("texto-secundario").textContent = t.secundario;
    document.getElementById("texto-final").textContent = t.final;
}

// Función con sentencia de control
function checarHorario() {
    let hora = new Date().getHours();
    let mensaje = document.getElementById("horario");

    if (hora >= 9 && hora <= 20) {
        mensaje.innerHTML = "Abierto 😸 gatitos activos 🌞";
    } else {
        mensaje.innerHTML = "😿 Cerrado, gatitos durmiendo 🌙";
    }
}

window.onload = function () {
    checarHorario();
};