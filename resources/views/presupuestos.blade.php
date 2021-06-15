<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="./img/Logo-matPortes.ico" type="image/png" sizes="16x16">
    <link rel="stylesheet" href="{{asset('css/normalize.css')}}">
    <link rel="stylesheet" href="{{asset('css/styles.css')}}"> 
    <script src="{{asset('js/presupuestos.js')}}"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <!-- <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"> -->
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/b2a65126dc.js" crossorigin="anonymous"></script>
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
    <link href="/open-iconic/font/css/open-iconic-bootstrap.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <title>Presupuestos</title>
</head>
<body class="page-presupuestos">
    @if(session('messageEmail'))
        <input type="hidden" id="{{session('messageEmail')}}">
    @endif
    <!-- Menú de navegación -->
    @include('headerAdmin')
    <main>
        <h1 style="text-align:center;">PRESUPUESTOS</h1>
        <div class="container--presupuestos">
            @if (Session::get('id_rol')=='1' || Session::get('id_rol')=='3' || Session::get('id_rol')=='4')
            <div class="container--btn-crear">
                <button class="btnAdd btnAdmin btnRect" onclick="onClickOpenCreate()">Crear</button>
            </div>
            @endif
            @if (Session::get('id_rol')=='1' || Session::get('id_rol')=='3' || Session::get('id_rol')=='4')
            <div class="container--btn-guardados">
                <button class="btnAdd btnAdmin btnRect" onclick="onClickOpenSaved()">Guardados</button>
            </div>
            @endif
            @if (Session::get('id_rol')=='1' || Session::get('id_rol')=='2')
            <div class="container--btn-enviados">
                <button class="btnAdd btnAdmin btnRect" onclick="onClickOpenSended()">Enviados</button>
            </div>
            @endif
        </div>
        @if (Session::get('id_rol')=='1' || Session::get('id_rol')=='3' || Session::get('id_rol')=='4')
        <!-- ENVIADOS -->
        <div class="presupuestosEnviados" style="display: none">
            <div class="lista-presupuestos-enviados">
                <p>Nombre/Empresa</p>
                <p>Apellido</p>
                <!-- <p>Imprimir</p> -->
            </div>
            <div class="container--enviados"></div>
        </div>
        
        <!-- GUARDADOS -->
        <div class="presupuestosSaved" style="display: none">        
            <div class="lista-presupuestos-guardados">
                <p>Nombre/Empresa</p>
                <p>Apellido</p>
                <p>Fecha guardado</p>
                <p>Última modificación</p>
                <!-- <p>Imprimir</p> -->
            </div>
            <div class="container--guardados"></div>
        </div>


        <!-- CREAR -->
        <div class="container--crear">
            <select name="client" id="client">
                <option value="empresa">Empresa</option>
                <option value="particular">Particular</option>
            </select>
            <div class="container--empresa">
                <div class="name-empresa">
                    <p>Nombre empresa</p>
                    <input type="text" class="empresa-required">
                </div>
                <div class="container--nif">
                    <p>NIF/CIF</p>
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
                        <div class="container--nombre-material">
                            <p>Nombre material</p>
                            <input type="text" name="nombre_material" onfocusout="validatorProduct()">
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
                        <!-- <div class="container-calcular-precio">
                            <button class="btnAdd btnAdmin btncalcular-precio" onclick="onClickCalculate()">Calcular precio</button>
                        </div> -->
                    </div>    
                    <div class="container--descripcion-material">
                        <p>Descripción material</p>
                        <textarea name="descripcion_material" cols="30" rows="10" disabled></textarea>
                    </div>
                    <button class="btnAdd btnAdmin" onclick="onClickStore()" id="accept-product">AÑADIR MATERIAL</button>
                    
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
            <div class="container--medidas-tecnicas">
                <p>Medidas técnicas</p>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div class="container--importe-total">
                <!-- VIGILAR, SOLO NÚMEROS -->
                <p>Importe total</p>
                <input type="text" name="importe-total" disabled>
            </div>
            <!-- <div class="container-calcular-precio-total">
                <button class="btnAdd btnAdmin" onclick="onClickCalculateAll()">Calcular total</button>
            </div> -->
            <div class="container--btn-guardar">
                <button class="btnAdd btnAdmin" onclick="return requiredInputs(event, idPresupuesto)">Guardar</button>
            </div>
            <div class="container--btn-enviar">
            @endif

                <!-- HAY QUE PONER COSAS -->
            </div>
            <p id="mensaje">
            </p>
        </div>
    </main>
    <!-- Footer -->
    @include('footer')
</body>
</html>