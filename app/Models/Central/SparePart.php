<?php

namespace App\Models\Central;

use App\Models\Main\Tenant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SparePart extends Model
{
    use HasFactory;
    use SoftDeletes;

    public $timestamps = false;
    
    protected $fillable = [
        'name',
        'description',
        'stock',
        'reference',
        'compatibility_id',
        'name_en'
    ];

    protected static function boot()
    {
        parent::boot();

        static::deleted(function ($sparePart) {
            if (!empty(tenant('id'))) return;
            $tenants = Tenant::all();
            foreach ($tenants as $tenant){
                tenancy()->initialize($tenant);
                SparePart::where('id', $sparePart->id)->delete();
            }
        });

        static::created(function ($sparePart) {
            if (!empty(tenant('id'))) return;
            $tenants = Tenant::all();
            foreach ($tenants as $tenant){
                tenancy()->initialize($tenant);
                SparePart::create($sparePart->toArray());
            }
        });

        static::updated(function ($sparePart) {
            if (!empty(tenant('id'))) return;
            $tenants = Tenant::all();
            foreach ($tenants as $tenant){
                tenancy()->initialize($tenant);
                SparePart::where('id', $sparePart->id)->update($sparePart->toArray());
            }
        });
    }



    public function compatibility()
    {
        return $this->belongsTo(Product::class, 'compatibility_id');
    }

    public function others()
    {
        return $this->hasMany(SparePartOther::class);
    }
}
