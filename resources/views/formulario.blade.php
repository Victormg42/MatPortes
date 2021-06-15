<div class="container--contact-form" id="form-home">
    
<div class="row">
        <div class="col-md-12">
            <div class="well well-sm">
                <form class="form-horizontal" action="{{env('APP_CONTEXT')}}/sendEmail" method="POST" enctype="multipart/form-data" onsubmit="return validarForm()">
                    <fieldset>
 
                        <div class="container--legend">                        
                            <legend class="text-center header contact">CONTACTA CON NOSOTROS</legend>
                        </div>

                        @if ($errors->any())
                            <div class="error--mail">
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif

                        @csrf
                        <!-- FULL NAME -->
                        <div class="form-group">
                            <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-user bigicon"></i></span>
                            <div class="col-md-8">
                                <input type="text" id="fullName" name="fullName" class="validar" placeholder="Introduzca su nombre" class="form-control">
                            </div>
                        </div>
                        <!-- LOCALIDAD -->
                        <div class="form-group">
                            <span class="col-md-1 col-md-offset-2 text-center"><i class="fas fa-map-marker-alt"></i></span>
                            <div class="col-md-8">
                                <input type="text" id="city" name="city" class="validar" placeholder="Introduzca su localidad" class="form-control">
                            </div>
                        </div>
                        <!-- EMAIL -->
                        <div class="form-group">
                            <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-envelope-o bigicon"></i></span>
                            <div class="col-md-8">
                                <input type="email" id="email" name="email" class="validar" placeholder="Introduzca su correo" class="form-control">
                            </div>
                        </div>
                        <!-- PHONE -->
                        <div class="form-group">
                            <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-phone-square bigicon"></i></span>
                            <div class="col-md-8">
                                <input type="text" id="phone" name="phone" class="validar" placeholder="Introduzca su teléfono" class="form-control">
                            </div>
                        </div>
                        <!-- SUBJECT -->
                        <div class="form-group">
                            <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-pencil-square-o bigicon"></i></span>
                            <div class="col-md-8">
                            <input type="text" id="subject" name="subject" class="validar" placeholder="Asunto" class="form-control">
                            </div>
                        </div>
                        <input type="hidden" name="redirection" id="redirection" value="<?php echo $redirectAfterForm; ?>">
                        <!-- SUGGESTION -->
                        <div class="form-group">
                            <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-pencil-square-o bigicon"></i></span>
                            <div class="col-md-8">
                                <textarea name="suggestion" class="validar" placeholder="Introduzca su duda/sugerencia"  rows="4" cols="50"></textarea>
                            </div>
                        </div>
                        <div class="form-group captchaForm">
                            <div class="container--reload">
                                <span id="captcha-img" class="col-md-1 col-md-offset-2 text-center">
                                    {!!captcha_img()!!}
                                </span>
                                <button id="reload">Recargar</button>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="validar" name="captcha" placeholder="Resultado Captcha">                            </div>
                            </div>    
                        </div>

                        <div class="g-recaptcha" data-sitekey="6Lee2yUTAAAAAAtZXh-Eq7x47l93NN9SJOgAYl7p"></div>

                        <div class="form-group submitFormGroup">
                            <div class="col-md-12 text-center">
                                <button type="submit" class="btn btn-primary btn-enviar btn-lg">Enviar</button>
                            </div>
                        </div>


                    </fieldset>
                </form>
                <script>
                    if(document.getElementById('redirection').value == '/' ) {
                        $('#reload').click(function (e){
                        e.preventDefault();
                        $.ajax({
                            type:'GET',
                            url:'reload',
                            success:function (res){
                                $('#captcha-img').html(res.captcha);
                            }
                        });
                    }); 
                    } else {
                        $('#reload').click(function (e){
                            e.preventDefault();
                            $.ajax({
                                type:'GET',
                                url:'../reload',
                                success:function (res){
                                    $('#captcha-img').html(res.captcha);
                                }
                            });
                        });
                    }
                </script>
            </div>
        </div>
    </div>
</div>
