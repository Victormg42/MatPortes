<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{asset('css/normalize.css')}}">
    <link rel="stylesheet" href="{{asset('css/styles.css')}}">
    <script src="{{asset('js/blog.js')}}"></script>
    <link rel="icon" href="./img/Logo-matPortes.ico" type="image/png" sizes="16x16">
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
    <title>Blog</title>
</head>
<body class="page-blog">
    <!-- Menú de navegación -->
    @include('header')
    <main>
        <h1 style="text-align:center;">Trabajos realizados</h1>
        @foreach ($blogList as $blog)
        <div class="container--blog">
            <h2 class="titulo--blog">{{$blog->titulo}}</h2>
            <div class="container--img-blog">
                <div class="container--img-before container--img" style="background-image: url(storage/{{$blog->img_antes}});">
                </div>
                <div class="container--img-after container--img" style="background-image: url(storage/{{$blog->img_despues}});">
                </div>
            </div>
            <p class="description">{{$blog->descripcion}}</p>
        </div>
        @endforeach
        {{$blogList->links()}} 
    </main>
    <!-- Footer -->
    @include('footer')
</body>
</html>