<?php

namespace app\controllers;

use app\models\Workout;
use Orhanerday\OpenAi\OpenAi;


class WorkoutController extends Controller
{
    // Show the homepage form if the user is logged in
    public function workoutForm()
    {
        session_start();
        if (!isset($_SESSION['user_id'])) {
            header("Location: /login");
            exit;
        }
        $this->returnView('./assets/views/main/homepage.html'); // Homepage 
    }

    // Show the workout log page if the user is logged in
    public function workoutView()
    {
        session_start();
        if (!isset($_SESSION['user_id'])) {
            header("Location: /login");
            exit;
        }
        $this->returnView('./assets/views/users/workoutView.html'); // Workout Log page
    }

    // Get logs for this user (all or by specific exercise)
    public function getLogs()
    {
        session_start();
        if (!isset($_SESSION['user_id'])) {
            http_response_code(403);
            $this->returnJSON(['error' => 'Unauthorized']);
            return;
        }

        $model = new Workout();

        // If exercise is searched, get logs for that exercise
        if (isset($_GET['exercise']) && trim($_GET['exercise']) !== '') {
            $exercise = trim($_GET['exercise']);
            $logs = $model->getLogsByExercise($_SESSION['user_id'], $exercise);
        } else {
            // If it is not searched, get all logs for this user
            $logs = $model->getLogsByUser($_SESSION['user_id']);
        }

        $this->returnJSON($logs);
    }

    // Save a new workout
    public function postLog()
    {
        session_start();
        if (!isset($_SESSION['user_id'])) {
            http_response_code(403);
            $this->returnJSON(['error' => 'Unauthorized']);
            return;
        }

        $data = [
            'date'     => $_POST['date'] ?? '',
            'exercise' => $_POST['exercise'] ?? '',
            'weight'   => $_POST['weight'] ?? '',
            'sets'     => $_POST['sets'] ?? 'N/A',
            'reps'     => $_POST['reps'] ?? 'N/A',
            'time'     => $_POST['time'] ?? '',
            'distance' => $_POST['distance'] ?? '',
            'calories' => $_POST['calories'] ?? '',
            'user_id'  => $_SESSION['user_id']
        ];

        if (empty($data['date']) || empty($data['exercise'])) {
            http_response_code(400);
            $this->returnJSON(['error' => 'Invalid input']);
            return;
        }

        $model = new Workout();
        $model->saveLog($data);
        $this->returnJSON(['success' => true]);
    }

    // Update an existing workout log
    public function updateLog()
    {
        session_start();
        if (!isset($_SESSION['user_id'])) {
            http_response_code(403);
            $this->returnJSON(['error' => 'Unauthorized']);
            return;
        }
        // Get updated data from this
        $data = [
            'id'       => $_POST['id'] ?? '',
            'date'     => $_POST['date'] ?? '',
            'exercise' => $_POST['exercise'] ?? '',
            'weight'   => $_POST['weight'] ?? '',
            'sets'     => $_POST['sets'] ?? 'N/A',
            'reps'     => $_POST['reps'] ?? 'N/A',
            'time'     => $_POST['time'] ?? '',
            'distance' => $_POST['distance'] ?? '',
            'calories' => $_POST['calories'] ?? '',
            'user_id'  => $_SESSION['user_id']
        ];

        // Make sure the log ID is valid
        if (!$data['id'] || !is_numeric($data['id'])) {
            http_response_code(400);
            $this->returnJSON(['error' => 'Invalid input']);
            return;
        }

        $model = new Workout();
        $model->updateLog($data);
        $this->returnJSON(['success' => true]);
    }

    // Delete a workout log
    public function deleteLog()
    {
        session_start();
        if (!isset($_SESSION['user_id'])) {
            http_response_code(403);
            $this->returnJSON(['error' => 'Unauthorized']);
            return;
        }

        $id = $_POST['id'] ?? null;
        if (!$id || !is_numeric($id)) {
            http_response_code(400);
            $this->returnJSON(['error' => 'Invalid input']);
            return;
        }

        $model = new Workout();
        $model->deleteLog($id, $_SESSION['user_id']);
        $this->returnJSON(['success' => true]);
    }

    // Ask AI for workout suggestions
    public function getAdvice()
    {
        session_start();
        if (empty($_GET['question'])) {
            $this->returnJSON(['error' => 'No question provided']);
            return;
        }
    
        $question = trim($_GET['question']);
        $open_ai  = new OpenAi($_ENV['OPENAI_API_KEY']);
    
        $response = $open_ai->chat([
            'model'    => 'gpt-3.5-turbo',
            'messages' => [
                ['role'=>'system','content'=>'You are a helpful fitness coach.'],
                ['role'=>'user',  'content'=>"Give me workout advice for: {$question}. Canyou write in a paragraph?"]
            ]
        ]);
    
        $data   = json_decode($response, true);
        $advice = $data['choices'][0]['message']['content'] 
                  ?? 'No advice generated.';
        $this->returnJSON(['advice' => trim($advice)]);
    }

}
