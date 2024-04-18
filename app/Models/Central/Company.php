<?php

namespace App\Models\Central;

use App\Models\Main\Tenant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Storage;

class Company extends Model
{
    use HasFactory;
    use SoftDeletes;

    public $timestamps = false;

    const MAX_STATUS = 1;
    
    protected $fillable = [
        'domain',
        'name',
        'business_name',
        'cif',
        'logo',
        'users',
        'email',
        'address',
        'fiscal_address',
        'price',
        'status',
        'products',
        'tenant_id',
        'payment_method',
        'bank_account',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function getLogoUrlAttribute()
    {
        return !empty($this->logo) ? Storage::disk('companies')->url($this->logo) : 'https://ui-avatars.com/api/?name='.$this->name.'&color=7F9CF5&background=EBF4FF';
    }

    public function getProducts()
    {
        $data = [];
        foreach(explode(',', $this->products) as $e1){
            if (!empty($e1)){
                $x = Product::find($e1);
                if ($x) $data[] = $x;
            }
        }
        return $data;
    }

    public static function decodeStatus($x)
    {
        switch($x){
            case 0: return 'Inactivo';
            case 1: return 'Activo';
            default: return 'Desconocido';
        }
    }
}
