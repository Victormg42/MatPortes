<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ModifyUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'dni'=>'required',
            'nombre'=>'required',
            'apellido1'=>'required',
            'apellido2'=>'required',
            'telefono'=>'required',
            'gmail'=>'required|unique:tbl_usuario,correo|max:255|email'
        ];
    }
}
