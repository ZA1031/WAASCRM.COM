<?php

namespace App\Models\Tenant;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Storage;

class Client extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'is_client',
        'external_id',
        'company_name',
        'logo',
        'contact_name',
        'contact_lastname',
        'email',
        'phone',
        'notes',
        'origin_id',
        'status_id',
        'responsible',
        'is_client'
    ];

    protected $appends = [
        'full_name', 
        'logo_url'
    ];

    public function addresses()
    {
        return $this->belongsToMany(Address::class, 'client_addresses')->withPivot('address_id');
    }

    public function origin()
    {
        return $this->belongsTo(Catalog::class);
    }

    public function status()
    {
        return $this->belongsTo(Catalog::class);
    }

    public function getImage()
    {
        return !empty($this->logo) ? Storage::disk('clients')->url(tenant('id').'/'.$this->logo) : 'https://ui-avatars.com/api/?name='.$this->company_name.'&color=7F9CF5&background=EBF4FF';
    }

    public function getFullNameAttribute()
    {
        return $this->contact_name.' '.$this->contact_lastname;
    }

    public function getLogoUrlAttribute()
    {
        return $this->getImage();
    }

    public function comments()
    {
        return $this->hasMany(CommonNote::class, 'type_id')->where('type', 1);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function budgets()
    {
        return $this->hasMany(Budget::class);
    }
}
