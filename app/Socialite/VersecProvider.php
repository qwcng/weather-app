<?php
namespace App\Socialite;

use Laravel\Socialite\Two\AbstractProvider;
use Laravel\Socialite\Two\ProviderInterface;
use Laravel\Socialite\Two\User;

class VersecProvider extends AbstractProvider implements ProviderInterface
{
    // Adres Twojej GŁÓWNEJ aplikacji
    protected function getAuthUrl($state) {
        return $this->buildAuthUrlFromBase(env('VERSEC_SERVER_URL').'/oauth/authorize', $state);
    }

    protected function getTokenUrl() {
        return env('VERSEC_SERVER_URL').'/oauth/token';
    }

    protected function getUserByToken($token) {
        $response = $this->getHttpClient()->get(env('VERSEC_SERVER_URL').'/api/user', [
            'headers' => ['Authorization' => 'Bearer ' . $token],
        ]);
        return json_decode($response->getBody(), true);
    }

    protected function mapUserToObject(array $user) {
        return (new User)->setRaw($user)->map([
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
        ]);
    }
}