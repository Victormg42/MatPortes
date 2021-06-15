<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Redirect,Response;
use Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use App\Mail\SentMessage;
use App\Mail\SendMessageEstimate;
use App\Mail\SendMessageHojaTrabajo;
use App\Http\Requests\FormContactoRequest;
use App\Http\Requests\ModifyUserRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Dompdf\Options;
use Dotenv\Validator as DotenvValidator;
use Illuminate\Support\Facades\Validator as FacadesValidator;

class HomeController extends Controller
{
    // REVIEW
    public function prueba() {
        return view('prueba');
    }
    public function pdfPresupuesto() {
        return view('pdfPresupuesto');
    }
    public function pdfHojaTrabajo() {
        return view('pdfHojaTrabajo');
    }
    // END REVIEW

    public function index() {
        return view('home')->with('redirectAfterForm', '/');
    }

    public function cookies() {
        return view('cookies');
    }


    public function avisolegal() {
        return view('avisoLegal');
    }

    public function privacidad() {
        return view('privacidad');
    }

    public function blog() {
        return view('blog');
    }

    public function presupuestos() {
        if (session()->has('id') && session()->get('estado') == '1' &&  session()->get('id_rol') == '1') {
            return view('presupuestos');
        }  else {
            return redirect('admin');
        }
    }

    public function verHojasTrabajo() {
        if (!(session()->has('id') && session()->get('estado') == '1' &&  session()->get('id_rol') == '1' || session()->get('id_rol') == '2' || session()->get('id_rol') == '3' || session()->get('id_rol') == '4')) {
            return redirect('admin');
        }
        return view('verHojasTrabajo');
    }

    public function adminUser() {
        if (!(session()->has('id') && session()->get('estado') == '1' &&  session()->get('id_rol') == '1' || session()->get('id_rol') == '2' || session()->get('id_rol') == '3')) {
            return redirect('admin');
        }
        return view('modificarUsuario');
    }

    public function adminBlog() {
        if (!(session()->has('id') && session()->get('estado') == '1' &&  session()->get('id_rol') == '1' || session()->get('id_rol') == '2')) {
            return redirect('admin');
        }
        return view('adminBlog');
    }

    public function adminStock() {
        if (!(session()->has('id') && session()->get('estado') == '1' &&  session()->get('id_rol') == '1' || session()->get('id_rol') == '2' || session()->get('id_rol') == '3')) {
            return redirect('admin');
        }
        return view('adminStock');
    }

    public function registrarUser() {
        // if (!(session()->has('id') && session()->get('estado') == '0')) {
        //     return redirect('admin');
        // }
        // return view('registro');
        // REVIEW1
        if (session()->has('id') && session()->get('estado') == '1' &&  session()->get('id_rol') == '1') {
            return view('registro');
        }  else {
            return redirect('admin');
        }
    }

