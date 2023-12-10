-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 12, 2023 at 03:32 PM
-- Server version: 10.4.17-MariaDB-log
-- PHP Version: 8.1.12

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
(16, 'UMjtLygYJF+JL1O', 'asdasd', '', 'drMjZjfaQqVlY9n'),
(17, 'egJyu9thK2Vo4rH', 'sadsda', '', ''),
(18, 'vrjxLNQY_yxSmSU', 'ggggg', '', ''),
(19, 'bYPAE1@VPbTTU_j', '123456', '', ''),
(20, 'HMxkg9a2zIS10PN', '11', '', ''),
(21, 'cYmET!PpOkYfp!+', '111', '', ''),
(22, 'cl3nK@YPC@3dwJj', 'ss222', '', ''),
(23, 't3Xo8CK5zynHvHY', '44455', '', ''),
(24, '_CyTFkZQzweqT1d', 'abdcde', '', ''),
(25, 'V+xITsjhHsDUsj@', 'abcdewfg', '', ''),
(26, '8upJJ7Pemcf8Jad', '66666', '', ''),
(27, 'nHbyLPxNUVmueUN', 'fffffxxxx', '', ''),
(28, 'c3dkqDerFrkIM!u', 'R123', '', '');

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
  `BARANGAY_ID` varchar(255) NOT NULL,
  `BLOOD_TYPE` varchar(255) NOT NULL,
  `COMORDIBITY` longtext NOT NULL,
  `VACCINATION` longtext NOT NULL,
  `EMERGENCY` longtext NOT NULL,
  `ITEM_IMAGE` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `barangay_res_setup`
--

INSERT INTO `barangay_res_setup` (`ID`, `RESIDENT_ID`, `LASTNAME`, `FIRSTNAME`, `MIDDLENAME`, `FULLNAME`, `BIRTHDAY`, `HH_LEADER`, `IS_BRGY_EMP`, `IS_FAMILY_LEADER`, `IS_PRK_LEADER`, `HAS_SCHOLARSHIP`, `ADDRESS`, `PUROK`, `BARANGAY_ID`, `BLOOD_TYPE`, `COMORDIBITY`, `VACCINATION`, `EMERGENCY`, `ITEM_IMAGE`) VALUES
(1, 'BEhdvFVblI_YxPR', 'SALES', 'RAY BERNARD', '', 'SALES RAY BERNARD ', '1983-05-04', '', 0, 1, 0, 0, 'ffff ISABELA NEGROS OCCIDENTAL', 'ycLv!BHMXRZpn9z', '', 'AB+', '[\"Arthritis\",\"Asthma\",\"Cancer\"]', '[{\"VACCINE_DATE\":\"2020-02-05\",\"VACCINE\":\"SPUTNIC V\",\"DOSE\":\"0\"}]', '{\"NAME\":\"RICOLITO A CANTORIAS\",\"CONTACT_NUMBER\":\"09198193427\",\"ADDRESS\":\"BAGO CITY NEGROS OCCIDENTAL\"}', 'http://localhost/dis/sources/complist/district5/itemimage/BEhdvFVblI_YxPR/profpic/Alyas-bungo.jpg'),
(2, 's7jBIebM4QlpTd9', 'CANTORIAS', 'RICOLITO', 'APAYART', 'CANTORIAS RICOLITO APAYART', '2013-06-16', 'BEhdvFVblI_YxPR', 0, 0, 0, 0, 'ffff ISABELA NEGROS OCCIDENTAL', 'ycLv!BHMXRZpn9z', '', 'O+', '[\"Mental Health Issues\"]', '[{\"VACCINE_DATE\":\"\",\"VACCINE\":\"ASTRAZENECA\",\"DOSE\":\"0\"}]', '{\"NAME\":\"GILBERT SORANTE\",\"CONTACT_NUMBER\":\"09452315477\",\"ADDRESS\":\"BINALBAGAN CITY\"}', 'http://localhost/dis/sources/complist/district5/itemimage/s7jBIebM4QlpTd9/profpic/download.jpg'),
(3, 'yDGNKoTwWM1ZGRT', 'GICANA', 'KIRBY KENT', '', 'GICANA KIRBY KENT ', '2013-06-16', 'BEhdvFVblI_YxPR', 0, 0, 0, 0, 'ffff ISABELA NEGROS OCCIDENTAL', 'ycLv!BHMXRZpn9z', '', 'AB-', '[\"Asthma\",\"Mental Health Issues\"]', '[{\"VACCINE_DATE\":\"2021-01-12\",\"VACCINE\":\"ASTRAZENECA\",\"DOSE\":\"0\"},{\"VACCINE_DATE\":\"2021-02-12\",\"VACCINE\":\"ASTRAZENECA\",\"DOSE\":\"1\"}]', '{\"NAME\":\"LEO JOHN SALES\",\"CONTACT_NUMBER\":\"09198193427\",\"ADDRESS\":\"KAHIRUP B BRGY MANSILINGAN BACOLOD CITY\"}', 'http://localhost/dis/sources/complist/district5/itemimage/yDGNKoTwWM1ZGRT/profpic/osso.logo.png');

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
  `PROVINCE` varchar(255) NOT NULL,
  `CODE` varchar(255) NOT NULL,
  `COMPANY_DIR` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `barangay_setup`
--

INSERT INTO `barangay_setup` (`ID`, `BARANGAY_NAME`, `BARANGAY_ID`, `BARANGAY_LOGO`, `BARANGAY_CAPTAIN`, `BARANGAY_DIR`, `CITY_M`, `PROVINCE`, `CODE`, `COMPANY_DIR`) VALUES
(1, 'DISTRICT 5', 'BRGY_BCD_01', 'Ph_seal_negros_occidental.png', 0, 'district5', 'ISABELA', 'NEGROS OCCIDENTAL', 'ISA', 'district5');

-- --------------------------------------------------------

--
-- Table structure for table `scan`
--

CREATE TABLE `scan` (
  `ID` int(64) NOT NULL,
  `RES_ID` varchar(255) NOT NULL,
  `DATE_SCAN` date NOT NULL,
  `TIME_SCAN` time NOT NULL,
  `CLERK` int(64) NOT NULL,
  `DESCRIPTION` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `scan`
--

INSERT INTO `scan` (`ID`, `RES_ID`, `DATE_SCAN`, `TIME_SCAN`, `CLERK`, `DESCRIPTION`) VALUES
(1, 'yDGNKoTwWM1ZGRT', '2023-07-05', '17:09:10', 1, 'scan'),
(2, 'BEhdvFVblI_YxPR', '2023-07-06', '00:14:29', 1, 'For cash assistance'),
(3, 's7jBIebM4QlpTd9', '2023-07-06', '00:17:47', 1, 'For cash assistance');

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
-- Indexes for table `scan`
--
ALTER TABLE `scan`
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
  MODIFY `ID` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `barangay_res_setup`
--
ALTER TABLE `barangay_res_setup`
  MODIFY `ID` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `barangay_setup`
--
ALTER TABLE `barangay_setup`
  MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `scan`
--
ALTER TABLE `scan`
  MODIFY `ID` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
