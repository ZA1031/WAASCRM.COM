<?php

namespace App\Models\Central;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory;
    use SoftDeletes;
    
    protected $fillable = [
        'model',
        'name',
        'description',
        'active',
        'code',
        'family_id',
        'category_id',
        'parts',
        'other_parts',
        'dismantling',
    ];

    public function family()
    {
        return $this->belongsTo(AdminCatalog::class, 'family_id');
    }

    public function category()
    {
        return $this->belongsTo(AdminCatalog::class, 'category_id');
    }

    public function files()
    {
        return $this->hasMany(ProductFile::class);
    }

    public function attributes()
    {
        return $this->hasMany(ProductAttr::class);
    }

    public function images()
    {
        return $this->hasMany(ProductFile::class)->where('type', 1)->orderBy('order');
    }

    public function videos()
    {
        return $this->hasMany(ProductFile::class)->where('type', 2)->orderBy('order');
    }

    public function documents()
    {
        return $this->hasMany(ProductFile::class)->where('type', 3)->orderBy('order');
    }

    public function getMainImageAttribute()
    {
        return $this->images->first();
    }

    public function getFilesData($t)
    {
        $files = $t == 1 ? $this->images : ($t == 2 ? $this->videos : $this->documents);
        $data = [];
        foreach ($files as $file) {
            $data[] = [
                'id' => $file->id,
                'title' => $file->title,
                'file' => $file->file,
                'size' => $file->size,
                'order' => $file->order,
                'img' => $file->url,
                'type' => $t == 1 ? 'image' : ($t == 2 ? 'video' : 'file'),
                'image_type' => $file->image_type ?? '0'
            ];
        }
        return $data;
    }
}
