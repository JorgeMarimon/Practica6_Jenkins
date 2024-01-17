$(document).ready(() => {
  init();

  //AQUÍ CARGO TODO LO QUE DEBE ESTAR SIEMPRE EN FUNCIONAMIENTO DESDE EL SEGUNDO 0.
  $("#botonBuscar").click(() => buscarProducto());

  //SIRVE PARA BUSCAR LA DISPONIBILIDAD BASÁNDOSE EN EL TÍTULO
  $(document).on("click", ".botonConClick", function () {
    var titulo = $(this).closest(".card").find(".card-title").text();
    var disponibilidad = obtenerDisponibilidadPorTitulo(titulo);
    toAdd(titulo, disponibilidad);
  });

  //SIRVE PARA AYUDARME A OBTENER EL ÍNDICE, QUE SERÁ LO QUE SE MANEJE PARA LOS MODALES DE INFORMACIÓN
  $(document).on("click", ".botonComprarInfo", function () {
    var index = $(this).closest(".card").data("index");
    if (index !== undefined) {
      mostrarModalInformacion(index);
    }
  });


  $(document).on("click", ".botonComprar", comprar);
  $(document).on("click", ".botonBorrar", borrar);

  //SIRVE PARA QUE EN TABLET Y MOVIL, AL SELECCIONA ALGO DEL MENÚ DESPLEGABLE, SE CIERRE LUEGO AUTOMÁTICAMENTE
  $('.navbar-nav a').on('click', function () {
    $('#navbarSupportedContent').collapse('hide');
  });

  /*SIRVE PARA QUE LA PÁGINA NO SE RECARGE AUTOMÁTICAMENTE POR LOS FORMULARIOS (DA PROBLEMAS). ADEMÁS HE TENIDO QUE USAR 
  TYPE:BUTTON EN LUGAR DE TYPE:SUBMIT PORQUE INCLUSO CON ESTE CÓDIGO, NO SE ARREGLABA. ESTO IMPIDE QUE EL BUSCADOR FUNCIONE AL 
  PULSAR ENTER PERO SI FUNCIONAPERFEMTANETE AL PULSAR EL BOTÓN*/
  $("#formularioBusqueda").submit(function (event) {
    event.preventDefault();
    buscarProducto();
  });

  //SIRVE PARA GESTIONAR QUE SE MUESTRA Y QUE NO EN CADA MOMENTO, PERMITIENDO TENER TODO EN UN SOLO HTML
  //HE INTENTADO ENGLOBARLO EN FUNCIONES PARA REDUCIR LAS LÍNEAS DE CÓDIGO PERO NO HE DADO CON LA CLAVE CORRECTA
  $("#americanosOcultos").hide();
  $("#europeosOcultos").hide();
  $("#mangasOcultos").hide();
  $("#librosOcultos").hide();
  $("#rolOcultos").hide();
  $("#merchandisingOcultos").hide();
  $("#acercaDe").hide();
  $("#dondeEstamos").hide();
  $("#contacto").hide();

  $("#botonBuscar").click(function () {
    $("#acercaDe").hide();
    $(".ocultar").hide();
    $("#dondeEstamos").hide();
    $("#contacto").hide();
    $("#americanosOcultos").hide();
    $("#europeosOcultos").hide();
    $("#mangasOcultos").hide();
    $("#librosOcultos").hide();
    $("#rolOcultos").hide();
    $("#merchandisingOcultos").hide();
    $("#resultadosBuscador").show()
  })

  $("#botonAcercaDe").click(function () {
    $("#resultadosBuscador").hide()
    $("#acercaDe").show();
    $(".ocultar").hide();
    $("#dondeEstamos").hide();
    $("#contacto").hide();
    $("#americanosOcultos").hide();
    $("#europeosOcultos").hide();
    $("#mangasOcultos").hide();
    $("#librosOcultos").hide();
    $("#rolOcultos").hide();
    $("#merchandisingOcultos").hide();
  });

  $("#botonDondeEstamos").click(function () {
    $("#resultadosBuscador").hide()
    $("#dondeEstamos").show();
    $("#acercaDe").hide();
    $(".ocultar").hide();
    $("#contacto").hide();
    $("#americanosOcultos").hide();
    $("#europeosOcultos").hide();
    $("#mangasOcultos").hide();
    $("#librosOcultos").hide();
    $("#rolOcultos").hide();
    $("#merchandisingOcultos").hide();
  });

  $("#botonContacto").click(function () {
    $("#resultadosBuscador").hide()
    $("#dondeEstamos").hide();
    $("#acercaDe").hide();
    $(".ocultar").hide();
    $("#contacto").show();
    $("#americanosOcultos").hide();
    $("#europeosOcultos").hide();
    $("#mangasOcultos").hide();
    $("#librosOcultos").hide();
    $("#rolOcultos").hide();
    $("#merchandisingOcultos").hide();
  });

  $(".verTodosInicio").click(function () {
    $("#resultadosBuscador").hide()
    $(".ocultar").show();
    $("#acercaDe").hide();
    $("#dondeEstamos").hide();
    $("#contacto").hide();
    $("#americanosOcultos").hide();
    $("#europeosOcultos").hide();
    $("#mangasOcultos").hide();
    $("#librosOcultos").hide();
    $("#rolOcultos").hide();
    $("#merchandisingOcultos").hide();
  });

  $(".verTodosAmericanos").click(function () {
    $("#resultadosBuscador").hide()
    $(".ocultar").hide();
    $("#acercaDe").hide();
    $("#dondeEstamos").hide();
    $("#contacto").hide();
    $("#americanosOcultos").show();
    $("#europeosOcultos").hide();
    $("#mangasOcultos").hide();
    $("#librosOcultos").hide();
    $("#rolOcultos").hide();
    $("#merchandisingOcultos").hide();
  });
  $("#volverAmericanos").click(function () {
    $(".ocultar").show();
    $("#americanosOcultos").hide();
  });

  $(".verTodosEuropeos").click(function () {
    $("#resultadosBuscador").hide()
    $(".ocultar").hide();
    $("#acercaDe").hide();
    $("#dondeEstamos").hide();
    $("#contacto").hide();
    $("#europeosOcultos").show();
    $("#americanosOcultos").hide();
    $("#mangasOcultos").hide();
    $("#librosOcultos").hide();
    $("#rolOcultos").hide();
    $("#merchandisingOcultos").hide();
  });
  $("#volverEuropeos").click(function () {
    $(".ocultar").show();
    $("#europeosOcultos").hide();
  });

  $(".verTodosMangas").click(function () {
    $("#resultadosBuscador").hide()
    $(".ocultar").hide();
    $("#acercaDe").hide();
    $("#dondeEstamos").hide();
    $("#contacto").hide();
    $("#mangasOcultos").show();
    $("#americanosOcultos").hide();
    $("#europeosOcultos").hide();
    $("#librosOcultos").hide();
    $("#rolOcultos").hide();
    $("#merchandisingOcultos").hide();
  });
  $("#volverMangas").click(function () {
    $(".ocultar").show();
    $("#mangasOcultos").hide();
  });

  $(".verTodosLibros").click(function () {
    $("#resultadosBuscador").hide()
    $(".ocultar").hide();
    $("#acercaDe").hide();
    $("#dondeEstamos").hide();
    $("#contacto").hide();
    $("#librosOcultos").show();
    $("#americanosOcultos").hide();
    $("#europeosOcultos").hide();
    $("#mangasOcultos").hide();
    $("#rolOcultos").hide();
    $("#merchandisingOcultos").hide();
  });
  $("#volverLibros").click(function () {
    $(".ocultar").show();
    $("#librosOcultos").hide();
  });

  $(".verTodoRol").click(function () {
    $("#resultadosBuscador").hide()
    $(".ocultar").hide();
    $("#acercaDe").hide();
    $("#dondeEstamos").hide();
    $("#contacto").hide();
    $("#rolOcultos").show();
    $("#americanosOcultos").hide();
    $("#europeosOcultos").hide();
    $("#mangasOcultos").hide();
    $("#librosOcultos").hide();
    $("#merchandisingOcultos").hide();
  });
  $("#volverRol").click(function () {
    $(".ocultar").show();
    $("#rolOcultos").hide();
  });

  $(".verTodoMerchandising").click(function () {
    $("#resultadosBuscador").hide()
    $(".ocultar").hide();
    $("#acercaDe").hide();
    $("#dondeEstamos").hide();
    $("#contacto").hide();
    $("#merchandisingOcultos").show();
    $("#americanosOcultos").hide();
    $("#europeosOcultos").hide();
    $("#mangasOcultos").hide();
    $("#librosOcultos").hide();
    $("#rolOcultos").hide();
  });
  $("#volverMerchandising").click(function () {
    $(".ocultar").show();
    $("#merchandisingOcultos").hide();
  });

  //SIRVE PARA QUE CUANDO SE ABRA EL GESTOR DE CORREO PREDETERMINADO, APAREZCAN YA DATOS ESCRITOS
  $("#enviarCorreo").click(function () {
    var nombre = $("#nombre").val();
    var correo = $("#correo").val();
    var mensaje = $("#mensaje").val();
    var mailtoLink =
      "mailto:comicclandia@gmail.com?subject=Consulta&body=Nombre: " +
      nombre +
      "%0ACorreo: " +
      correo +
      "%0AMensaje: " +
      mensaje;
    window.location.href = mailtoLink;
  });
});

