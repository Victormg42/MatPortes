<div class="header--admin">
    <nav class="navbar navbar-expand-xl" style="background: #002f65;">
    <a class="navbar-brand" href="#"><img class="img" src="{{asset('img/logoDefinitivo-extra.png')}}"></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon">
        <i class="fas fa-bars"></i>
        </span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
        @if (Session::get('id_rol')=='1' || Session::get('id_rol')=='2')
        <li class="nav-item">
            <a class="nav-link" href="{{url('adminCatalog')}}">Catálogo</a>
        </li>
        @endif
        @if (Session::get('id_rol')=='1' || Session::get('id_rol')=='2')
        <li class="nav-item">
            <a class="nav-link" href="{{url('adminPromo')}}">Promociones</a>
        </li>   
        @endif 
        @if (Session::get('id_rol')=='1' || Session::get('id_rol')=='2' || Session::get('id_rol')=='3')
        <li class="nav-item">
            <a class="nav-link" href="{{url('adminUser')}}">Modificar Usuario</a>
        </li>
        @endif 
        @if (Session::get('id_rol')=='1' || Session::get('id_rol')=='2' || Session::get('id_rol')=='3')
        <li class="nav-item">
            <a class="nav-link" href="{{url('adminStock')}}">Stock</a>
        </li>
        @endif 
        @if (Session::get('id_rol')=='1' || Session::get('id_rol')=='2')
        <li class="nav-item">
            <a class="nav-link" href="{{url('adminBlog')}}">Blog</a>
        </li>
        @endif 
        @if (Session::get('id_rol')=='1')
        <li class="nav-item">
            <a class="nav-link" href="{{url('registrarUser')}}">Usuarios</a>
        </li>
        @endif
        <li class="nav-item">
            <a class="nav-link" href="{{url('verHojasTrabajo')}}">Hojas Trabajo</a>
        </li>   
        @if (Session::get('id_rol')=='1')
        <li class="nav-item">
            <a class="nav-link" href="{{url('presupuestos')}}">Presupuesto</a>
        </li>
        @endif
        <li class="nav-item">
            <a class="nav-link logout" href="{{url('logout')}}">Cerrar Sesión</a>
        </li>    
        </ul>
    </div>  
    </nav>
</div>