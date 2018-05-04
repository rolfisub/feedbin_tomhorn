-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 04, 2018 at 12:08 AM
-- Server version: 5.7.21-0ubuntu0.16.04.1
-- PHP Version: 7.0.28-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sportsbook`
--

-- --------------------------------------------------------

--
-- Table structure for table `liveodds_events`
--

CREATE TABLE `liveodds_events` (
  `key` bigint(20) NOT NULL,
  `event_id` varchar(64) NOT NULL,
  `event_name` varchar(128) NOT NULL,
  `away_rot` varchar(64) NOT NULL,
  `away_name` varchar(64) NOT NULL,
  `home_rot` varchar(64) NOT NULL,
  `home_name` varchar(64) NOT NULL,
  `sport_id` varchar(64) NOT NULL,
  `sport_name` varchar(64) NOT NULL,
  `league_id` varchar(64) NOT NULL,
  `league_name` text NOT NULL,
  `event_startdate` datetime NOT NULL,
  `extra_info` text NOT NULL,
  `streaming` text NOT NULL,
  `tv_channels` text NOT NULL,
  `is_sport_frozen` int(1) NOT NULL DEFAULT '0',
  `is_league_frozen` int(1) NOT NULL DEFAULT '0',
  `is_event_frozen` int(1) NOT NULL DEFAULT '0',
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `liveodds_meta`
--

CREATE TABLE `liveodds_meta` (
  `key` bigint(20) NOT NULL,
  `event_id` varchar(64) NOT NULL,
  `meta_key` varchar(32) NOT NULL,
  `meta_value` text NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `liveodds_oddsinfo`
--

CREATE TABLE `liveodds_oddsinfo` (
  `key` bigint(20) NOT NULL,
  `event_id` varchar(32) NOT NULL,
  `odd_id` varchar(32) NOT NULL,
  `odd_name` varchar(10) NOT NULL,
  `odd_text` text NOT NULL,
  `odd_type_id` varchar(32) NOT NULL,
  `odd_type` varchar(32) NOT NULL,
  `odd_subtype` varchar(32) NOT NULL,
  `active` varchar(10) NOT NULL,
  `handicap` varchar(10) NOT NULL,
  `handicap_rest` varchar(10) NOT NULL,
  `changed` varchar(10) NOT NULL,
  `combinations` varchar(10) NOT NULL,
  `is_balanced` varchar(10) NOT NULL,
  `manual` int(11) NOT NULL DEFAULT '0',
  `is_line_frozen` int(1) NOT NULL DEFAULT '0',
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `liveodds_odds_sel`
--

CREATE TABLE `liveodds_odds_sel` (
  `key` bigint(20) NOT NULL,
  `event_id` varchar(32) NOT NULL,
  `odd_id` varchar(32) NOT NULL,
  `sel_id` int(11) NOT NULL,
  `sel_name` varchar(255) NOT NULL,
  `sel_odd` varchar(32) NOT NULL,
  `active` varchar(10) NOT NULL,
  `outcome` varchar(10) NOT NULL,
  `void_factor` varchar(10) NOT NULL,
  `player_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `type_name` varchar(32) NOT NULL,
  `auto` int(11) NOT NULL DEFAULT '1',
  `is_selection_frozen` tinyint(4) NOT NULL DEFAULT '0',
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `liveodds_events`
--
ALTER TABLE `liveodds_events`
  ADD PRIMARY KEY (`key`),
  ADD KEY `event_id` (`event_id`),
  ADD KEY `last_update` (`last_update`),
  ADD KEY `live_events_selection_liveodds_events` (`event_id`,`sport_id`,`league_id`,`event_startdate`,`is_sport_frozen`,`is_league_frozen`,`is_event_frozen`);

--
-- Indexes for table `liveodds_meta`
--
ALTER TABLE `liveodds_meta`
  ADD PRIMARY KEY (`key`),
  ADD KEY `event_id` (`event_id`,`meta_key`),
  ADD KEY `last_update` (`last_update`),
  ADD KEY `live_events_selection_liveodds_meta` (`event_id`,`meta_key`,`meta_value`(100));

--
-- Indexes for table `liveodds_oddsinfo`
--
ALTER TABLE `liveodds_oddsinfo`
  ADD PRIMARY KEY (`key`),
  ADD KEY `event_id` (`event_id`,`odd_id`),
  ADD KEY `last_update` (`last_update`),
  ADD KEY `live_events_selection_liveodds_oddsinfo` (`event_id`,`odd_id`,`odd_type_id`,`odd_subtype`,`active`,`handicap`,`is_line_frozen`);

--
-- Indexes for table `liveodds_odds_sel`
--
ALTER TABLE `liveodds_odds_sel`
  ADD PRIMARY KEY (`key`),
  ADD KEY `event_id` (`event_id`,`odd_id`,`sel_id`),
  ADD KEY `last_update` (`last_update`),
  ADD KEY `live_events_selections_liveodds_odds_sel` (`event_id`,`odd_id`,`sel_id`,`active`,`is_selection_frozen`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `liveodds_events`
--
ALTER TABLE `liveodds_events`
  MODIFY `key` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `liveodds_meta`
--
ALTER TABLE `liveodds_meta`
  MODIFY `key` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `liveodds_oddsinfo`
--
ALTER TABLE `liveodds_oddsinfo`
  MODIFY `key` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
--
-- AUTO_INCREMENT for table `liveodds_odds_sel`
--
ALTER TABLE `liveodds_odds_sel`
  MODIFY `key` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
