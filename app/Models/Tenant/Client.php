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
        'is_client',
        'activity_id',
        'business_name',
        'assigned_to'
    ];

    protected $appends = [
        'full_name', 
        'logo_url'
    ];

    public function addresses()
    {
        return $this->belongsToMany(Address::class, 'client_addresses')->withPivot('address_id');
    }

    public function mainAddress()
    {
        return $this->addresses()->orderBy('principal', 'desc')->first();
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

    public function assigned()
    {
        return $this->belongsTo(TenantUser::class, 'assigned_to');
    }

    public function activity()
    {
        return $this->belongsTo(Catalog::class);
    }

    public function budgetsLigths()
    {
        $p = $this->budgets->where('status', 0)->count();
        $a = $this->budgets->where('status', 1)->count();
        $r = $this->budgets->where('status', 2)->count();
        return [
            'pendings' => $p,
            'approved' => $a,
            'rejected' => $r,
            'total' => $p + $a + $r
        ];
    }

    public function tasksLights()
    {
        $p = $this->tasks->where('status', 0)->count();
        $a = $this->tasks->where('status', 1)->count();
        $r = $this->tasks->where('status', 2)->count();
        return [
            'pendings' => $p,
            'approved' => $a,
            'rejected' => $r,
            'total' => $p + $a + $r
        ];
    }
}