//BOTONES PARA EL MODAL DEL CARRITO
var botonComprar = $("<button>", {
  text: "Comprar",
  class: "botonLista col-3 btn btn-primary",
});
var botonBorrar = $("<button>", {
  text: "Borrar",
  class: "botonLista col-3 btn btn-primary",
});


//------------------------------------------------------------------------
//ENLACE CON EL JSON Y VARIABLES CONCRETAS PARA FUNCIONES

var datos;
var tituloComic;

function init() {
  $.ajax({
    url: "../json/data.json",
    //data:,
    type: "GET",
    dataType: "json",
    success: function (data) {
      datos = data.productos;
      console.log("Datos cargados correctamente:", datos);
      carousel(datos)
      mostrarProductos(data);
      mostrarProductosPorSeccion(data);
    },
    error: function (xhr, status) {
      console.log("Disculpe, apareció un problema");
    },
    complete: function (xhr, status) {
      console.log("Petición realizada");
    },
  });
}


//------------------------------------------------------------------------
//FUNCIONES RELACIONADAS CON EL CARRITO

function comprar() {
  mostrarModalCompra();
}

function borrar() {
  $("#carritoDropdown .dropdown-li").remove();
  actualizarInfoTotalDropdown();
}

//SIRVE PARA OBTENER EL PRECIO POR EL TÍTULO
function obtenerPrecioPorTitulo(titulo) {
  var precio = 0;
  $.each(datos, function (index, elemento) {
    if (elemento.Nombre === titulo) {
      precio = elemento.Precio;
      return false;
    }
  });
  return precio;
}

