<?php

namespace App\Action;

use App\Models\RefreshToken;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;

class RefreshAccessToken {

    private RefreshToken $token;

    public function __construct(RefreshToken $token) {
        $this->token = $token;
    }

    public function handle(){
        $params = [
            'grant_type' => 'refresh_token',
            'refresh_token' => $this->token->refresh_token
        ];
        $headers = [
            'Authorization' => 'Basic '.base64_encode(config('services.eveonline.client_id').':'.config('services.eveonline.client_secret')),
            'Host' => 'login.eveonline.com',
        ];


        $response = Http::withHeaders($headers)
            ->asForm()
            ->post('https://login.eveonline.com/v2/oauth/token', $params);

        $newToken = $response->object();

        $this->token->token = $newToken->access_token;
        $this->token->refresh_token = $newToken->refresh_token;
        $this->token->expires_on = Carbon::now()->addSeconds($newToken->expires_in);
        $this->token->save();

        return $this->token;
    }

}
