<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="icon" href="./../img/Logo-matPortes.ico" type="image/png" sizes="16x16">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{asset('css/normalize.css')}}">
    <link rel="stylesheet" href="{{asset('css/styles.css')}}">
    <script src="{{asset('js/products.js')}}"></script>
    <script src="{{asset('js/formulario.js')}}"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/b2a65126dc.js" crossorigin="anonymous"></script>
    <link href="/open-iconic/font/css/open-iconic-bootstrap.css" rel="stylesheet">
    <meta name="csrf-token" id="token" content="{{ csrf_token() }}">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <title>Productos</title>
</head>
<body class="page-5">
@if(session('messageEmail'))
    <input type="hidden" id="{{session('messageEmail')}}">
@endif

<nav class="navbar navbar-expand-md" style="background: #002f65;">

  <a class="navbar-brand" href="#"><img class="img" src="{{asset('img/MatPortes.png')}}"></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon">
      <i class="fas fa-bars"></i>
    </span>
  </button>
  <div class="collapse navbar-collapse" id="collapsibleNavbar">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="../#">Inicio</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="../#top-catalog">Catálogo</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="../#promociones">Promociones</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="../blog">Blog</a>
      </li>     
      <li class="nav-item">
        <a class="nav-link" href="#form-home">Contacta</a>
      </li>    
    </ul>
  </div>  
</nav>
    <h1>Productos</h1>
    <main id="product">
        <h1 class="title--product text-center header"></h1>
        <p style="display:none" id="noProducts">No products</p>
        <div id="product--contents">
        </div>
    </main>
    <div id="catalog"></div>
    
    @include('formulario')
    @include('footer')
</body>
</html>