    public function getNextLevelHierarchy(Request $request) { // Obtener el siguiente nivel de jerarquía
        $id = $request->input('id');
        $value = ' = ' . $id;
        if(empty($id)) { 
            $value = ' IS NULL';
        }
        try {
            DB::beginTransaction();
            $query = 'SELECT j.id, hs.id, j.nombre, j.ruta_img, j.img_hormann, hs.numSub, j.texto_ayuda, j.info, j.id_padre_jerarquia
            FROM tbl_jerarquia j
            LEFT JOIN (
            SELECT j.id, SUM(CASE WHEN sj.id IS NULL THEN 0 ELSE 1 END) AS numSub
            FROM tbl_jerarquia j
            LEFT JOIN tbl_jerarquia sj
            ON sj.id_padre_jerarquia = j.id
            GROUP BY j.id
            ) hs
            ON j.Id = hs.Id
            WHERE j.id_padre_jerarquia '. $value;
            $nextLevelHierarchy = DB::select($query);
            DB::commit();
            return response()->json($nextLevelHierarchy, 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function navigateToProducts() { 
        $url = $_SERVER['REQUEST_URI'];
        $id = substr($url, strrpos($url, '/')+1, strlen($url));
        // substrau des de l'última barra fins al final
        return view('products')->with('redirectAfterForm', 'navigateToProducts/'.$id);
    }

    public function getProducts(Request $request) { // Obtener los productos
        $id = $request->input('id');
        try {
            //code...
            DB::beginTransaction();
            $query = 'SELECT id, nombre, descripcion, ruta_img, img_hormann FROM tbl_producto WHERE id_jerarquia = ?';
            // $query = 'SELECT p.id, p.nombre AS nombreProducto, p.descripcion, p.ruta_img, p.ruta_pdf, j.nombre AS nombreJerarquia FROM tbl_producto AS p INNER JOIN tbl_jerarquia AS j ON j.id = p.id_jerarquia WHERE p.id_jerarquia = ?';
            $products = DB::select($query, [$id]);
            DB::commit();
            return response()->json($products, 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function admin() {
        return view('login');
    }

    public function recibirLogin(LoginRequest $request){
        $datos=request()->except('_token', 'enviar');
        try {
            DB::beginTransaction();
            $contar=DB::table('tbl_usuario')->where([
                ['correo', '=', $datos['correo']], 
                ['passwd', '=', md5($datos['passwd'])],
                ])->count();
                $usuario=DB::table('tbl_usuario')->where([
                    ['correo', '=', $datos['correo']], 
                    ['passwd', '=', md5($datos['passwd'])],
                    ])->first();
                if ($contar == 1) {
                    //establecer sesion
                    $request->session()->put('correo', $usuario->correo);
                    $request->session()->put('id', $usuario->id);
                    $request->session()->put('id_rol', $usuario->id_rol);
                    $request->session()->put('estado', $usuario->estado);
                    if (session()->get('estado') == '0') {
                        return redirect('admin');
                    } else if (session()->get('id_rol') == '1' || session()->get('id_rol') == '2') {
                        return redirect('adminCatalog');
                    } else if (session()->get('id_rol') == '3' || session()->get('id_rol') == '4') {
                        return view('verHojasTrabajo');
                    }
                } else {
                    //redirigir a la ruta
                    return redirect('admin');
                }
                DB::commit();
            //code...
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function adminCatalog() {
        // REVIEW
        // Mirar la sessió iniciada qui és...
        if (!(session()->has('id') && session()->get('estado') == '1' &&  session()->get('id_rol') == '1' || session()->get('id_rol') == '2')) {
            return redirect('admin');
        }
        return view('adminCatalog');
        // END REVIEW
    }

    public function adminPromo() {
        // REVIEW
        // Mirar la sessió iniciada qui és...
        if (!(session()->has('id') && session()->get('estado') == '1' &&  session()->get('id_rol') == '1' || session()->get('id_rol') == '2')) {
            return redirect('admin');
        }
        return view('adminPromo');
        // END REVIEW
    }
        

    public function logout(){
        //Cierra la sesion cuando se le da al link de cerrar sesion.-
        session()->flush();
        return redirect('admin');
    }

    public function thisLevelHierarchy(Request $request) { // Obtener nivel de jerarquía actual
        $id = $request->input('id');
        try {
            DB::beginTransaction();
            $query = 'SELECT nombre, ruta_img, info, texto_ayuda, img_hormann FROM tbl_jerarquia WHERE id = ?';
            $products = DB::select($query, [$id]);
            DB::commit();
            return response()->json($products, 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function modifyThisLevel(Request $request) { // Modificar nivel de jerarquía actual
        $id = $request->input('id');
        $nombre = $request->input('nombre');
        $textoAyuda = $request->input('textoAyuda');
        $info = $request->input('info');
        $imgHormann = $request->input('imgHormann');
        try {
            DB::beginTransaction();
            if ($request->file('imageFile')) {
                // Recollim la ruta de la imatge actual de la BBDD
                $queryOldImgBD = 'SELECT ruta_img FROM tbl_jerarquia WHERE id = ?';
                $imgBD = DB::select($queryOldImgBD, [$id]);
                $imgBDOld = $imgBD[0]->ruta_img;
                // Recollim la imatge nova i la guardem en local
                $newRutaImage = $request->file('imageFile')->store('uploads', 'public');
                // Eliminem la foto antiga de local
                // REVIEW
                Storage::delete('public/'.$imgBDOld);
                // END REVIEW
                //Actualizamos la ruta de la imagen
                DB::table('tbl_jerarquia')->where('id', '=', $id)->update(['ruta_img' => $newRutaImage, 'img_hormann' => $imgHormann]);
            }
    
            DB::table('tbl_jerarquia')->where('id', "=", $id)->update(['nombre' => $nombre, 'texto_ayuda' => $textoAyuda, 'info' => $info, 'img_hormann' => $imgHormann]);  
            DB::commit();  
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function dropHierarchy(Request $request) { // Eliminar nivel de jerarquía actual
        $id = $request->input('id');
        try {
            DB::beginTransaction();
            DB::table('tbl_jerarquia')->where(['id' => $id])->delete();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function sendEmail(FormContactoRequest $request) {
        $datos=$request->except('_token','enviar');
        $redirection = $datos['redirection']; // Para saber dónde redirigir después de enviar el correo

        $validator = FacadesValidator::make($request->all(),[
            'fullName' => 'required',
            'city' => 'required',
            'email' => 'required|email',
            'phone' => 'required|regex:/[0-9]+/', // al menys, un número
            'subject' => 'required',
            'suggestion' => 'required',
            'captcha' => 'required|captcha'
        ]);

        if ($validator->fails()) {
         
            return redirect($redirection.'#form-home')
                        ->withErrors($validator)
                        ->withInput();
        }

        $userEmail = DB::select("SELECT tbl_usuario.correo FROM tbl_usuario WHERE tbl_usuario.id_rol = 1");
        // $userEmail = 'juditprueba1@gmail.com'; 
        $enviar = new SentMessage();
        // $userEmail = 'laravelprueba47@gmail.com'; 
        $enviar->fullName = $datos['fullName'];
        $enviar->city = $datos['city'];
        $enviar->email = $datos['email'];
        $enviar->phone = $datos['phone'];
        $enviar->infoSubject = $datos['subject'];
        $enviar->suggestion = $datos['suggestion'];
        $enviar->emailSubject = 'Solicitud de información: '.$datos['subject'];

        Mail::to($userEmail[0]->correo)->send($enviar);

        return redirect($redirection.'#form-home')->with('messageEmail', 'messageEmail');
    }

    public function reload()
    {
        return response()->json(['captcha'=>captcha_img()]);

    }

    public function modifyThisProduct(Request $request) { // Modificar el producte actual
        $id = $request->input('id');
        $nombre = $request->input('nombre');
        $descripcion = $request->input('descripcion');
        try {
            DB::beginTransaction();
            if ($request->file('imageFile')) {
                // Recollim la ruta de la imatge actual de la BBDD
                $queryOldImgBD = 'SELECT ruta_img FROM tbl_producto WHERE id = ?';
                $imgBD = DB::select($queryOldImgBD, [$id]);
                $imgBDOld = $imgBD[0]->ruta_img;
                // Recollim la imatge nova i la guardem en local
                $newRutaImage = $request->file('imageFile')->store('uploads', 'public');
                // Eliminem la foto antiga de local
                // REVIEW
                Storage::delete('public/'.$imgBDOld);
                // END REVIEW
                //Actualizamos la ruta de la imagen
                DB::table('tbl_producto')->where('id', '=', $id)->update(['ruta_img' => $newRutaImage]);
            }
    
            DB::table('tbl_producto')->where('id', "=", $id)->update(['nombre' => $nombre, 'descripcion' => $descripcion]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function dropProducts(Request $request) {
        $id = $request->input('id');
        try {
            DB::beginTransaction();
            $queryOldImgBD = 'SELECT ruta_img FROM tbl_producto WHERE id = ?';
            $imgBD = DB::select($queryOldImgBD, [$id]);
            $imgBDOld = $imgBD[0]->ruta_img;
            Storage::delete('public/'.$imgBDOld);
            DB::table('tbl_producto')->where(['id' => $id])->delete();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function addProduct(Request $request) {
        $id = $request->input('id');
        $nombre = $request->input('nombre');
        $descripcion = $request->input('descripcion');
        $imgHormann = $request->input('imgHormann');
        // Recollim la imatge nova i la guardem en local
        try {
            DB::beginTransaction();
            $newRutaImage = $request->file('imageFile')->store('uploads', 'public');
            DB::table('tbl_producto')->insertGetId(['id_jerarquia' => $id, 'nombre' => $nombre, 'descripcion' => $descripcion, 'ruta_img' => $newRutaImage, 'img_hormann' => $imgHormann]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function getHierarchyPdfs(Request $request) {
        $id = $request->input('id');
        try {
            DB::beginTransaction();
            $query = 'SELECT id, ruta_pdf, nombre FROM tbl_catalogo WHERE id_jerarquia = ?';
            $hierarchyPdfs = DB::select($query, [$id]);
            DB::commit();
            return response()->json($hierarchyPdfs, 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function addHierarchyPdf(Request $request) {
        $id = $request->input('id');
        $nombre = $request->input('nombre');
        try {
            DB::beginTransaction();
            $pdfFile = $request->file('pdfFile')->store('uploads', 'public');
            DB::table('tbl_catalogo')->insertGetId(['id_jerarquia' => $id, 'ruta_pdf' => $pdfFile, 'nombre' => $nombre]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    // 12-05-21
    public function dropPdf(Request $request) {
        $id = $request->input('id');
        try {
            DB::beginTransaction();
            $queryOldPdfBD = 'SELECT ruta_pdf FROM tbl_catalogo WHERE id = ?';
            $pdfBD = DB::select($queryOldPdfBD, [$id]);
            $pdfBDOld = $pdfBD[0]->ruta_pdf;
            Storage::delete('public/'.$pdfBDOld);
            DB::table('tbl_catalogo')->where(['id' => $id])->delete();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function getDataPromo() {
        try {
            DB::beginTransaction();
            $query = 'SELECT p.id AS idPromo, i.id AS idImagen, p.url_pdf, p.nombre, i.url_img, i.img_hormann FROM tbl_promocion AS p LEFT JOIN tbl_img_promocion AS i ON p.id = i.id_promocion WHERE p.activo = 1';
            DB::commit();
            $dataPromo = DB::select($query);
            return response()->json($dataPromo, 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    // 12-05-21
    public function modifyPromoPdf(Request $request) {
        $id = $request->input('id');
        try {
            DB::beginTransaction();
            if ($request->file('promoPdf')) {
                // Recollim la ruta del pdf actual de la BBDD
                $queryOldPdf = 'SELECT url_pdf FROM tbl_promocion WHERE id = ?';
                $pdfBD = DB::select($queryOldPdf, [$id]);
                $pdfBDOld = $pdfBD[0]->url_pdf;
                // Recollim el pdf nou i el guardem en local
                $newRutaPdf = $request->file('promoPdf')->store('uploads/promo', 'public');
                // Eliminem el pdf antic de local
                Storage::delete('public/'.$pdfBDOld);
                // REVIEW
                // if ($pdfBDOld != null) {
                //     Storage::delete('public/'.$pdfBDOld);
                // }
                // END REVIEW
                //Actualitzem la ruta del pdf
                DB::table('tbl_promocion')->where('id', '=', $id)->update(['url_pdf' => $newRutaPdf]);
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function dropImgPromo(Request $request) {
        $id = $request->input('id');
        try {
            DB::beginTransaction();
            $queryOldImgBD = 'SELECT url_img FROM tbl_img_promocion WHERE id = ?';
            $imgBD = DB::select($queryOldImgBD, [$id]);
            $imgBDOld = $imgBD[0]->url_img;
            Storage::delete('public/'.$imgBDOld);
            DB::table('tbl_img_promocion')->where(['id' => $id])->delete();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function addPromoImg(Request $request) {
        $id = $request->input('id');
        $imgHormann = $request->input('imgHormann');
        try {
            DB::beginTransaction();
            $imgFile = $request->file('promoImg')->store('uploads/promo', 'public');
            DB::table('tbl_img_promocion')->insertGetId(['id_promocion' => $id, 'url_img' => $imgFile, 'img_hormann' => $imgHormann]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }


    public function cambiarPassword(Request $request) {
        try {
            DB::beginTransaction();
            $id = session()->get('id');
            $passwd1 = $request->input('pass_actual');
            $passwd2 = $request->input('pass_nueva');
            $repetir = $request->input('pass_repetir');
            if ($passwd2 == $repetir) {
                $actual = md5($passwd1);
                $nueva = md5($passwd2);
                DB::update('UPDATE tbl_usuario SET passwd = ? WHERE passwd = ? AND id = ?', [$nueva, $actual, $id]);
                DB::commit();
                $msgOK = 'La contraseña se ha cambiado correctamente';
                return response()->json(array('resultado' => $msgOK), 200);
            } else {
                $msgNOK = 'Las dos passwords no coinciden';
                return response()->json(array('resultado' => $msgNOK), 200);
            }
            
        } catch (\Throwable $th) {
            return response()->json(array('resultado' => 'NOK ' . $th->getMessage()), 200);
        }
    }

    public function cambiarUser(Request $request) {
        try {
            DB::beginTransaction();
            $id = session()->get('id');
            $nombre = $request->input('nombre');
            $apellido1 = $request->input('apellido1');
            $apellido2 = $request->input('apellido2');
            $telefono = $request->input('telefono');
            // $gmail = $request->input('gmail');
            $correo = $request->input('correo');
            $dni = $request->input('dni');
            // REVIEW2
            $data = $request->except('submit');
            $rules = [
                'dni' => [
                    'required',
                    Rule::unique('tbl_usuario', 'id_card')->ignore($id),
                ],
                'nombre'=>'required',
                'apellido1'=>'required',
                'telefono'=>'required',
                'correo' => [
                    'required',
                    Rule::unique('tbl_usuario')->ignore($id),
                ],
            ];

            $niceNames = [
                'dni' => 'DNI',
                'apellido1' => 'primer apellido',
                'telefono' => 'teléfono'
            ];
        
            $validator = FacadesValidator::make($data, $rules, [], $niceNames);
            if (!$validator->fails()) {
                //TODO Handle your data
            } else {
                //TODO Handle your error
                return response()->json(array('resultado'=>'NOK', 'messages'=>$validator->errors()->all()), 200);
            }
            // END REVIEW2
            // die;
            DB::update('UPDATE tbl_usuario SET id_card = ?, nombre = ?, apellido1 = ?, apellido2 = ?, telefono = ?, correo = ? WHERE id = ?', [$dni, $nombre, $apellido1, $apellido2, $telefono, $correo, $id]);
            // DB::update('UPDATE tbl_usuario SET id_card = ?, nombre = ?, apellido1 = ?, apellido2 = ?, telefono = ?, correo = ? WHERE id = ?', [$dni, $nombre, $apellido1, $apellido2, $telefono, $gmail, $id]);
            DB::commit();
            return response()->json(array('resultado' => 'OK'), 200);
        } catch (\Throwable $th) {
            return response()->json(array('resultado' => 'NOK ' . $th->getMessage()), 200);
        }
    }

    public function passwordUser(Request $request) {
        try {
            DB::beginTransaction();
            $id = $request->input('id');
            $password = $request->input('password');
            DB::update('UPDATE tbl_usuario SET passwd = ? WHERE id = ?', [md5($password), $id]);
            DB::commit();
            return response()->json(array('resultado' => 'OK'), 200);
        } catch (\Throwable $th) {
            return response()->json(array('resultado' => 'NOK ' . $th->getMessage()), 200);
        }
    }

    public function updateUser(Request $request) {
        try {
            DB::beginTransaction();
            $datos = $request->except('_token', 'enviar');
            $id = $request->input('id');
            $rules = [
                'udni' => [
                    'required',
                    Rule::unique('tbl_usuario', 'id_card')->ignore($id),
                ],
                'unombre'=>'required',
                'upapellido'=>'required',
                'utelefono'=>'required',
                'uemail' => [
                    'required',
                    Rule::unique('tbl_usuario', 'correo')->ignore($id),
                ],
            ];
            // Per a que sortin aquests noms de camp com atributs
            $niceNames = [
                'udni' => 'DNI',
                'unombre' => 'Nombre',
                'upapellido' => 'Primer apellido',
                'utelefono' => 'Teléfono',
                'uemail' => 'Email'
            ];
        
            $validator = FacadesValidator::make($datos, $rules, [], $niceNames);
            if (!$validator->fails()) {
                //TODO Handle your data
            } else {
                //TODO Handle your error
                return response()->json(array('resultado'=>'NOK', 'messages'=>$validator->errors()->all()), 200);
            }

            DB::update('UPDATE tbl_usuario SET id_card = ?, nombre = ?, apellido1 = ?, apellido2 = ?, telefono = ?, correo = ?, id_rol = ?, estado = ? WHERE id = ?', [$datos['udni'], $datos['unombre'], $datos['upapellido'], $datos['apellido2'], $datos['utelefono'], $datos['uemail'], $datos['rol'], $datos['estado'], $id]);
            DB::commit();
            return response()->json(array('resultado' => 'OK'), 200);
        } catch (\Throwable $th) {
            return response()->json(array('resultado' => 'NOK ' . $th->getMessage()), 200);
        }
    }

    public function readUser(){
        $id = session()->get('id');
        try {
            DB::beginTransaction();
            $query = DB::select('SELECT * FROM tbl_usuario WHERE id = ?', [$id]);
            DB::commit();
            return response()->json($query, 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function getUsuarios() {
        try {
            DB::beginTransaction();
            $query = DB::select('SELECT tbl_usuario.id AS idUser, tbl_usuario.id_card, tbl_usuario.nombre AS "nombre_user", tbl_usuario.apellido1, tbl_usuario.apellido2, tbl_usuario.telefono, tbl_usuario.correo, tbl_rol.id AS idRol, tbl_rol.nombre AS "nombre_rol" FROM tbl_usuario INNER JOIN tbl_rol ON tbl_usuario.id_rol = tbl_rol.id');
            DB::commit();
            return response()->json($query, 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function getDataCatalog(Request $request) {
        $id = $request->input('id');
        try {
            DB::beginTransaction();
            $query = 'SELECT ruta_pdf, nombre FROM tbl_catalogo WHERE id_jerarquia = ?';
            $dataCatalog = DB::select($query, [$id]);
            DB::commit();
            return response()->json($dataCatalog, 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function getTitleHierarchy(Request $request) {
        $id = $request->input('id');
        try {
            DB::beginTransaction();
            $query = 'SELECT nombre FROM tbl_jerarquia WHERE id = ?';
            $titleHieratchy = DB::select($query, [$id]);
            DB::commit();
            return response()->json($titleHieratchy, 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
        
    }
    // REVIEW2
    public function registerUser(Request $request){
        $data = $request->except('enviar');
        $rules = [
            'correo'=>'required|unique:tbl_usuario,correo|max:255|email',
            'dni' => 'required|unique:tbl_usuario,id_card',
            'contraseña'=>'required',
            'contraseña2'=>'required|same:contraseña',
            'nombre'=>'required',
            'apellido1'=>'required',
            'telefono'=>'required',
        ];

        $niceNames = [
            'dni' => 'DNI',
            'apellido1' => 'primer apellido',
            'telefono' => 'teléfono',
            'contraseña2' => 'repetir contraseña',
            'correo' => 'correo electrónico',
        ];

        $validator = FacadesValidator::make($data, $rules, [], $niceNames);
        if (!$validator->fails()) {
            //TODO Handle your data
        } else {
            //TODO Handle your error
            return response()->json(array('resultado'=>'NOK', 'messages'=>$validator->errors()->all()), 200);
        }
        try{
            $datos = $request->except('enviar');
            DB::table('tbl_usuario')->insertGetId(['id_card'=>$datos['dni'],'nombre'=>$datos['nombre'],'apellido1'=>$datos['apellido1'],'apellido2'=>$datos['apellido2'],'telefono'=>$datos['telefono'],'correo'=>$datos['correo'],'passwd'=>md5($datos['contraseña']),'id_rol'=>$datos['rol'],'estado'=>$datos['estado']]);
            return response()->json(array('resultado'=>'OK'), 200);
        } catch (\Throwable $th) {
            return response()->json(array('resultado'=>'NOK '.$th->getMessage()), 200);
        }
        
    }
    // public function registerUser(Request $request){
    //     try{
    //         $datos = $request->except('enviar');
    //         DB::table('tbl_usuario')->insertGetId(['id_card'=>$datos['dni'],'nombre'=>$datos['nombre'],'apellido1'=>$datos['apellido1'],'apellido2'=>$datos['apellido2'],'telefono'=>$datos['telefono'],'correo'=>$datos['email'],'passwd'=>md5($datos['passwd1']),'id_rol'=>$datos['rol'],'estado'=>$datos['estado']]);
    //         return response()->json(array('resultado'=>'OK'), 200);
    //     } catch (\Throwable $th) {
    //         return response()->json(array('resultado'=>'NOK '.$th->getMessage()), 200);
    //     }
        
    // }

    public function getRol() {
        try {
            DB::beginTransaction();
            $query = 'SELECT id, nombre FROM tbl_rol';
            $rols= DB::select($query);
            DB::commit();
            return response()->json($rols, 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function getRolUser(Request $request) {
        try {
            $id = $request->input('id');
            DB::beginTransaction();
            $query = 'SELECT r.id AS idRol, r.nombre FROM tbl_rol AS r INNER JOIN tbl_usuario AS u ON r.id = u.id_rol WHERE u.id = ?';
            $rols= DB::select($query, [$id]);
            DB::commit();
            return response()->json($rols[0], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function getDataBlog(){
        try{
            DB::beginTransaction();
            // $query='SELECT `id`, `título`, `descripción`, `img_antes`, `img_después` FROM `tbl_blog`';
            $blogList = DB::table('tbl_blog')->paginate(10);
            DB::commit();
            return view('blog', compact('blogList'));
        }catch(\Throwable $th){
            DB::rollBack();
            echo $th;
        }
    }

    public function renderBlog() {
        try{
            DB::beginTransaction();
            $query='SELECT `id`, `titulo`, `descripcion`, `img_antes`, `img_despues` FROM `tbl_blog`';
            $entries = DB::select($query);
            DB::commit();
            return response()->json($entries, 200);
        }catch(\Throwable $th){
            DB::rollBack();
            echo $th;
        }
    }

    public function addNewEntryBlog(Request $request) {
        try{
            $titulo = $request->input('titulo');
            $descripcion = $request->input('descripcion');
            $imageFileBefore = $request->file('imageFileBefore')->store('uploads/blog', 'public');
            $imageFileAfter = $request->file('imageFileAfter')->store('uploads/blog', 'public');
            DB::beginTransaction();
            DB::table('tbl_blog')->insertGetId(['titulo' => $titulo, 'descripcion' => $descripcion, 'img_antes' => $imageFileBefore, 'img_despues' => $imageFileAfter]);
            DB::commit();
            // return view('blog', compact('blogList'));
        }catch(\Throwable $th){
            DB::rollBack();
            echo $th;
        }
    }

    public function dropEntryBlog(Request $request) {
        $id = $request->input('id');
        try {
            DB::beginTransaction();
            // IMG before
            $queryOldImgBeforeBD = 'SELECT img_antes FROM tbl_blog WHERE id = ?';
            $imgBeforeBD = DB::select($queryOldImgBeforeBD, [$id]);
            $imgBDOldBefore = $imgBeforeBD[0]->img_antes;
            Storage::delete('public/'.$imgBDOldBefore);
            // IMG after
            $queryOldImgAfterBD = 'SELECT img_despues FROM tbl_blog WHERE id = ?';
            $imgAfterBD = DB::select($queryOldImgAfterBD, [$id]);
            $imgBDOldAfter = $imgAfterBD[0]->img_despues;
            Storage::delete('public/'.$imgBDOldAfter);
            DB::table('tbl_blog')->where(['id' => $id])->delete();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    // 21-05-21
    // public function addNewEstimate(Request $request) {
    //     $nombre = $request->input('nombre');
    //     $idPresupuesto = $request->input('idPresupuesto');
    //     $primerApellido = $request->input('primerApellido');
    //     $segundoApellido = $request->input('segundoApellido');
    //     $dni = $request->input('dni');
    //     $nif = $request->input('nif');
    //     $nombreEmpresa = $request->input('nombreEmpresa');
    //     $client = $request->input('client');
    //     $telefono = $request->input('telefono');
    //     $email = $request->input('email');
    //     $ubicacion = $request->input('ubicacion');
    //     $precioTransporte = $request->input('precioTransporte');
    //     $descripcionTrabajo = $request->input('descripcionTrabajo');
    //     $medidasTecnicas = $request->input('medidasTecnicas');
    //     $importeTotal = $request->input('importeTotal');
    //     $allProducts = $request->input('allProducts');
    //     $allProductsDecode = json_decode($allProducts);
    //     $fechaActual = date('Y-m-d H:i:s');
    //     $lengthImage = $request->input('lengthImage');
    //     if ($idPresupuesto == -1) {
    //         try {
    //             DB::beginTransaction();
    //             if ($client == 'particular') {                    
    //                 DB::table('tbl_presupuesto')->insertGetId(['descripcion_trabajo' => $descripcionTrabajo, 'ubicacion' => $ubicacion, 'precio_transporte' => $precioTransporte, 'medidas_tecnicas' =>$medidasTecnicas, 'dni_cliente' => $dni, 'nombre_cliente' => $nombre, 'apellido1_cliente' => $primerApellido, 'apellido2_cliente' => $segundoApellido, 'telefono_cliente' => $telefono, 'email_cliente' => $email, 'importe_total' => $importeTotal, 'enviado' => '0', 'guardado' => '1', 'fecha_guardado' => $fechaActual, 'fecha_ultima_modificacion' => $fechaActual]);
    //             } else {
    //                 DB::table('tbl_presupuesto')->insertGetId(['descripcion_trabajo' => $descripcionTrabajo, 'ubicacion' => $ubicacion, 'precio_transporte' => $precioTransporte, 'medidas_tecnicas' =>$medidasTecnicas, 'nombre_empresa' => $nombreEmpresa, 'nif' => $nif, 'telefono_cliente' => $telefono, 'email_cliente' => $email, 'importe_total' => $importeTotal, 'enviado' => '0', 'guardado' => '1', 'fecha_guardado' => $fechaActual, 'fecha_ultima_modificacion' => $fechaActual]);
    //             }

    //             $presupuestoId = DB::getPdo()->lastInsertId();
                
    //             if ($request->file('image-0')) {
    //                 for ($i=0; $i < $lengthImage; $i++) { 
    //                     $request->file('image-'.$i)->store('uploads/imgPresupuesto', 'public');
    //                     DB::table('tbl_img_presupuesto')->insertGetId(['img_url' => $request->file('image-'.$i)->store('uploads/imgPresupuesto', 'public'), 'id_presupuesto' => $presupuestoId]);
    //                 }
    //             } 

    //             for ($i=0; $i < count($allProductsDecode) ; $i++) { 
    //                 DB::table('tbl_material_presupuesto')->insertGetId(['id_presupuesto' => $presupuestoId, 'nombre_material' => $allProductsDecode[$i]->nombreProducto, 'descripcion_material' => $allProductsDecode[$i]->descripcionProducto, 'cantidad' => $allProductsDecode[$i]->cantidadProducto, 'base_precio_unidad' => $allProductsDecode[$i]->precioBaseUnidad, 'iva' => $allProductsDecode[$i]->ivaProducto, 'descuento' => $allProductsDecode[$i]->descuentoProducto, 'total_con_iva' => $allProductsDecode[$i]->totalProductoConIva]);
    //             }
    //             DB::commit();
    //         } catch (\Throwable $th) {
    //             DB::rollBack();
    //             echo $th;
    //         }
    //     } else {
    //         try {
    //             // actualizar con id actual
    //             DB::beginTransaction();
    //             if ($client == 'particular') {
    //                 DB::table('tbl_presupuesto')->where('id', '=', $idPresupuesto)->update(['descripcion_trabajo' => $descripcionTrabajo, 'ubicacion' => $ubicacion, 'precio_transporte' => $precioTransporte, 'medidas_tecnicas' =>$medidasTecnicas, 'dni_cliente' => $dni, 'nombre_cliente' => $nombre, 'apellido1_cliente' => $primerApellido, 'apellido2_cliente' => $segundoApellido, 'telefono_cliente' => $telefono, 'email_cliente' => $email, 'importe_total' => $importeTotal, 'enviado' => '0', 'fecha_ultima_modificacion' => $fechaActual]);
    //             } else {
    //                 DB::table('tbl_presupuesto')->where('id', '=', $idPresupuesto)->update(['descripcion_trabajo' => $descripcionTrabajo, 'ubicacion' => $ubicacion, 'precio_transporte' => $precioTransporte, 'medidas_tecnicas' =>$medidasTecnicas, 'nif' => $nif, 'nombre_empresa' => $nombreEmpresa, 'telefono_cliente' => $telefono, 'email_cliente' => $email, 'importe_total' => $importeTotal, 'enviado' => '0', 'fecha_ultima_modificacion' => $fechaActual]);
    //             }

    //             if ($request->file('image-0')) {
    //                 for ($i=0; $i < $lengthImage; $i++) { 
    //                     $request->file('image-'.$i)->store('uploads/imgPresupuesto', 'public');
    //                     DB::table('tbl_img_presupuesto')->insertGetId(['img_url' => $request->file('image-'.$i)->store('uploads/imgPresupuesto', 'public'), 'id_presupuesto' => $idPresupuesto]);
    //                 }
    //             } 

    //             for ($i=0; $i < count($allProductsDecode) ; $i++) { 
    //                 // print_r('$allProductsDecode[$0]->idProduct ' .$allProductsDecode[0]->idProduct);
    //                 if (isset($allProductsDecode[$i]->id)) {
    //                     DB::table('tbl_material_presupuesto')->where('id', '=', $allProductsDecode[$i]->id)->update(['nombre_material' => $allProductsDecode[$i]->nombreProducto, 'descripcion_material' => $allProductsDecode[$i]->descripcionProducto, 'cantidad' => $allProductsDecode[$i]->cantidadProducto, 'base_precio_unidad' => $allProductsDecode[$i]->precioBaseUnidad, 'iva' => $allProductsDecode[$i]->ivaProducto, 'descuento' => $allProductsDecode[$i]->descuentoProducto, 'total_con_iva' => $allProductsDecode[$i]->totalProductoConIva]);
    //                 } else {
    //                     // print_r('entra en el else');
    //                     // die;
    //                     DB::table('tbl_material_presupuesto')->insertGetId(['id_presupuesto' => $idPresupuesto, 'nombre_material' => $allProductsDecode[$i]->nombreProducto, 'descripcion_material' => $allProductsDecode[$i]->descripcionProducto, 'cantidad' => $allProductsDecode[$i]->cantidadProducto, 'base_precio_unidad' => $allProductsDecode[$i]->precioBaseUnidad, 'iva' => $allProductsDecode[$i]->ivaProducto, 'descuento' => $allProductsDecode[$i]->descuentoProducto, 'total_con_iva' => $allProductsDecode[$i]->totalProductoConIva]);
    //                 }
    //             }
    //             DB::commit();
    //         } catch (\Throwable $th) {
    //             DB::rollBack();
    //             echo $th;
    //         }
    //     }
    // }
    public function addNewEstimate(Request $request) {
        $nombre = $request->input('nombre');
        $idPresupuesto = $request->input('idPresupuesto');
        $primerApellido = $request->input('primerApellido');
        $segundoApellido = $request->input('segundoApellido');
        $dni = $request->input('dni');
        $nif = $request->input('nif');
        $nombreEmpresa = $request->input('nombreEmpresa');
        $client = $request->input('client');
        $telefono = $request->input('telefono');
        $email = $request->input('email');
        $ubicacion = $request->input('ubicacion');
        $precioTransporte = $request->input('precioTransporte');
        $descripcionTrabajo = $request->input('descripcionTrabajo');
        $medidasTecnicas = $request->input('medidasTecnicas');
        $importeTotal = $request->input('importeTotal');
        $allProducts = $request->input('allProducts');
        $allProductsDecode = json_decode($allProducts);
        $fechaActual = date('Y-m-d H:i:s');
        $lengthImage = $request->input('lengthImage');
        try {
            DB::beginTransaction();
            if ($idPresupuesto == -1) {
                if ($client == 'particular') {                    
                    DB::table('tbl_presupuesto')->insertGetId(['descripcion_trabajo' => $descripcionTrabajo, 'ubicacion' => $ubicacion, 'precio_transporte' => $precioTransporte, 'medidas_tecnicas' =>$medidasTecnicas, 'dni_cliente' => $dni, 'nombre_cliente' => $nombre, 'apellido1_cliente' => $primerApellido, 'apellido2_cliente' => $segundoApellido, 'telefono_cliente' => $telefono, 'email_cliente' => $email, 'importe_total' => $importeTotal, 'enviado' => '0', 'guardado' => '1', 'fecha_guardado' => $fechaActual, 'fecha_ultima_modificacion' => $fechaActual]);
                } else {
                    DB::table('tbl_presupuesto')->insertGetId(['descripcion_trabajo' => $descripcionTrabajo, 'ubicacion' => $ubicacion, 'precio_transporte' => $precioTransporte, 'medidas_tecnicas' =>$medidasTecnicas, 'nombre_empresa' => $nombreEmpresa, 'nif' => $nif, 'telefono_cliente' => $telefono, 'email_cliente' => $email, 'importe_total' => $importeTotal, 'enviado' => '0', 'guardado' => '1', 'fecha_guardado' => $fechaActual, 'fecha_ultima_modificacion' => $fechaActual]);
                }
    
                $presupuestoId = DB::getPdo()->lastInsertId();
                
                if ($request->file('image-0')) {
                    for ($i=0; $i < $lengthImage; $i++) { 
                        $request->file('image-'.$i)->store('uploads/imgPresupuesto', 'public');
                        DB::table('tbl_img_presupuesto')->insertGetId(['img_url' => $request->file('image-'.$i)->store('uploads/imgPresupuesto', 'public'), 'id_presupuesto' => $presupuestoId]);
                    }
                } 
    
                for ($i=0; $i < count($allProductsDecode) ; $i++) { 
                    DB::table('tbl_material_presupuesto')->insertGetId(['id_presupuesto' => $presupuestoId, 'nombre_material' => $allProductsDecode[$i]->nombreProducto, 'descripcion_material' => $allProductsDecode[$i]->descripcionProducto, 'cantidad' => $allProductsDecode[$i]->cantidadProducto, 'base_precio_unidad' => $allProductsDecode[$i]->precioBaseUnidad, 'iva' => $allProductsDecode[$i]->ivaProducto, 'descuento' => $allProductsDecode[$i]->descuentoProducto, 'total_con_iva' => $allProductsDecode[$i]->totalProductoConIva]);
                }
            } else {
                // actualizar con id actual
                if ($client == 'particular') {
                    DB::table('tbl_presupuesto')->where('id', '=', $idPresupuesto)->update(['descripcion_trabajo' => $descripcionTrabajo, 'ubicacion' => $ubicacion, 'precio_transporte' => $precioTransporte, 'medidas_tecnicas' =>$medidasTecnicas, 'dni_cliente' => $dni, 'nombre_cliente' => $nombre, 'apellido1_cliente' => $primerApellido, 'apellido2_cliente' => $segundoApellido, 'telefono_cliente' => $telefono, 'email_cliente' => $email, 'importe_total' => $importeTotal, 'enviado' => '0', 'fecha_ultima_modificacion' => $fechaActual]);
                } else {
                    DB::table('tbl_presupuesto')->where('id', '=', $idPresupuesto)->update(['descripcion_trabajo' => $descripcionTrabajo, 'ubicacion' => $ubicacion, 'precio_transporte' => $precioTransporte, 'medidas_tecnicas' =>$medidasTecnicas, 'nif' => $nif, 'nombre_empresa' => $nombreEmpresa, 'telefono_cliente' => $telefono, 'email_cliente' => $email, 'importe_total' => $importeTotal, 'enviado' => '0', 'fecha_ultima_modificacion' => $fechaActual]);
                }
    
                if ($request->file('image-0')) {
                    for ($i=0; $i < $lengthImage; $i++) { 
                        $request->file('image-'.$i)->store('uploads/imgPresupuesto', 'public');
                        DB::table('tbl_img_presupuesto')->insertGetId(['img_url' => $request->file('image-'.$i)->store('uploads/imgPresupuesto', 'public'), 'id_presupuesto' => $idPresupuesto]);
                    }
                } 
    
                for ($i=0; $i < count($allProductsDecode) ; $i++) { 
                    // print_r('$allProductsDecode[$0]->idProduct ' .$allProductsDecode[0]->idProduct);
                    if (isset($allProductsDecode[$i]->id)) {
                        DB::table('tbl_material_presupuesto')->where('id', '=', $allProductsDecode[$i]->id)->update(['nombre_material' => $allProductsDecode[$i]->nombreProducto, 'descripcion_material' => $allProductsDecode[$i]->descripcionProducto, 'cantidad' => $allProductsDecode[$i]->cantidadProducto, 'base_precio_unidad' => $allProductsDecode[$i]->precioBaseUnidad, 'iva' => $allProductsDecode[$i]->ivaProducto, 'descuento' => $allProductsDecode[$i]->descuentoProducto, 'total_con_iva' => $allProductsDecode[$i]->totalProductoConIva]);
                    } else {
                        // print_r('entra en el else');
                        // die;
                        DB::table('tbl_material_presupuesto')->insertGetId(['id_presupuesto' => $idPresupuesto, 'nombre_material' => $allProductsDecode[$i]->nombreProducto, 'descripcion_material' => $allProductsDecode[$i]->descripcionProducto, 'cantidad' => $allProductsDecode[$i]->cantidadProducto, 'base_precio_unidad' => $allProductsDecode[$i]->precioBaseUnidad, 'iva' => $allProductsDecode[$i]->ivaProducto, 'descuento' => $allProductsDecode[$i]->descuentoProducto, 'total_con_iva' => $allProductsDecode[$i]->totalProductoConIva]);
                    }
                }
            }
            DB::commit();
            return response()->json($presupuestoId, 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }

    }
    // END 21-05-21

    public function addNewHojaTrabajo(Request $request) {
        $id = session()->get('id');
        $nombre = $request->input('nombre');
        $idPresupuesto = $request->input('idPresupuesto');
        $primerApellido = $request->input('primerApellido');
        $segundoApellido = $request->input('segundoApellido');
        $dni = $request->input('dni');
        $nif = $request->input('nif');
        $nombreEmpresa = $request->input('nombreEmpresa');
        $client = $request->input('client');
        $telefono = $request->input('telefono');
        $email = $request->input('email');
        $ubicacion = $request->input('ubicacion');
        $precioTransporte = $request->input('precioTransporte');
        $descripcionTrabajo = $request->input('descripcionTrabajo');
        $importeTotal = $request->input('importeTotal');
        $allProducts = $request->input('allProducts');
        $allProductsDecode = json_decode($allProducts);
        $fechaActual = date('Y-m-d H:i:s');
        $stock = $request->input('stock');

        // Si no está aún insertado en la BBDD el presupuesto (presupuesto nuevo)
        try {
            if ($idPresupuesto == -1) {
                DB::beginTransaction();
                if ($client == 'particular') {                    
                    DB::table('tbl_hoja_trabajo')->insertGetId(['descripcion' => $descripcionTrabajo, 'direccion' => $ubicacion, 'precio_transporte' => $precioTransporte, 'dni_cliente' => $dni, 'nombre_cliente' => $nombre, 'apellido1_cliente' => $primerApellido, 'apellido2_cliente' => $segundoApellido, 'telefono' => $telefono, 'email' => $email, 'precio_total' => $importeTotal, 'enviado' => '0', 'guardado' => '1', 'fecha_guardado' => $fechaActual, 'fecha_ultima_modificacion' => $fechaActual, 'id_tipo_cliente' => '2', 'id_empleado_propietario' => $id]);
                } else {
                    DB::table('tbl_hoja_trabajo')->insertGetId(['descripcion' => $descripcionTrabajo, 'direccion' => $ubicacion, 'precio_transporte' => $precioTransporte, 'nombre_empresa' => $nombreEmpresa, 'nif' => $nif, 'telefono' => $telefono, 'email' => $email, 'precio_total' => $importeTotal, 'enviado' => '0', 'guardado' => '1', 'fecha_guardado' => $fechaActual, 'fecha_ultima_modificacion' => $fechaActual, 'id_tipo_cliente' => '1', 'id_empleado_propietario' => $id]);
                }

                $presupuestoId = DB::getPdo()->lastInsertId();

                // 15-05-21
                for ($i=0; $i < count($allProductsDecode) ; $i++) { 
                    DB::table('tbl_material_hojatrabajo')->insertGetId(['id_hojaTrabajo' => $presupuestoId, 'nombre_material' => $allProductsDecode[$i]->nombreProducto, 'descripcion_material' => $allProductsDecode[$i]->descripcionProducto, 'cantidad_material' => $allProductsDecode[$i]->cantidadProducto, 'base_precio_unidad_material' => $allProductsDecode[$i]->precioBaseUnidad, 'iva' => $allProductsDecode[$i]->ivaProducto, 'descuento' => $allProductsDecode[$i]->descuentoProducto, 'total_con_iva' => $allProductsDecode[$i]->totalProductoConIva, 'stock' => $allProductsDecode[$i]->inStock]);

                    if ($stock == '1') {
                        $productQuantityBD = DB::select("SELECT cantidad FROM tbl_stock where nombre_producto LIKE '{$allProductsDecode[$i]->nombreProducto}'");
                        $productQuantityNow = (intval($productQuantityBD[0]->cantidad)) - (intval($allProductsDecode[$i]->cantidadProducto));
                        // REVIEW
                        if($productQuantityNow < 0) {
                            return response()->json(['notEnoughProduct' => 1]);
                        } else {
                            DB::update("UPDATE tbl_stock SET cantidad = {$productQuantityNow} WHERE nombre_producto = '{$allProductsDecode[$i]->nombreProducto}'");
                        }
                    }
                }
            } else { // Si el presupuesto ya existía (ya estaba en la BBDD)
                // actualizar con id actual
                if ($client == 'particular') {
                    DB::table('tbl_hoja_trabajo')->where('id', '=', $idPresupuesto)->update(['descripcion' => $descripcionTrabajo, 'direccion' => $ubicacion, 'precio_transporte' => $precioTransporte, 'dni_cliente' => $dni, 'nombre_cliente' => $nombre, 'apellido1_cliente' => $primerApellido, 'apellido2_cliente' => $segundoApellido, 'telefono' => $telefono, 'email' => $email, 'precio_total' => $importeTotal, 'enviado' => '0', 'fecha_ultima_modificacion' => $fechaActual]);
                } else {
                    DB::table('tbl_hoja_trabajo')->where('id', '=', $idPresupuesto)->update(['descripcion' => $descripcionTrabajo, 'direccion' => $ubicacion, 'precio_transporte' => $precioTransporte, 'nombre_empresa' => $nombreEmpresa, 'nif' => $nif, 'telefono' => $telefono, 'email' => $email, 'precio_total' => $importeTotal, 'enviado' => '0', 'fecha_ultima_modificacion' => $fechaActual]);
                }

                for ($i=0; $i < count($allProductsDecode) ; $i++) { 
                    if (isset($allProductsDecode[$i]->id)) {
                        if ($stock == '1') {
                            // Quantitat antiga a material hoja trabajo
                            $oldQuantity = DB::select("SELECT cantidad_material FROM tbl_material_hojatrabajo WHERE nombre_material LIKE '{$allProductsDecode[$i]->nombreProducto}' AND id = {$allProductsDecode[$i]->id}");
                            // Quantitat en stock
                            $productQuantityBD = DB::select("SELECT cantidad FROM tbl_stock where nombre_producto LIKE '{$allProductsDecode[$i]->nombreProducto}'");
                            // Fer update per tornar a tenir quantitat inicial
                            $suma = (intval($oldQuantity[0]->cantidad_material) + intval($productQuantityBD[0]->cantidad)); 
                            // 4.
                            $productQuantityNow = (intval($suma)) - intval(($allProductsDecode[$i]->cantidadProducto));
                            // print_r($productQuantityNow);
                            // die;
                            if($productQuantityNow < 0) { // Si no hi ha suficient material...
                                // print_r('en el if');
                                return response()->json(['notEnoughProduct' => 1]);
                            }
                            // 5.
                            DB::update("UPDATE tbl_stock SET cantidad = {$productQuantityNow} WHERE nombre_producto = '{$allProductsDecode[$i]->nombreProducto}'");

                            DB::table('tbl_material_hojatrabajo')->where('id', '=', $allProductsDecode[$i]->id)->update(['nombre_material' => $allProductsDecode[$i]->nombreProducto, 'descripcion_material' => $allProductsDecode[$i]->descripcionProducto, 'cantidad_material' => $allProductsDecode[$i]->cantidadProducto, 'base_precio_unidad_material' => $allProductsDecode[$i]->precioBaseUnidad, 'iva' => $allProductsDecode[$i]->ivaProducto, 'descuento' => $allProductsDecode[$i]->descuentoProducto, 'total_con_iva' => $allProductsDecode[$i]->totalProductoConIva, 'stock' => $allProductsDecode[$i]->inStock]);
                            
                        } else {
                            // No ve de stock
                            DB::table('tbl_material_hojatrabajo')->where('id', '=', $allProductsDecode[$i]->id)->update(['nombre_material' => $allProductsDecode[$i]->nombreProducto, 'descripcion_material' => $allProductsDecode[$i]->descripcionProducto, 'cantidad_material' => $allProductsDecode[$i]->cantidadProducto, 'base_precio_unidad_material' => $allProductsDecode[$i]->precioBaseUnidad, 'iva' => $allProductsDecode[$i]->ivaProducto, 'descuento' => $allProductsDecode[$i]->descuentoProducto, 'total_con_iva' => $allProductsDecode[$i]->totalProductoConIva, 'stock' => $allProductsDecode[$i]->inStock]);
                        }
                    } else {
                        DB::table('tbl_material_hojatrabajo')->insertGetId(['id_hojaTrabajo' => $idPresupuesto, 'nombre_material' => $allProductsDecode[$i]->nombreProducto, 'descripcion_material' => $allProductsDecode[$i]->descripcionProducto, 'cantidad_material' => $allProductsDecode[$i]->cantidadProducto, 'base_precio_unidad_material' => $allProductsDecode[$i]->precioBaseUnidad, 'iva' => $allProductsDecode[$i]->ivaProducto, 'descuento' => $allProductsDecode[$i]->descuentoProducto, 'total_con_iva' => $allProductsDecode[$i]->totalProductoConIva, 'stock' => $allProductsDecode[$i]->inStock]);
                        // 15-05-21
                        if ($stock == '1') {
                            $productQuantityBD = DB::select("SELECT cantidad FROM tbl_stock where nombre_producto LIKE '{$allProductsDecode[$i]->nombreProducto}'");
                            $productQuantityNow = (intval($productQuantityBD[0]->cantidad)) - (intval($allProductsDecode[$i]->cantidadProducto));
                            if($productQuantityNow < 0) {
                                return response()->json(['notEnoughProduct' => 1]);
                            } else { // Si no hi ha suficient material...
                                DB::update("UPDATE tbl_stock SET cantidad = {$productQuantityNow} WHERE nombre_producto = '{$allProductsDecode[$i]->nombreProducto}'");
                            }
                        }
                    }
                }
            } 
            DB::commit();
            return response()->json([]);
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }



    public function savedEstimate() { // obtenir les dades principals dels pressuposts guardats
        $query = 'SELECT id, nombre_cliente, nombre_empresa, apellido1_cliente, fecha_guardado, fecha_ultima_modificacion FROM tbl_presupuesto WHERE enviado = 0';
        $savedEstimate = DB::select($query);
        return response()->json($savedEstimate, 200);
    }

    public function savedHojaTrabajo() {
        $id = session()->get('id');
        // 27-05-2021 1
        $query = 'SELECT id, nombre_cliente, nombre_empresa, apellido1_cliente, fecha_guardado, fecha_ultima_modificacion FROM tbl_hoja_trabajo WHERE enviado = 0 AND id_empleado_propietario = ? AND estado_hoja IS NULL';
        // end 27-05-2021
        // 27-05-2021
        $query2 = 'SELECT tbl_hoja_trabajo.id, tbl_hoja_trabajo.nombre_cliente, tbl_hoja_trabajo.nombre_empresa, tbl_hoja_trabajo.apellido1_cliente, tbl_hoja_trabajo.fecha_guardado, tbl_hoja_trabajo.fecha_ultima_modificacion FROM tbl_hoja_trabajo INNER JOIN tbl_compartir_hoja ON tbl_hoja_trabajo.id = tbl_compartir_hoja.id_hoja_trabajo INNER JOIN tbl_usuario ON tbl_compartir_hoja.id_empleado = tbl_usuario.id WHERE tbl_compartir_hoja.id_empleado = ? AND tbl_hoja_trabajo.enviado = 0';
        // end 27-05-2021
        $savedHojaTrabajo = DB::select($query, [$id]);
        $compartirHojaTrabajo = DB::select($query2, [$id]);
        return response()->json(['dataHojaTrabajo' => $savedHojaTrabajo, 'dataCompartir' => $compartirHojaTrabajo]);
    }
    
    public function getDataCurrentEstimate(Request $request) { // obtenir les dades del presupost
        $id = $request->input('id');

        $queryDataClient = 'SELECT `id`, `descripcion_trabajo`, `ubicacion`, `precio_transporte`, `medidas_tecnicas`, `dni_cliente`, `nombre_cliente`, `apellido1_cliente`, `apellido2_cliente`, nif, nombre_empresa, `telefono_cliente`, `email_cliente`, `importe_total`, `enviado`, `guardado`, `fecha_guardado`, `fecha_ultima_modificacion` FROM `tbl_presupuesto` WHERE id = ?';

        $queryDataProduct = 'SELECT `id`, `id_presupuesto`, `nombre_material`, `descripcion_material`, `cantidad`, `base_precio_unidad`, `iva`, `descuento`, `total_con_iva` FROM `tbl_material_presupuesto` WHERE id_presupuesto = ?';

        $queryDataImage = 'SELECT `id`, `img_url`, `id_presupuesto` FROM `tbl_img_presupuesto` WHERE id_presupuesto = ?';

        $dataClient = DB::select($queryDataClient, [$id]);
        $dataProduct = DB::select($queryDataProduct, [$id]);
        $dataImages = DB::select($queryDataImage, [$id]);
        return response()->json(['dataClient' => $dataClient, 'dataProduct' => $dataProduct, 'dataImages' => $dataImages]);
    }

    public function getDataCurrentHojaTrabajo(Request $request) { // obtenir les dades del presupost
        $id = $request->input('id');

        $queryDataClient = 'SELECT `id`, `descripcion`, `direccion`, `precio_transporte`,  `dni_cliente`, `nombre_cliente`, `apellido1_cliente`, `apellido2_cliente`, `nif`, `nombre_empresa`, `telefono`, `email`, `precio_total`, `enviado`, `guardado`, `fecha_guardado`, `fecha_ultima_modificacion` FROM `tbl_hoja_trabajo` WHERE id = ?';

        $queryDataProduct = 'SELECT `id`, `id_hojaTrabajo`, `nombre_material`, `descripcion_material`, `cantidad_material`, `base_precio_unidad_material`, `iva`, `descuento`, `total_con_iva`, stock FROM `tbl_material_hojatrabajo` WHERE id_hojaTrabajo = ?';

        $dataClient = DB::select($queryDataClient, [$id]);
        $dataProduct = DB::select($queryDataProduct, [$id]);
        return response()->json(['dataClient' => $dataClient, 'dataProduct' => $dataProduct]);
    }

    public function dropImgPresupuesto(Request $request) { // ESborrar imatge de pressupost
        $id = $request->input('id');
        try {
            DB::beginTransaction();
            $queryOldImgBD = 'SELECT img_url FROM tbl_img_presupuesto WHERE id = ?';
            $imgBD = DB::select($queryOldImgBD, [$id]);
            $imgBDOld = $imgBD[0]->img_url;
            Storage::delete('public/'.$imgBDOld);
            DB::table('tbl_img_presupuesto')->where(['id' => $id])->delete();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function dropProductEstimate(Request $request) { // Esborrar un producte de pressupost
        $id = $request->input('id');
        try {
            DB::beginTransaction();
            DB::table('tbl_material_presupuesto')->where(['id' => $id])->delete();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    // 15-05-21
    public function dropProductHojaTrabajo(Request $request) {
        $id = $request->input('id');
        try {
            DB::beginTransaction();
            $infoProduct = DB::select("SELECT `stock`, `cantidad_material`, `nombre_material`  FROM `tbl_material_hojatrabajo` WHERE `id` = {$id}");
            if ($infoProduct[0]->stock == '1') {
                // La quantitat a posar a la BBDD de stock es igual a sumar el que hi ha actualment en stock més el que hi ha en tbl_hoja_trabajo
                $stockQuantity = DB::select("SELECT cantidad FROM tbl_stock WHERE nombre_producto = '{$infoProduct[0]->nombre_material}'");
                // 22-05-21
                if ($infoProduct[0]->cantidad_material > $stockQuantity) {
                    return;
                }
                // END 22-05-21
                $newQuantity = (intval($infoProduct[0]->cantidad_material)) + intval($stockQuantity[0]->cantidad);
                DB::update("UPDATE tbl_stock SET cantidad = {$newQuantity} WHERE nombre_producto = '{$infoProduct[0]->nombre_material}'");
            }
            DB::table('tbl_material_hojatrabajo')->where(['id' => $id])->delete();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }


    public function dataStock(Request $request) { // obtenir tots els prodcutes de stock
        $filtro = $request->input('filtro');
        if($filtro==""){
            if (null !==($request->input('desc'))) {
                $listStock = DB::select('SELECT `id`, `nombre_producto`, `cantidad`, `precio_unidad` FROM `tbl_stock` ORDER BY `cantidad` DESC');
            }elseif (null !==($request->input('asc'))) {
                $listStock = DB::select('SELECT `id`, `nombre_producto`, `cantidad`, `precio_unidad` FROM `tbl_stock` ORDER BY `cantidad` ASC');
            }else{
                $listStock = DB::select('SELECT `id`, `nombre_producto`, `cantidad`, `precio_unidad` FROM `tbl_stock`');
            }
        }else{
            if (null !==($request->input('desc'))) {
                $listStock = DB::select('SELECT `id`, `nombre_producto`, `cantidad`, `precio_unidad` FROM `tbl_stock` WHERE `nombre_producto` LIKE ? ORDER BY `tbl_stock`.`cantidad` DESC', ["%".$filtro."%"]);
            }elseif (null !==($request->input('asc'))) {
                $listStock = DB::select('SELECT `id`, `nombre_producto`, `cantidad`, `precio_unidad` FROM `tbl_stock` WHERE `nombre_producto` LIKE ? ORDER BY `tbl_stock`.`cantidad` ASC', ["%".$filtro."%"]);
            }else{
                $listStock = DB::select('SELECT `id`, `nombre_producto`, `cantidad`, `precio_unidad` FROM `tbl_stock` WHERE `nombre_producto` LIKE ?', ["%".$filtro."%"]);
            }
            
        } 
        return response()->json($listStock, 200);
    }

    public function dropProductToStock(Request $request) { // eliminar producte de stock
        $id = $request->input('id');
        try {
            DB::beginTransaction();
            DB::table('tbl_stock')->where(['id' => $id])->delete();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function getDataThisProductStock(Request $request) { // obtenir les dades d'un producte de stock en concret
        $id = $request->input('id');
        $query = 'SELECT `id`, `nombre_producto`, `cantidad`, `precio_unidad` FROM `tbl_stock` WHERE id = ?';
        $productStock = DB::select($query, [$id]);
        return response()->json($productStock, 200);
    }

    public function updateProductStock(Request $request) { // actualziar un producto concreto del stock
        $id = $request->input('id');
        $nombre = $request->input('nombre');
        $cantidad = $request->input('cantidad');
        $precio = $request->input('precio');
        try {
            DB::beginTransaction();
            DB::table('tbl_stock')->where('id', '=', $id)->update(['nombre_producto' => $nombre, 'cantidad' => $cantidad, 'precio_unidad' => $precio]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function addProductToStock(Request $request) { // afegir nou producte al stock
        $nombre = $request->input('nombre');
        $cantidad = $request->input('cantidad');
        $precio = $request->input('precio');
        try {
            DB::beginTransaction();
            DB::table('tbl_stock')->insertGetId(['nombre_producto' => $nombre, 'cantidad' => $cantidad, 'precio_unidad' => $precio]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function dropThisEstimate(Request $request) { // elimina un pressupost en concret
        $id = $request->input('id');
        try {
            DB::beginTransaction();
            $queryOldImgBD = 'SELECT img_url FROM tbl_img_presupuesto WHERE id_presupuesto = ?';
            $imgBD = DB::select($queryOldImgBD, [$id]);
            if (count($imgBD) > 0) {
                $imgBDOld = $imgBD[0]->img_url;
                Storage::delete('public/'.$imgBDOld);
            }
            DB::table('tbl_img_presupuesto')->where(['id_presupuesto' => $id])->delete();
            DB::table('tbl_material_presupuesto')->where(['id_presupuesto' => $id])->delete();
            DB::table('tbl_presupuesto')->where(['id' => $id])->delete();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function enviarHojaTrabajo(Request $request) {
        $id = $request->input('id');
        try {
            DB::beginTransaction();
            DB::table('tbl_hoja_trabajo')->where('id', '=', $id)->update(['enviado' => 1]);
            DB::commit();
            return response()->json(array('resultado'=>'OK'), 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
            return response()->json(array('resultado'=>'NOK '.$th->getMessage()), 200);
        }
    }

    public function dropThisHojaTrabajo(Request $request) { // elimina un pressupost en concret
        $id = $request->input('id');
        try {
            DB::beginTransaction();
            // Busquem els productes de tbl_material_hojatrabajo que corresponen a aquest full de treball
            $queryMateriales = "SELECT `id`, `nombre_material`, `cantidad_material` FROM `tbl_material_hojatrabajo` WHERE `id_hojaTrabajo` = ?";
            $materiales = DB::select($queryMateriales, [$id]);
            for ($i=0; $i < count($materiales); $i++) {  // Recorrem els materiales
                $stockQuantity = $materiales[$i]->cantidad_material; // Ens quedem amb la quantitat
                // Només seleccionar els productes que estàn en stock
                // Dades del/s producte/s en el Stock
                $infoProduct = DB::select("SELECT `id`, `cantidad` FROM `tbl_stock` WHERE `nombre_producto` = '{$materiales[$i]->nombre_material}'");
                if(count($infoProduct) > 0) {
                    $newQuantity = (intval($infoProduct[0]->cantidad)) + intval($stockQuantity); // Sumem el que teniem amb la quantitat del material que tenim en aquest full de treball
                    DB::update("UPDATE tbl_stock SET cantidad = {$newQuantity} WHERE nombre_producto = '{$materiales[$i]->nombre_material}'");
                }
            }
            DB::table('tbl_material_hojatrabajo')->where(['id_hojaTrabajo' => $id])->delete();
            DB::table('tbl_hoja_trabajo')->where(['id' => $id])->delete();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

    public function calculateEstimate(Request $request) { // calcula el preu d'un producte en concret
        $cantidadProducto = $request->input('cantidadProducto');
        $precioBaseUnidad = $request->input('precioBaseUnidad');
        $ivaProducto = $request->input('ivaProducto');
        $descuentoProducto = $request->input('descuentoProducto');
        $precioSinDescuento = 0;
        $precioTotal = 0;
        $precioSinDescuento = (($cantidadProducto * $precioBaseUnidad) * (100 + $ivaProducto)) / 100;
        $precioTotal = ($precioSinDescuento * (100 - $descuentoProducto)) / 100;
        $precioTotal = round($precioTotal, 2);
        return response()->json($precioTotal, 200);
    }

    public function addImageCanvas(Request $request) {
        try {
            $canvas = $request->input('canvas');
            $idTrabajo = $request->input('id');
            $canvasDecode = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $canvas));
            $img_name = 'firma'. time() . '.png';   
            Storage::disk('images_base64')->put($img_name, $canvasDecode);
            DB::table('tbl_hoja_trabajo')->where('id', '=', $idTrabajo)->update(['url_img_firma_cliente' => $img_name]);
            // DB::update('UPDATE tbl_hoja_trabajo SET url_img_firma_cliente = "'.$img_name.'" WHERE id = "'.$idTrabajo.'"');
            return response()->json(array('resultado'=>'OK'), 200);
        } catch (\Throwable $th) {
            return response()->json(array('resultado'=>'NOK '.$th->getMessage()), 200);
        }
        
    }

    public function enviarPresupuesto(Request $request) {
        $id = $request->input('id');
        try {
            DB::beginTransaction();
            DB::table('tbl_hoja_trabajo')->where('id', '=', $id)->update(['enviado' => 1]);
            DB::commit();
            return response()->json(array('resultado'=>'OK'), 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
            return response()->json(array('resultado'=>'NOK '.$th->getMessage()), 200);
        }
    }

    public function updateRevisar(Request $request) {
        $id = $request->input('id');
        try {
            DB::beginTransaction();
            DB::table('tbl_hoja_trabajo')->where('id', '=', $id)->update(['estado_hoja' => 1]);
            DB::commit();
            return response()->json(array('resultado'=>'OK'), 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
            return response()->json(array('resultado'=>'NOK '.$th->getMessage()), 200);
        }
    }

    public function presupuestoPdf($id){
        $queryEstimate = 'SELECT id, `descripcion_trabajo`, `ubicacion`, `precio_transporte`, `medidas_tecnicas`, `dni_cliente`, `nombre_cliente`, `apellido1_cliente`, `apellido2_cliente`, `nombre_empresa`, `nif`, `telefono_cliente`, `email_cliente`, `importe_total`, fecha_ultima_modificacion FROM `tbl_presupuesto` WHERE id = ?';
        $estimate = DB::select($queryEstimate, [$id]);
        
        $queryProducts = 'SELECT `nombre_material`, `descripcion_material`, `cantidad`, `base_precio_unidad`, `iva`, `descuento`, `total_con_iva` FROM `tbl_material_presupuesto` WHERE `id_presupuesto` = ?';
        $products = DB::select($queryProducts, [$id]);

        $queryImg = 'SELECT `img_url` FROM `tbl_img_presupuesto` WHERE `id_presupuesto` = ?';
        $img = DB::select($queryImg, [$id]);
        
        return view('pdfPresupuesto', compact('estimate', 'products', 'img'));
    }
    
    public function HojaTrabajoPdf($id){
        $queryEstimate = 'SELECT id, `descripcion`, `direccion`, `precio_transporte`,  `dni_cliente`, `nombre_cliente`, `apellido1_cliente`, `apellido2_cliente`, `nombre_empresa`,`id_empleado_propietario`,`nif`, `telefono`, `email`, `precio_total`, `url_img_firma_cliente`, fecha_ultima_modificacion, tiempo_total FROM `tbl_hoja_trabajo` WHERE id = ?';
        $estimate = DB::select($queryEstimate, [$id]);
        
        $queryProducts = 'SELECT `nombre_material`, `descripcion_material`, `cantidad_material`, `base_precio_unidad_material`, `iva`, `descuento`, `total_con_iva` FROM `tbl_material_hojatrabajo` WHERE `id_hojaTrabajo` = ?';
        $products = DB::select($queryProducts, [$id]);

        $queryNombre ='SELECT tbl_hoja_trabajo.id, tbl_hoja_trabajo.id_empleado_propietario, tbl_usuario.nombre from tbl_hoja_trabajo INNER JOIN tbl_usuario ON tbl_hoja_trabajo.id_empleado_propietario = tbl_usuario.id WHERE tbl_hoja_trabajo.id = ?';
        $nombre = DB::select($queryNombre, [$id]);

        $queryHoras = 'SELECT tbl_usuario.nombre, tbl_horas_totales.total_horas FROM tbl_usuario INNER JOIN tbl_horas_totales ON tbl_usuario.id = tbl_horas_totales.id_empleado WHERE tbl_horas_totales.id_hoja_trabajo = ?';
        $horas = DB::select($queryHoras, [$id]);

        // 21-05-21 1
        DB::table('tbl_hoja_trabajo')->where('id', '=', $id)->update(['enviado' => 1, 'estado_hoja' => 0]);
        // END 21-05-21 1
        return view('pdfHojaTrabajo', compact('estimate', 'products', 'nombre', 'horas'));
    }

    public function imprimirPdfPresupuesto($id) {
        $queryEstimate = 'SELECT id, `descripcion_trabajo`, `ubicacion`, `precio_transporte`, `medidas_tecnicas`, `dni_cliente`, `nombre_cliente`, `apellido1_cliente`, `apellido2_cliente`, `nombre_empresa`, `nif`, `telefono_cliente`, `email_cliente`, `importe_total`, fecha_ultima_modificacion FROM `tbl_presupuesto` WHERE id = ?';
        $estimate = DB::select($queryEstimate, [$id]);
        
        $queryProducts = 'SELECT `nombre_material`, `descripcion_material`, `cantidad`, `base_precio_unidad`, `iva`, `descuento`, `total_con_iva` FROM `tbl_material_presupuesto` WHERE `id_presupuesto` = ?';
        $products = DB::select($queryProducts, [$id]);

        $queryImg = 'SELECT `img_url` FROM `tbl_img_presupuesto` WHERE `id_presupuesto` = ?';
        $img = DB::select($queryImg, [$id]);

        $pdf = \PDF::loadView('pdfPresupuesto' , compact('estimate', 'products', 'img'));
        $pdf2 = $pdf->output();
        $name = 'presupuesto.pdf';   
        Storage::disk('pdf')->put($name, $pdf2);
        return $pdf->stream($name.'.pdf');
    }

    public function imprimirPdfHojaTrabajo($id) {
        $queryEstimate = 'SELECT id, `descripcion`, `direccion`, `precio_transporte`, `dni_cliente`, `nombre_cliente`, `apellido1_cliente`, `apellido2_cliente`, `nombre_empresa`, `nif`, `telefono`, `email`, `precio_total`, `url_img_firma_cliente`, `tiempo_total` FROM `tbl_hoja_trabajo` WHERE id = ?';
        $estimate = DB::select($queryEstimate, [$id]);
        
        $queryProducts = 'SELECT `nombre_material`, `descripcion_material`, `cantidad_material`, `base_precio_unidad_material`, `iva`, `descuento`, `total_con_iva` FROM `tbl_material_hojatrabajo` WHERE `id_hojaTrabajo` = ?';
        $products = DB::select($queryProducts, [$id]);

        $queryNombre ='SELECT tbl_hoja_trabajo.id, tbl_hoja_trabajo.id_empleado_propietario, tbl_usuario.nombre from tbl_hoja_trabajo INNER JOIN tbl_usuario ON tbl_hoja_trabajo.id_empleado_propietario = tbl_usuario.id WHERE tbl_hoja_trabajo.id = ?';
        $nombre = DB::select($queryNombre, [$id]);

        $queryHoras = 'SELECT tbl_usuario.nombre, tbl_horas_totales.total_horas FROM tbl_usuario INNER JOIN tbl_horas_totales ON tbl_usuario.id = tbl_horas_totales.id_empleado WHERE tbl_horas_totales.id_hoja_trabajo = ?';
        $horas = DB::select($queryHoras, [$id]);

        $pdf = \PDF::loadView('pdfHojaTrabajo' , compact('estimate', 'products', 'nombre', 'horas'));
        $pdf2 = $pdf->output();
        $name = 'hojaTrabajo.pdf';   
        Storage::disk('pdf')->put($name, $pdf2);
        return $pdf->stream($name.'.pdf');
    }
    
    public function sendEmailEstimate($id) {
        try {
            DB::beginTransaction();

            $queryEstimate = 'SELECT id, `descripcion_trabajo`, `ubicacion`, `precio_transporte`, `medidas_tecnicas`, `dni_cliente`, `nombre_cliente`, `apellido1_cliente`, `apellido2_cliente`, `nombre_empresa`, `nif`, `telefono_cliente`, `email_cliente`, `importe_total`, fecha_ultima_modificacion FROM `tbl_presupuesto` WHERE id = ?';
            $estimate = DB::select($queryEstimate, [$id]);
            
            $queryProducts = 'SELECT `nombre_material`, `descripcion_material`, `cantidad`, `base_precio_unidad`, `iva`, `descuento`, `total_con_iva` FROM `tbl_material_presupuesto` WHERE `id_presupuesto` = ?';
            $products = DB::select($queryProducts, [$id]);

            $queryImg = 'SELECT `img_url` FROM `tbl_img_presupuesto` WHERE `id_presupuesto` = ?';
            $img = DB::select($queryImg, [$id]);

            $pdf = \PDF::loadView('pdfPresupuesto' , compact('estimate', 'products', 'img'));
            $pdf2 = $pdf->output();
            $name = 'presupuesto.pdf';
            Storage::disk('pdf')->put($name, $pdf2);
            $query = 'SELECT `email_cliente` FROM `tbl_presupuesto` WHERE `id` = ?';
            $userEmail = DB::select($query, [$id]);
            $enviar = new SendMessageEstimate();
            // $userEmail = 'laravelprueba47@gmail.com'; 
            $enviar->emailSubject = 'Solicitud de presupuesto';
            Mail::to($userEmail[0]->email_cliente)->send($enviar);
            DB::table('tbl_presupuesto')->where('id', '=', $id)->update(['enviado' => 1]);
            DB::commit();
            return redirect('presupuestos')->with('messageEmail', 'messageEmail');
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }

     public function sendEmailHojaTrabajo($id) {
        try {
            DB::beginTransaction();

            $queryEstimate = 'SELECT id, `descripcion`, `direccion`, `precio_transporte`, `dni_cliente`, `nombre_cliente`, `apellido1_cliente`, `apellido2_cliente`, `nombre_empresa`, `nif`, `telefono`, `email`, `precio_total`, `url_img_firma_cliente`, `tiempo_total` FROM `tbl_hoja_trabajo` WHERE id = ?';
            $estimate = DB::select($queryEstimate, [$id]);
            
            $queryProducts = 'SELECT `nombre_material`, `descripcion_material`, `cantidad_material`, `base_precio_unidad_material`, `iva`, `descuento`, `total_con_iva` FROM `tbl_material_hojatrabajo` WHERE `id_hojaTrabajo` = ?';
            $products = DB::select($queryProducts, [$id]);

            $queryNombre ='SELECT tbl_hoja_trabajo.id, tbl_hoja_trabajo.id_empleado_propietario, tbl_usuario.nombre from tbl_hoja_trabajo INNER JOIN tbl_usuario ON tbl_hoja_trabajo.id_empleado_propietario = tbl_usuario.id WHERE tbl_hoja_trabajo.id = ?';
            $nombre = DB::select($queryNombre, [$id]);
            
            // 27-05-21
            $queryHoras = 'SELECT tbl_usuario.nombre, tbl_horas_totales.total_horas FROM tbl_usuario INNER JOIN tbl_horas_totales ON tbl_usuario.id = tbl_horas_totales.id_empleado WHERE tbl_horas_totales.id_hoja_trabajo = ?';
            $horas = DB::select($queryHoras, [$id]);
            // END 27-05-21

            $queryHoras = 'SELECT tbl_usuario.nombre, tbl_horas_totales.total_horas FROM tbl_usuario INNER JOIN tbl_horas_totales ON tbl_usuario.id = tbl_horas_totales.id_empleado WHERE tbl_horas_totales.id_hoja_trabajo = ?';
            $horas = DB::select($queryHoras, [$id]);

            $pdf = \PDF::loadView('pdfHojaTrabajo' , compact('estimate', 'products', 'nombre', 'horas'));
            $pdf2 = $pdf->output();
            $name = 'hojaTrabajo.pdf';   
            Storage::disk('pdf')->put($name, $pdf2);


            $query = 'SELECT `email` FROM `tbl_hoja_trabajo` WHERE `id` = ?';
            $userEmail = DB::select($query, [$id]);
            $enviar = new SendMessageHojaTrabajo(); 
            $enviar->emailSubject = 'Copia de la Hoja de Trabajo';
            Mail::to($userEmail[0]->email)->send($enviar);
            DB::table('tbl_hoja_trabajo')->where('id', '=', $id)->update(['enviado' => 1, 'estado_hoja' => 0]);
            DB::commit();
            return redirect('verHojasTrabajo')->with('messageEmail', 'messageEmail');
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
        }
    }


    public function sendedEstimate() { // obtenir les dades principals dels presuposts enviats
        $query = 'SELECT id, nombre_cliente, nombre_empresa, apellido1_cliente, fecha_guardado, fecha_ultima_modificacion FROM tbl_presupuesto WHERE enviado = 1';
        $savedEstimate = DB::select($query);
        return response()->json($savedEstimate, 200);
    }

    public function productsStock(Request $request) { // obtenir tots els productes de stock
        $filtro = $request->input('filtro');
        if($filtro==""){
            $listaStock = DB::select('SELECT `id`, `nombre_producto`, `cantidad`, `precio_unidad` FROM `tbl_stock` WHERE cantidad > 0');
        }else{
            $listaStock = DB::select('SELECT `id`, `nombre_producto`, `cantidad`, `precio_unidad` FROM `tbl_stock` WHERE cantidad > 0 AND `nombre_producto` LIKE ?', ["%".$filtro."%"]);            
        } 
        return response()->json($listaStock, 200);
    }
    // 27-05-21
    public function sendedHojaTrabajo() {
        $id = session()->get('id');
        $query = 'SELECT id, nombre_cliente, nombre_empresa, apellido1_cliente, fecha_guardado, fecha_ultima_modificacion FROM tbl_hoja_trabajo WHERE enviado = 1 AND id_empleado_propietario = ? OR estado_hoja = 0';
        $savedHojaTrabajo = DB::select($query, [$id]);
        return response()->json($savedHojaTrabajo, 200);
    }
    // END 27-05-21

    public function sendedSecretaria() {
        $query = 'SELECT id, nombre_cliente, nombre_empresa, apellido1_cliente, fecha_guardado, fecha_ultima_modificacion FROM tbl_hoja_trabajo WHERE secretaria = 1';
        $savedSecretaria = DB::select($query);
        return response()->json($savedSecretaria, 200);
    }

    public function checkHTrabajo() {
        $query = 'SELECT id, nombre_cliente, nombre_empresa, apellido1_cliente, fecha_guardado, fecha_ultima_modificacion FROM tbl_hoja_trabajo WHERE estado_hoja = 1';
        $checkHojaTrabajo = DB::select($query);
        return response()->json($checkHojaTrabajo, 200);
    }

    public function listaUsuarios() {
        $id = session()->get('id');
        $query = 'SELECT id, nombre, apellido1, apellido2, telefono, correo FROM tbl_usuario WHERE id NOT IN (?) AND id_rol NOT IN (2)';
        $listaUsuarios = DB::select($query, [$id]);
        return response()->json($listaUsuarios, 200);
    }

    public function compartirHoja(Request $request) {
        $idHojaTrabajo = $request->input('idHojaTrabajo');
        $idUsuario = $request->input('idUsuario');
        try {
            DB::beginTransaction();
            // 27-05-2021
            $query = DB::table('tbl_compartir_hoja')->where('id_hoja_trabajo', '=', $idHojaTrabajo)->where('id_empleado', '=', $idUsuario)->count();
            if ($query == 0) {
                DB::table('tbl_compartir_hoja')->insertGetId(['id_hoja_trabajo' => $idHojaTrabajo, 'id_empleado' => $idUsuario]);
                DB::commit();
                return response()->json(array('resultado'=>'OK'), 200);
            } else {
                $mensaje = "El usuario seleccionado ya tiene esta hoja compartida";
                return response()->json($mensaje, 200);
            }
            // end 27-05-2021
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
            return response()->json(array('resultado'=>'NOK '.$th->getMessage()), 200);
        }
    }

    public function productSelected(Request $request) { // producto seleccionado del stock en hoja trabajo
        $productSelected = $request->input('productSelected');
        $query = 'SELECT `id`, `nombre_producto`, `cantidad`, `precio_unidad` FROM `tbl_stock` WHERE nombre_producto = ?';
        $productSelect = DB::select($query, [$productSelected]);
        return response()->json($productSelect, 200);
    }

    public function sendEstimateSecretary(Request $request) {
        $id = $request->input('id');
        try {
            DB::beginTransaction();
            DB::table('tbl_hoja_trabajo')->where('id', '=', $id)->update(['secretaria' => 1]);
            DB::commit();
            return response()->json(array('resultado'=>'OK'), 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            echo $th;
            return response()->json(array('resultado'=>'NOK '.$th->getMessage()), 200);
        }
    }

    public function inicioTiempo(Request $request) {
        $id = session()->get('id');
        $idHojaTrabajo = $request->input('id');
        $inicioTiempo = $request->input('fechaInicio');
        try {
            DB::table('tbl_horas')->insertGetId(['hora_inicio' => $inicioTiempo, 'id_hoja_trabajo' => $idHojaTrabajo, 'id_empleado' => $id]);
            // DB::update('UPDATE tbl_hoja_trabajo SET inicio_tiempo = ? WHERE id = ?',[$inicioTiempo, $id]);
            return response()->json(array('resultado'=>'OK'), 200);
        } catch (\Throwable $th) {
            return response()->json(array('resultado'=>'NOK'.$th->getMessage()), 200);
        }
    }

    public function finalTiempo(Request $request) {
        $id = session()->get('id');
        $idHojaTrabajo = $request->input('id');
        $finalTiempo = $request->input('fechaFinal');
        $resultado = $request->input('resultado');
        try {
            $maxId = DB::table('tbl_horas')->max('id');
            DB::update('UPDATE tbl_horas SET hora_fin = ? WHERE id_hoja_trabajo = ? AND id_empleado = ? AND id = ?',[$finalTiempo, $idHojaTrabajo, $id, $maxId]);
            DB::table('tbl_suma_horas')->insertGetId(['id_hoja_trabajo' => $idHojaTrabajo, 'id_empleado' => $id, 'horas_totales' => $resultado]);
            $sumaHoras = DB::select('SELECT SUM(horas_totales) AS "sumaTotal" FROM tbl_suma_horas WHERE id_empleado = ? AND id_hoja_trabajo = ?', [$id, $idHojaTrabajo]);
            return response()->json($sumaHoras[0]->sumaTotal, 200);
        } catch (\Throwable $th) {
            return response()->json(array('resultado'=>'NOK'.$th->getMessage()), 200);
        }
    }

    public function totalTiempo(Request $request) {
        $idUser = session()->get('id');
        $idHojaTrabajo = $request->input('id');
        $totalTiempo = $request->input('totalTime');
        $miliseconds = $request->input('miliseconds');
        try {
            $totalHoras = DB::select('SELECT `total_horas` FROM tbl_horas_totales WHERE id_hoja_trabajo = ? AND id_empleado = ?', [$idHojaTrabajo, $idUser]);
            $count = count($totalHoras);
            if ($count == 0) {
                DB::table('tbl_horas_totales')->insertGetId(['id_hoja_trabajo' => $idHojaTrabajo, 'id_empleado' => $idUser, 'total_horas' => $totalTiempo, 'miliseconds' => $miliseconds]);
            } else {
                DB::update('UPDATE tbl_horas_totales SET total_horas = ?, miliseconds = ? WHERE id_empleado = ? AND id_hoja_trabajo = ?',[$totalTiempo, $miliseconds, $idUser, $idHojaTrabajo]);
            }
            //DB::update('UPDATE tbl_hoja_trabajo SET tiempo_total = ? WHERE id = ?',[$totalTiempo, $idHojaTrabajo]);
            return response()->json(array('resultado'=>'OK'), 200);
        } catch (\Throwable $th) {
            return response()->json(array('resultado'=>'NOK'.$th->getMessage()), 200);
        }
    }

    // 21-05-21
    public function readTotalHours(Request $request) {
        $idHojaTrabajo = $request->input('id');
        $totalHoras = DB::select('SELECT SUM(miliseconds) AS "tiempoFinal" FROM tbl_horas_totales WHERE id_hoja_trabajo = ?', [$idHojaTrabajo]);
        return response()->json($totalHoras[0]->tiempoFinal, 200);
    }

    // 23-05-21
    public function enoughtProductInStock(Request $request) { // saber si hi ha suficient producte en stock
        $nombreProducto = $request->input('nombreProducto');
        $stock = $request->input('stock');
        if($stock == '0') {
            return response()->json(['notEnoughProduct' => 0]);
        }
        $cantidadProducto = intval($request->input('cantidadProducto'));
        $product = DB::select("SELECT `nombre_producto`, `cantidad` FROM `tbl_stock` WHERE `nombre_producto` = '{$nombreProducto}'");
        if ($cantidadProducto > $product[0]->cantidad) {
            return response()->json(['notEnoughProduct' => 1]); // no hay suficiente producto en stock
        } else {
            return response()->json(['notEnoughProduct' => 0]); // Hay suficiente producto en stock
        }
    }
    // END 23-05-21
    public function updateTotalHours(Request $request){
        $idHojaTrabajo = $request->input('id');
        $totalHours = $request->input('result');
        try {
            DB::table('tbl_hoja_trabajo')->where('id', '=', $idHojaTrabajo)->update(['tiempo_total' => $totalHours]);
            return response()->json(array('resultado'=>'OK'), 200);
        } catch (\Throwable $th) {
            return response()->json(array('resultado'=>'NOK'.$th->getMessage()), 200);
        }
    }
}


