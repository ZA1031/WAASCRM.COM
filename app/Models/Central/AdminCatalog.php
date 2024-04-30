<?php

namespace App\Models\Central;

use App\Models\Main\Tenant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AdminCatalog extends Model
{
    use HasFactory;
    use SoftDeletes;

    public $timestamps = false;
    
    protected $fillable = [
        'type',
        'name',
        'description',
        'extra_1',
        'name_en'
    ];

    protected static function boot()
    {
        parent::boot();
        
        static::deleted(function ($adminCatalog) {
            if (!empty(tenant('id'))) return;
            $tenants = Tenant::all();
            foreach ($tenants as $tenant){
                tenancy()->initialize($tenant);
                AdminCatalog::where('id', $adminCatalog->id)->delete();
            }
        });

        static::created(function ($adminCatalog) {
            if (!empty(tenant('id'))) return;
            $tenants = Tenant::all();
            foreach ($tenants as $tenant){
                tenancy()->initialize($tenant);
                AdminCatalog::create($adminCatalog->toArray());
            }
        });

        static::updated(function ($adminCatalog) {
            if (!empty(tenant('id'))) return;
            $tenants = Tenant::all();
            foreach ($tenants as $tenant){
                tenancy()->initialize($tenant);
                AdminCatalog::where('id', $adminCatalog->id)->update($adminCatalog->toArray());
            }
        });
    }

    public function getExtraData()
    {
        $data = [];
        foreach(explode(',', $this->extra_1) as $e1){
            if (!empty($e1)){
                $x = AdminCatalog::find($e1);
                if ($x) $data[] = $x;
            }
        }
        return $data;
    }
}
