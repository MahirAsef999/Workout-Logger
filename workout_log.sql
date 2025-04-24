-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2025 at 05:22 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `workout_log`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact_submissions`
--

CREATE TABLE `contact_submissions` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `feedback` text NOT NULL CHECK (char_length(`feedback`) <= 100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_submissions`
--

INSERT INTO `contact_submissions` (`id`, `first_name`, `last_name`, `email`, `feedback`) VALUES
(1, 'Mahir', 'Asef', 'masef1@fordham.edu', 'Hello, this is a test for the feedback!');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password_hash`) VALUES
(1, 'Mahir999', '$2y$10$ZObJ0I1q4l9AUAk1WlpzEeHRDUBdNSDK3/d9ofPAkyMGRZIoTDEEG'),
(2, 'Mahir', '$2y$10$WytaoO5bHefoXs84iqYHBu/7utaeeZSuPZSp2IpNwN3acdelG9A/O'),
(3, 'Asef', '$2y$10$TGsq.VzzeXizfScY52JdpuDWLsXyxqgrB4Dz0zQfc6aN.Wd3LrV7S'),
(4, 'Asef1', '$2y$10$nRUffgYl.1B957i9Pg5qE.DDa1HqjWSvhqwAxc51g8rRRwH0XWrX6'),
(5, 'Mahira', '$2y$10$4kCvEkWURR/e/N/2eLcTPe4jAKzP.CNdF50jgrA/MH/EP8NFT71vK'),
(6, 'Joey', '$2y$10$Fuxb6D6sZaxd0fQzK16Io.k/q3ImVmIa8A6cnHvXoD7gw4U.Z45wi'),
(7, 'Maddie', '$2y$10$uhBg6oQYcYwJrlhgnwOdSuVx9ivxvxAUvZgB5eQxC/yihns0sVimC');

-- --------------------------------------------------------

--
-- Table structure for table `workouts`
--

CREATE TABLE `workouts` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `exercise` varchar(255) NOT NULL,
  `weight` varchar(20) DEFAULT NULL,
  `sets` varchar(10) DEFAULT NULL,
  `reps` varchar(10) DEFAULT NULL,
  `time` varchar(20) DEFAULT NULL,
  `distance` varchar(20) DEFAULT NULL,
  `calories` varchar(20) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workouts`
--

INSERT INTO `workouts` (`id`, `date`, `exercise`, `weight`, `sets`, `reps`, `time`, `distance`, `calories`, `user_id`, `created_at`) VALUES
(70, '2025-04-14', 'Bicep Curl', '60', '10', '3', '', '', '', 4, '2025-04-23 20:53:57'),
(80, '2025-04-01', 'Running', '', 'N/A', 'N/A', '25', '1.55', '255', 7, '2025-04-24 01:56:05'),
(82, '2025-03-31', 'Bicep Curl', '20', '10', '3', '', '', '', 2, '2025-04-24 02:46:44'),
(83, '2025-03-31', 'Running (Treadmill)', '', 'N/A', 'N/A', '30', '1.50', '120', 2, '2025-04-24 02:48:18'),
(84, '2025-03-31', 'Tricep Curl', '15', '10', '3', '', '', '', 2, '2025-04-24 02:49:12'),
(85, '2025-04-03', 'Bicep Curl', '20', '8', '3', '', '', '', 2, '2025-04-24 02:49:41'),
(86, '2025-04-07', 'Tricep Curl', '15', '10', '3', '', '', '', 2, '2025-04-24 02:50:02'),
(87, '2025-04-07', 'Hammer Curls', '15', '10', '3', '', '', '', 2, '2025-04-24 02:53:46'),
(88, '2025-04-14', 'Bicep Curl', '20', '12', '3', '', '', '', 2, '2025-04-24 02:54:28'),
(89, '2025-04-15', 'Bike', '', 'N/A', 'N/A', '30', '2.01', '175', 2, '2025-04-24 02:54:45'),
(90, '2025-04-17', 'Bicep Curl', '15', '10', '3', '', '', '', 2, '2025-04-24 02:55:08'),
(91, '2025-04-21', 'Bicep Curl', '12.5', '10', '3', '', '', '', 2, '2025-04-24 02:55:37'),
(92, '2025-04-17', 'Bike', '', 'N/A', 'N/A', '35.00', '1.87', '200', 2, '2025-04-24 02:56:18'),
(93, '2025-04-07', 'Bicep Curl', '20', '10', '3', '', '', '', 2, '2025-04-24 02:57:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact_submissions`
--
ALTER TABLE `contact_submissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `workouts`
--
ALTER TABLE `workouts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_submissions`
--
ALTER TABLE `contact_submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `workouts`
--
ALTER TABLE `workouts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
