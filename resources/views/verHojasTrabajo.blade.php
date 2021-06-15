<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
     <link rel="icon" href="./img/Logo-matPortes.ico" type="image/png" sizes="16x16">
     <link rel="stylesheet" href="{{asset('css/normalize.css')}}">
     <link rel="stylesheet" href="{{asset('css/styles.css')}}">
     <script src="{{asset('js/hojaTrabajo.js')}}"></script>
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
     <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
     <script src="https://kit.fontawesome.com/b2a65126dc.js" crossorigin="anonymous"></script>
     <title>Hojas Trabajo</title>
</head>
<body class="page-6 page-hojas">
    @include('headerAdmin')
    <main class="btn-ht">
        <div class="buttons-group" style="margin-top: 90px;">
            @if (Session::get('id_rol')=='1' || Session::get('id_rol')=='3' || Session::get('id_rol')=='4')
            <div class="btn1">
                <button class="btnAdd btnAdmin btnRect" style="font-size: 13px;" onclick="onClickOpenCreate()">Crear</button>
            </div>
            @endif
            @if (Session::get('id_rol')=='1' || Session::get('id_rol')=='3' || Session::get('id_rol')=='4'  )
            <div class="btn2">
                <button class="btnAdd btnAdmin btnRect" style="font-size: 13px;" onclick="onClickOpenSaved()">Continuar</button>
            </div>
            @endif
            @if (Session::get('id_rol')=='1')
            <div class="btn3">
                <button class="btnModificar btnAdmin btnRect" style="font-size: 13px;" onclick="onClickOpenSendedHTrabajo()">finalizadas</button>
            </div>
            @endif
            @if (Session::get('id_rol')=='2')
            <div class="btn3">
                <button class="btnModificar btnAdmin btnRect" style="font-size: 13px;" onclick="onClickOpenSendedSecretaria()">Ver Finalizadas</button>
            </div>
            @endif
            @if (Session::get('id_rol')=='1')
            <div class="btn4">
                <button class="btnModificar btnAdmin btnRect" style="font-size: 13px;" onclick="onClickOpenCheck()">pendientes por revisar</button>
            </div>
            @endif
        </div>
        @if (Session::get('id_rol')=='1' || Session::get('id_rol')=='3' || Session::get('id_rol')=='4')
        <!-- ENVIADOS -->
        <div class="presupuestosEnviados" style="display: none;">
            <div class="lista-presupuestos-enviados">
                <p>Nombre/Empresa</p>
                <p>Apellido</p>
                <p>Imprimir</p>
            </div>
            <div class="container--enviados"></div>
        </div>
        @endif
        @if (Session::get('id_rol')=='2')
         <!-- ENVIADOS SECRETARÍA -->
         <div class="enviadosSecretaria" style="display: none;">
            <div class="lista-enviados-secretaria">
                <p>Nombre/Empresa</p>
                <p>Apellido</p>
                <p>Imprimir</p>
            </div>
            <div class="container--secretaria"></div>
        </div>
        @endif
        
        <!-- GUARDADOS -->
        <div class="presupuestos-guardados">
            <div class="presupuestosSaved" style="display: none">
                <!-- <input type="text" name="searchHojaTrabajo" id="searchHojaTrabajo" onkeyup="onClickOpenSaved()">         -->
                <div class="lista-presupuestos-guardados">
                <input type="hidden" id="startTime" value="">
                <input type="hidden" id="finalTime" value="">
                    <p>Nombre/Empresa</p>
                    <p>Apellido</p>
                    <p>Fecha guardado</p>
                    <p>Última modificación</p>
                </div>
                <div class="container--guardados"></div>
                <h4 id="msgCompartir"></h4>
                <div class="container--canvas" id="container--canvas" style="display: none;">
                    <input type="hidden" id="idTrabajo">
                    <input type="hidden" id="session" value="{{Session::get('id_rol')}}">
                    <canvas id="pizarra"></canvas>
                    @if (Session::get('id_rol')=='1' || Session::get('id_rol')=='3')
                    <button id="btnDescargar" disabled>Visualizar PDF</button>
                    @endif
                    <button id="btnFirma" onclick="saveFirma()">Guardar Firma</button>
                    <button id="btnBorrar">Borrar</button>
                    @if (Session::get('id_rol')=='4')
                    <button id="btnRevisar" disabled>Enviar a Pendientes</button>
                    @endif
                </div>
            </div>
            <h4 id="msgCompartir"></h4>
        </div>

        <!-- REVISAR -->
        <div class="presupuestosRevisados" style="display: none">
            <div class="lista-presupuestos-revisados">
                <p>Nombre/Empresa</p>
                <p>Apellido</p>
                <!-- <p>Imprimir</p> -->
            </div>
            <div class="container--revisados"></div>
        </div>
        @if (Session::get('id_rol')=='1' || Session::get('id_rol')=='3' || Session::get('id_rol')=='4')
        <!-- CREAR -->
        <div class="container--crear">
            <select class="select--cliente" name="client" id="client">
                <option value="empresa">Empresa</option>
                <option value="particular">Particular</option>
            </select>
            <div class="container--empresa">
                <div class="name-empresa">
                    <p>Nombre empresa</p>
                    <input type="text" class="empresa-required">
                </div>
                <div class="container--nif">
                    <p>NIF</p>
                    <input type="text">
                </div>
            </div>
            <div class="container--particular" style="display: none;">
                <div class="container--nombre">
                    <p>Nombre</p>
                    <input type="text" name="nombre" class="required">
                </div>
                <div class="container--apellido1">
                    <p>Primer apellido</p>
                    <input type="text" name="apellido1_cliente" class="required">
                </div>
                <div class="container--apellido2">
                    <p>Segundo apellido</p>
                    <input type="text" name="apellido2_cliente">
                </div>
                <div class="container--dni">
                    <p>DNI</p>
                    <input type="text" name="nif">
                </div>
            </div>

            <!--  -->
            <!--  -->
            <div class="informacion--general">
                <div class="container--telefono">
                    <p>Teléfono</p>
                    <input type="text" name="telefono">
                </div>
                <div class="container--email">
                    <p>Correo electrónico</p>
                    <input type="email" name="email">
                </div>
                <div class="container--ubicacion">
                    <p>Dirección</p>
                    <input type="text" name="ubicacion">
                </div>
                <div class="container--precio-transporte">
                    <!-- VIGILAR, SOLO NÚMEROS -->
                    <p>Precio transporte €</p>
                    <input type="text" name="precio_transporte" onchange="onClickCalculateAll()">
                </div>
            </div>
            <div class="container--material">
                <!-- <button class="btnAdd btnAdmin" onclick="onClickOpenProduct()">Añadir producto</button> -->
                <h2>PRODUCTOS</h2>
                <!-- NUEVO MATERIAL -->
                <div class="nuevo-material">
                    <div class="container--editor-material"> 
                        <select name="stock" id="stock" class="stock">
                            <option value="0">Fuera de stock</option>
                            <option value="1">Stock</option>
                        </select>               
                        <select class="container--nombre-material-stock" id="draw-select" style="display: none"></select>
                        <div class="container--material-column">
                            <div class="container--nombre-material">
                                <p>Nombre material</p>
                                <input type="text" name="nombre_material" onfocusout="validatorProduct()" id="searchStock" onkeyup="productsStock()">
                            </div>
                            <div class="container--cantidad">
                                <p>Cantidad</p>
                                <input type="number" name="cantidad" disabled onchange="onClickCalculate()">
                            </div>
                            <div class="container--base-precio-unidad">
                                <p>Precio Base/Unidad</p>
                                <input type="text" name="material_base-precio_unidad" disabled onchange="onClickCalculate()">
                            </div>
                            <div class="container--iva">
                                <!-- VIGILAR, SOLO NÚMEROS -->
                                <p>IVA %</p>
                                <input type="text" name="iva" disabled value="21" onchange="onClickCalculate()">
                            </div>
                            <div class="container--descuento">
                                <!-- VIGILAR, SOLO NÚMEROS -->
                                <p>Descuento %</p>
                                <input type="text" name="descuento" disabled value="0" onchange="onClickCalculate()">
                            </div>
                            <div class="container--total-con-iva">
                                <!-- VIGILAR, SOLO NÚMEROS -->
                                <p>Total con IVA €</p>
                                <input type="text" name="total-con-iva" disabled>
                            </div>
                        </div>  
                        <!-- <div class="container-calcular-precio">
                            <button class="btnAdd btnAdmin" onclick="onClickCalculate()">Calcular precio</button>
                        </div> -->
                        <div class="container--descripcion-material">
                            <p>Descripción material</p>
                            <textarea name="descripcion_material" cols="30" rows="10" disabled></textarea>
                        </div>
                        <button class="btnAdd btnAdmin" onclick="onClickStore()" id="accept-product">AÑADIR</button>
                        <!-- 23-05-21 -->
                        <p id="msg-stock"></p>
                        <!-- END 23-05-21 -->
                    </div>
                </div>
                <!-- MATERIALES AÑADIDOS -->
                <div class="container-productos-anadidos">
                    <h3>PRODUCTOS AÑADIDOS:</h3>
                    <div class="productos-actuales"></div>
                </div>
                <!-- NUEVA IMAGEN -->
                <div class="nueva-imagen">
                    <h2>IMÁGENES</h2>
                    <div class="container--editor-imagen">                
                        <div class="container--imagen">
                            <button class="btnAdd btnAdmin" onclick="onClickOpenFile()" id="open-file">AÑADIR IMAGEN</button>
                            <div class="fileImg"></div>
                        </div>
                    </div>
                </div>
                <!-- IMÁGENES AÑADIDAS -->
                <div class="container-imagenes-anadidas">
                    <h3>IMÁGENES AÑADIDAS:</h3>
                    <div class="imagenes-actuales"></div>
                </div>
            </div>
            <div class="container--descripcion-trabajo">
                    <p>Descripción trabajo</p>
                    <input type="text" name="descripcion_trabajo">
            </div>
            <!-- <div class="container--medidas-tecnicas">
                <p>Medidas técnicas</p>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div> -->
            <div class="container--importe-total">
                <!-- VIGILAR, SOLO NÚMEROS -->
                <p>Importe total</p>
                <input type="text" name="importe-total" disabled>
            </div>
            <!-- <div class="container-calcular-precio">
                <button class="btnAdd btnAdmin" onclick="onClickCalculateAll()">Calcular total</button>
            </div> -->
            <div class="add-imagen">
                <!-- REVIEW -->
                <!-- BOTON PARA IR AÑADIENDO IMÁGENES -->
            </div>
            <div class="container--btn-guardar">
                <button class="btnAdd btnAdmin" onclick="return requiredInputs(idPresupuesto, event)">Guardar</button>
            </div>
            <div class="container--btn-enviar">
                <!-- HAY QUE PONER COSAS -->
            </div>
            <p id="mensaje"></p>
            <p id="mensaje-stock"></p>
            @endif
        </div>

    </main>
    <!-- Modal -->
    <div class="modal--share" id="modal--share"> 
        <div class="modal--content-share">
            <input type="hidden" value="" id="">
            <div class="close--modal-share">
                <span class="title--share" id="title--share"></span>
                <span class="close--share" onclick="closeModalShare()">&times;</span>
            </div>
            <div class="window-share">
                <div id="share">
                </div>
            </div>
        </div>
    </div>
    @include('footer')
</body>
</html>