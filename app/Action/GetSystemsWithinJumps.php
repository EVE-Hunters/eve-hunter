<?php


namespace App\Action;


use App\Models\Sde\SolarSystem;

class GetSystemsWithinJumps
{
    protected SolarSystem $system;
    protected int $jumps;

    const system_with = ['constellation', 'region', 'connections'];


    public function __construct(SolarSystem $system, int $jumps)
    {
        $this->system = $system;
        $this->jumps = $jumps;
    }


    public function handle()
    {
        $this->system->load(self::system_with);
        $this->system->calcDistanceFrom($this->system)->calculateStats();
        $systems = collect([$this->system]);
        $temp = collect();
        $currentBranch = $systems;

        //dd($this->system->connectedSystems);
        for ($i = 0; $i < $this->jumps - 1; $i++) {
            $currentBranch->each(function (SolarSystem $system) use ($systems, $temp) {
                $connections = $system->connectedSystems()
                    ->WhereNotIn('system_id', $systems->pluck('system_id'))
                    ->whereNotIn('system_id', $temp->pluck('system_id'))
                    ->with(self::system_with)
                    ->get();
                $connections->each(fn($currentSys) => $temp->add($currentSys));
            });

            $temp->each(function (SolarSystem $system) use ($systems, $i) {
                $system->jumps = $i + 1;
                $system->calcDistanceFrom($this->system)
                    ->calculateStats();
                $systems->add($system);
            });
            $currentBranch = $temp;
            $temp = collect();
        }

        return $systems->sortBy('jumps');
    }

}
