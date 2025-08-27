-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 27, 2025 at 08:17 PM
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
-- Database: `gym_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `schedule_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `booked_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `schedule_id`, `member_id`, `booked_at`) VALUES
(11, 20, 5, '2025-08-26 02:00:00'),
(12, 21, 6, '2025-08-26 03:00:00'),
(13, 22, 7, '2025-08-26 04:00:00'),
(14, 23, 8, '2025-08-26 05:00:00'),
(15, 24, 9, '2025-08-26 06:00:00'),
(16, 25, 10, '2025-08-26 07:00:00'),
(17, 26, 11, '2025-08-26 08:00:00'),
(18, 27, 12, '2025-08-26 09:00:00'),
(19, 28, 13, '2025-08-26 10:00:00'),
(20, 29, 14, '2025-08-26 11:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `plan_id` int(11) DEFAULT NULL,
  `join_date` date DEFAULT curdate(),
  `status` enum('active','inactive') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `user_id`, `age`, `gender`, `plan_id`, `join_date`, `status`) VALUES
(2, 2, 23, 'male', NULL, '2025-08-27', 'active'),
(3, 5, 23, 'female', NULL, '2025-08-27', 'active'),
(4, 6, 19, 'male', NULL, '2025-08-27', 'active'),
(5, 6, 28, 'female', 2, '2025-01-15', 'active'),
(6, 7, 32, 'male', 2, '2025-02-20', 'active'),
(7, 8, 25, 'female', 2, '2025-03-10', 'active'),
(8, 9, 35, 'male', 2, '2025-04-05', 'active'),
(9, 10, 29, 'female', 2, '2025-05-12', 'active'),
(10, 6, 42, 'male', 2, '2025-06-18', 'active'),
(11, 7, 31, 'female', 2, '2025-07-22', 'active'),
(12, 8, 27, 'male', 2, '2025-08-03', 'active'),
(13, 9, 33, 'female', 2, '2025-08-15', 'active'),
(14, 10, 26, 'male', 2, '2025-08-25', 'active'),
(15, 6, 28, 'female', 2, '2025-01-15', 'active'),
(16, 7, 32, 'male', 2, '2025-02-20', 'active'),
(17, 8, 25, 'female', 2, '2025-03-10', 'active'),
(18, 9, 35, 'male', 2, '2025-04-05', 'active'),
(19, 10, 29, 'female', 2, '2025-05-12', 'active'),
(20, 6, 42, 'male', 2, '2025-06-18', 'active'),
(21, 7, 31, 'female', 2, '2025-07-22', 'active'),
(22, 8, 27, 'male', 2, '2025-08-03', 'active'),
(23, 9, 33, 'female', 2, '2025-08-15', 'active'),
(24, 10, 26, 'male', 2, '2025-08-25', 'active'),
(25, 6, 28, 'female', 2, '2025-01-15', 'active'),
(26, 7, 32, 'male', 2, '2025-02-20', 'active'),
(27, 8, 25, 'female', 2, '2025-03-10', 'active'),
(28, 9, 35, 'male', 2, '2025-04-05', 'active'),
(29, 10, 29, 'female', 2, '2025-05-12', 'active'),
(30, 6, 42, 'male', 2, '2025-06-18', 'active'),
(31, 7, 31, 'female', 2, '2025-07-22', 'active'),
(32, 8, 27, 'male', 2, '2025-08-03', 'active'),
(33, 9, 33, 'female', 2, '2025-08-15', 'active'),
(34, 10, 26, 'male', 2, '2025-08-25', 'active'),
(35, 6, 28, 'female', 2, '2025-01-15', 'active'),
(36, 7, 32, 'male', 2, '2025-02-20', 'active'),
(37, 8, 25, 'female', 2, '2025-03-10', 'active'),
(38, 9, 35, 'male', 2, '2025-04-05', 'active'),
(39, 10, 29, 'female', 2, '2025-05-12', 'active'),
(40, 6, 42, 'male', 2, '2025-06-18', 'active'),
(41, 7, 31, 'female', 2, '2025-07-22', 'active'),
(42, 8, 27, 'male', 2, '2025-08-03', 'active'),
(43, 9, 33, 'female', 2, '2025-08-15', 'active'),
(44, 10, 26, 'male', 2, '2025-08-25', 'active'),
(45, 27, 33, 'male', NULL, '2025-08-28', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `subscription_id` int(11) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `payment_date` date DEFAULT curdate(),
  `status` enum('completed','pending','failed') DEFAULT 'completed',
  `payment_method` varchar(50) DEFAULT 'Credit Card',
  `invoice_number` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `subscription_id`, `amount`, `payment_date`, `status`, `payment_method`, `invoice_number`) VALUES
(21, 21, 79.99, '2025-01-15', 'completed', 'Credit Card', 'INV-2025-001'),
(22, 22, 119.99, '2025-02-20', 'completed', 'Debit Card', 'INV-2025-002'),
(23, 23, 79.99, '2025-03-10', 'completed', 'PayPal', 'INV-2025-003'),
(24, 24, 199.99, '2025-04-05', 'completed', 'Credit Card', 'INV-2025-004'),
(25, 25, 79.99, '2025-05-12', 'completed', 'Bank Transfer', 'INV-2025-005'),
(26, 26, 29.99, '2025-06-18', 'completed', 'Credit Card', 'INV-2025-006'),
(27, 27, 79.99, '2025-07-22', 'completed', 'Debit Card', 'INV-2025-007'),
(28, 28, 39.99, '2025-08-03', 'completed', 'Credit Card', 'INV-2025-008'),
(29, 29, 79.99, '2025-08-15', 'completed', 'PayPal', 'INV-2025-009'),
(30, 30, 249.99, '2025-08-25', 'pending', 'Credit Card', 'INV-2025-010');

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `duration_months` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `features` text DEFAULT NULL,
  `popular` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`id`, `name`, `price`, `duration_months`, `created_at`, `features`, `popular`) VALUES
(2, 'Basic', 123.00, 12, '2025-08-27 17:21:14', '[\"Access to all equipments\"]', 1),
(3, 'Basic', 49.99, 1, '2025-08-27 17:27:16', '[\"Access to all equipment\", \"Locker access\", \"Free towel service\"]', 0),
(4, 'Standard', 79.99, 3, '2025-08-27 17:27:16', '[\"All Basic features\", \"Group classes\", \"Fitness assessment\"]', 1),
(5, 'Premium', 119.99, 6, '2025-08-27 17:27:16', '[\"All Standard features\", \"Personal trainer session\", \"Nutrition consultation\"]', 0),
(6, 'Gold', 199.99, 12, '2025-08-27 17:27:16', '[\"All Premium features\", \"Unlimited classes\", \"Massage therapy\"]', 1),
(7, 'Student', 29.99, 3, '2025-08-27 17:27:16', '[\"Access to all equipment\", \"Valid student ID required\"]', 0),
(8, 'Senior', 39.99, 3, '2025-08-27 17:27:16', '[\"Access to all equipment\", \"Specialized senior classes\"]', 0),
(9, 'Family', 249.99, 12, '2025-08-27 17:27:16', '[\"Gold features for 2 adults\", \"50% discount for children\"]', 0),
(10, 'Corporate', 89.99, 6, '2025-08-27 17:27:16', '[\"Standard features\", \"Bulk membership discounts\"]', 0),
(11, 'Weekend', 19.99, 1, '2025-08-27 17:27:16', '[\"Access on Saturdays and Sundays only\"]', 0),
(12, 'Trial', 9.99, 1, '2025-08-27 17:27:16', '[\"7-day full access\", \"One free class\"]', 0),
(13, 'Basic', 49.99, 1, '2025-08-27 17:36:38', '[\"Access to all equipment\", \"Locker access\", \"Free towel service\"]', 0),
(14, 'Standard', 79.99, 3, '2025-08-27 17:36:38', '[\"All Basic features\", \"Group classes\", \"Fitness assessment\"]', 1),
(15, 'Premium', 119.99, 6, '2025-08-27 17:36:38', '[\"All Standard features\", \"Personal trainer session\", \"Nutrition consultation\"]', 0),
(16, 'Gold', 199.99, 12, '2025-08-27 17:36:38', '[\"All Premium features\", \"Unlimited classes\", \"Massage therapy\"]', 1),
(17, 'Student', 29.99, 3, '2025-08-27 17:36:38', '[\"Access to all equipment\", \"Valid student ID required\"]', 0),
(18, 'Senior', 39.99, 3, '2025-08-27 17:36:38', '[\"Access to all equipment\", \"Specialized senior classes\"]', 0),
(19, 'Family', 249.99, 12, '2025-08-27 17:36:38', '[\"Gold features for 2 adults\", \"50% discount for children\"]', 0),
(20, 'Corporate', 89.99, 6, '2025-08-27 17:36:38', '[\"Standard features\", \"Bulk membership discounts\"]', 0),
(21, 'Weekend', 19.99, 1, '2025-08-27 17:36:38', '[\"Access on Saturdays and Sundays only\"]', 0),
(22, 'Trial', 9.99, 1, '2025-08-27 17:36:38', '[\"7-day full access\", \"One free class\"]', 0),
(23, 'Basic', 49.99, 1, '2025-08-27 17:37:00', '[\"Access to all equipment\", \"Locker access\", \"Free towel service\"]', 0),
(24, 'Standard', 79.99, 3, '2025-08-27 17:37:00', '[\"All Basic features\", \"Group classes\", \"Fitness assessment\"]', 1),
(25, 'Premium', 119.99, 6, '2025-08-27 17:37:00', '[\"All Standard features\", \"Personal trainer session\", \"Nutrition consultation\"]', 0),
(26, 'Gold', 199.99, 12, '2025-08-27 17:37:00', '[\"All Premium features\", \"Unlimited classes\", \"Massage therapy\"]', 1),
(27, 'Student', 29.99, 3, '2025-08-27 17:37:00', '[\"Access to all equipment\", \"Valid student ID required\"]', 0),
(28, 'Senior', 39.99, 3, '2025-08-27 17:37:00', '[\"Access to all equipment\", \"Specialized senior classes\"]', 0),
(29, 'Family', 249.99, 12, '2025-08-27 17:37:00', '[\"Gold features for 2 adults\", \"50% discount for children\"]', 0),
(30, 'Corporate', 89.99, 6, '2025-08-27 17:37:00', '[\"Standard features\", \"Bulk membership discounts\"]', 0),
(31, 'Weekend', 19.99, 1, '2025-08-27 17:37:00', '[\"Access on Saturdays and Sundays only\"]', 0),
(32, 'Trial', 9.99, 1, '2025-08-27 17:37:00', '[\"7-day full access\", \"One free class\"]', 0),
(33, 'Basic', 49.99, 1, '2025-08-27 17:37:19', '[\"Access to all equipment\", \"Locker access\", \"Free towel service\"]', 0),
(34, 'Standard', 79.99, 3, '2025-08-27 17:37:19', '[\"All Basic features\", \"Group classes\", \"Fitness assessment\"]', 1),
(35, 'Premium', 119.99, 6, '2025-08-27 17:37:19', '[\"All Standard features\", \"Personal trainer session\", \"Nutrition consultation\"]', 0),
(36, 'Gold', 199.99, 12, '2025-08-27 17:37:19', '[\"All Premium features\", \"Unlimited classes\", \"Massage therapy\"]', 1),
(37, 'Student', 29.99, 3, '2025-08-27 17:37:19', '[\"Access to all equipment\", \"Valid student ID required\"]', 0),
(38, 'Senior', 39.99, 3, '2025-08-27 17:37:19', '[\"Access to all equipment\", \"Specialized senior classes\"]', 0),
(39, 'Family', 249.99, 12, '2025-08-27 17:37:19', '[\"Gold features for 2 adults\", \"50% discount for children\"]', 0),
(40, 'Corporate', 89.99, 6, '2025-08-27 17:37:19', '[\"Standard features\", \"Bulk membership discounts\"]', 0),
(41, 'Weekend', 19.99, 1, '2025-08-27 17:37:19', '[\"Access on Saturdays and Sundays only\"]', 0),
(42, 'Trial', 9.99, 1, '2025-08-27 17:37:19', '[\"7-day full access\", \"One free class\"]', 0);

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `id` int(11) NOT NULL,
  `trainer_id` int(11) DEFAULT NULL,
  `class_type` varchar(50) DEFAULT NULL,
  `day` enum('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday') DEFAULT NULL,
  `time` time DEFAULT NULL,
  `duration_minutes` int(11) DEFAULT 60,
  `location` varchar(100) DEFAULT 'Main Gym',
  `capacity` int(11) DEFAULT 15,
  `type` enum('class','personal','group') DEFAULT 'class',
  `difficulty` enum('beginner','intermediate','advanced') DEFAULT 'beginner'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`id`, `trainer_id`, `class_type`, `day`, `time`, `duration_minutes`, `location`, `capacity`, `type`, `difficulty`) VALUES
(9, 1, 'Yoga', 'Monday', '09:00:00', 60, 'Main Gym', 15, 'class', 'beginner'),
(10, 1, 'Strength Training', 'Monday', '07:00:00', 60, 'Main Gym', 12, 'class', 'intermediate'),
(11, 2, 'Morning Yoga', 'Monday', '08:00:00', 45, 'Yoga Studio', 15, 'class', 'beginner'),
(12, 3, 'CrossFit WOD', 'Monday', '17:00:00', 60, 'CrossFit Area', 10, 'group', 'advanced'),
(13, 4, 'Nutrition Workshop', 'Tuesday', '18:00:00', 90, 'Conference Room', 20, 'class', 'beginner'),
(14, 5, 'Jiu-Jitsu Basics', 'Wednesday', '19:00:00', 60, 'Martial Arts Studio', 8, 'class', 'beginner'),
(15, 6, 'Zumba Party', 'Thursday', '18:30:00', 45, 'Dance Studio', 25, 'group', 'intermediate'),
(16, 7, 'Senior Stretch', 'Friday', '10:00:00', 45, 'Main Gym', 15, 'class', 'beginner'),
(17, 8, 'Prenatal Yoga', 'Saturday', '09:00:00', 60, 'Yoga Studio', 12, 'class', 'beginner'),
(18, 9, 'Sports Conditioning', 'Sunday', '16:00:00', 75, 'Main Gym', 10, 'group', 'advanced'),
(19, 10, 'Flexibility Class', 'Tuesday', '19:30:00', 50, 'Studio B', 15, 'class', 'intermediate'),
(20, 1, 'Strength Training', 'Monday', '07:00:00', 60, 'Main Gym', 12, 'class', 'intermediate'),
(21, 2, 'Morning Yoga', 'Monday', '08:00:00', 45, 'Yoga Studio', 15, 'class', 'beginner'),
(22, 3, 'CrossFit WOD', 'Monday', '17:00:00', 60, 'CrossFit Area', 10, 'group', 'advanced'),
(23, 4, 'Nutrition Workshop', 'Tuesday', '18:00:00', 90, 'Conference Room', 20, 'class', 'beginner'),
(24, 5, 'Jiu-Jitsu Basics', 'Wednesday', '19:00:00', 60, 'Martial Arts Studio', 8, 'class', 'beginner'),
(25, 6, 'Zumba Party', 'Thursday', '18:30:00', 45, 'Dance Studio', 25, 'group', 'intermediate'),
(26, 7, 'Senior Stretch', 'Friday', '10:00:00', 45, 'Main Gym', 15, 'class', 'beginner'),
(27, 8, 'Prenatal Yoga', 'Saturday', '09:00:00', 60, 'Yoga Studio', 12, 'class', 'beginner'),
(28, 9, 'Sports Conditioning', 'Sunday', '16:00:00', 75, 'Main Gym', 10, 'group', 'advanced'),
(29, 10, 'Flexibility Class', 'Tuesday', '19:30:00', 50, 'Studio B', 15, 'class', 'intermediate'),
(30, 1, 'Strength Training', 'Monday', '07:00:00', 60, 'Main Gym', 12, 'class', 'intermediate'),
(31, 2, 'Morning Yoga', 'Monday', '08:00:00', 45, 'Yoga Studio', 15, 'class', 'beginner'),
(32, 3, 'CrossFit WOD', 'Monday', '17:00:00', 60, 'CrossFit Area', 10, 'group', 'advanced'),
(33, 4, 'Nutrition Workshop', 'Tuesday', '18:00:00', 90, 'Conference Room', 20, 'class', 'beginner'),
(34, 5, 'Jiu-Jitsu Basics', 'Wednesday', '19:00:00', 60, 'Martial Arts Studio', 8, 'class', 'beginner'),
(35, 6, 'Zumba Party', 'Thursday', '18:30:00', 45, 'Dance Studio', 25, 'group', 'intermediate'),
(36, 7, 'Senior Stretch', 'Friday', '10:00:00', 45, 'Main Gym', 15, 'class', 'beginner'),
(37, 8, 'Prenatal Yoga', 'Saturday', '09:00:00', 60, 'Yoga Studio', 12, 'class', 'beginner'),
(38, 9, 'Sports Conditioning', 'Sunday', '16:00:00', 75, 'Main Gym', 10, 'group', 'advanced'),
(39, 10, 'Flexibility Class', 'Tuesday', '19:30:00', 50, 'Studio B', 15, 'class', 'intermediate'),
(40, 1, 'Strength Training', 'Monday', '07:00:00', 60, 'Main Gym', 12, 'class', 'intermediate'),
(41, 2, 'Morning Yoga', 'Monday', '08:00:00', 45, 'Yoga Studio', 15, 'class', 'beginner'),
(42, 3, 'CrossFit WOD', 'Monday', '17:00:00', 60, 'CrossFit Area', 10, 'group', 'advanced'),
(43, 4, 'Nutrition Workshop', 'Tuesday', '18:00:00', 90, 'Conference Room', 20, 'class', 'beginner'),
(44, 5, 'Jiu-Jitsu Basics', 'Wednesday', '19:00:00', 60, 'Martial Arts Studio', 8, 'class', 'beginner'),
(45, 6, 'Zumba Party', 'Thursday', '18:30:00', 45, 'Dance Studio', 25, 'group', 'intermediate'),
(46, 7, 'Senior Stretch', 'Friday', '10:00:00', 45, 'Main Gym', 15, 'class', 'beginner'),
(47, 8, 'Prenatal Yoga', 'Saturday', '09:00:00', 60, 'Yoga Studio', 12, 'class', 'beginner'),
(48, 9, 'Sports Conditioning', 'Sunday', '16:00:00', 75, 'Main Gym', 10, 'group', 'advanced'),
(49, 10, 'Flexibility Class', 'Tuesday', '19:30:00', 50, 'Studio B', 15, 'class', 'intermediate');

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` int(11) NOT NULL,
  `member_id` int(11) DEFAULT NULL,
  `plan_id` int(11) DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`id`, `member_id`, `plan_id`, `start_date`, `end_date`) VALUES
