<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{asset('css/normalize.css')}}">
    <link rel="stylesheet" href="{{asset('css/styles.css')}}">
    <script src="{{asset('js/login.js')}}"></script>
    <link rel="icon" href="./img/Logo-matPortes.ico" type="image/png" sizes="16x16">
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <title>Login Admin</title>
</head>
<body class="page-login">
    <!-- <div class="login">
        <h2>Account Login</h2>
        <form class="form" action="{{url('recibirLogin')}}" method="POST">
            {{csrf_field()}}
                <div class="form_field">
                    <input type="email" id="correo" name="correo" placeholder="Email..." required autofocus><br>
                </div>

                <div class="form_field">
                    <input type="password" id="passwd" name="passwd" placeholder="Password..." required><br>
                </div>
                
                <div class="form_field">
                    <input type="submit" value="Iniciar Sesión" name="enviar">
                </div>   
        </form>
    </div> -->

<div class="form">
  <div style="color: black;" class="form-toggle"></div>
  <div class="form-panel one">
    <div class="form-header">
      <h1>Login</h1>
    </div>
    <div class="form-content">
      <form action="{{url('recibirLogin')}}" method="POST" onsubmit="return validarLogin()">
      {{csrf_field()}}
        <div class="form-group">
          <label for="username">Email</label>
          <input type="email" id="correo" class="validar" name="correo" placeholder="Email..." autofocus>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="passwd" class="validar" name="passwd" placeholder="Password...">
        </div>
        <h4 id="msg-login"></h4>
        <div class="form-group">
            <input type="submit" class="submit" value="Iniciar Sesión" name="enviar">
        </div>
      <!-- Te muestra la validación del Laravel -->
      @if ($errors->any())
        <!-- <div class="alert-danger alert-dismissible" role="alert"> -->
            <div class="errors">
                    <!--Controla los errores a la hora de crear-->
                    @foreach ($errors->all() as $error)
                        <h4>{{ $error }}</h4>
                    @endforeach
            </div>
        @endif
      </form>
    </div>
  </div>
</div>
</body>
</html>