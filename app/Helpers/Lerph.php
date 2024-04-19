<?php
  

namespace App\Helpers;
use Carbon\Carbon;

class Lerph {
    public static function test()
    {
        return rand(1,1000);
    }

    public static function returnValidation($validator){
        if ($validator->fails()) {
            $msg = [];
            foreach ($validator->getMessageBag()->all() as $message) $msg[] = $message;
            return response()->json(["success" => false, "error" => $msg]);
        }

        return true;
    }

    public static function showDate($d){
        return !empty($d) && $d != '0000-00-00' ? Carbon::parse($d)->format('d/m/Y') : '';
    }

    public static function showDateTime($d){
        return !empty($d) && $d != '0000-00-00 00:00:00' ? Carbon::parse($d)->format('d/m/Y H:i') : '';
    }

    public static function showPrice($p){
        return number_format($p).'Є';
    }

    public static function diffDays($from, $to){
        if (empty($to) || empty($from)) return 9999;
        $to = Carbon::createFromFormat('Y-m-d H:i:s', $to);
        $from = Carbon::createFromFormat('Y-m-d H:i:s', $from);
        return $to->diffInDays($from);
    }

    public static function getMonthName($m){
        $months = ['January' => "Enero", 'February' =>"Febrero" ,'March' => "Marzo", 'April' => "Abril", 'May' => "Mayo", 'June' => "Junio", 'July' => "julio",
			'August' => "Agosto", 'September' => "Septiembre", 'October' => "Octubre", 'November' => "Noviembre", 'December' => "Diciembre"];
	    return isset($months[$m]) ? $months[$m] : '';
    }

    public static function validateCaptcha($userResponse){
        $fields_string = '';
        $fields = ['secret' => '6LcH9mwnAAAAAMrYdMwkcFb1W6w24MWWpA-WLSpA','response' => $userResponse,'remoteip' => $_SERVER['REMOTE_ADDR']];
        foreach($fields as $key=>$value) $fields_string .= $key . '=' . $value . '&';
        $fields_string = rtrim($fields_string, '&');
            
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($ch, CURLOPT_POST, count($fields));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, True);
        
        $result = curl_exec($ch);
        //dd($result);
        curl_close($ch);
        
        return json_decode($result, true);
    }

    public static function requireFolder($folder){
        foreach (scandir($folder) as $filename) {
            $path = $folder . '/' . $filename;
            if (is_file($path)) require $path;
        }
    }

    public static function getTenantRolName($x){
        switch($x){
            case 1:
            case 0:
                return 'Administrador';
            case 2:
                return 'Director Comercial';
            case 3:
                return 'Director Tecnicos';
            case 4:
                return 'Comerciales';
            case 5:
                return 'Técnicos';
            case 6:
                return 'Telemarketing';
        }
    }

    public static function getDues(){
        return [12, 24, 36, 48, 60];
    }
}