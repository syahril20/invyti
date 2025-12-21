<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return view('dashboard');
    }

    public function tables()
    {
        return view('tables');
    }

    public function charts()
    {
        return view('charts');
    }

    public function uiElements()
    {
        return view('ui-elements');
    }

    public function calendar()
    {
        return view('calendar');
    }
}
