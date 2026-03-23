-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mar 03 Février 2026 à 23:53
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `magicfit_mirror`
--

-- --------------------------------------------------------

--
-- Structure de la table `exercices`
--

CREATE TABLE IF NOT EXISTS `exercices` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `muscle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `programme_id` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `exercices_programme_id_foreign` (`programme_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `exercice_programme`
--

CREATE TABLE IF NOT EXISTS `exercice_programme` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `programme_id` bigint(20) unsigned NOT NULL,
  `exercice_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `exercice_programme_programme_id_foreign` (`programme_id`),
  KEY `exercice_programme_exercice_id_foreign` (`exercice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=17 ;

--
-- Contenu de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2025_05_28_100001_create_programmes_table', 1),
(6, '2025_05_28_164237_create_exercices_table', 1),
(7, '2025_06_08_155503_create_suivis_table', 1),
(8, '2025_06_20_171251_add_poids_to_suivis_table', 1),
(9, '2025_06_20_171348_add_poids_to_suivis_table', 1),
(10, '2025_06_20_182251_remove_programme_id_from_suivis_table', 1),
(11, '2025_06_20_194705_add_user_id_to_suivis_table', 1),
(12, '2025_06_22_211024_create_programme_exercice_table', 1),
(13, '2025_06_23_230328_create_reservations_table', 1),
(14, '2025_06_24_164221_update_reservations_table_add_columns', 1),
(15, '2025_06_28_164031_create_subscriptions_table', 1),
(16, '2025_07_04_081351_create_user_programme_table', 1);

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=6 ;

--
-- Contenu de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'token', 'd5d9df07d7c878d81dd98497a45ccf1c79e7b81d2bedccd2bcfdafbcb16f5a2a', '["*"]', '2025-11-12 13:06:14', NULL, '2025-11-11 17:49:11', '2025-11-12 13:06:14'),
(2, 'App\\Models\\User', 1, 'token', '0bb930e27a9be80ac4878287dfb58f63635e9c4557111d524dad2c7e5a561be3', '["*"]', '2025-11-12 12:51:24', NULL, '2025-11-12 12:27:23', '2025-11-12 12:51:24'),
(3, 'App\\Models\\User', 1, 'token', '1b4679238d26139804cf4f23fb224ce10de1aac5bd79143c9b144956fa1e36b4', '["*"]', '2026-02-03 19:37:07', NULL, '2026-02-03 19:37:06', '2026-02-03 19:37:07'),
(4, 'App\\Models\\User', 1, 'token', 'd50b1d0bac5cdba1db4c39819010014859fb7408d448452c8cb7381d77a6b842', '["*"]', '2026-02-03 20:21:44', NULL, '2026-02-03 19:37:07', '2026-02-03 20:21:44'),
(5, 'App\\Models\\User', 2, 'token', 'd09338686536d9cd1f4e2917bdb5f90da830165094c6339d9bbf0d3d1f0a73ad', '["*"]', '2026-02-03 21:43:55', NULL, '2026-02-03 21:38:42', '2026-02-03 21:43:55');

-- --------------------------------------------------------

--
-- Structure de la table `programmes`
--

CREATE TABLE IF NOT EXISTS `programmes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `categorie` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `objectif` text COLLATE utf8mb4_unicode_ci,
  `nutrition` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=7 ;

--
-- Contenu de la table `programmes`
--

INSERT INTO `programmes` (`id`, `nom`, `description`, `categorie`, `image`, `objectif`, `nutrition`, `created_at`, `updated_at`) VALUES
(1, 'Bullking', 'jskshk', 'musl', 'jslsj', NULL, NULL, '2025-11-11 18:11:05', '2025-11-11 18:11:05'),
(2, 'TEST', 'TEST', 'TEST', 'TEST', NULL, NULL, '2025-11-12 12:00:56', '2025-11-12 12:00:56'),
(3, 'Full Body Débutant', 'Programme complet pour débutants, 3 séances par semaine.', 'Full Body', 'https://cdn.magicfit.com/programmes/fullbody_debutant.jpg', NULL, NULL, '2025-11-12 12:47:20', '2025-11-12 12:47:20'),
(5, 'Perte de Poids Express', 'Programme intensif pour brûler les graisses rapidement.', 'Cardio', 'https://cdn.magicfit.com/programmes/fatburn.jpg', NULL, NULL, '2025-11-12 12:51:14', '2025-11-12 12:51:14'),
(6, 'Muscle Gain Pro', 'Programme avancé pour prise de masse musculaire.', 'Musculation', 'https://cdn.magicfit.com/programmes/musclegain.jpg', NULL, NULL, '2025-11-12 12:51:24', '2025-11-12 12:51:24');

-- --------------------------------------------------------

--
-- Structure de la table `reservations`
--

CREATE TABLE IF NOT EXISTS `reservations` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('collectif','prive') COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `heure` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `subscriptions`
--

CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `plan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subscriptions_user_id_foreign` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `suivis`
--

CREATE TABLE IF NOT EXISTS `suivis` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `date` date NOT NULL,
  `poids` int(11) DEFAULT NULL,
  `repetitions` int(11) NOT NULL,
  `commentaire` text COLLATE utf8mb4_unicode_ci,
  `calories` int(11) DEFAULT NULL,
  `battement_heart_rate` int(11) DEFAULT NULL,
  `distance` double(8,2) DEFAULT NULL,
  `steps` int(11) DEFAULT NULL,
  `sommeil` double(8,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `suivis_user_id_foreign` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'utilisateur',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=3 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `role`) VALUES
(1, 'Admin1', 'admin1@example.com', NULL, '$2y$12$JBR0JTG6MmwJTCldOPEEkuMH5KQOpr6V4oFW0wyZiuLcHG.Em4gPO', NULL, '2025-11-11 17:49:11', '2025-11-11 17:49:11', 'admin'),
(2, 'yassine', 'ychahbounia@gmail.com', NULL, '$2y$12$nxciXtCDR6iPTlIE784mK.CA9Yu.7W3yA6JCw9x.2TeE1.tLFhz.K', NULL, '2026-02-03 21:38:42', '2026-02-03 21:38:42', 'admin');

-- --------------------------------------------------------

--
-- Structure de la table `user_programme`
--

CREATE TABLE IF NOT EXISTS `user_programme` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `programme_id` bigint(20) unsigned NOT NULL,
  `coach_id` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_programme_user_id_foreign` (`user_id`),
  KEY `user_programme_programme_id_foreign` (`programme_id`),
  KEY `user_programme_coach_id_foreign` (`coach_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=1 ;

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `exercices`
--
ALTER TABLE `exercices`
  ADD CONSTRAINT `exercices_programme_id_foreign` FOREIGN KEY (`programme_id`) REFERENCES `programmes` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `exercice_programme`
--
ALTER TABLE `exercice_programme`
  ADD CONSTRAINT `exercice_programme_exercice_id_foreign` FOREIGN KEY (`exercice_id`) REFERENCES `exercices` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `exercice_programme_programme_id_foreign` FOREIGN KEY (`programme_id`) REFERENCES `programmes` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `subscriptions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `suivis`
--
ALTER TABLE `suivis`
  ADD CONSTRAINT `suivis_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `user_programme`
--
ALTER TABLE `user_programme`
  ADD CONSTRAINT `user_programme_coach_id_foreign` FOREIGN KEY (`coach_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `user_programme_programme_id_foreign` FOREIGN KEY (`programme_id`) REFERENCES `programmes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_programme_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
