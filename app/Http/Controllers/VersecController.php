<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class VersecController extends Controller
{
    public function redirect() {
        return Socialite::driver('versec')->redirect();
    }

    public function callback(Request $request) {
        $versecUser = Socialite::driver('versec')->stateless()->user();

        $user = User::updateOrCreate([
            'email' => $versecUser->email,
        ], [
            'name' => $versecUser->name,
            'password' => bcrypt(\Illuminate\Support\Str::random(16)),
            'versec_token' => $versecUser->token,
        ]);

        Auth::login($user, true);
        $request->session()->regenerate();

        return redirect('/');
    }
}