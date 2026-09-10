'use strict';

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
    const fabricante = document.getElementById("fabricante").value.trim();

    if (!/^\d{6}$/.test(id)) {

        alert("El número de serie debe contener exactamente 6 dígitos.");
        document.getElementById("id").focus();
        return;
    }

    if (nombre === "") {

        alert("El nombre del tanque es obligatorio.");
        document.getElementById("nombre").focus();
        return;
    }

    if (pais === "") {

        alert("El país es obligatorio.");
        document.getElementById("pais").focus();
        return;
    }

    if (fabricante === "") {

        alert("El fabricante es obligatorio.");
        document.getElementById("fabricante").focus();
        return;
    }

    if (tanqueEditando !== null) {

        const indice = tanques.findIndex(function (tanque) {

            return tanque.id === tanqueEditando;

        });

        if (indice === -1) {

            return;

        }

        const numeroRepetido = tanques.some(function (tanque) {

            return tanque.id === id &&
                   tanque.id !== tanqueEditando;

        });


        if (numeroRepetido) {

            alert("Ya existe otro tanque con ese número de serie.");
            return;

        }


        tanques[indice] = {

            id: id,
            nombre: nombre,
            generacion: generacion,
            pais: pais,
            fabricante: fabricante

        };

        localStorage.setItem(
            "tanques",
            JSON.stringify(tanques)
        );

        console.log("Tanque actualizado en LocalStorage");

        tanqueEditando = null;
        botonGuardar.textContent = "Guardar tanque";
        formulario.reset();
        mostrarTanques();
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
        pais: pais,
        fabricante: fabricante
    };

    tanques.push(nuevoTanque);

    localStorage.setItem(
        "tanques",
        JSON.stringify(tanques)
    );

    console.log("Tanque guardado en LocalStorage");
    mostrarTanques();
    formulario.reset();

});

function mostrarTanques() {

    tablaTanques.innerHTML = "";

    if (tanques.length === 0) {

        tablaTanques.innerHTML = `
            <tr>
                <td colspan="6">
                    No hay tanques registrados.
                </td>
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

            <td>${tanque.fabricante || "No especificado"}</td>

            <td>

                <button
                    type="button"
                    onclick="editarTanque('${tanque.id}')"
                >
                    Editar
                </button>

                <button
                    type="button"
                    onclick="eliminarTanque('${tanque.id}')"
                >
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

    document.getElementById("id").value =
        tanque.id;

    document.getElementById("nombre").value =
        tanque.nombre;

    document.getElementById("generacion").value =
        tanque.generacion;

    document.getElementById("pais").value =
        tanque.pais;

    document.getElementById("fabricante").value =
        tanque.fabricante || "";

    tanqueEditando = tanque.id;

    botonGuardar.textContent =
        "Actualizar tanque";

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

    localStorage.setItem(
        "tanques",
        JSON.stringify(tanques)
    );

    mostrarTanques();
    console.log("Tanque eliminado de LocalStorage");
}

window.editarTanque = editarTanque;
window.eliminarTanque = eliminarTanque;