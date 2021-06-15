<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="./img/Logo-matPortes.ico" type="image/png" sizes="16x16">
    <link rel="stylesheet" href="{{asset('css/normalize.css')}}">
    <link rel="stylesheet" href="{{asset('css/styles.css')}}"> 
    <script src="{{asset('js/adminStock.js')}}"></script>
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
    <title>Stock</title>
</head>
<body class="page-Stock">
    <!-- Menú de navegación -->
    @include('headerAdmin')
    <main>
            <h1 style="text-align:center;">ADMINISTRAR STOCK</h1>
            <div class="btn-Stock">
                <button class="btnAdd btnAdmin btnRect" style="font-size: 13px;" onclick="openNewProduct()">Nuevo Producto</button>
            </div>

            <div class="new--product" style="display: none">
                <div class="modal--nombreN">
                    <p>Nombre</p>
                    <input type="text" class="required-stock input-stock" name="Nombre">
                </div>
                <div class="modal--cantidadN">
                    <p>Cantidad</p>
                    <input type="number" class="required-stock input-stock" name="Cantidad">
                </div>
                <div class="modal--precioN">
                    <p>Precio/unidad</p>
                    <input type="text" class="input-stock">
                </div>
                <p id="mensaje-stock"></p>
                <div class="addProduct">
                    <button class="btnAdd btnAdmin" style="font-size: 13px;" onclick="return requiredStock(event)">Añadir</button>
                </div>
            </div>
            
            <div class="list-stock">
                <div class="column-2 filtro">
                    <input type="text" class="form-control" name="searchStock" id="searchStock" placeholder="Nombre del Producto..." onkeyup="renderStock()">
                </div>
                <table class="table table-bordered">
                    <thead>
                        <tr class="">
                            <th scope="col">Nombre</th>
                            <th scope="col" class="cantidad">Cantidad  <i class="fas fa-sort-amount-up" id="desc" value="desc" onclick="renderStockDesc()"></i><i class="fas fa-sort-amount-down-alt" id="asc" value="asc" onclick="renderStockAsc()"></i></th>
                            <th scope="col">Precio/unidad</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Borrar</th>
                        </tr>
                    </thead>
                    
                    <tbody class="draw-stock"></tbody>
                    
                </table>
            </div>
    </main>

    <div class="modal--info modal--stock"> 
        <div class="modal--content-info">
            <input type="hidden" value="" id="">
            <div class="close--modal-info">
                <span class="close--info" onclick="closeModalInfo()">&times;</span>
            </div>
            <div class="modal--nombre">
                <p>Nombre</p>
                <input type="text">
            </div>
            <div class="modal--cantidad">
                <p>Cantidad</p>
                <input type="number">
            </div>
            <div class="modal--precio">
                <p>Precio/unidad</p>
                <input type="text">
            </div>
            <div class="btnModificar">
                <button class="btnAdd btnAdmin" style="font-size: 13px;" onclick="modificarProducto(event, idProducto)">Modificar</button>
            </div>
        </div>
    </div>
     <!-- Footer -->
    @include('footer')
</body>
</html>