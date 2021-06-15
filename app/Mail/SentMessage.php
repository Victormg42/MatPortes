<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SentMessage extends Mailable
{
    use Queueable, SerializesModels;
    public $fullName;
    public $city;
    public $email;
    public $phone;
    public $infoSubject;
    public $suggestion;
    public $emailSubject;

    /** 
     * Create a new message instance.
     *
     * @return void
     */
    //https://parzibyte.me/blog/2020/01/17/enviar-correo-laravel-ejemplo/
    public function __construct(){
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {   return $this->view('correoInfo')->subject($this->emailSubject);
    }
}