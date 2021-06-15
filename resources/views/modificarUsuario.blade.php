<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{asset('css/normalize.css')}}">
    <link rel="icon" href="./img/Logo-matPortes.ico" type="image/png" sizes="16x16">
    <link rel="stylesheet" href="{{asset('css/styles.css')}}">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/b2a65126dc.js" crossorigin="anonymous"></script>
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
    <link href="/open-iconic/font/css/open-iconic-bootstrap.css" rel="stylesheet">
    <title>Modificar Usuarios</title>
    <script src="{{asset('js/adminUser.js')}}"></script>
</head>
<body class='page-7'>
@include('headerAdmin')
<!-- <form action="{{url('logout')}}" method="GET">
        <button type="submit">Logout</button>
    </form> -->
    <div class="content--form">
        <form class="change_user" id="change_user" method="POST" onsubmit="cambiarUser(); return false;">
            <h1>MODIFICAR DATOS</h1>
                <div class="group-form">
                    <div>
                        <label for="gmail">DNI</label>
                        <input class="form-user" type="text" name="dni" id="dni" placeholder="DNI">
                    </div>
                    <div>
                        <label for="gmail">Correo</label>
                        <input class="form-user" type="text" name="correo" id="correo" placeholder="Correo">
                    </div>
                </div>
                
    
                <div class="group-form">
                    <div>
                        <label for="nombre">Nombre</label>
                        <input class="form-user" type="text" name="nombre" id="nombre" placeholder="Nombre">
                    </div>
                    
                    <div>
                        <label for="apellido1">Primer apellido</label>
                        <input class="form-user" type="text" name="apellido1" id="apellido1" placeholder="Primer apellido">
                    </div>
                </div>
                <div class="group-form">
                    <div>
                        <label for="apellido2">Segundo apellido</label>
                        <input class="form-user" type="text" name="apellido2" id="apellido2" placeholder="Segundo apellido">
                    </div>
                    <div>
                        <label for="telefono">Teléfono</label>
                        <input class="form-user" type="text" name="telefono" id="telefono" placeholder="Telefono">
                    </div>
                </div>
                <input class="form-submit" type="submit" name="submit" id="submit1" value="Modificar Datos">
                @if ($errors->any())
                    <div class="errors">
                            @foreach ($errors->all() as $error)
                                <h4>{{ $error }}</h4>
                            @endforeach
                    </div>
                @endif
            <p id="msg1"></p>
        </form>
        <button style="width: 45%" class="btn-password" onclick="openModalPassword();">Cambiar contraseña</button>
        <!-- Modal -->
        <div class="modal--pwd" id="modal--pwd"> 
                <div class="modal--content-pwd">
                    <input type="hidden" value="" id="">
                    <div class="close--modal-pwd d-flex">
                        <span class="close--pwd" onclick="closeModalPassword()">&times;</span>
                    </div>
                    <div class="window-pwd-info">
                        <div id="pwd-info">
                        <span class="title--pwd" id="title--pwd">Cambiar Contraseña</span>
                        <form class="change_passwd" id="change_passwd" method="POST" onsubmit="cambiarPassword(); return false;">
                            <input class="form-passwd" type="password" name="passwd_nueva" id="passwd_nueva" placeholder="Introduce tu nueva contraseña...">
                            <input class="form-passwd" type="password" name="passwd_repetir" id="passwd_repetir" placeholder="Repetir contraseña...">
                            <input type="submit" class="btn-password1" name="submit" id="submit" value="Aceptar">
                            <p id="msg"></p>
                        </form>                
                        </div>
                    </div>
                </div>
            </div>    
    </div>
    @include('footer')           
</body>
</html>