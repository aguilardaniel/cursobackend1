//Configuraciones de mi proyecto para web socket

const socket=io() //inicializa socket.io

socket.on("actualizarProductos", async(productos) => {

    //ArrayProductos = JSON.parse(productos);
    const listaProductos = document.getElementById("lista");
  
  // Borrar el contenido existente
  listaProductos.innerHTML = "";

  // Llenar la lista con los datos del vector
  productos.forEach(producto => {
    const item = document.createElement("li");
    item.textContent = `${producto.title} - $${producto.price}`;
    listaProductos.appendChild(item); 
  });

    //console.log(`Alguien Está por actualizar`);
    //console.log(productos);
});