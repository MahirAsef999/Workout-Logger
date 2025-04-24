<?php

namespace app\controllers;

class AboutController extends Controller
{
    public function showAboutPage()
    {
        $this->returnView('./assets/views/main/about.html');
    }
}