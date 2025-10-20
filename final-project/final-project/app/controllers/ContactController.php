<?php

namespace app\controllers;

use app\models\Contact;

// Handle contact details (name, email, feedback) from the contact form
class ContactController extends Controller
{
    public function showContactForm()
    {
        $this->returnView('./assets/views/main/contact.html');
    }

    public function submitContactForm()
    {
        $first = $_POST['first_name'] ?? null;
        $last = $_POST['last_name'] ?? null;
        $email = $_POST['email'] ?? null;
        $feedback = $_POST['feedback'] ?? '';

        if (strlen($feedback) > 100) {
            $this->returnJSON(['error' => 'Feedback too long.']);
            return;
        }

        if ($first && preg_match('/\d/', $first)) {
            $this->returnJSON(['error' => 'First name cannot contain numbers.']);
            return;
        }

        if ($last && preg_match('/\d/', $last)) {
            $this->returnJSON(['error' => 'Last name cannot contain numbers.']);
            return;
        }

        if ($email && !str_contains($email, '@')) {
            $this->returnJSON(['error' => "Email must contain '@'."]);
            return;
        }

        $model = new Contact();
        $model->save([
            'first_name' => $first,
            'last_name' => $last,
            'email' => $email,
            'feedback' => $feedback
        ]);

        $this->returnJSON(['success' => true]);
    }
}
