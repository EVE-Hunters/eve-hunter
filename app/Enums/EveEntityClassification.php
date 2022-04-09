<?php

namespace App\Enums;

enum EveEntityClassification: string
{
    case ALLIANCE = 'alliance';
    case CHARACTER = 'character';
    case CORPORATION = 'corporation';
    case STATION = 'station';

}