//SIRVE PARA OBTENER LA IMAGEN POR EL TÍTULO
function obtenerImagenPorTitulo(titulo) {
  var imagen = "";
  $.each(datos, function (index, elemento) {
    if (elemento.Nombre === titulo) {
      imagen = elemento["Ficha técnica"][0].Imagen;
      return false;
    }
  });
  return imagen;
}

//SIRVE PARA GESTIONAR LA LÓGICA DE AÑADIR ELEMENTOS AL CARRITO
function toAdd(comicAñadido, disponibilidad) {
  //AQUÍ EVITO QUE SE AÑADAN COSAS MARCADAS COMO NO DISPONIBLES EN EL JSON
  if (disponibilidad === "No disponible") {
    mostrarModalNoDisponible(comicAñadido);
    return;

    //AQUÍ VERIFICO SI YA EXISTE UN ITEM CON UN TÍTULO SIMILAR ACTUALMENTE EN EL CARRITO
  } else {
    var ul = $("#carritoDropdown");
    var existingItem = null;
    ul.find("li").each(function () {
      var h2 = $(this).find("h2");
      if (h2 && h2.text() === comicAñadido) {
        existingItem = $(this);
      }
    });

    //SI YA EXISTE, AUMENTO LA CANTIDAD, ASÍ EVITO DUPLICARLO EN EL CARRITO
    if (existingItem) {
      var cantidad = existingItem.find(".cantidad");
      cantidad.text(parseInt(cantidad.text()) + 1);

      //SI NO EXISTE ACTUALMENTE, SE CREA EL LI QUE ENGLOBA TODOS LOS DATOS
    } else {
      var li = $("<li>").addClass("dropdown-li");
      //LLAMO A LAS FUNCIONES QUE HEMOS VISTO ARRIBA
      li.data("precio", obtenerPrecioPorTitulo(comicAñadido));
      li.data("imagen", obtenerImagenPorTitulo(comicAñadido));
      var tituloCompra = $("<h2>").text(comicAñadido);
      var cantidadContainer = $("<div>").addClass(
        "cantidad-container row justify-content-between"
      );
      var cantidadTitulo = $("<h4>").text("Cantidad: ").addClass("col-4");
      var cantidad = $("<h4>")
        .text(1)
        .addClass("cantidad col-1 d-flex justify-content-center");
      var botonAumentar = $(
        "<i class='bx bx-chevron-right col-2 d-flex justify-content-start' style='font-size: 20px; cursor: pointer;'></i>"
      ).click(function () {
        aumentarCantidad(li);
      });
      var botonDisminuir = $(
        "<i class='bx bx-chevron-left col-2 d-flex justify-content-end' style='font-size: 20px; cursor: pointer;'></i>"
      ).click(function () {
        disminuirCantidad(li);
      });
      var botonBorrar = $(
        "<i class='bx bx-trash col-2' style='font-size: 20px; cursor: pointer;'></i>"
      ).click(function () {
        borrarProducto(li);
      });
      cantidadContainer.append(cantidadTitulo);
      cantidadContainer.append(botonDisminuir);
      cantidadContainer.append(cantidad);
      cantidadContainer.append(botonAumentar);
      cantidadContainer.append(botonBorrar);
      li.append(tituloCompra);
      li.append(cantidadContainer);
      ul.append(li);
    }
  }
  //LLAMO A LA SIGUIENTE FUNCIÓN
  actualizarInfoTotalDropdown();
}

