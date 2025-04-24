<?php

namespace app\core;

use app\controllers\MainController;
use app\controllers\UserController;
use app\controllers\WorkoutController;
use app\controllers\AuthController;
use app\controllers\ContactController;
use app\controllers\AboutController;

class Router {
    public $uriArray;

    public function __construct() {
        $this->uriArray = $this->routeSplit();
        $this->handleMainRoutes();
        $this->handleUserRoutes();
        $this->handleWorkoutRoutes();
        $this->handleAuthRoutes();
        $this->handleContactRoutes();
        $this->handleAboutRoutes(); 
    }

    protected function routeSplit() {
        $removeQueryParams = strtok($_SERVER["REQUEST_URI"], '?');
        return explode("/", $removeQueryParams);
    }

    protected function handleMainRoutes() {
        if ($this->uriArray[1] === '' && $_SERVER['REQUEST_METHOD'] === 'GET') {
            $mainController = new MainController();
            $mainController->homepage();
        }
    }

    protected function handleUserRoutes() {
        if ($this->uriArray[1] === 'users' && $_SERVER['REQUEST_METHOD'] === 'GET') {
            $userController = new UserController();
            $userController->usersView();
        }

        if ($this->uriArray[1] === 'api' && $this->uriArray[2] === 'users' && $_SERVER['REQUEST_METHOD'] === 'GET') {
            $userController = new UserController();
            $userController->getUsers();
        }
    }

    protected function handleWorkoutRoutes() {
        $workoutController = new WorkoutController();

        if ($this->uriArray[1] === 'logs' && $_SERVER['REQUEST_METHOD'] === 'GET') {
            $workoutController->getLogs();
        }

        if ($this->uriArray[1] === 'logs' && isset($this->uriArray[2]) && $this->uriArray[2] === 'update' && $_SERVER['REQUEST_METHOD'] === 'POST') {
            $workoutController->updateLog();
        }
        
        if ($this->uriArray[1] === 'logs' && isset($this->uriArray[2]) && $this->uriArray[2] === 'delete' && $_SERVER['REQUEST_METHOD'] === 'POST') {
            $workoutController->deleteLog();
        }
        
        if ($this->uriArray[1] === 'logs' && $_SERVER['REQUEST_METHOD'] === 'POST') {
            $workoutController->postLog();
        }

        if ($this->uriArray[1] === 'workouts' && $_SERVER['REQUEST_METHOD'] === 'GET') {
            $workoutController->workoutView();
        }

        if ($this->uriArray[1] === 'form' && $_SERVER['REQUEST_METHOD'] === 'GET') {
            $workoutController->workoutForm();
        }

        if ($this->uriArray[1] === 'advice' && $_SERVER['REQUEST_METHOD'] === 'GET') {
            $workoutController->getAdvice();
        }
    }

    protected function handleAuthRoutes() {
        $auth = new AuthController();

        if ($this->uriArray[1] === 'login' && $_SERVER['REQUEST_METHOD'] === 'GET') {
            $auth->showLogin();
        }

        if ($this->uriArray[1] === 'register' && $_SERVER['REQUEST_METHOD'] === 'GET') {
            $auth->showRegister();
        }

        if ($this->uriArray[1] === 'login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
            $auth->login();
        }

        if ($this->uriArray[1] === 'register' && $_SERVER['REQUEST_METHOD'] === 'POST') {
            $auth->register();
        }

        if ($this->uriArray[1] === 'logout' && $_SERVER['REQUEST_METHOD'] === 'GET') {
            $auth->logout();
        }

        if ($this->uriArray[1] === 'userinfo' && $_SERVER['REQUEST_METHOD'] === 'GET') {
            session_start();
            header('Content-Type: application/json');
            echo json_encode([
                'username' => $_SESSION['username'] ?? null
            ]);
            exit;
        }
    }

    protected function handleContactRoutes() {
        $contact = new ContactController();

        if ($this->uriArray[1] === 'contact' && $_SERVER['REQUEST_METHOD'] === 'GET') {
            $contact->showContactForm();
        }

        if ($this->uriArray[1] === 'contact' && $_SERVER['REQUEST_METHOD'] === 'POST') {
            $contact->submitContactForm();
        }
    }

    protected function handleAboutRoutes() {
        $about = new AboutController();

        if ($this->uriArray[1] === 'about' && $_SERVER['REQUEST_METHOD'] === 'GET') {
            $about->showAboutPage();
        }
    }
}
