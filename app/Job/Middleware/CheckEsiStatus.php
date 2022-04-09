<?php

namespace App\Job\Middleware;

use App\Models\Status\EsiStatus;
use LaravelEveTools\EveApi\Contracts\Middleware\CheckEsiStatusInterface;

class CheckEsiStatus implements CheckEsiStatusInterface
{

    public function handle($job, $next)
    {
        if(is_subclass_of($job, EsiStatus::class)){
            if($this->isEsiOnline()){
                logger()->warning(
                    sprintf('ESI seems to be unreachable. Job %s has been abort.',
                        get_class($job)));

                return;
            }
        }
        $next($job);
    }

    private function isEsiOnline(){
        $status = cache()->remember('esi_db_status', 60, function () {
            return EsiStatus::latest()->first();
        });

        if(!$status) return true;

        if ($status->created_at->lte(carbon('now')->subMinutes(30)))
            return false;

        // If the status is OK, yay.
        if ($status->status == 'ok')
            return true;

        return true;
    }
}
