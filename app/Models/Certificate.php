<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Certificate extends Model
{
    protected $fillable = [
        'uuid',
        'certificate_code',
        'user_id',
        'module_id',
        'pdf_path',
        'issued_at',
        
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function module()
    {
        return $this->belongsTo(Module::class, 'module_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = Str::uuid();
            }

            if (empty($model->certificate_code)) {
                $model->certificate_code = strtoupper(Str::random(12)); // contoh: GTC-ABCD-1234
            }

            if (empty($model->issued_at)) {
                $model->issued_at = now();
            }
        });
    }
}
