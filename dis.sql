-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2022 at 12:05 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dis`
--

-- --------------------------------------------------------

--
-- Table structure for table `barangay_bus_setup`
--

CREATE TABLE `barangay_bus_setup` (
  `ID` int(255) NOT NULL,
  `BUS_ID` varchar(255) NOT NULL,
  `BUS_NAME` varchar(255) NOT NULL,
  `IS_LEGAL_TO_OPERATE` tinyint(1) NOT NULL,
  `FIRST_OP_DATE` date NOT NULL,
  `BUS_EXP_DATE` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `barangay_emp_setup`
--

CREATE TABLE `barangay_emp_setup` (
  `ID` int(64) NOT NULL,
  `RESIDENT_ID` varchar(255) NOT NULL,
  `EMP_ID` varchar(255) NOT NULL,
  `USERNAME` varchar(255) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `POSITION` varchar(255) NOT NULL,
  `DESIGNATION` varchar(255) NOT NULL,
  `STATUS` varchar(255) NOT NULL,
  `IS_BRGY_CAPTAIN` int(11) NOT NULL,
  `BARANGAY_ID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `barangay_emp_setup`
--

INSERT INTO `barangay_emp_setup` (`ID`, `RESIDENT_ID`, `EMP_ID`, `USERNAME`, `PASSWORD`, `POSITION`, `DESIGNATION`, `STATUS`, `IS_BRGY_CAPTAIN`, `BARANGAY_ID`) VALUES
(1, 'BEhdvFVblI_YxPR', 'BRGY_BCD_01_EMP_01', 'ray', 'sales', 'secretary', 'System Administrator', 'Active', 0, 'BRGY_BCD_01'),
(2, 'BRGY_BCD_01_RES_02', 'BRGY_BCD_01_EMP_02', 'boy', 'pico', 'BARANGGAY CAPTAIN', 'Administrator', 'Active', 1, 'BRGY_BCD_01');

-- --------------------------------------------------------

--
-- Table structure for table `barangay_land_marks`
--

