import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyAgjCrnDMe1tUXBsjkSAFyk0GSgtHcyDZs",
    authDomain: "cloud-computing-a8636.firebaseapp.com",
    projectId: "cloud-computing-a8636",
    storageBucket: "cloud-computing-a8636.firebasestorage.app",
    messagingSenderId: "58402975876",
    appId: "1:58402975876:web:67031149c5d933919e12d1",
    measurementId: "G-FZ92EZ1WFF"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firestore conectado correctamente");


const formulario = document.getElementById("formularioTanque");
const tablaTanques = document.getElementById("tablaTanques");
const botonGuardar = formulario.querySelector("button[type='submit']");

let tanques = JSON.parse(localStorage.getItem("tanques")) || [];
let tanqueEditando = null;

cargarTanquesFirebase();

formulario.addEventListener("submit", async function (event) {

    event.preventDefault();

    const id = document.getElementById("id").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const generacion = document.getElementById("generacion").value;
    const pais = document.getElementById("pais").value.trim();

    if (tanqueEditando !== null) {

        const tanque = tanques.find(function (tanque) {
            return tanque.id === tanqueEditando;
        });

        if (!tanque) {
            return;
        }


        const tanqueActualizado = {
            id: id,
            nombre: nombre,
            generacion: generacion,
            pais: pais
        };


        try {

            await updateDoc(
                doc(db, "tanques", tanque.firestoreId),
                tanqueActualizado
            );

            const indice = tanques.findIndex(function (tanque) {
                return tanque.id === tanqueEditando;
            });

            tanques[indice] = {
                ...tanqueActualizado,
                firestoreId: tanque.firestoreId
            };

            localStorage.setItem(
                "tanques",
                JSON.stringify(tanques)
            );


            console.log("Tanque actualizado en Firebase correctamente");

            tanqueEditando = null;

            botonGuardar.textContent = "Guardar tanque";

            formulario.reset();

            mostrarTanques();

        } catch (error) {

            console.error(
                "Error al actualizar el tanque:",
                error
            );

            alert("No se pudo actualizar el tanque.");

        }

        return;
    }

    const tanqueExistente = tanques.some(function (tanque) {
        return tanque.id === id;
    });

    if (tanqueExistente) {

        alert(
            "Ya existe un tanque con ese número de serie."
        );

        return;
    }

    const nuevoTanque = {
        id: id,
        nombre: nombre,
        generacion: generacion,
        pais: pais
    };


    try {

        const documento = await addDoc(
            collection(db, "tanques"),
            nuevoTanque
        );

        const tanqueCompleto = {
            ...nuevoTanque,
            firestoreId: documento.id
        };

        tanques.push(tanqueCompleto);

        localStorage.setItem(
            "tanques",
            JSON.stringify(tanques)
        );


        console.log(
            "Tanque guardado en Firebase correctamente"
        );


        mostrarTanques();

        formulario.reset();

    } catch (error) {

        console.error(
            "Error al guardar en Firebase:",
            error
        );

        alert("No se pudo guardar el tanque.");

    }

});

async function cargarTanquesFirebase() {

    try {

        const consulta = await getDocs(
            collection(db, "tanques")
        );


        tanques = [];


        consulta.forEach(function (documento) {

            const datos = documento.data();

            tanques.push({
                id: datos.id,
                nombre: datos.nombre,
                generacion: datos.generacion,
                pais: datos.pais,

                firestoreId: documento.id
            });

        });

        localStorage.setItem(
            "tanques",
            JSON.stringify(tanques)
        );


        mostrarTanques();


        console.log(
            "Tanques cargados desde Firebase correctamente"
        );


    } catch (error) {

        console.error(
            "Error al cargar los tanques desde Firebase:",
            error
        );

        mostrarTanques();

    }

}

function mostrarTanques() {

    tablaTanques.innerHTML = "";


    if (tanques.length === 0) {

        tablaTanques.innerHTML = `
            <tr>
                <td colspan="5">
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


    tanqueEditando = tanque.id;


    botonGuardar.textContent =
        "Actualizar tanque";


    document.getElementById("id").focus();

}

async function eliminarTanque(id) {

    const confirmar = confirm(
        "¿Estás seguro de que quieres eliminar este tanque?"
    );


    if (!confirmar) {
        return;
    }


    const tanque = tanques.find(function (tanque) {

        return tanque.id === id;

    });


    if (!tanque) {
        return;
    }


    try {

        await deleteDoc(
            doc(db, "tanques", tanque.firestoreId)
        );

        tanques = tanques.filter(function (tanque) {

            return tanque.id !== id;

        });


        localStorage.setItem(
            "tanques",
            JSON.stringify(tanques)
        );


        mostrarTanques();


        console.log(
            "Tanque eliminado de Firebase correctamente"
        );


    } catch (error) {

        console.error(
            "Error al eliminar el tanque:",
            error
        );

        alert("No se pudo eliminar el tanque.");

    }

}

window.editarTanque = editarTanque;
window.eliminarTanque = eliminarTanque;