(21, 5, 34, '2025-01-15', '2025-04-15'),
(22, 6, 35, '2025-02-20', '2025-08-20'),
(23, 7, 34, '2025-03-10', '2025-06-10'),
(24, 8, 36, '2025-04-05', '2026-04-05'),
(25, 9, 34, '2025-05-12', '2025-08-12'),
(26, 10, 37, '2025-06-18', '2025-09-18'),
(27, 11, 34, '2025-07-22', '2025-10-22'),
(28, 12, 38, '2025-08-03', '2025-11-03'),
(29, 13, 34, '2025-08-15', '2025-11-15'),
(30, 14, 39, '2025-08-25', '2026-08-25');

-- --------------------------------------------------------

--
-- Table structure for table `trainers`
--

CREATE TABLE `trainers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `specialization` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` varchar(100) DEFAULT NULL,
  `experience` int(11) DEFAULT NULL,
  `hourly_rate` decimal(10,2) DEFAULT NULL,
  `certifications` text DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trainers`
--

INSERT INTO `trainers` (`id`, `name`, `specialization`, `phone`, `created_at`, `email`, `experience`, `hourly_rate`, `certifications`, `rating`) VALUES
(1, 'Nahin', 'General Fitness', NULL, '2025-08-27 16:50:49', 'nahin@gmail.com', 3, 25.00, 'Certified Personal Trainer', 4.50),
(2, 'Alex Johnson', 'Strength Training', '555-0101', '2025-08-27 17:27:16', 'alex.johnson@gym.com', 8, 45.00, '[\"NASM-CPT\", \"Strength and Conditioning Specialist\"]', 4.80),
(3, 'Maria Rodriguez', 'Yoga & Pilates', '555-0102', '2025-08-27 17:27:16', 'maria.rodriguez@gym.com', 6, 40.00, '[\"RYT-500\", \"Pilates Instructor\"]', 4.90),
(4, 'Chris Thompson', 'CrossFit', '555-0103', '2025-08-27 17:27:16', 'chris.thompson@gym.com', 5, 50.00, '[\"CrossFit Level 2\", \"Olympic Weightlifting\"]', 4.70),
(5, 'Sarah Williams', 'Nutrition & Wellness', '555-0104', '2025-08-27 17:27:16', 'sarah.williams@gym.com', 10, 55.00, '[\"Certified Nutritionist\", \"Wellness Coach\"]', 4.90),
(6, 'Michael Chen', 'Martial Arts', '555-0105', '2025-08-27 17:27:16', 'michael.chen@gym.com', 7, 42.00, '[\"Black Belt Jiu-Jitsu\", \"Krav Maga Instructor\"]', 4.60),
(7, 'Emily Parker', 'Dance Fitness', '555-0106', '2025-08-27 17:27:16', 'emily.parker@gym.com', 4, 38.00, '[\"Zumba Instructor\", \"Dance Fitness Specialist\"]', 4.80),
(8, 'David Wilson', 'Senior Fitness', '555-0107', '2025-08-27 17:27:16', 'david.wilson@gym.com', 12, 48.00, '[\"Senior Fitness Specialist\", \"Physical Therapy Aid\"]', 4.90),
(9, 'Jessica Brown', 'Pre/Post Natal', '555-0108', '2025-08-27 17:27:16', 'jessica.brown@gym.com', 5, 44.00, '[\"Pre/Post Natal Specialist\", \"Yoga for Pregnancy\"]', 4.70),
(10, 'Kevin Martinez', 'Sports Performance', '555-0109', '2025-08-27 17:27:16', 'kevin.martinez@gym.com', 9, 52.00, '[\"Sports Performance Coach\", \"Athletic Trainer\"]', 4.80),
(12, 'Alex Johnson', 'Strength Training', '555-0101', '2025-08-27 17:36:38', 'alex.johnson@gym.com', 8, 45.00, '[\"NASM-CPT\", \"Strength and Conditioning Specialist\"]', 4.80),
(13, 'Maria Rodriguez', 'Yoga & Pilates', '555-0102', '2025-08-27 17:36:38', 'maria.rodriguez@gym.com', 6, 40.00, '[\"RYT-500\", \"Pilates Instructor\"]', 4.90),
(14, 'Chris Thompson', 'CrossFit', '555-0103', '2025-08-27 17:36:38', 'chris.thompson@gym.com', 5, 50.00, '[\"CrossFit Level 2\", \"Olympic Weightlifting\"]', 4.70),
(15, 'Sarah Williams', 'Nutrition & Wellness', '555-0104', '2025-08-27 17:36:38', 'sarah.williams@gym.com', 10, 55.00, '[\"Certified Nutritionist\", \"Wellness Coach\"]', 4.90),
(16, 'Michael Chen', 'Martial Arts', '555-0105', '2025-08-27 17:36:38', 'michael.chen@gym.com', 7, 42.00, '[\"Black Belt Jiu-Jitsu\", \"Krav Maga Instructor\"]', 4.60),
(17, 'Emily Parker', 'Dance Fitness', '555-0106', '2025-08-27 17:36:38', 'emily.parker@gym.com', 4, 38.00, '[\"Zumba Instructor\", \"Dance Fitness Specialist\"]', 4.80),
(18, 'David Wilson', 'Senior Fitness', '555-0107', '2025-08-27 17:36:38', 'david.wilson@gym.com', 12, 48.00, '[\"Senior Fitness Specialist\", \"Physical Therapy Aid\"]', 4.90),
(19, 'Jessica Brown', 'Pre/Post Natal', '555-0108', '2025-08-27 17:36:38', 'jessica.brown@gym.com', 5, 44.00, '[\"Pre/Post Natal Specialist\", \"Yoga for Pregnancy\"]', 4.70),
(20, 'Kevin Martinez', 'Sports Performance', '555-0109', '2025-08-27 17:36:38', 'kevin.martinez@gym.com', 9, 52.00, '[\"Sports Performance Coach\", \"Athletic Trainer\"]', 4.80),
(21, 'Amanda Taylor', 'Flexibility & Mobility', '555-0110', '2025-08-27 17:36:38', 'amanda.taylor@gym.com', 6, 41.00, '[\"Flexibility Specialist\", \"Functional Movement\"]', 4.70),
(22, 'Alex Johnson', 'Strength Training', '555-0101', '2025-08-27 17:37:00', 'alex.johnson@gym.com', 8, 45.00, '[\"NASM-CPT\", \"Strength and Conditioning Specialist\"]', 4.80),
(23, 'Maria Rodriguez', 'Yoga & Pilates', '555-0102', '2025-08-27 17:37:00', 'maria.rodriguez@gym.com', 6, 40.00, '[\"RYT-500\", \"Pilates Instructor\"]', 4.90),
(24, 'Chris Thompson', 'CrossFit', '555-0103', '2025-08-27 17:37:00', 'chris.thompson@gym.com', 5, 50.00, '[\"CrossFit Level 2\", \"Olympic Weightlifting\"]', 4.70),
(25, 'Sarah Williams', 'Nutrition & Wellness', '555-0104', '2025-08-27 17:37:00', 'sarah.williams@gym.com', 10, 55.00, '[\"Certified Nutritionist\", \"Wellness Coach\"]', 4.90),
(26, 'Michael Chen', 'Martial Arts', '555-0105', '2025-08-27 17:37:00', 'michael.chen@gym.com', 7, 42.00, '[\"Black Belt Jiu-Jitsu\", \"Krav Maga Instructor\"]', 4.60),
(27, 'Emily Parker', 'Dance Fitness', '555-0106', '2025-08-27 17:37:00', 'emily.parker@gym.com', 4, 38.00, '[\"Zumba Instructor\", \"Dance Fitness Specialist\"]', 4.80),
(28, 'David Wilson', 'Senior Fitness', '555-0107', '2025-08-27 17:37:00', 'david.wilson@gym.com', 12, 48.00, '[\"Senior Fitness Specialist\", \"Physical Therapy Aid\"]', 4.90),
(29, 'Jessica Brown', 'Pre/Post Natal', '555-0108', '2025-08-27 17:37:00', 'jessica.brown@gym.com', 5, 44.00, '[\"Pre/Post Natal Specialist\", \"Yoga for Pregnancy\"]', 4.70),
(30, 'Kevin Martinez', 'Sports Performance', '555-0109', '2025-08-27 17:37:00', 'kevin.martinez@gym.com', 9, 52.00, '[\"Sports Performance Coach\", \"Athletic Trainer\"]', 4.80),
(31, 'Amanda Taylor', 'Flexibility & Mobility', '555-0110', '2025-08-27 17:37:00', 'amanda.taylor@gym.com', 6, 41.00, '[\"Flexibility Specialist\", \"Functional Movement\"]', 4.70),
(32, 'Alex Johnson', 'Strength Training', '555-0101', '2025-08-27 17:37:19', 'alex.johnson@gym.com', 8, 45.00, '[\"NASM-CPT\", \"Strength and Conditioning Specialist\"]', 4.80),
(33, 'Maria Rodriguez', 'Yoga & Pilates', '555-0102', '2025-08-27 17:37:19', 'maria.rodriguez@gym.com', 6, 40.00, '[\"RYT-500\", \"Pilates Instructor\"]', 4.90),
(34, 'Chris Thompson', 'CrossFit', '555-0103', '2025-08-27 17:37:19', 'chris.thompson@gym.com', 5, 50.00, '[\"CrossFit Level 2\", \"Olympic Weightlifting\"]', 4.70),
(35, 'Sarah Williams', 'Nutrition & Wellness', '555-0104', '2025-08-27 17:37:19', 'sarah.williams@gym.com', 10, 55.00, '[\"Certified Nutritionist\", \"Wellness Coach\"]', 4.90),
(36, 'Michael Chen', 'Martial Arts', '555-0105', '2025-08-27 17:37:19', 'michael.chen@gym.com', 7, 42.00, '[\"Black Belt Jiu-Jitsu\", \"Krav Maga Instructor\"]', 4.60),
(37, 'Emily Parker', 'Dance Fitness', '555-0106', '2025-08-27 17:37:19', 'emily.parker@gym.com', 4, 38.00, '[\"Zumba Instructor\", \"Dance Fitness Specialist\"]', 4.80),
(38, 'David Wilson', 'Senior Fitness', '555-0107', '2025-08-27 17:37:19', 'david.wilson@gym.com', 12, 48.00, '[\"Senior Fitness Specialist\", \"Physical Therapy Aid\"]', 4.90),
(39, 'Jessica Brown', 'Pre/Post Natal', '555-0108', '2025-08-27 17:37:19', 'jessica.brown@gym.com', 5, 44.00, '[\"Pre/Post Natal Specialist\", \"Yoga for Pregnancy\"]', 4.70),
(40, 'Kevin Martinez', 'Sports Performance', '555-0109', '2025-08-27 17:37:19', 'kevin.martinez@gym.com', 9, 52.00, '[\"Sports Performance Coach\", \"Athletic Trainer\"]', 4.80),
(41, 'Amanda Taylor', 'Flexibility & Mobility', '555-0110', '2025-08-27 17:37:19', 'amanda.taylor@gym.com', 6, 41.00, '[\"Flexibility Specialist\", \"Functional Movement\"]', 4.70);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','member') DEFAULT 'member',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `avatar`) VALUES
(2, 'Mahin Jawad Tanzim', 'tanzim@admin.com', '$2b$10$pHlG/IYg9gFcMiOjvmuAfOnxnF/7pfO.LXacpRysSl428BARH4M72', 'admin', '2025-08-27 13:53:27', NULL),
(5, 'Nahin', 'nahin@gmail.com', '$2b$10$BGo0TECKGN8R6AvusBZDQ.s31sHgSdE.mz4.yHvCubozHMPuet71K', 'member', '2025-08-27 16:46:37', NULL),
(6, 'Marlhum', 'marlhum@mail.com', '$2b$10$QGawZQllgJGIroQOYX0dUOstUvztxj9oDNRv0Pv30A5awvWV3Oit2', 'member', '2025-08-27 17:02:57', NULL),
(7, 'John Smith', 'john.smith@email.com', '$2b$10$pHlG/IYg9gFcMiOjvmuAfOnxnF/7pfO.LXacpRysSl428BARH4M72', 'admin', '2025-08-27 17:27:16', NULL),
(8, 'Sarah Johnson', 'sarah.johnson@email.com', '$2b$10$pHlG/IYg9gFcMiOjvmuAfOnxnF/7pfO.LXacpRysSl428BARH4M72', 'admin', '2025-08-27 17:27:16', NULL),
(9, 'Mike Wilson', 'mike.wilson@email.com', '$2b$10$pHlG/IYg9gFcMiOjvmuAfOnxnF/7pfO.LXacpRysSl428BARH4M72', 'admin', '2025-08-27 17:27:16', NULL),
(10, 'Emily Davis', 'emily.davis@email.com', '$2b$10$pHlG/IYg9gFcMiOjvmuAfOnxnF/7pfO.LXacpRysSl428BARH4M72', 'admin', '2025-08-27 17:27:16', NULL),
(11, 'David Brown', 'david.brown@email.com', '$2b$10$pHlG/IYg9gFcMiOjvmuAfOnxnF/7pfO.LXacpRysSl428BARH4M72', 'admin', '2025-08-27 17:27:16', NULL),
(12, 'Lisa Anderson', 'lisa.anderson@email.com', '$2b$10$pHlG/IYg9gFcMiOjvmuAfOnxnF/7pfO.LXacpRysSl428BARH4M72', 'member', '2025-08-27 17:27:16', NULL),
(13, 'Robert Taylor', 'robert.taylor@email.com', '$2b$10$pHlG/IYg9gFcMiOjvmuAfOnxnF/7pfO.LXacpRysSl428BARH4M72', 'member', '2025-08-27 17:27:16', NULL),
(14, 'Jennifer Lee', 'jennifer.lee@email.com', '$2b$10$pHlG/IYg9gFcMiOjvmuAfOnxnF/7pfO.LXacpRysSl428BARH4M72', 'member', '2025-08-27 17:27:16', NULL),
(15, 'James Miller', 'james.miller@email.com', '$2b$10$pHlG/IYg9gFcMiOjvmuAfOnxnF/7pfO.LXacpRysSl428BARH4M72', 'member', '2025-08-27 17:27:16', NULL),
(16, 'Maria Garcia', 'maria.garcia@email.com', '$2b$10$pHlG/IYg9gFcMiOjvmuAfOnxnF/7pfO.LXacpRysSl428BARH4M72', 'member', '2025-08-27 17:27:16', NULL),
(27, 'Mirajul Islam', 'mirajul@admin.com', '$2b$10$B1w6NoWhREklPM6oU/BvcO25.QZvK4SLYSJIy0iOFnMbOpQibq7sK', 'admin', '2025-08-27 18:11:54', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `workouts`
--

CREATE TABLE `workouts` (
  `id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `duration_minutes` int(11) NOT NULL,
  `calories` int(11) DEFAULT NULL,
  `workout_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workouts`