CREATE TABLE `barangay_land_marks` (
  `ID` int(64) NOT NULL,
  `FOREIGN_KEY` varchar(255) NOT NULL,
  `LAT` varchar(255) NOT NULL,
  `LNG` varchar(255) NOT NULL,
  `TYPE` varchar(255) NOT NULL,
  `ICON` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `barangay_prk_setup`
--

CREATE TABLE `barangay_prk_setup` (
  `ID` int(64) NOT NULL,
  `PRK_ID` varchar(255) NOT NULL,
  `PRK_NAME` varchar(255) NOT NULL,
  `BARANGAY_ID` varchar(255) NOT NULL,
  `PRK_LEADER` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `barangay_prk_setup`
--

INSERT INTO `barangay_prk_setup` (`ID`, `PRK_ID`, `PRK_NAME`, `BARANGAY_ID`, `PRK_LEADER`) VALUES
(1, '2POV@3ClaQAlBZV', 'KAHIRUP A', '', ''),
(2, 'R_KaIxfeBLxFTmI', 'KAHIRUP B', '', ''),
(3, 'AycYBhlWmQw09ye', 'BAKYAS', '', ''),
(4, 'ZxLdNrAZjG_Yq+S', 'GRANDVILLE', '', ''),
(5, 'oP2Y3mD24wIkRV7', 'BANGGA CERES', '', ''),
(7, 'X5RvXUgO+cuDgI!', 'BANGGA PARI', '', '9MvOkI5Dl6V5PHP'),
(8, '9dLcd2xniSFHl0z', 'PRK TUMPOK', '', '3g6ZsfSPgg9CTte'),
(9, 'tOCHZ56tm7Bq9r6', 'xx', '', '9MvOkI5Dl6V5PHP'),
(10, 'F1rBGf7JG@ii1h@', 'BANGGA ALITz', '', '8g+HcoR7TxnbVPX'),
(12, 'NE!vh8om52apRvb', 'PUROK WAS AGSzadasd', '', ''),
(15, 'ycLv!BHMXRZpn9z', 'ffff', '', '3g6ZsfSPgg9CTte'),
(16, 'UMjtLygYJF+JL1O', 'asdasd', '', 'drMjZjfaQqVlY9n');

-- --------------------------------------------------------

--
-- Table structure for table `barangay_res_setup`
--

CREATE TABLE `barangay_res_setup` (
  `ID` int(64) NOT NULL,
  `RESIDENT_ID` varchar(255) NOT NULL,
  `LASTNAME` varchar(255) NOT NULL,
  `FIRSTNAME` varchar(255) NOT NULL,
  `MIDDLENAME` varchar(255) NOT NULL,
  `FULLNAME` varchar(255) NOT NULL,
  `BIRTHDAY` date NOT NULL,
  `HH_LEADER` varchar(255) NOT NULL,
  `IS_BRGY_EMP` tinyint(1) NOT NULL,
  `IS_FAMILY_LEADER` tinyint(1) NOT NULL,
  `IS_PRK_LEADER` tinyint(1) NOT NULL,
  `HAS_SCHOLARSHIP` tinyint(1) NOT NULL,
  `ADDRESS` varchar(255) NOT NULL,
  `PUROK` varchar(255) NOT NULL,
  `BARANGAY_ID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `barangay_res_setup`
--

INSERT INTO `barangay_res_setup` (`ID`, `RESIDENT_ID`, `LASTNAME`, `FIRSTNAME`, `MIDDLENAME`, `FULLNAME`, `BIRTHDAY`, `HH_LEADER`, `IS_BRGY_EMP`, `IS_FAMILY_LEADER`, `IS_PRK_LEADER`, `HAS_SCHOLARSHIP`, `ADDRESS`, `PUROK`, `BARANGAY_ID`) VALUES
(1, 'zUwm4hl1lurKf7R', 'SALES', 'KHRINA', '', 'SALES KHRINA ', '1989-10-12', 'BEhdvFVblI_YxPR', 0, 0, 0, 0, 'E PANISA ROAD BARANGAY MANSILINGAN KAHIRUP A', '2POV@3ClaQAlBZV', ''),
(2, 'drMjZjfaQqVlY9n', 'SALES', 'ACE', '', 'SALES ACE ', '1990-10-12', 'BEhdvFVblI_YxPR', 0, 0, 1, 0, 'E PANISA ROAD BARANGAY MANSILINGAN KAHIRUP A', '2POV@3ClaQAlBZV', ''),
(3, 'BEhdvFVblI_YxPR', 'SALES', 'RAY BERNARD', 'LOZADA', 'SALES RAY BERNARD LOZADA', '1990-10-12', '', 0, 1, 0, 0, 'E PANISA ROAD BARANGAY MANSILINGAN KAHIRUP A', '2POV@3ClaQAlBZV', ''),
(6, 'cDpMQh1ycnDJgog', 'CANTORIAS', 'RICOLITO', 'APAYART', 'CANTORIAS RICOLITO APAYART', '1994-06-16', 'BEhdvFVblI_YxPR', 0, 0, 0, 0, 'E PANISA ROAD BARANGAY MANSILINGAN KAHIRUP A', '2POV@3ClaQAlBZV', ''),
(7, 'Dn5nCksamIZACtN', 'SALES', 'JAPJAPS', 'LOZADA', 'SALES JAPJAPS LOZADA', '1997-10-13', '', 0, 0, 0, 0, 'E PANISA ROAD BARANGAY MANSILINGAN KAHIRUP A', '2POV@3ClaQAlBZV', ''),
(8, '7PzfN3NBNNf0aTE', 'PICO', 'BOY', '', 'PICO BOY ', '2012-10-14', '', 0, 1, 0, 0, 'BARANGAY MANSILINGAN', 'AycYBhlWmQw09ye', ''),
(9, 'YZ038_deNk6IX7k', 'SALES', 'LJ', '', 'SALES LJ ', '1979-10-14', '', 0, 0, 0, 0, 'E PANISA ROAD BARANGAY MANSILINGAN KAHIRUP A', '2POV@3ClaQAlBZV', ''),
(10, '8XYGLDCMRlX@pEk', 'SALES', 'MARIA', 'LOZADA', 'SALES MARIA LOZADA', '1960-10-14', '', 0, 0, 0, 0, 'E PANISA ROAD BARANGAY MANSILINGAN KAHIRUP A', '2POV@3ClaQAlBZV', ''),
(11, '!tEa+u6XWK2MrjH', 'SALES', 'JOPET', 'LOZADA', 'SALES JOPET LOZADA', '1997-10-14', '', 0, 0, 0, 0, 'E PANISA ROAD BARANGAY MANSILINGAN KAHIRUP A', '2POV@3ClaQAlBZV', ''),
(12, 'b@IRTO11BZ4Avdy', 'GASTON', 'MIKE', 'ENRILLO', 'GASTON MIKE ENRILLO', '1998-10-15', '7PzfN3NBNNf0aTE', 0, 0, 1, 0, 'BARANGAY MANSILINGAN', 'AycYBhlWmQw09ye', ''),
(13, '9MvOkI5Dl6V5PHP', 'CALMAAN', 'CARL STEVEN', 'MAGNO', 'CALMAAN CARL STEVEN MAGNO', '1989-01-15', 'uwTTH!_zbYtFeeK', 0, 0, 1, 0, 'JACKSON ST LOT 4 BAKYAS BARANGAY MANSILINGAN', 'AycYBhlWmQw09ye', ''),
(14, 'uwTTH!_zbYtFeeK', 'CALAMAAN', 'JOSEPH JOHN', 'MAGNO', 'CALAMAAN JOSEPH JOHN MAGNO', '2012-10-15', '', 0, 1, 0, 0, 'JACKSON ST LOT 4 BAKYAS BARANGAY MANSILINGAN', 'AycYBhlWmQw09ye', ''),
(15, '3g6ZsfSPgg9CTte', 'SANCHEZ', 'APRIL', 'DE GUZMAN', 'SANCHEZ APRIL DE GUZMAN', '1989-10-20', '6dXpXZLABmMXjje', 0, 0, 1, 0, 'GRANDVILLE BARANGAY MANSILINGAN BACOLOD CITY NEGROS OCCIDENTAL', 'ZxLdNrAZjG_Yq+S', ''),
(16, '6dXpXZLABmMXjje', 'SANCHEZ', 'BYRON SCOTT', 'DE GUZMAN', 'SANCHEZ BYRON SCOTT DE GUZMAN', '1987-10-20', '', 0, 1, 0, 0, 'GRANDVILLE BARANGAY MANSILINGAN BACOLOD CITY NEGROS OCCIDENTAL', 'ZxLdNrAZjG_Yq+S', ''),
(17, 'C4u@F4RGZFED0v3', 'ARANAS', 'STEPH', 'PABLITO', 'ARANAS STEPH PABLITO', '2012-10-20', 'kWCjEjg5JKcly0S', 0, 0, 0, 0, 'GUMAMELA ST. KAHIRUP B  BARANGAY MANSILINGAN BACOLOD CITY NEGROS OCCIDENTAL', 'R_KaIxfeBLxFTmI', ''),
(18, 'kWCjEjg5JKcly0S', 'ARANAS', 'MICHAEL', 'JOHN', 'ARANAS MICHAEL JOHN', '2012-10-20', '', 0, 1, 0, 0, 'GUMAMELA ST. KAHIRUP B  BARANGAY MANSILINGAN BACOLOD CITY NEGROS OCCIDENTAL', 'R_KaIxfeBLxFTmI', ''),
(19, 'VkrcprLrSZgq2Dy', 'CANTORIAS', 'BERYAN', 'APAYART', 'CANTORIAS BERYAN APAYART', '2012-11-03', '7PzfN3NBNNf0aTE', 0, 0, 0, 0, 'BARANGAY MANSILINGAN', 'AycYBhlWmQw09ye', ''),
(20, '8g+HcoR7TxnbVPX', 'CALMERIN', 'GELKOV', '', 'CALMERIN GELKOV ', '1986-08-10', '', 0, 0, 1, 0, 'BARANGAY MANSILINGAN BACOLOD CITY NEGROS OCCIDENTAL', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `barangay_setup`
--

CREATE TABLE `barangay_setup` (
  `ID` int(255) NOT NULL,
  `BARANGAY_NAME` varchar(255) NOT NULL,
  `BARANGAY_ID` varchar(255) NOT NULL,
  `BARANGAY_LOGO` varchar(255) NOT NULL,
  `BARANGAY_CAPTAIN` int(11) NOT NULL,
  `BARANGAY_DIR` varchar(255) NOT NULL,
  `CITY_M` varchar(255) NOT NULL,
  `PROVINCE` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `barangay_setup`
--

INSERT INTO `barangay_setup` (`ID`, `BARANGAY_NAME`, `BARANGAY_ID`, `BARANGAY_LOGO`, `BARANGAY_CAPTAIN`, `BARANGAY_DIR`, `CITY_M`, `PROVINCE`) VALUES
(1, 'DISTRICT 5', 'BRGY_BCD_01', 'Ph_seal_negros_occidental.png', 0, 'district5', 'BACOLOD CITY', 'NEGROS OCCIDENTAL');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barangay_bus_setup`
--
ALTER TABLE `barangay_bus_setup`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `barangay_emp_setup`
--
ALTER TABLE `barangay_emp_setup`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `barangay_land_marks`
--
ALTER TABLE `barangay_land_marks`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `barangay_prk_setup`
--
ALTER TABLE `barangay_prk_setup`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `barangay_res_setup`
--
ALTER TABLE `barangay_res_setup`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `RESIDENT_ID` (`RESIDENT_ID`);

--
-- Indexes for table `barangay_setup`
--
ALTER TABLE `barangay_setup`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barangay_bus_setup`
--
ALTER TABLE `barangay_bus_setup`
  MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `barangay_emp_setup`
--
ALTER TABLE `barangay_emp_setup`
  MODIFY `ID` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `barangay_land_marks`
--
ALTER TABLE `barangay_land_marks`
  MODIFY `ID` int(64) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `barangay_prk_setup`
--
ALTER TABLE `barangay_prk_setup`
  MODIFY `ID` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `barangay_res_setup`
--
ALTER TABLE `barangay_res_setup`
  MODIFY `ID` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `barangay_setup`
--
ALTER TABLE `barangay_setup`
  MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
