// Variables globales
let iconCart = document.querySelector(".carrito");
let iconCount = document.querySelector(".contar-pro");
let btnProducts = document.querySelectorAll(".btn-product");
let contentProducts = document.querySelector(".content-pro");
let listCart = document.querySelector(".list-cart tbody");
let con = 1;

// Evento al navegador para cargar los productos
document.addEventListener("DOMContentLoaded", () => {
    getProductData();
});

// Función para obtener la información del producto
let getInfoProduc = (id) => {
    let products = [];
    let productPrevius = JSON.parse(localStorage.getItem("productos"));
    if (productPrevius != null) {
        products = Object.values(productPrevius);
    }
    // Llamar función addProCart
    addProCart(products[id]);
    iconCount.textContent = con;
    con++;
};

// Función para llevar la info del producto al carrito
let addProCart = (prod) => {
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${con}</td>
        <td><img src="${prod.imagen}" width="30%" /></td>
        <td>${prod.nombre}</td>
        <td>${prod.precio}</td>
        <td>
        <button onclick="deleteCart(${con});" type="button" class="btn text-danger">X</button>
        </td>
    `;
    listCart.appendChild(row);
};

// Función para traer los datos a la tienda
let getProductData = async () => {
    let url = "http://localhost/backend-apiCrud/productos";
    try {
        let respuesta = await fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
        });
        // Validar respuesta al servidor
        if (respuesta.status == 204) {
            console.log("No hay datos en la BD");
        } else {
            let tableData = await respuesta.json();
            console.log(tableData);

            // Agregar datos de la tabla a localStorage
            localStorage.setItem("productos", JSON.stringify(tableData));

            // Agregar los datos a la tabla
            tableData.forEach((dato, i) => {
                contentProducts.innerHTML += `
                    <div class="col-md-3 py-3 py-md-0">
                        <div class="card">
                            <img src="${dato.imagen}" alt="">
                            <div class="card-body">
                                <h3>${dato.nombre}</h3>
                                <p>${dato.descripcion}</p>
                                <h5>${dato.precio} <span class="btn-product" onclick="getInfoProduc(${i})"><i class="fa-solid fa-basket-shopping"></i></span></h5>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
    } catch (error) {
        console.log(error);
    }
};