--

INSERT INTO `workouts` (`id`, `member_id`, `type`, `duration_minutes`, `calories`, `workout_date`, `created_at`) VALUES
(1, 5, 'Strength Training', 60, 450, '2025-08-20', '2025-08-27 17:43:53'),
(2, 6, 'Yoga', 45, 250, '2025-08-20', '2025-08-27 17:43:53'),
(3, 7, 'CrossFit', 60, 600, '2025-08-21', '2025-08-27 17:43:53'),
(4, 8, 'Cardio', 30, 350, '2025-08-21', '2025-08-27 17:43:53'),
(5, 9, 'Swimming', 45, 400, '2025-08-22', '2025-08-27 17:43:53'),
(6, 10, 'Running', 40, 500, '2025-08-22', '2025-08-27 17:43:53'),
(7, 11, 'Cycling', 50, 550, '2025-08-23', '2025-08-27 17:43:53'),
(8, 12, 'Pilates', 55, 300, '2025-08-23', '2025-08-27 17:43:53'),
(9, 13, 'Weightlifting', 70, 500, '2025-08-24', '2025-08-27 17:43:53'),
(10, 14, 'HIIT', 45, 600, '2025-08-24', '2025-08-27 17:43:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schedule_id` (`schedule_id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `plan_id` (`plan_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subscription_id` (`subscription_id`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trainer_id` (`trainer_id`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `plan_id` (`plan_id`);

--
-- Indexes for table `trainers`
--
ALTER TABLE `trainers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `workouts`
--
ALTER TABLE `workouts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `trainers`
--
ALTER TABLE `trainers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `workouts`
--
ALTER TABLE `workouts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `members`
--
ALTER TABLE `members`
  ADD CONSTRAINT `members_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `members_ibfk_2` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions` (`id`);

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`trainer_id`) REFERENCES `trainers` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `subscriptions_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `subscriptions_ibfk_2` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`);

--
-- Constraints for table `workouts`
--
ALTER TABLE `workouts`
  ADD CONSTRAINT `workouts_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
