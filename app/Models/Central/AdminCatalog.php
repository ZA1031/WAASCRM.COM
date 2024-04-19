<?php

namespace App\Models\Central;

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
