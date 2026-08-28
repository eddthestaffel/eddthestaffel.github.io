const formulario = document.getElementById("formularioTanque");
const tablaTanques = document.getElementById("tablaTanques");
const botonGuardar = formulario.querySelector("button[type='submit']");

let tanques = JSON.parse(localStorage.getItem("tanques")) || [];

let tanqueEditando = null;

mostrarTanques();

formulario.addEventListener("submit", function (event) {
event.preventDefault();

const id = document.getElementById("id").value.trim();
const nombre = document.getElementById("nombre").value.trim();
const generacion = document.getElementById("generacion").value;
const pais = document.getElementById("pais").value.trim();

if (tanqueEditando !== null) {

    const indice = tanques.findIndex(function (tanque) {
        return tanque.id === tanqueEditando;
    });

    if (indice !== -1) {

        tanques[indice] = {
            id: id,
            nombre: nombre,
            generacion: generacion,
            pais: pais
        };

        localStorage.setItem("tanques", JSON.stringify(tanques));

        tanqueEditando = null;

        botonGuardar.textContent = "Guardar tanque";

        formulario.reset();

        mostrarTanques();
    }

    return;
}

const tanqueExistente = tanques.some(function (tanque) {
    return tanque.id === id;
});

if (tanqueExistente) {
    alert("Ya existe un tanque con ese número de serie.");
    return;
}

const nuevoTanque = {
    id: id,
    nombre: nombre,
    generacion: generacion,
    pais: pais
};

tanques.push(nuevoTanque);

localStorage.setItem("tanques", JSON.stringify(tanques));

mostrarTanques();

formulario.reset();

});

function mostrarTanques() {

tablaTanques.innerHTML = "";

if (tanques.length === 0) {

    tablaTanques.innerHTML = `
        <tr>
            <td colspan="5">No hay tanques registrados.</td>
        </tr>
    `;

    return;
}

tanques.forEach(function (tanque) {

    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${tanque.id}</td>
        <td>${tanque.nombre}</td>
        <td>${tanque.generacion}</td>
        <td>${tanque.pais}</td>
        <td>
            <button type="button" onclick="editarTanque('${tanque.id}')">
                Editar
            </button>

            <button onclick="eliminarTanque('${tanque.id}')">
                Eliminar
            </button>
        </td>
    `;

    tablaTanques.appendChild(fila);
});
}

function editarTanque(id) {

const tanque = tanques.find(function (tanque) {
    return tanque.id === id;
});

if (!tanque) {
    return;
}

document.getElementById("id").value = tanque.id;
document.getElementById("nombre").value = tanque.nombre;
document.getElementById("generacion").value = tanque.generacion;
document.getElementById("pais").value = tanque.pais;

tanqueEditando = tanque.id;

botonGuardar.textContent = "Actualizar tanque";

document.getElementById("id").focus();

}

function eliminarTanque(id) {

const confirmar = confirm(
    "¿Estás seguro de que quieres eliminar este tanque?"
);

if (!confirmar) {
    return;
}

tanques = tanques.filter(function (tanque) {
    return tanque.id !== id;
});

localStorage.setItem("tanques", JSON.stringify(tanques));

mostrarTanques();

}