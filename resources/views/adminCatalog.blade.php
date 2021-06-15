<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{asset('css/normalize.css')}}">
    <link rel="stylesheet" href="{{asset('css/styles.css')}}">
    <script src="{{asset('js/catalog.js')}}"></script>
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

    <title>Administrar Catálogo</title>
</head>
<body class="page-2 page-admin">
    @include('headerAdmin')
    <!-- <form action="{{url('logout')}}" method="GET">
        <button type="submit">Cerrar sesión</button>
    </form> -->

    <main>
        <h1 class="text-center title--admin">ADMINISTRAR CATÁLOGO</h1>
        <div id="catalog">
            <ul id="myUL">
            </ul>
        </div>
    
        <div id="editCatalog">
            <div class="content--catalog" style="display: none">
                <!-- <div class="container--title-catalog-pdf">
                    <h3>CATÁLOGO</h3>
                </div> -->
                <!-- <div id="editPDF">
                    <div class="container--namePdf">
                        <p>Nombre</p>
                        <input type="text">
                    </div>
                    <div class="container--filePdf">
                        <input type="file" accept="application/pdf" name="hierarchyPdf">
                    </div>
                    <button onclick="onClickAddHierarchyPdf(event)">Añadir</button>
                </div>
                <div id="existingPDFs"></div> -->
            </div>
        </div>
        <div id="container-pdf" style="display: none">
            <div class="container--title-catalog-pdf">
                    <h3>CATÁLOGO</h3>
                </div>
            <div id="editPDF">
                <div class="container--namePdf">
                    <p>Nombre</p>
                    <input type="text">
                </div>
                <div class="container--filePdf">
                    <input type="file" accept="application/pdf" name="hierarchyPdf">
                </div>
                <div class="container--btn">
                    <button class="btnAdmin btnAdd" onclick="onClickAddHierarchyPdf(event)">Añadir</button>
                </div>
            </div>
            <div id="existingPDFs"></div>
        </div>
    </main>
    @include('footer')
</body>
</html>