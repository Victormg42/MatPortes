<!-- Site footer -->
<footer class="site-footer footer" style="bottom: 0px; height: 230px;">
    <div class="container">
        <div class="row center">
            <div class="col-6 display" style="margin-top: 1%;">
                <img src="{{asset('img/logoDefinitivo-extra.png')}}" >
            </div>
            <div class="col-6" style="margin-top: 4%;">
                <h2>Contacto</h2>
                <p class="text-justify">Dirección: Tordera</p>
                <p class="text-justify">Teléfono: +34 639 552 589 </p>
            </div>
            {{-- <div class="col-6" style="margin-top: 4%;">
                <h2>Contacto</h2>
                <p class="text-justify">Dirección: Tordera</p>
                <p class="text-justify">Telefono: +34 639 552 589 </p>
            </div> --}}
            
            <div class="col">
                <hr class="hr-footer">
                {{--<p class="copyright-text">Copyright &copy; 2021 All Rights Reserved by 
                <a>Matportes</a>.
                </p>--}}
                <div class="container--legal">
                    <div class="container--privacidad">
                        <a href="{{url('privacidad')}}">Política de privacidad</a>
                    </div>
                    <div class="container--aviso-legal">
                        <a href="{{url('avisolegal')}}">Aviso legal</a>
                    </div>
                    <div class="container--cookies">
                        <a href="{{url('cookies')}}">Cookies</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</footer>