//SIRVE PARA QUE LOS PRECIOS SE SUMEN, APAREZCA BIEN EL TOTAL, SI AUMENTO LA CANTIDAD DE UNO SE ACTUALICE... MANEJA ESA LÓGICA
function actualizarInfoTotalDropdown() {
  var totalProductos = 0;
  var totalPrecio = 0;
  var tieneProductos = false;

  //ASÍ NO SALEN LOS BOTONES CON CADA PRODUCTO QUE AÑADO, SINO QUE SOLO UNA VEZ
  $("#carritoDropdown .producto-carrito").remove();
  $("#carritoDropdown .botones-compra").remove();
  $("#carritoDropdown li").each(function () {
    var cantidad = parseInt($(this).find(".cantidad").text());
    var precio = parseFloat($(this).data("precio"));
    var imagen = $(this).data("imagen");

    totalProductos += cantidad;
    totalPrecio += cantidad * precio;

    var productoDiv = $("<div>").addClass("producto-carrito row");
    var imagenProducto = $("<img>")
      .attr("src", imagen)
      .addClass("img-thumbnail col-5");
    var contenidoProducto = $("<div>").addClass("contenido-producto col-7");
    var precioProducto = $("<p>").text(
      "Precio total: " + (cantidad * precio).toFixed(2) + "€"
    );
    contenidoProducto.append(precioProducto);
    productoDiv.append(imagenProducto);
    productoDiv.append(contenidoProducto);
    $(this).append(productoDiv);
    tieneProductos = true;
  });

  //AGREGA LA INFORMACIÓN TOTAL EN EL DROPDOWN SI YA HAY PRODUCTOS
  if (tieneProductos) {
    var totalDiv = $("<div>").addClass("botones-compra row");
    var totalProductosElement = $("<p>")
      .text("Total de productos: " + totalProductos)
      .addClass("col-12");
    var totalPrecioElement = $("<p>")
      .text("Total compra: " + totalPrecio.toFixed(2) + "€")
      .addClass("col-12");
    var botonComprar = $("<button>", {
      text: "Comprar",
      class: "botonLista col-6 btn btn-primary",
    }).click(comprar);

    var botonBorrar = $("<button>", {
      text: "Borrar",
      class: "botonLista col-6 btn btn-primary",
    }).click(borrar);

    totalDiv.append(totalProductosElement);
    totalDiv.append(totalPrecioElement);
    totalDiv.append(botonComprar);
    totalDiv.append(botonBorrar);

    $("#carritoDropdown").append(totalDiv);
  }
}

function mostrarModalCompra(mensaje) {
  var modalCompra = $("#recipient-name");
  modalCompra.val(mensaje);
  var myModal = new bootstrap.Modal($("#exampleModal"));
  myModal.show();
  var botonModal = $("#botonModal");
  botonModal.click(function () {
    borrar();
  });
}

function aumentarCantidad(item) {
  var cantidad = parseInt(item.find(".cantidad").text());
  item.find(".cantidad").text(cantidad + 1);
  actualizarInfoTotalDropdown();
}

function disminuirCantidad(item) {
  var cantidad = parseInt(item.find(".cantidad").text());
  if (cantidad > 1) {
    item.find(".cantidad").text(cantidad - 1);
    actualizarInfoTotalDropdown();
  }
}

function borrarProducto(item) {
  item.remove();
  actualizarInfoTotalDropdown();
}


//------------------------------------------------------------------------
//FUNCIONES PARA EL BUSCADOR

