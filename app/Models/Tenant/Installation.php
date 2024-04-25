<?php

namespace App\Models\Tenant;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Installation extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'budget_detail_id',
        'client_id',
        'address_id',
        'product_id',
        'assigned_to',
        'installation_date',
        'hours',
        'notes',
        'installation_notes',
        'client_name',
        'client_dni',
        'client_sign',
        'serial_number',
        'finished',
        'finished_reason',
        'next_maintenance',
        'is_maintenance',
        'status',           /// 0: Pendiente, 1: Realizado; 2: Canceled
    ];

    public function budgetDetail()
    {
        return $this->belongsTo(BudgetDetail::class);
    }

    public function assigned()
    {
        return $this->belongsTo(TenantUser::class, 'assigned_to');
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function product()
    {
        return $this->belongsTo(TenantProduct::class);
    }

    public function getStatus()
    {
        return ['Pendiente', 'Realizado', 'Cancelado'][$this->status];
    }

    public function files()
    {
        return $this->hasMany(InstallationFile::class, 'installation_id');
    } 

    public function files0()
    {
        return $this->hasMany(InstallationFile::class, 'installation_id')->where('type', 0);
    }

    public function files1()
    {
        return $this->hasMany(InstallationFile::class, 'installation_id')->where('type', 1);
    }

    public function files2()
    {
        return $this->hasMany(InstallationFile::class, 'installation_id')->where('type', 2);
    }

    public function files3()
    {
        return $this->hasMany(InstallationFile::class, 'installation_id')->where('type', 3);
    }

    public function materials()
    {
        return $this->hasMany(InstallationMaterial::class);
    }

    public function parts()
    {
        return $this->hasMany(InstallationPart::class);
    }

    public function notes()
    {
        return $this->hasMany(InstallationNote::class);
    }

    public function client(){
        return $this->belongsTo(Client::class);
    }
}
