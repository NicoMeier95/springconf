(function() {
    "use strict";

    var regalo = document.getElementById("regalo");


    document.addEventListener("DOMContentLoaded", function() {

        var map = L.map('mapa').setView([44.044476, -123.021641], 14);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([44.044476, -123.021641]).addTo(map)
            .bindPopup('SPRINGCONF <br> Entradas disponibles')
            .openPopup()
            .bindTooltip("No te lo pierdas")
            .openTooltip();


        //campos Datos usuario
        var nombre = document.getElementById("nombre");
        var apellido = document.getElementById("apellido");
        var email = document.getElementById("email");

        //campos pases
        var pase_dia = document.getElementById("pase_dia");
        var pase_completo = document.getElementById("pase_completo");
        var pase_2dias = document.getElementById("pase_2dias");

        //botones y divs
        var calcular = document.getElementById("calcular");
        var errorDiv = document.getElementById("error");
        var botonRegistro = document.getElementById("btnRegistro");
        var lista_productos = document.getElementById("lista-productos");
        var suma = document.getElementById("suma-total");

        //Extras 

        var camisas = document.getElementById("camisa_evento");
        var stickers = document.getElementById("stickers_evento");

        if (document.getElementById("calcular")) {

            calcular.addEventListener("click", calcularMontos);

            pase_dia.addEventListener("blur", mostrarDias);
            pase_2dias.addEventListener("blur", mostrarDias);
            pase_completo.addEventListener("blur", mostrarDias);

            nombre.addEventListener("blur", validarCampos);
            apellido.addEventListener("blur", validarCampos);
            email.addEventListener("blur", validarCampos);
            email.addEventListener("blur", validarEmail);


            function validarCampos() {
                if (this.value == "") {
                    errorDiv.style.display = "block";
                    errorDiv.innerHTML = "Este campo es obligatorio";
                    this.style.border = "1px solid red";
                    errorDiv.style.border = "1px solid red";
                } else {
                    errorDiv.style.display = "none";
                    this.style.border = "1px solid #cccccc";

                }
            };

            function validarEmail() {
                if (this.value.indexOf("@") > -1) {
                    errorDiv.style.display = "none";
                    this.style.border = "1px solid #cccccc";
                } else {
                    errorDiv.style.display = "block";
                    errorDiv.innerHTML = "Debe tener al menos un @";
                    this.style.border = "1px solid red";
                    errorDiv.style.border = "1px solid red";
                };
            }



            function calcularMontos(event) {
                event.preventDefault();
                if (regalo.value === "") {
                    alert("Debes elegir un regalo");
                    regalo.focus();
                } else {
                    var boletosDia = parseInt(pase_dia.value, 10) || 0,
                        boletos2Dias = parseInt(pase_2dias.value, 10) || 0,
                        boletosCompletos = parseInt(pase_completo.value, 10) || 0,
                        cantCamisas = parseInt(camisas.value, 10) || 0,
                        cantStickers = parseInt(stickers.value, 10) || 0;

                    var totalPagar = (boletosDia * 500) + (boletos2Dias * 800) + (boletosCompletos * 1000) + ((cantCamisas * 250) * .93) + (cantStickers * 100);

                    var listadoProductos = [];

                    if (boletosDia >= 1) {
                        listadoProductos.push(boletosDia + " pases por día");
                    }
                    if (boletos2Dias >= 1) {
                        listadoProductos.push(boletos2Dias + " pases por 2 días");
                    }
                    if (boletosCompletos >= 1) {
                        listadoProductos.push(boletosCompletos + " pases completos");
                    }
                    if (cantCamisas >= 1) {
                        listadoProductos.push(cantCamisas + " remeras del evento");
                    }
                    if (cantStickers >= 1) {
                        listadoProductos.push(cantStickers + " stickers del evento");
                    }

                    lista_productos.style.display = "block";

                    lista_productos.innerHTML = "";
                    for (var i = 0; i < listadoProductos.length; i++) {
                        lista_productos.innerHTML += listadoProductos[i] + "<br/>"
                    }


                    suma.innerHTML = "$ " + totalPagar.toFixed(2);

                }
            }

            function mostrarDias() {
                var boletosDia = parseInt(pase_dia.value, 10) || 0,
                    boletos2Dias = parseInt(pase_2dias.value, 10) || 0,
                    boletosCompletos = parseInt(pase_completo.value, 10) || 0;

                var diasElegidos = [];

                if (boletosDia > 0) {
                    diasElegidos.push("viernes");
                    console.log(diasElegidos);
                };
                if (boletos2Dias > 0) {
                    diasElegidos.push("viernes", "sabado");
                    console.log(diasElegidos);
                };
                if (boletosCompletos > 0) {
                    diasElegidos.push("viernes", "sabado", "domingo");
                    console.log(diasElegidos);
                }

                for (var i = 0; i < diasElegidos.length; i++) {
                    document.getElementById(diasElegidos[i]).style.display = "block";
                }


            }
        }

    }); //DOM Content Loaded
})();


$(function() {

    //Lettering

    $(".nombre-sitio").lettering();

    //Menú fijo
    var windowHeight = $(window).height();
    var barraAltura = $(".barra").innerHeight();
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll > windowHeight) {
            $(".barra").addClass("fixed");
            $("body").css({ "margin-top": barraAltura + "px" })
        } else {
            $(".barra").removeClass("fixed");
            $("body").css({ "margin-top": "0px" });
        }
    });


    //Menú responsive
    $(".menu-mobile").on("click", function() {
        $(".navegacion-principal").slideToggle();
    });


    //Programa de conferencias
    $(".programa-evento .info-curso:first").show();
    $(".menu-programa a:first").addClass("activo");

    $(".menu-programa a").on("click", function() {
        $(".menu-programa a").removeClass("activo");
        $(this).addClass("activo");
        $(".ocultar").hide();

        var enlace = $(this).attr("href");
        $(enlace).fadeIn(1000);

        return false;
    });

    //Animaciones contador
    $(".resumen-evento li:nth-child(1) p").animateNumber({ number: 6 }, 1200);
    $(".resumen-evento li:nth-child(2) p").animateNumber({ number: 15 }, 1200);
    $(".resumen-evento li:nth-child(3) p").animateNumber({ number: 3 }, 1300);
    $(".resumen-evento li:nth-child(4) p").animateNumber({ number: 9 }, 1500);

    //Cuenta Regresiva
    $(".cuenta-regresiva").countdown("2022/12/10 09:00:00", function(event) {
        $("#dias").html(event.strftime("%D"));
        $("#horas").html(event.strftime("%H"));
        $("#minutos").html(event.strftime("%M"));
        $("#segundos").html(event.strftime("%S"));
    });
});