//MANEJA LA LÓGICA DEL BUSCADOR. PERMITE BUSCAR POR TROZOS DE PALABRAS GRACIAS AL INCLUDES (COMO COMENTO ANTES, NO FUNCIONA EL BOTÓN ENTER)
function buscarProducto() {
  var busqueda = $("#buscadorNavegador input").val().toLowerCase();;
  var comicEncontrado = false;
  var contenedor = $(".contenedorResponsive");
  contenedor.empty();

  //LÓGICA PARA CADA ELEMENTO QUE ENCUENTRE QUE COINCIDA CON LA BÚSQUEDA
  $.each(datos, (index, elem) => {
    if (elem.Nombre.toLowerCase().includes(busqueda)) {
      var nuevoDiv = $("<div></div>", { class: "card col-10 col-md-5 col-lg-3 cardSimple" });
      var nuevaImagen = $("<img>", {
        class: "card-img-top",
        src: elem["Ficha técnica"][0].Imagen,
      });
      var nuevoBody = $("<div>", {
        class: "card-body",
      });
      var titulo = $("<h5>", { class: "card-title limitoAncho", text: elem.Nombre });
      var texto = $("<div>", {
        class: "card-text limitoAncho",
      }).html(
        "Autor: " + elem.Autor + "<br>Precio: " + elem.Precio.toFixed(2) + "€"
      );
      var divBotones = $("<div>", {
        class: "row justify-content-around divBotones",
      });
      var nuevoBoton = $("<a>", {
        href: "#",
        class: "btn btn-primary botonConClick col-5",
        text: "Comprar",
      });
      var botonInfo = $("<button>", {
        text: "Info",
        class: "btn btn-primary botonComprarInfo col-5",
        "data-index": index,
      }).click(function () {
        mostrarModalInformacion(index); // Pasa el índice al hacer clic
      });
      divBotones.append(nuevoBoton);
      divBotones.append(botonInfo)
      nuevoBody.append(titulo);
      nuevoBody.append(texto);
      nuevoBody.append(divBotones);
      nuevoDiv.append(nuevaImagen);
      nuevoDiv.append(nuevoBody);
      contenedor.append(nuevoDiv);
      comicEncontrado = true;
    }

    //COMPROBANTE POR CONSOLA POR SI NO ENCUENTRA EL PRODUCTO O ALGO NO FUNCIONA BIEN
    if (!comicEncontrado == true && busqueda) {
      console.log("Lo lamento pero no disponemos de ese comic.");
    }
  });
}


//------------------------------------------------------------------------
//FUNCIONES PARA EL CARRUSEL

//UTILIZANDO EL SLIDER SLICK DE JQUERY, SE GESTIONA ESTE CARRUSEL
function carousel(datos) {
  var contenedor = $("#slick-carousel");

  //LOGICA PARA VERIFICAR SI ALGO VA FALLANDO Y NOS AVISA POR CONSOLA
  if (!datos) {
    console.error("Datos de productos no válidos o contenedor de carrusel no encontrado.");
    return;
  }

  contenedor.empty();
  $.each(datos, (index, producto) => {
    if (producto.Destacado === "si") {
      var nuevoDiv = $("<div>").addClass("card cardSimple");
      var nuevaImagen = $("<img>", {
        class: "card-img-top",
        src: producto["Ficha técnica"][0].Imagen,
        alt: producto.Nombre,
      });
      var nuevoBody = $("<div>", {
        class: "card-body",
      });
      var titulo = $("<h5>", { class: "card-title limitoAncho2", text: producto.Nombre });
      var texto = $("<div>", {
        class: "card-text limitoAncho2",
      }).html(
        "Autor: " + producto.Autor + "<br>Precio: " + producto.Precio.toFixed(2) + "€"
      );
      var divBotones = $("<div>", {
        class: "row justify-content-around divBotones",
      });
      var nuevoBoton = $("<a>", {
        href: "#",
        class: "btn btn-primary botonConClick col-5",
        text: "Comprar",
      });
      var botonInfo = $("<button>", {
        text: "Info",
        class: "btn btn-primary botonComprarInfo col-5",
        "data-index": index,
      }).click(function () {
        mostrarModalInformacion(index); // Pasa el índice al hacer clic
      });
      divBotones.append(nuevoBoton);
      divBotones.append(botonInfo)
      nuevoDiv.data("index", index);
      nuevoBody.append(titulo);
      nuevoBody.append(texto);
      nuevoBody.append(divBotones);
      nuevoDiv.append(nuevaImagen);
      nuevoDiv.append(nuevoBody);
      contenedor.append(nuevoDiv);
    }
  });

  //SIRVE PARA TRABAJAR EL RESPONSIVE
  var slidesToShowValue = 3;
  if (window.innerWidth <= 768) {
    slidesToShowValue = 2;
  }
  if (window.innerWidth <= 390) {
    slidesToShowValue = 1;
  }

  //SIRVE PARA GESTIONAR CARACTERÍSTICAS DEL SLICK (SLIDER DE JQUERY)
  contenedor.slick({
    centerMode: false,
    slidesToShow: slidesToShowValue,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: '<button type="button" class="slick-prev">&#8249;</button>',
    nextArrow: '<button type="button" class="slick-next">&#8250;</button>'
  });
}


