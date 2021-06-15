<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF BLOG</title>
</head>
<style>
    .presupuesto {
        width: 100%;
    }
    .img {
        float: right;
        margin-right: 20px;
    }
    .matportes {
        width: 100%;
        margin-top: 20px;
        margin-bottom: 30px;
    }
    span {
        font-weight: bold;
    }
    .client,
    .client-data,
    .material,
    .total,
    .desc-trabajo, 
    .medidas {
        width: 100%;
    }
    .presupuesto td:nth-child(even) {text-align: right;}
    .matportes td:nth-child(even) {text-align: right;}
    .client td:nth-child(even) {text-align: right;}
    .client-data td:nth-child(even) {text-align: right;}
    .cabecera-material td {
        font-weight: bold;
    }
    .client-data {
        margin-bottom: 35px;
    }
    .fecha td {
        font-size: 20px;
        padding-bottom: 25px;
    }
    .material {
        margin-bottom: 10px;
    }
    .total {
        margin-top: 10px;
        margin-bottom: 20px;
        text-align: right;
    }
    .total thead td {
        font-size: 20px;
        font-weight: bold;
    }
    .imgP {
        width: 30%;
    }
</style>
<body>
    <main>
        <form method='get' action="{{url('imprimirPdfPresupuesto/'.$estimate[0]->id)}}" id="formulario" style="display: none;">
            <button type='submit'>Descargar</button>
        </form>   
        <form method='get' action="{{url('sendEmailEstimate/'.$estimate[0]->id)}}" id="enviar" style="display: none;">
            <button type='submit'>Enviar</button>
        </form> 
        <table class="presupuesto">
            <tr>
                <td><h1>PRESUPUESTO</h1></td>
                <td><div class="img"><img class="img" src="{{asset('img/MatPortes.png')}}"></div></td>
            </tr>
        </table>

        <table class="matportes">
            <tr>
                <td>Mariano Martinez Rodriguez</td>
                <td>N.I.F/C.I.F: 38147366-A</td>
            </tr>
            <tr>
                <td>Tordera</td>
                <td>C.P 08940 Barcelona</td>
            </tr>
            <tr>
                <td>Tel. 639552589</td>
            </tr>
        </table>

        <table class="client">
            <tbody>
                <tr class="fecha">
                    <td><span>Nº DE PRESUPUESTO:</span> {{$estimate[0]->id}}</td>
                    <td><span>FECHA:</span> {{$estimate[0]->fecha_ultima_modificacion}}</td>
                </tr>
                @foreach($estimate as $dato)
                <tr>
                    @if ($dato->nombre_cliente) 
                        <td>{{$dato->nombre_cliente}} {{$dato->apellido1_cliente}} {{$dato->apellido2_cliente}}</td>
                        <td>D.N.I / N.I.E {{$dato->dni_cliente}}</td>
                    @else
                        <td>{{$dato->nombre_empresa}}</td>
                        <td>N.I.F / C.I.F {{$dato->nif}}</td>
                    @endif
                </tr>
            @endforeach 
            </tbody>
        </table>

   
        <table class="client-data">
            <tbody>
                <tr>
                    <td>{{$estimate[0]->ubicacion}}</td>
                    @if ($estimate[0]->telefono_cliente) 
                        <td>Teléfono: {{$estimate[0]->telefono_cliente}}</td>
                    @endif
                </tr>
                <tr>
                    <td>Email: {{$estimate[0]->email_cliente}}</td>
                </tr>
            </tbody>
        </table>

     
        <table class="material">
            <thead>
                <tr class="cabecera-material">
                    <td>Material</td>
                    <td>Descripción material</td>
                    <td>Cantidad</td>
                    <td>Precio base</td>
                    <td>% IVA</td>
                    <td>% Dto.</td>
                    <td>% Total con IVA</td>
                </tr>
            </thead>
            <tbody>
                @foreach($products as $producto)
                    <tr>
                        <td>{{$producto->nombre_material}}</td>
                        <td>{{$producto->descripcion_material}}</td>
                        <td>{{$producto->cantidad}}</td>
                        <td>{{$producto->base_precio_unidad}}</td>
                        <td>{{$producto->iva}}</td>
                        <td>{{$producto->descuento}}</td>
                        <td>{{$producto->total_con_iva}}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <!-- 27-05-21 -->
        @if($estimate[0]->descripcion_trabajo)
        <table class="desc-trabajo">
            <tbody>
                <tr>
                    <td>Descripción del trabajo: {{$estimate[0]->descripcion_trabajo}}</td>
                </tr>
            </tbody>
        </table>
        @endif
        @if($estimate[0]->medidas_tecnicas)
        <table class="medidas">
            <tbody>
                <tr>
                    <td>Medidas técnicas: {{$estimate[0]->medidas_tecnicas}}</td>
                </tr>
            </tbody>
        </table>
        @endif
        <!-- END 27-05-21 -->
     
        <table>
            <thead>
                <tr>
                    <th>€ Precio transporte</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{$estimate[0]->precio_transporte}}</td>
                </tr>
            </tbody>
        </table>

        <table class="total">
            <thead>
                <tr>
                    <td>€ TOTAL</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{$estimate[0]->importe_total}}</td>
                </tr>
            </tbody>
        </table>

        <table>
            <tr>
            @foreach($img as $image)
                <!-- <td><img class="img" src="../storage/{{$image->img_url}}"></td> -->
                <!-- <td><img class="imgP" src="http://localhost/www/puertas/matportes/public/storage/{{$image->img_url}}" ></td> -->
                <td><img class="imgP" src="../{{$image->img_url}}" ></td>
                <!-- <td><img class="img" ></td> -->
            @endforeach
            </tr>
        </table>
        
    </main>
    <script>
        document.addEventListener("DOMContentLoaded", function(event) {
            document.querySelector('#formulario').style.display = "inline-block";
            document.querySelector('#enviar').style.display = "inline-block";

        });
    </script>
</body>
</html>
