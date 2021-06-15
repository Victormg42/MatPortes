<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HOJA TRABAJO</title>
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
    .total {
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
        <form method='get' action="{{url('imprimirPdfHojaTrabajo/'.$estimate[0]->id)}}" id="formulario" style="display: none;">
            <button type='submit'>Descargar</button>
        </form>   
        <form method='get' action="{{url('sendEmailHojaTrabajo/'.$estimate[0]->id)}}" id="enviar" style="display: none;">
            <button type='submit'>Enviar</button>
        </form>   
        
        <table class="presupuesto">
            <tr>
                <td><h1>HOJA DE TRABAJO</h1></td>
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
                <td><span>Nº DE HOJA DE TRABAJO:</span> {{$estimate[0]->id}}</td>
            </tr>
            @foreach($estimate as $dato)
                <tr>
                    @if ($dato->nombre_cliente) 
                        <td>{{$dato->nombre_cliente}}</td>
                        <td>{{$dato->apellido1_cliente}}</td>
                        <td>{{$dato->apellido2_cliente}}</td>
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
                    <td>{{$estimate[0]->direccion}}</td>
                    @if ($estimate[0]->telefono) 
                        <td>Teléfono: {{$estimate[0]->telefono}}</td>
                    @endif
                </tr>
                @if($estimate[0]->email)
                <tr>
                    <td>Email: {{$estimate[0]->email}}</td>
                </tr>
                @endif
            </tbody>
        </table>

        @if($horas)
        <table class="trabajador">
            <thead>
                <tr>
                    <th>Trabajador</th>
                    <th>Horas</th>
                </tr>
            </thead>
            <tbody>
                @foreach($horas as $hora)
                <tr>
                    <td>{{$hora->nombre}}</td>
                    <td>{{$hora->total_horas}}</td>
                </tr>
                @endforeach
            </tbody>
            <tfoot>
                <tr>
                    <th>HORAS TOTALES</th>
                    <td>{{$estimate[0]->tiempo_total}}</td>
                </tr>
            </tfoot>
        </table>
        @endif

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
                        <td>{{$producto->cantidad_material}}</td>
                        <td>{{$producto->base_precio_unidad_material}}</td>
                        <td>{{$producto->iva}}</td>
                        <td>{{$producto->descuento}}</td>
                        <td>{{$producto->total_con_iva}}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <!-- 27-05-21 -->
        @if($estimate[0]->descripcion)
        <table class="desc-trabajo">
            <tbody>
                <tr>
                    <td>Descripción del trabajo: {{$estimate[0]->descripcion}}</td>
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
                    <td>{{$estimate[0]->precio_total}}</td>
                </tr>
            </tbody>
        </table>

        <table>
            <tr>
                <td><p>Firma del cliente:</p></td>
            </tr>
            <tr>
                
                <!-- <td><img class="imgP" src="http://localhost/www/matportes/public/storage/uploads/firmas/{{$estimate[0]->url_img_firma_cliente}}" alt="firma"></td> -->
                <!-- <td><img class="imgP" src="http://miaplicacion.local/matportes/public/storage/uploads/firmas/{{$estimate[0]->url_img_firma_cliente}}" alt="firma"></td> -->
                <!-- <td><img class="imgP" src="http://matportes.es/storage/uploads/firmas/{{$estimate[0]->url_img_firma_cliente}}" alt="firma"></td> -->
                <td><img class="imgP" src="http://localhost/www/matportes/public/storage/uploads/firmas/{{$estimate[0]->url_img_firma_cliente}}" alt="firma"></td>
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
