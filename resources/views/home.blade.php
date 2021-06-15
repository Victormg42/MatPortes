<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="icon" href="./img/Logo-matPortes.ico" type="image/png" sizes="16x16">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{asset('css/normalize.css')}}">
    <link rel="stylesheet" href="{{asset('css/styles.css')}}">
    <script src="{{asset('js/promo.js')}}"></script>
    <script src="{{asset('js/formulario.js')}}"></script>
    <script src="{{asset('js/app.js')}}"></script>
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
    <title>Home</title>
</head>
<body>

    @if(session('messageEmail'))
        <input type="hidden" id="{{session('messageEmail')}}">
    @endif
    <!-- Menú de navegación -->
    @include('header')
    <!-- Hero (imágen con texto) -->
    @include('hero')
    <!-- Catálogo -->
    
    <h2 class="text-center header catalogo" id="top-catalog">CATÁLOGO</h2>
    <main id="catalogo" class="hide">
        <div id="catalogo-control">
            <div id="breadCrumb"></div>
            <div id="catalogo--contents">
            </div>
        </div>
    </main>
    
    <!-- Promociones -->
    @include('promociones')
    <!-- Formulario -->
    @include('formulario')
    <!-- Caja Cookies -->
    <div id="div-cookies" style="display: none;">
        <p>Necesitamos usar cookies para que funcione todo, si permanece aquí acepta su uso. Más información en
        <a hreflang="es" href="{{url('/avisolegal/')}}">Aviso Legal</a>
        y la
        <a hreflang="es" href="{{url('/privacidad/')}}">Política de Privacidad</a></p>.
        <button type="button" class="btn btn-sm btn-primary" onclick="acceptCookies()">
            Acepto el uso de cookies
        </button>
    </div>
    <!-- Footer -->
    @include('footer')

    <!-- Modal -->
    <div class="modal--info" id="modal--info"> 
        <div class="modal--content-info">
            <input type="hidden" value="" id="">
            <div class="close--modal-info">
                <span class="title--info" id="title--info"></span>
                <span class="close--info" onclick="closeModalInfo()">&times;</span>
            </div>
            <div class="window-info">
                <div id="info">
                </div>
            </div>
        </div>
    </div>
        
</body>
</html>