//------------------------------------------------------------------------
//FUNCIONES PARA LEER DATOS DEL JSON Y MOSTRARLOS EN LA WEB

//SIRVE PARA MOSTRAR LOS PRODUCTOS QUE VES EN LA PÁGINA DE INICIO
function mostrarProductos(data) {
  var contenedores = {
    Americano: $("#container-americanos"),
    Europeo: $("#container-europeos"),
    Japonés: $("#container-manga"),
    Libro: $("#carousel-inner"),
  };
  var contadores = {
    Americano: 0,
    Europeo: 0,
    Japonés: 0,
  };
  var tarjetasAMostrar = 5;

  //SIRVE PARA LA RESPONSIVIDAD
  if (window.innerWidth < 1200 && window.innerWidth >= 768) {
    tarjetasAMostrar = 2;
  } else if (window.innerWidth < 768) {
    tarjetasAMostrar = 1;
  }

  //SIRVE PARA QUE EN FUNCIÓN DEL TIPO, ESTABLEZCA A QUE CONTENEDOR IR Y COMO VA EL CONTADOR. ES UNA NOTACIÓN DE PROPIEDAD DINÁMICA
  $.each(data.productos, (index, elem) => {
    var tipo = elem.Tipo;
    if (contadores[tipo] < tarjetasAMostrar) {
      var nuevoDiv = crearTarjetaProductoMain(elem, index);
      contenedores[tipo].append(nuevoDiv);
      contadores[tipo]++;
    }

    //SIRVE PARA LOS LIBROS, YA QUE ES DIFERENTE A LO ANTERIOR PUES SE SITUA EN UN CARRUSEL PERO ESTA VEZ DE BOOTSTRAP
    if (tipo === "Libro" && elem.Destacado === "si") {
      $(".carousel-item.active").removeClass("active");
      var nuevoItemCarousel = $("<div></div>", {
        class: "carousel-item active",
      });
      var nuevoDiv1 = $("<div></div>", {
        class: "row justify-content-center seccionCompleta",
      });
      var nuevoDiv2 = $("<div></div>", { class: "col-10" });
      var nuevoDiv3 = $("<div></div>", {
        class: "container-cards row justify-content-around",
        id: "container-libro",
      });

      var nuevoDiv = crearTarjetaProductoMain(elem, index);
      nuevoDiv3.append(nuevoDiv);
      nuevoDiv2.append(nuevoDiv3);
      nuevoDiv1.append(nuevoDiv2);
      nuevoItemCarousel.append(nuevoDiv1);
      contenedores.Libro.append(nuevoItemCarousel);
    }
  });
}

//SIRVE PARA GENERAR TODAS LAS TARJETAS (CARDS) QUE SE USAN PARA RELLENAR LA SECCIÓN MAIN O HOME (FUNCIÓN ANTERIOR)
function crearTarjetaProductoMain(elem, index) {
  var nuevoDiv = $("<div></div>", { class: "card cardSimple" });
  var nuevaImagen = $("<img>", {
    class: "card-img-top",
    src: elem["Ficha técnica"][0].Imagen,
  });
  var nuevoBody = $("<div>", { class: "card-body" });
  var titulo = $("<h5>", { class: "card-title limitoAncho", text: elem.Nombre });
  var texto = $("<div>", { class: "card-text limitoAncho" }).html(
    "Autor: " + elem.Autor + "<br>Precio: " + elem.Precio.toFixed(2) + "€"
  );
  var divBotones = $("<div>", { class: "row justify-content-around divBotones" });
  var nuevoBoton = $("<a>", {
    href: "#",
    class: "btn btn-primary botonConClick otro col-5",
    text: "Comprar",
  });
  var botonInfo = $("<button>", {
    text: "Info",
    class: "btn btn-primary botonComprarInfo otro col-5",
    "data-index": index,
  }).click(function () {
    mostrarModalInformacion(index);
  });

  divBotones.append(nuevoBoton);
  divBotones.append(botonInfo);
  nuevoBody.append(titulo);
  nuevoBody.append(texto);
  nuevoBody.append(divBotones);
  nuevoDiv.append(nuevaImagen);
  nuevoDiv.append(nuevoBody);

  //SIRVE PARA EL RESPONSIVE
  if (window.innerWidth >= 1200) {
    nuevoDiv.addClass("col-2");
    //AJUSTE ESPECIFICO PARA LA SECCIÓN DE LIBROS
    if (elem.Tipo === "Libro") {
      nuevoDiv.removeClass("col-2").addClass("col-12");
    }
  } else if (window.innerWidth >= 768) {
    nuevoDiv.addClass("col-5");
    //AJUSTE ESPECIFICO PARA LA SECCIÓN DE LIBROS
    if (elem.Tipo === "Libro") {
      nuevoDiv.removeClass("col-5").addClass("col-12");
    }
  } else {
    nuevoDiv.addClass("col-12");
  }
  return nuevoDiv;
}

