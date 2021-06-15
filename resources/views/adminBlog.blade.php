<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="./img/Logo-matPortes.ico" type="image/png" sizes="16x16">
    <link rel="stylesheet" href="{{asset('css/normalize.css')}}">
    <link rel="stylesheet" href="{{asset('css/styles.css')}}"> 
    <script src="{{asset('js/adminBlog.js')}}"></script>
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
    <title>AdminBlog</title>
</head>
<body class="page-adminBlog">
    <!-- Menú de navegación -->
    @include('headerAdmin')
    <main>
        <h1 style="text-align:center;">ADMINISTRAR BLOG</h1>
        <!-- <div>
            <button class="btnAdd btnAdmin btnRect" onclick="onClickOpenAddBlog()">NUEVA ENTRADA</button>
        </div> -->
        <div class="blog">
            <div class="new--blog">
                <div class="container--titulo">
                    <p>Título</p>
                    <input type="text" name="titulo">
                </div>
                <div class="container--descripcion">
                    <p>Descripción</p>
                    <input type="text" name="descripcion">
                </div>
                <div class="container--img-antes">
                    <input type="file" accept="image/*" name="newImageBefore">
                </div>
                <div class="container--img-despues">
                    <input type="file" accept="image/*" name="newImageAfter">
                </div>
                <div class="container--btn-add">
                    <button onclick="onClickAddBlog(event)" class="btnAdmin btnAdd">Añadir</button>
                </div>
            </div>
            <h3>ENTRADAS ACTUALES</h3>
            <div class="container--blog"></div>
        </div>
    </main>
    <!-- Footer -->
    @include('footer')
</body>
</html>