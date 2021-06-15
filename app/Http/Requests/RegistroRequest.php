<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegistroRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'rdni'=>'required',
            'rnombre'=>'required',
            'papellido'=>'required',
            'sapellido'=>'required',
            'rtelefono'=>'required',
            'remail'=>'required|unique:tbl_usuario,correo|max:255|email',
            'rpassword1'=>'required',
            'rpassword2'=>'required|same:rpassword1'
        ];
    }
}
