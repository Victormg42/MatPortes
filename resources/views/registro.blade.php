 <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
     <link rel="stylesheet" href="{{asset('css/normalize.css')}}">
     <link rel="stylesheet" href="{{asset('css/styles.css')}}">
     <script src="{{asset('js/registro.js')}}"></script>
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
     <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
     <script src="https://kit.fontawesome.com/b2a65126dc.js" crossorigin="anonymous"></script>
     <title>Registrar Empleado</title>
 </head>
 <body class="page-6">
    @include('headerAdmin')

    <main class="btn-adm">
        <div class="buttons-admin">
            <button class="btnAdd btnAdmin btnRect" onclick="mostrarFormRegistro();">Registrar Usuario</button>
            <button class="btnModificar btnAdmin btnRect" onclick="mostrarTablaUsuarios();">Administrar Usuarios</button>
        </div>
        <div class="container--form">
            <div class="form-panel two" id="form-panel-two" style="display: none;">
                    <div class="form-header-register">
                        <h1>Register Account</h1>
                    </div>
                    <div class="form-content">
                    <form method="POST" onsubmit="registerUser(); return false;">
                        <div class="row mb-4 dni">
                            <div class="col">
                                <div class="form-group register-group">
                                    <label for="nombre">DNI</label>
                                    <input class="validar-register" type="text" id="rdni" name="rdni"/>
                                </div>
                            </div>
                        </div>
            
                        <div class="row mb-4">
                            <div class="col">
                                <div class="form-group register-group">
                                    <label for="nombre">Nombre</label>
                                    <input class="validar-register" type="text" id="rnombre" name="rnombre"/>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group register-group">
                                    <label for="papellido">Primer Apellido</label>
                                    <input class="validar-register" type="text" id="papellido" name="papellido"/>
                                </div>
                            </div>
                        </div>
            
                        <div class="row mb-4">
                            <div class="col">
                                <div class="form-group register-group">
                                    <label for="sapellido">Segundo Apellido</label>
                                    <input class="validar-register" type="text" id="sapellido" name="sapellido"/>
                                </div>
                            </div>
                            <div class="col">
                            <div class="form-group register-group">
                                <label for="telefono">Telefono</label>
                                <input class="validar-register" type="text" id="rtelefono" name="rtelefono"/>
                                </div>
                            </div>
                        </div>
            
                        <div class="row mb-4">
                            <div class="col">
                                <div class="form-group register-group">
                                    <label for="email">Correo electronico</label>
                                    <input class="validar-register" type="email" id="remail" name="remail"/>
                                </div>
                            </div>
                        </div>
            
                        <div class="row mb-3">
                            <div class="col">
                                <div class="form-group register-group">
                                    <label for="password">Contraseña</label>
                                    <input class="validar-register" type="password" id="rpassword1" name="rpassword1"/>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group register-group">
                                    <label for="rpassword">Repetir Contraseña</label>
                                    <input class="validar-register" type="password" id="rpassword2" name="rpassword2"/>
                                </div>
                            </div>
                        </div>
            
                        <div class="row">
                            <div class="col">
                                <div class="form-group register-group">
                                    <select class="form-control" name="rol" id="rol">
                                    </select>
                                </div>
                                <div class="form-group register-group">
                                    <select class="form-control" name="estado" id="estado">
                                        <option value="1">Activado</option>
                                        <option value="0">Desactivado</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    
                        <div class="row mt-4">
                            <div class="col">
                                <div class="form-group register-group">
                                    <button class="submit" type="submit">Register</button>
                                </div>
                            </div>
                        </div>
                        <h2 style="text-align: center;" id="mensaje">
                        </h2>
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
        <div class="mostrar--usuario">
            <table id="mostrarUsuarios">
            </table>
        </div>
        <div id="formPasswd" style="display: none;">
            <form method="POST" id="formPassword" onsubmit="passwordUser(); return false;">
                    <label for="">Nueva Contraseña</label>
                    <input type="hidden" name="id" id="id">
                    <input type="text" name="new_password" id="new_password" required>
                    <input type="submit" name="submit" value="Cambiar Contraseña">
                    <p id="msgPassword"></p>
            </form>
            <button class="btn-generatePasswd" onclick="generatePassword()">Generar Contraseña</button>
        </div>

        <form method="POST" id="formUpdate" style="display: none;" onsubmit="updateUser(); return false;">
            <input type="hidden" name="u_id" id="u_id">
            <div class="form-groups">  
                <div class="group">
                    <label for="udni">DNI</label>
                    <input type="text" name="udni" id="udni">
                </div>          
                <div class="group">
                    <label for="u_nombre">Nombre</label>
                    <input type="text" name="unombre" id="unombre">
                </div>          
            </div>  
            <div class="form-groups">
                <div class="group">
                    <label for="u_papellido">Primer apellido</label>
                    <input type="text" name="upapellido" id="upapellido">
                </div>
                <div class="group">
                    <label for="u_sapellido">Segundo apellido</label>
                    <input type="text" name="u_sapellido" id="u_sapellido">
                </div>
            </div>
            <div class="form-groups">
                <div class="group">
                    <label for="u_telefono">Telefono</label>
                    <input type="text" name="utelefono" id="utelefono">
                </div>
                <div class="group">
                    <label for="u_email">Email</label>
                    <input type="text" name="uemail" id="uemail">
                </div>
            </div>
            <div class="form-groups">
                <label for="u_rol">Rol</label>
                <select name="u_rol" id="u_rol">
                </select>
                <select name="u_estado" id="u_estado">
                    <option value="1">Activado</option>
                    <option value="0">Desactivado</option>
                </select>
            </div>
            <p id="msg2">
            </p>
            <input type="submit" name="enviar" value="Actualizar Usuario">
            @if ($errors->any())
                <div class="errors">
                        @foreach ($errors->all() as $error)
                            <h4>{{ $error }}</h4>
                        @endforeach
                </div>
            @endif
        </form>
    </main>
    @include('footer')
 </body>
 </html>