//SIRVE PARA MOSTRAR LOS PRODUCTOS CUANDO SE CLICA EN SU SECCIÓN. AQUÍ SE MUESTRAN TODOS Y NO SOLO ALGUNOS
function mostrarProductosPorSeccion(data) {
  var contenedorAmericano = $("#container-americanos2");
  var contenedorEuropeo = $("#container-europeos2");
  var contenedorManga = $("#container-manga2");
  var contenedorLibro = $("#container-libros2");
  var contenedorRol = $("#container-rol2");
  var contenedorMerchandising = $("#container-merchandising2");

  $.each(data.productos, (index, elem) => {
    var nuevoDiv = crearTarjetaProducto(elem, index);
    if (elem.Tipo === "Americano") {
      contenedorAmericano.append(nuevoDiv);
    } else if (elem.Tipo === "Europeo") {
      contenedorEuropeo.append(nuevoDiv);
    } else if (elem.Tipo === "Japonés") {
      contenedorManga.append(nuevoDiv);
    } else if (elem.Tipo === "Libro") {
      contenedorLibro.append(nuevoDiv);
    } else if (elem.Tipo === "Rol") {
      contenedorRol.append(nuevoDiv);
    } else if (elem.Tipo === "Merchandising") {
      contenedorMerchandising.append(nuevoDiv);
    }
    if (window.innerWidth >= 1200) {
      nuevoDiv.addClass("col-3");
    } else if (window.innerWidth >= 768) {
      nuevoDiv.addClass("col-5");
    } else {
      nuevoDiv.addClass("col-12");
    }
  }
  );
}

//SIRVE PARA GENERAR TODAS LAS TARJETAS (CARDS) QUE SE USAN PARA RELLENAR TODA UNA SECCIÓN (FUNCIÓN ANTERIOR)
function crearTarjetaProducto(elem, index) {
  var nuevoDiv = $("<div></div>", { class: "card cardSimple" });
  var nuevaImagen = $("<img>", {
    class: "card-img-top",
    src: elem["Ficha técnica"][0].Imagen,
  });
  var nuevoBody = $("<div>", { class: "card-body" });
  var titulo = $("<h5>", { class: "card-title limitoAncho2", text: elem.Nombre });
  var texto = $("<div>", { class: "card-text limitoAncho2" }).html(
    "Autor: " + elem.Autor + "<br>Precio: " + elem.Precio.toFixed(2) + "€"
  );
  var divBotones = $("<div>", { class: "row justify-content-around divBotones" });
  var nuevoBoton = $("<a>", {
    href: "#",
    class: "btn btn-primary botonConClick otro col-5",
    text: "Comprar",
  });
  var botonInfo = $("<button>", {
    text: "Info",
    class: "btn btn-primary botonComprarInfo otro col-5",
    "data-index": index,
  }).click(function () {
    mostrarModalInformacion(index);
  });

  divBotones.append(nuevoBoton);
  divBotones.append(botonInfo);
  nuevoBody.append(titulo);
  nuevoBody.append(texto);
  nuevoBody.append(divBotones);
  nuevoDiv.append(nuevaImagen);
  nuevoDiv.append(nuevoBody);

  if (window.innerWidth >= 1200) {
    nuevoDiv.addClass("col-3");
  } else if (window.innerWidth >= 768) {
    nuevoDiv.addClass("col-5");
  } else {
    nuevoDiv.addClass("col-12");
  }

  return nuevoDiv;
}


//------------------------------------------------------------------------
//FUNCIONES PARA LOS MODALES CON MÁS INFORMACIÓN SOBRE LOS PRODUCTOS

