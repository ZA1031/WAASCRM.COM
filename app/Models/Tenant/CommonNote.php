<?php

namespace App\Models\Tenant;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommonNote extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'type',
        'type_id',          ///1: Clients; 2: Tasks
        'created_by',
        'notes',
        'extra_int',
        'extra_string',
    ];
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->created_by = auth()->user()->id;
        });
    }

    public function user()
    {
        return $this->belongsTo(TenantUser::class, 'created_by');
    }
}
