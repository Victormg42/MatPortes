<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CatalogController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index']);
Route::get('prueba', [HomeController::class, 'prueba']);
Route::get('cookies', [HomeController::class, 'cookies']);
Route::get('avisolegal', [HomeController::class, 'avisolegal']);
Route::get('registrarUser', [HomeController::class, 'registrarUser']);
Route::get('privacidad', [HomeController::class, 'privacidad']);
Route::get('verHojasTrabajo', [HomeController::class, 'verHojasTrabajo']);
Route::get('blog', [HomeController::class, 'blog']);
Route::get('adminBlog', [HomeController::class, 'adminBlog']);
Route::get('adminStock', [HomeController::class, 'adminStock']);
Route::get('presupuestos', [HomeController::class, 'presupuestos']);
Route::post('getNextLevelHierarchy', [HomeController::class, 'getNextLevelHierarchy']);
Route::get('navigateToProducts/{id}', [HomeController::class, 'navigateToProducts']);
Route::post('getProducts', [HomeController::class, 'getProducts']);
Route::post('cambiarPassword', [HomeController::class, 'cambiarPassword']);
Route::post('cambiarUser', [HomeController::class, 'cambiarUser']);
Route::post('readUser', [HomeController::class, 'readUser']);
Route::post('registerUser', [HomeController::class, 'registerUser']);
Route::post('updateUser', [HomeController::class, 'updateUser']);
Route::post('getUsuarios', [HomeController::class, 'getUsuarios']);
Route::post('passwordUser', [HomeController::class, 'passwordUser']);
Route::get('adminCatalog', [HomeController::class, 'adminCatalog']);
Route::get('adminUser', [HomeController::class, 'adminUser']);
Route::get('adminPromo', [HomeController::class, 'adminPromo']);
Route::get('logout', [HomeController::class, 'logout']);
Route::get('admin', [HomeController::class, 'admin']);
Route::post('recibirLogin', [HomeController::class, 'recibirLogin']);
Route::post('thisLevelHierarchy', [HomeController::class, 'thisLevelHierarchy']);
Route::post('modifyThisLevel', [HomeController::class, 'modifyThisLevel']);
Route::post('dropHierarchy', [HomeController::class, 'dropHierarchy']);
Route::post('sendEmail', [HomeController::class, 'sendEmail']);
Route::get('reload', [HomeController::class, 'reload']);
Route::post('modifyThisProduct', [HomeController::class, 'modifyThisProduct']);
Route::post('dropProducts', [HomeController::class, 'dropProducts']);
Route::post('addProduct', [HomeController::class, 'addProduct']);
Route::post('addHierarchyPdf', [HomeController::class, 'addHierarchyPdf']);
Route::post('getHierarchyPdfs', [HomeController::class, 'getHierarchyPdfs']);
Route::post('dropPdf', [HomeController::class, 'dropPdf']);
Route::get('getDataPromo', [HomeController::class, 'getDataPromo']);
Route::post('modifyPromoPdf', [HomeController::class, 'modifyPromoPdf']);
Route::post('dropImgPromo', [HomeController::class, 'dropImgPromo']);
Route::post('addPromoImg', [HomeController::class, 'addPromoImg']);
Route::post('getDataCatalog', [HomeController::class, 'getDataCatalog']);
Route::post('getTitleHierarchy', [HomeController::class, 'getTitleHierarchy']);
Route::get('adminCatalog', [HomeController::class, 'adminCatalog']);
Route::get('getRol', [HomeController::class, 'getRol']);
Route::post('getRolUser', [HomeController::class, 'getRolUser']);
Route::get('blog', [HomeController::class, 'getDataBlog']);
Route::get('sendedSecretaria', [HomeController::class, 'sendedSecretaria']);
Route::get('renderBlog', [HomeController::class, 'renderBlog']);
Route::post('addNewEntryBlog', [HomeController::class, 'addNewEntryBlog']);
Route::post('dropEntryBlog', [HomeController::class, 'dropEntryBlog']);
Route::post('addNewEstimate', [HomeController::class, 'addNewEstimate']);
Route::post('addNewHojaTrabajo', [HomeController::class, 'addNewHojaTrabajo']);
Route::get('savedEstimate', [HomeController::class, 'savedEstimate']);
Route::get('savedHojaTrabajo', [HomeController::class, 'savedHojaTrabajo']);
Route::post('getDataCurrentEstimate', [HomeController::class, 'getDataCurrentEstimate']);
Route::post('getDataCurrentHojaTrabajo', [HomeController::class, 'getDataCurrentHojaTrabajo']);
Route::post('dropImgPresupuesto', [HomeController::class, 'dropImgPresupuesto']);
Route::post('dropProductEstimate', [HomeController::class, 'dropProductEstimate']);
Route::post('dropProductHojaTrabajo', [HomeController::class, 'dropProductHojaTrabajo']);
Route::post('dataStock', [HomeController::class, 'dataStock']);
Route::post('compartirHoja', [HomeController::class, 'compartirHoja']);
Route::post('productsStock', [HomeController::class, 'productsStock']);
Route::post('dropProductToStock', [HomeController::class, 'dropProductToStock']);
Route::post('getDataThisProductStock', [HomeController::class, 'getDataThisProductStock']);
Route::post('listaUsuarios', [HomeController::class, 'listaUsuarios']);
Route::post('updateProductStock', [HomeController::class, 'updateProductStock']);
Route::post('addProductToStock', [HomeController::class, 'addProductToStock']);
Route::post('dropThisEstimate', [HomeController::class, 'dropThisEstimate']);
Route::post('dropThisHojaTrabajo', [HomeController::class, 'dropThisHojaTrabajo']);
Route::post('calculateEstimate', [HomeController::class, 'calculateEstimate']);
Route::post('enviarHojaTrabajo', [HomeController::class, 'enviarHojaTrabajo']);
Route::post('updateRevisar', [HomeController::class, 'updateRevisar']);
Route::post('updateTotalHours', [HomeController::class, 'updateTotalHours']);
Route::post('sendEstimateSecretary', [HomeController::class, 'sendEstimateSecretary']);
Route::post('inicioTiempo', [HomeController::class, 'inicioTiempo']);
Route::post('finalTiempo', [HomeController::class, 'finalTiempo']);
Route::post('totalTiempo', [HomeController::class, 'totalTiempo']);
Route::post('readTotalHours', [HomeController::class, 'readTotalHours']);
Route::get('pdfPresupuesto', [HomeController::class, 'pdfPresupuesto']);
Route::get('pdfHojaTrabajo', [HomeController::class, 'pdfHojaTrabajo']);
Route::get('presupuestoPdf/{id}', [HomeController::class, 'presupuestoPdf']);
Route::get('HojaTrabajoPdf/{id}', [HomeController::class, 'HojaTrabajoPdf']);
Route::get('imprimirPdfPresupuesto/{id}', [HomeController::class, 'imprimirPdfPresupuesto']);
Route::get('imprimirPdfHojaTrabajo/{id}', [HomeController::class, 'imprimirPdfHojaTrabajo']);
Route::get('sendEmailEstimate/{id}', [HomeController::class, 'sendEmailEstimate']);
Route::get('sendEmailHojaTrabajo/{id}', [HomeController::class, 'sendEmailHojaTrabajo']);
Route::get('sendedEstimate', [HomeController::class, 'sendedEstimate']);
Route::get('sendedHojaTrabajo', [HomeController::class, 'sendedHojaTrabajo']);
Route::get('checkHTrabajo', [HomeController::class, 'checkHTrabajo']);
Route::post('addImageCanvas', [HomeController::class, 'addImageCanvas']);
Route::post('productSelected', [HomeController::class, 'productSelected']);
// 23-05-21
Route::post('enoughtProductInStock', [HomeController::class, 'enoughtProductInStock']);
// END 23-05-21