function mostrarModalInformacion(index) {
  console.log("Índice recibido:", index);

  var modalInfo = $("#exampleModalToggle");
  var modal2 = $("#exampleModalToggle2");

  modalInfo.find(".modal-body").empty();
  modalInfo.find(".modal-footer").empty();

  if (index >= 0 && datos && datos.length > 0 && index < datos.length) {
    console.log("Índice válido. Datos cargados:", datos);
    var comicData = datos[index];
    var modalBody = modalInfo.find(".modal-body");
    var modalFooter = modalInfo.find(".modal-footer");
    var titulo = $("<h5>", { class: "modal-title tituloModalInfo", text: comicData.Nombre });
    var imagen = $("<img>", {
      class: "img-fluid",
      src: comicData["Ficha técnica"][0].Imagen,
      alt: comicData.Nombre,
    });
    modalBody.append(titulo);
    modalBody.append(imagen);

    var sinopsis = $("<p>", { class: "sinopsisModalInfo", text: comicData.Sinopsis });
    var disponibilidad = $("<p>").html("<b>Disponibilidad:</b> " + comicData.Disponibilidad);
    var autor = $("<p>").html("<b>Autor:</b> " + comicData.Autor);
    var editorial = $("<p>").html("<b>Editorial:</b> " + comicData.Editorial);
    var precio = $("<p>").html("<b>Precio:</b> " + comicData.Precio.toFixed(2) + "€");

    modalBody.append(sinopsis);
    modalBody.append(disponibilidad);
    modalBody.append(autor);
    modalBody.append(editorial);
    modalBody.append(precio);

    var botonAgregarCarrito = $("<button>", {
      text: "Agregar al carrito",
      class: "btn btn-primary botonComprarModalInfo",
    }).click(function () {
      toAdd(comicData.Nombre, comicData.Disponibilidad);
      modalInfo.modal("hide");
      if (comicData.Disponibilidad === "Disponible") {
        modal2.modal("show");
      }
    });

    modalFooter.append(botonAgregarCarrito);
    var myModal = new bootstrap.Modal($("#exampleModalToggle"));

    //SIRVE PARA EVITAR UN PROBLEMA QUE OCURRÍA AL CERRAR EL MODAL Y ES QUE SE QUEDABA LA PÁGINA OSCURECIDA Y CONGELADA
    modalInfo.on("hidden.bs.modal", function () {
      modal2.modal("hide");
    });

    //SIRVE PARA EVITAR UN PROBLEMA QUE OCURRÍA AL CERRAR EL MODAL Y ES QUE SE QUEDABA LA PÁGINA OSCURECIDA Y CONGELADA
    modal2.on("hidden.bs.modal", function () {
      myModal.hide();
    });

    myModal.show();
  } else {
    console.error("Índice no válido para el cómic o datos no cargados correctamente.");
  }
}

function mostrarModalNoDisponible(comicAñadido) {
  var modalNoDisponible = $("#modalNoDisponible");
  modalNoDisponible.find(".modal-body").empty();
  var modalBody = modalNoDisponible.find(".modal-body");
  var mensaje = $("<p>").text(
    "El cómic " + comicAñadido + " no está disponible para añadir al carrito."
  );

  modalBody.append(mensaje);
  var myModal = new bootstrap.Modal($("#modalNoDisponible"));
  myModal.show();
}

//SIRVE PARA OBTENER LA DISPONIBILIDAD EN FUNCIÓN DEL TÍTULO. SE LLAMA AL INICIO DEL ARCHIVO, LÍNEA 10
function obtenerDisponibilidadPorTitulo(titulo) {
  var elementoEncontrado = datos.find(function (elem) {
    return elem.Nombre === titulo;
  });

  //DEVUELVE LA DISPONIBILIDAD Y EN CASO CONTRARIO, DEVUELVE UNDEFINED
  return elementoEncontrado ? elementoEncontrado.Disponibilidad : undefined;
}


//------------------------------------------------------------------------
//FUNCIONES DE VALIDACIONES Y COMPROBACIONS DE FORMULARIOS

function validarRegistro() {
  var contrasena = $("#contrasena").val();
  var confirmarContrasena = $("#confirmarContrasena").val();
  if (contrasena !== confirmarContrasena) {
    $("#errorContrasena").text("Las contraseñas no coinciden").show();
  } else {
    $("#errorContrasena").text("").hide();
    //SIRVE PARA COMPROBAR POR CONSOLA QUE TODO HA IDO BIEN
    console.log("Formulario enviado con éxito");
  }
}
