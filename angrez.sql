-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 17, 2022 at 11:19 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `angrez`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL, 
  `password` varchar(45) DEFAULT NULL,
  `isactive` tinyint(4) DEFAULT NULL,
  `role` varchar(50) NOT NULL,
  `uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `firstname`, `lastname`, `email`, `password`, `isactive`, `role`, `uid`) VALUES
(2, 'Admin', 'Main', 'admin@gmail.com', '22b596cc89584ab9a7a82ebf015ab43b763dc7b6', 0, 'Admin', 2);

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `id` int(11) NOT NULL,
  `custid` int(11) NOT NULL,
  `empname` varchar(150) NOT NULL,
  `totalprice` bigint(100) NOT NULL,
  `totalpoint` bigint(100) NOT NULL,
  `totaltime` varchar(100) NOT NULL,
  `isactive` tinyint(1) NOT NULL,
  `createddate` date NOT NULL,
  `updatedate` datetime DEFAULT NULL,
  `ispayment` tinyint(1) NOT NULL,
  `appointmentdate` date DEFAULT NULL,
  `timeslot` datetime DEFAULT NULL,
  `ratings` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `cartlist`
--

CREATE TABLE `cartlist` (
  `id` int(11) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `productid` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` int(50) NOT NULL,
  `createddate` datetime DEFAULT NULL,
  `updateddate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(15) NOT NULL,
  `isactive` tinyint(1) NOT NULL,
  `createddate` date NOT NULL,
  `updateddate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `isactive`, `createddate`, `updateddate`) VALUES
(4, 'Accessiores', 1, '2022-06-11', '0000-00-00'),
(7, 'Hair', 1, '2022-06-16', '0000-00-00'),
(8, 'test', 1, '2022-06-24', '0000-00-00'),
(9, 'test', 1, '2022-06-24', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `email` varchar(150) NOT NULL,
  `contact` varchar(15) NOT NULL,
  `whatsapp` varchar(15) NOT NULL,
  `gender` varchar(15) NOT NULL,
  `createddate` date NOT NULL,
  `updateddate` datetime DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `uid` int(11) NOT NULL,
  `vip` tinyint(1) NOT NULL,
  `isMembership` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `fname`, `lname`, `email`, `contact`, `whatsapp`, `gender`, `createddate`, `updateddate`, `address`, `uid`, `vip`, `isMembership`) VALUES
(27, 'RISHANG', 'PATEL', 'test@students.com', '9328233269', '9328233269', 'male', '2022-01-19', '2022-06-30 13:05:16', 'null', 27, 1, 0),
(978, 'Shubham', 'Patel', 'ptlshubham@gmail.com', '8141952604', '8141952604', 'male', '2022-03-29', NULL, 'Vaibhav Commercial Complex\nBlock C, Grid road', 1, 0, 0),
(981, 'Vaibhavi', 'Patel', 'ptlshubham@hotmail.com', '7016441159', '7016441159', 'Male', '2022-08-04', NULL, NULL, 148, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `custservices`
--

CREATE TABLE `custservices` (
  `id` int(11) NOT NULL,
  `servicesid` int(11) NOT NULL,
  `servicesname` varchar(200) NOT NULL,
  `custid` int(10) NOT NULL,
  `appointmentid` int(11) NOT NULL,
  `employeename` varchar(50) NOT NULL,
  `empid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `contact` varchar(15) NOT NULL,
  `whatsapp` varchar(15) NOT NULL,
  `address` varchar(150) NOT NULL,
  `city` varchar(50) NOT NULL,
  `pincode` int(15) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `isactive` tinyint(1) NOT NULL,
  `createddate` datetime NOT NULL,
  `updateddate` datetime DEFAULT NULL,
  `isworking` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `fname`, `lname`, `contact`, `whatsapp`, `address`, `city`, `pincode`, `gender`, `isactive`, `createddate`, `updateddate`, `isworking`) VALUES
(11, 'Aditya', 'Parekh', '9925070337', '9925070337', '1dg', 'Anand', 388001, 'male', 1, '2022-01-12 05:54:11', '2022-01-19 07:58:52', 0),
(12, 'Sujal', 'Sharma', '9510745629', '9510745629', '2', 'Anand', 388001, 'male', 1, '2022-01-12 05:55:13', NULL, 1),
(13, 'Imran', 'Khalifa', '8733966607', '8733966607', '3', 'Anand', 388001, 'male', 1, '2022-01-12 05:56:11', NULL, 1),
(14, 'Sahid', 'Khalifa', '9898173004', '9898173004', '4', 'Petlad', 388450, 'male', 1, '2022-01-12 05:56:47', NULL, 0),
(15, 'Mayank', 'Vaghela', '8401705268', '8401705268', '5', 'Anand', 388001, 'male', 1, '2022-01-12 05:58:23', NULL, 0),
(16, 'Sunil', 'Sharma', '8511688036', '8511688036', '6', 'Anand', 388001, 'male', 1, '2022-01-12 06:00:28', NULL, 0),
(22, 'Pratyux', 'Sir', '7862015958', '7862015958', 'a', 'Vaghasi', 388001, 'male', 1, '2022-01-12 06:30:10', NULL, 0),
(23, 'Vinu', 'Sir', '9824289713', '9824289713', 'a', 'Anand', 388001, 'male', 0, '2022-01-12 06:31:03', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `emppoints`
--

CREATE TABLE `emppoints` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `empid` int(11) NOT NULL,
  `spoint` int(25) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createddate` date NOT NULL,
  `updateddate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `empservices`
--

CREATE TABLE `empservices` (
  `id` int(11) NOT NULL,
  `servicesid` int(11) NOT NULL,
  `servicesname` varchar(50) NOT NULL,
  `empid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `enquiry`
--

CREATE TABLE `enquiry` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `dob` date NOT NULL,
  `emp` varchar(150) NOT NULL,
  `service` varchar(150) NOT NULL,
  `service1` varchar(150) NOT NULL,
  `certification` varchar(100) NOT NULL,
  `time` varchar(50) NOT NULL,
  `isactive` tinyint(1) NOT NULL,
  `createddate` datetime NOT NULL DEFAULT current_timestamp(),
  `updateddate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` int(10) NOT NULL,
  `expensesdate` date NOT NULL,
  `expensesname` varchar(50) NOT NULL,
  `expensesprices` int(10) NOT NULL,
  `employeename` varchar(50) NOT NULL,
  `paymenttype` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `productid` int(11) NOT NULL,
  `catid` int(11) NOT NULL,
  `listimages` varchar(100) NOT NULL,
  `createddate` date NOT NULL,
  `updateddate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `productid`, `catid`, `listimages`, `createddate`, `updateddate`) VALUES
(3, 41, 1, '/images/listimages/ae371f6e-60df-4096-beb9.png', '2022-06-12', '0000-00-00'),
(4, 41, 1, '/images/listimages/e20a18cb-fdc1-40ce-bd5f.png', '2022-06-12', '0000-00-00'),
(5, 42, 1, '/images/listimages/19cad0dc-6fea-4fe6-9e5f.png', '2022-06-13', '0000-00-00'),
(6, 42, 1, '/images/listimages/012ecdca-f171-493f-b66b.png', '2022-06-13', '0000-00-00'),
(7, 45, 1, '/images/listimages/12e8bf08-0c8e-4f84-a1f9.jpeg', '2022-06-21', '0000-00-00'),
(8, 46, 1, '/images/listimages/12e8bf08-0c8e-4f84-a1f9.jpeg', '2022-06-21', '0000-00-00'),
(9, 46, 1, '/images/listimages/1c574705-e44f-4bd7-add6.jpeg', '2022-06-21', '0000-00-00'),
(10, 47, 1, '/images/listimages/029a7244-abc6-499c-b14c.png', '2022-06-22', '0000-00-00'),
(11, 47, 1, '/images/listimages/6f06e266-a03c-4d03-a9d3.jpeg', '2022-06-22', '0000-00-00'),
(12, 52, 1, '/images/listimages/7e254311-a6ee-4648-a1de.png', '2022-06-30', '0000-00-00'),
(13, 52, 1, '/images/listimages/5bd85386-f3f5-4a4a-ac4c.jpeg', '2022-06-30', '0000-00-00'),
(14, 53, 1, '/images/listimages/7e254311-a6ee-4648-a1de.png', '2022-06-30', '0000-00-00'),
(15, 53, 1, '/images/listimages/5bd85386-f3f5-4a4a-ac4c.jpeg', '2022-06-30', '0000-00-00'),
(16, 54, 1, '/images/listimages/7e254311-a6ee-4648-a1de.png', '2022-06-30', '0000-00-00'),
(17, 54, 1, '/images/listimages/5bd85386-f3f5-4a4a-ac4c.jpeg', '2022-06-30', '0000-00-00'),
(18, 55, 1, '/images/listimages/7e254311-a6ee-4648-a1de.png', '2022-06-30', '0000-00-00'),
(19, 55, 1, '/images/listimages/5bd85386-f3f5-4a4a-ac4c.jpeg', '2022-06-30', '0000-00-00'),
(20, 56, 1, '/images/listimages/9c8a1439-ae77-45c6-a125.jpeg', '2022-06-30', '0000-00-00'),
(21, 57, 1, '/images/listimages/1f377a73-54bc-4225-93ca.png', '2022-06-30', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `logintime`
--

CREATE TABLE `logintime` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `login_minute` int(50) NOT NULL,
  `login_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `logintime`
--

INSERT INTO `logintime` (`id`, `userid`, `login_minute`, `login_date`) VALUES
(1, 2, 20013, '2022-08-04'),
(2, 148, 0, '2022-08-04'),
(3, 2, 1203, '2022-08-05'),
(4, 2, 1203, '2022-08-05');

-- --------------------------------------------------------

--
-- Table structure for table `membership`
--

CREATE TABLE `membership` (
  `id` int(70) NOT NULL,
  `membershipname` varchar(70) NOT NULL,
  `membershipdiscount` int(11) NOT NULL,
  `totalprice` int(11) NOT NULL,
  `membershipprice` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `membershipappointment`
--

CREATE TABLE `membershipappointment` (
  `id` int(70) NOT NULL,
  `membershipid` int(11) NOT NULL,
  `servicesname` varchar(70) NOT NULL,
  `membershipname` varchar(70) NOT NULL,
  `membershipprice` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `finalprice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `membershipservices`
--

CREATE TABLE `membershipservices` (
  `id` int(70) NOT NULL,
  `membershipid` int(11) NOT NULL,
  `servicesname` varchar(70) NOT NULL,
  `serviceid` int(11) NOT NULL,
  `totalprice` int(11) NOT NULL,
  `membershipname` varchar(70) NOT NULL,
  `quantity` int(5) NOT NULL,
  `serviceprice` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

CREATE TABLE `offer` (
  `id` int(70) NOT NULL,
  `offername` varchar(70) NOT NULL,
  `totalprice` int(11) NOT NULL,
  `offerprice` int(11) NOT NULL,
  `percentage` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `offerappointment`
--

CREATE TABLE `offerappointment` (
  `id` int(70) NOT NULL,
  `offerid` int(70) NOT NULL,
  `servicesname` varchar(70) NOT NULL,
  `offername` varchar(70) NOT NULL,
  `offerprice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `offerservices`
--

CREATE TABLE `offerservices` (
  `id` int(70) NOT NULL,
  `offerid` int(11) NOT NULL,
  `servicesname` varchar(70) NOT NULL,
  `totalprice` int(11) NOT NULL,
  `offername` varchar(60) NOT NULL,
  `offerprice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` int(11) NOT NULL,
  `oid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `oquant` int(11) NOT NULL,
  `createddate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orderlist`
--

CREATE TABLE `orderlist` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `totalprice` int(250) NOT NULL,
  `isactive` tinyint(1) NOT NULL,
  `orderdate` date NOT NULL,
  `createddate` date NOT NULL,
  `updateddate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `otp`
--

CREATE TABLE `otp` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `otp` int(5) NOT NULL,
  `createddate` date NOT NULL,
  `createdtime` time NOT NULL,
  `role` varchar(15) NOT NULL,
  `isactive` tinyint(1) NOT NULL,
  `email` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `otp`
--

INSERT INTO `otp` (`id`, `userid`, `otp`, `createddate`, `createdtime`, `role`, `isactive`, `email`) VALUES
(2, 0, 695967, '2022-08-04', '14:51:55', 'Customer', 1, 'ptlshubham@hotmail.com'),
(3, 0, 429160, '2022-08-04', '14:51:55', 'Customer', 1, 'ptlshubham@hotmail.com'),
(4, 1, 738917, '2022-08-05', '10:51:24', 'Customer', 1, NULL),
(5, 1, 517098, '2022-08-05', '10:52:52', 'Customer', 1, NULL),
(6, 1, 788077, '2022-08-05', '10:52:58', 'Customer', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  `appointmentid` int(11) NOT NULL,
  `cname` varchar(50) NOT NULL,
  `modeofpayment` varchar(50) NOT NULL,
  `tprice` int(11) NOT NULL,
  `tpoint` int(11) NOT NULL,
  `pdate` date NOT NULL,
  `createddate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `point`
--

CREATE TABLE `point` (
  `id` int(11) NOT NULL,
  `custid` int(11) NOT NULL,
  `totalcustpoint` bigint(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `image` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `purchasedate` date NOT NULL,
  `vendorname` varchar(25) NOT NULL,
  `vendorcontact` int(11) NOT NULL,
  `descripition` varchar(250) NOT NULL,
  `isactive` tinyint(1) NOT NULL,
  `createddate` datetime NOT NULL,
  `updateddate` datetime DEFAULT NULL,
  `display` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `category`, `price`, `quantity`, `purchasedate`, `vendorname`, `vendorcontact`, `descripition`, `isactive`, `createddate`, `updateddate`, `display`) VALUES
(52, 'comb', '/images/products/3ba1ad65-fc55-46f5-b388.jpeg', 'Accessiores', 100, 12, '2022-06-25', 'RUSHI', 2147483647, 'jbjb', 1, '2022-06-30 15:58:28', '2022-07-19 11:38:23', 1),
(53, 'comb', '/images/products/3ba1ad65-fc55-46f5-b388.jpeg', 'Accessiores', 100, 12, '2022-06-26', 'undefined', 2147483647, 'jbjb', 1, '2022-06-30 15:58:43', '2022-06-30 15:58:43', 1),
(54, 'comb', '/images/products/3ba1ad65-fc55-46f5-b388.jpeg', 'Hair', 100, 12, '2022-06-26', 'RUSHI', 2147483647, 'jbjb', 1, '2022-06-30 15:58:44', '2022-07-19 11:37:44', 1),
(55, 'comb', '/images/products/3ba1ad65-fc55-46f5-b388.jpeg', 'test', 100, 12, '2022-06-28', 'RUSHI', 2147483647, 'jbjb', 1, '2022-06-30 15:58:48', '2022-07-19 11:37:29', 0),
(57, 'Ethenic Wear', '/images/products/4d5219f6-ef95-422f-b515.png', 'Hair', 26, 0, '2022-07-01', 'fff', 2147483647, 'fd', 1, '2022-06-30 17:06:20', '2022-06-30 17:06:20', 1);

-- --------------------------------------------------------

--
-- Table structure for table `purchasedmembership`
--

CREATE TABLE `purchasedmembership` (
  `id` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  `memid` int(11) NOT NULL,
  `serid` int(11) NOT NULL,
  `sname` varchar(50) NOT NULL,
  `quntity` int(25) NOT NULL,
  `tprice` int(25) NOT NULL,
  `discount` int(11) NOT NULL,
  `dprice` int(250) NOT NULL,
  `isactive` tinyint(1) NOT NULL,
  `createddate` date NOT NULL,
  `updateddate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `purchasedoffer`
--

CREATE TABLE `purchasedoffer` (
  `id` int(11) NOT NULL,
  `custid` int(11) NOT NULL,
  `employeeid` int(11) NOT NULL,
  `offerid` int(11) NOT NULL,
  `appointmentId` int(11) NOT NULL,
  `payment` tinyint(1) NOT NULL,
  `offerprice` int(50) NOT NULL,
  `createddate` date NOT NULL,
  `updateddate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `salary`
--

CREATE TABLE `salary` (
  `id` int(11) NOT NULL,
  `salary` int(11) NOT NULL,
  `desc` varchar(200) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `paiddate` date DEFAULT NULL,
  `empid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `serviceslist`
--

CREATE TABLE `serviceslist` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` int(10) NOT NULL,
  `time` int(10) NOT NULL,
  `point` int(10) NOT NULL,
  `isactive` tinyint(1) NOT NULL,
  `createdate` datetime NOT NULL,
  `updateddate` datetime DEFAULT NULL,
  `epoint` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `serviceslist`
--

INSERT INTO `serviceslist` (`id`, `name`, `price`, `time`, `point`, `isactive`, `createdate`, `updateddate`, `epoint`) VALUES
(9, 'R Director Cut', 500, 45, 50, 1, '2022-01-12 05:53:02', '2022-01-12 06:09:44', 0),
(11, 'R Master Cut', 400, 50, 40, 1, '2022-01-12 06:32:15', '2022-06-24 23:34:23', 0),
(12, 'R Child Cut', 300, 45, 30, 1, '2022-01-12 06:33:55', '2022-01-12 06:34:45', 0),
(14, 'R Cleansing wash ', 150, 52, 15, 1, '2022-01-12 06:38:09', NULL, 0),
(15, 'R Cleansing wash ', 150, 52, 15, 1, '2022-01-12 06:38:10', NULL, 0),
(16, 'R Relaxing wash', 250, 32, 25, 1, '2022-01-12 06:39:34', NULL, 0),
(17, 'R Relaxing wash', 250, 32, 25, 1, '2022-01-12 06:39:34', NULL, 0),
(18, 'R Hair uto shoulder ', 250, 20, 25, 1, '2022-01-12 06:40:56', NULL, 0),
(19, 'R Hair below shoulder', 300, 20, 30, 1, '2022-01-12 06:42:14', NULL, 0),
(20, 'R Hair upto waist', 400, 20, 40, 1, '2022-01-12 06:42:56', NULL, 0),
(21, 'R Ironing hair upto shoulder', 400, 40, 40, 1, '2022-01-12 06:44:44', NULL, 0),
(22, 'R Ironing hair below shoulder', 500, 40, 50, 1, '2022-01-12 06:45:36', NULL, 0),
(23, 'R Ironing hair upto waist', 700, 40, 70, 1, '2022-01-12 06:46:11', NULL, 0),
(24, 'R Premium cleanup', 500, 29, 50, 1, '2022-01-12 06:50:21', NULL, 0),
(25, 'R basic facial ', 800, 34, 80, 1, '2022-01-12 06:51:11', NULL, 0),
(26, 'R LOREAL HAIR SPA  ONE SCOOP', 600, 100, 60, 1, '2022-01-12 08:02:41', NULL, 0),
(27, 'R LOREAL HAIR SPA  TWO SCOOP ', 800, 99, 80, 1, '2022-01-12 08:04:37', NULL, 0),
(28, 'R LOREAL HAIR SPA  TWO SCOOP ', 800, 99, 80, 1, '2022-01-12 08:04:37', NULL, 0),
(29, 'R LOREAL HAIR SPA THREE SCOOP', 1000, 99, 100, 1, '2022-01-12 08:06:43', NULL, 0),
(30, 'R POWER MIX HAIR UPTO NECK', 999, 62, 99, 1, '2022-01-12 08:07:57', NULL, 0),
(31, 'R POWER MIX HAIR UPTO SHOULDER', 1099, 62, 109, 1, '2022-01-12 08:10:51', NULL, 0),
(32, 'R POWER MIX HAIR BELOW SHOULDER', 1299, 62, 129, 1, '2022-01-12 08:16:33', NULL, 0),
(33, 'R POWER MIX HAIR WAIST', 1499, 62, 149, 1, '2022-01-12 08:21:04', NULL, 0),
(34, 'R SCALP TREATMENT ANTI DANDRUFF', 1400, 62, 140, 1, '2022-01-12 08:26:11', NULL, 0),
(35, 'R SCALP TREATMENT INNER SPA', 1400, 62, 140, 1, '2022-01-12 08:27:48', NULL, 0),
(36, 'R SCALP TREATMENT POLLUTION SCRUB', 1400, 62, 140, 1, '2022-01-12 08:29:10', NULL, 0),
(37, 'R HEAD MASSAGE WITHOUT SHAMPOO', 400, 20, 40, 1, '2022-01-12 08:34:11', NULL, 0),
(38, 'R HEAD MASSAGE WITH SHAMPOO', 550, 20, 55, 1, '2022-01-12 08:35:19', NULL, 0),
(39, 'R PEDICURE BASIC WITHOUT MASSAGE', 500, 99, 50, 1, '2022-01-12 08:39:07', NULL, 0),
(40, 'R PEDICURE STANDARD LOTUS', 1000, 104, 100, 1, '2022-01-12 08:41:13', NULL, 0),
(41, 'R PEDICURE LUXURIOUS CHERYS', 1500, 104, 150, 1, '2022-01-12 08:43:50', NULL, 0),
(42, 'R MANICURE BASIC WITHOUT MASSAGE', 500, 89, 50, 1, '2022-01-12 08:59:36', NULL, 0),
(43, 'R MENICURE STANDARD LOTUS', 1000, 94, 100, 1, '2022-01-12 09:02:51', NULL, 0),
(44, 'R MENICURE STANDARD LOTUS', 1000, 94, 100, 1, '2022-01-12 09:02:51', NULL, 0),
(45, 'R MENICURE STANDARD LOTUS', 1000, 94, 100, 1, '2022-01-12 09:02:51', NULL, 0),
(46, 'R MENICURE LUXURIOUS CHERYS', 1500, 94, 150, 1, '2022-01-12 09:05:35', NULL, 0),
(47, 'R BODY SPA BODY MASSAGE ', 2000, 70, 200, 1, '2022-01-12 09:07:35', NULL, 0),
(48, 'R BODY POLISH  WITH MASSAGE ', 4000, 110, 400, 1, '2022-01-12 09:09:02', NULL, 0),
(49, 'R BODY SPA', 6000, 125, 600, 1, '2022-01-12 09:09:42', NULL, 0),
(50, 'R Color Touchup two inch Premium', 800, 152, 80, 1, '2022-01-12 09:33:26', '2022-01-12 09:34:10', 0),
(51, 'R Color touchup two inch organic', 900, 152, 90, 1, '2022-01-12 09:39:02', NULL, 0),
(52, 'R color touchup upto four  inch premimum', 1000, 152, 100, 1, '2022-01-12 10:40:51', NULL, 0),
(53, 'R color touchup four inch organic ', 1200, 152, 120, 1, '2022-01-12 10:41:45', NULL, 0),
(54, 'R Global color  hair upto neck premium', 1000, 152, 100, 1, '2022-01-12 10:46:57', NULL, 0),
(55, 'R Global color hair upto neck  organic ', 1300, 152, 130, 1, '2022-01-12 10:56:36', NULL, 0),
(56, 'R Global color hair upto shoulder premium', 1200, 152, 120, 1, '2022-01-12 11:02:05', NULL, 0),
(57, 'R Global color hair upto shoulder organic', 1800, 152, 180, 1, '2022-01-12 11:03:34', NULL, 0),
(58, 'R  Global color hair below shoulder premium', 1500, 152, 150, 1, '2022-01-12 11:05:36', NULL, 0),
(59, 'R Global color hair below shoulder organic', 2200, 152, 220, 1, '2022-01-12 11:06:51', NULL, 0),
(60, 'R Global color hair upto waist premium', 1800, 152, 180, 1, '2022-01-12 11:07:56', NULL, 0),
(61, 'R Global color hair upto waist organic', 2500, 152, 250, 1, '2022-01-12 11:10:20', NULL, 0),
(62, 'R Highlight color per streak ', 300, 60, 30, 1, '2022-01-12 11:12:28', NULL, 0),
(63, 'R Highlight hair upto neck ', 1500, 60, 150, 1, '2022-01-12 11:14:11', '2022-01-12 11:17:33', 0),
(64, 'R Highlight hair upto shoulder', 2400, 60, 240, 1, '2022-01-12 11:16:37', NULL, 0),
(65, 'R Highlight hair upto waist ', 4800, 60, 480, 1, '2022-01-12 11:22:50', NULL, 0),
(66, 'R pre lightning color per streak', 300, 60, 30, 1, '2022-01-12 11:25:57', NULL, 0),
(67, 'R pre lightning hair upto neck ', 600, 60, 60, 1, '2022-01-12 11:26:47', NULL, 0),
(68, 'R Pre lightning hair upto shoulder ', 1000, 60, 100, 1, '2022-01-12 11:27:48', NULL, 0),
(69, 'R Pre lightning hair below  shoulder ', 1300, 60, 130, 1, '2022-01-12 11:32:56', NULL, 0),
(70, 'R Pre lightning hair upto waist ', 1500, 60, 150, 1, '2022-01-12 11:35:13', NULL, 0),
(71, 'R smoothning fringe ', 700, 120, 70, 1, '2022-01-12 11:38:20', NULL, 0),
(72, 'R smoothing hair upto neck ', 2800, 281, 280, 1, '2022-01-12 11:39:38', NULL, 0),
(73, 'R smoothning hair upto shoulder ', 4000, 281, 400, 1, '2022-01-12 11:41:13', NULL, 0),
(74, 'R Smoothning hair below shoulder ', 4400, 281, 440, 1, '2022-01-12 11:42:17', NULL, 0),
(75, 'R smoothning hair upto waist ', 5800, 281, 580, 1, '2022-01-12 11:43:04', NULL, 0),
(76, 'R protein treatment step one', 500, 20, 50, 1, '2022-01-12 11:45:35', NULL, 0),
(77, 'R protein treatment step two ', 500, 20, 50, 1, '2022-01-12 11:47:05', NULL, 0),
(78, 'R keratin  fringe', 700, 120, 70, 1, '2022-01-12 11:48:38', NULL, 0),
(79, 'R keratin hair upto neck ', 2800, 264, 280, 1, '2022-01-12 11:49:40', '2022-01-12 11:49:58', 0),
(80, 'R keratin hair upto shoulder ', 4000, 264, 400, 1, '2022-01-12 11:50:50', NULL, 0),
(81, 'R keratin hair below shoulder ', 4400, 264, 440, 1, '2022-01-12 11:51:29', NULL, 0),
(82, 'R keratin hair upto waist ', 5800, 264, 580, 1, '2022-01-12 11:52:07', NULL, 0),
(83, 'R Bleach and Dtan Under Arms', 200, 20, 20, 1, '2022-01-12 11:54:42', '2022-01-12 12:06:22', 0),
(84, 'R Bleach and Dtan face', 300, 15, 30, 1, '2022-01-12 11:56:17', '2022-01-12 12:06:28', 0),
(85, 'R Bleach and Dtan Neck', 200, 20, 20, 1, '2022-01-12 11:56:46', '2022-01-12 12:06:34', 0),
(86, 'R Bleach and Dtan Full arms', 300, 20, 30, 1, '2022-01-12 11:57:18', '2022-01-12 12:06:12', 0),
(87, 'R Bleach and Dtan Full legs', 600, 30, 60, 1, '2022-01-12 11:57:40', '2022-01-12 12:06:05', 0),
(88, 'R Bleach and Dtan Half arms', 150, 20, 15, 1, '2022-01-12 11:58:30', '2022-01-12 12:05:59', 0),
(89, 'R Bleach and Dtan Half legs', 300, 30, 30, 1, '2022-01-12 12:00:18', '2022-01-12 12:05:52', 0),
(90, 'R Bleach and Dtan Full front', 500, 30, 50, 1, '2022-01-12 12:00:43', '2022-01-12 12:05:45', 0),
(91, 'R Bleach and Dtan Half front', 300, 30, 30, 1, '2022-01-12 12:01:05', '2022-01-12 12:05:24', 0),
(92, 'R Bleach and Dtan Full back', 500, 30, 50, 1, '2022-01-12 12:01:24', '2022-01-12 12:05:17', 0),
(93, 'R Bleach and Dtan Half back', 300, 30, 30, 1, '2022-01-12 12:01:42', '2022-01-12 12:05:11', 0),
(94, 'R Bleach and Dtan Stomach', 300, 30, 30, 1, '2022-01-12 12:02:14', '2022-01-12 12:05:02', 0),
(95, 'R Bleach and Dtan feet', 200, 20, 20, 1, '2022-01-12 12:02:36', '2022-01-12 12:04:55', 0),
(96, 'R Bleach and Dtan Full body', 2000, 60, 200, 1, '2022-01-12 12:02:54', '2022-01-12 12:04:43', 0),
(97, 'R Waxing Under arms Regular', 50, 10, 5, 1, '2022-01-12 12:07:56', NULL, 0),
(98, 'R Waxing Under arms Lipo', 100, 10, 10, 1, '2022-01-12 12:08:22', NULL, 0),
(99, 'R Waxing Under arms Brazilian', 100, 10, 10, 1, '2022-01-12 12:08:48', NULL, 0),
(100, 'R Waxing full arms regular', 200, 40, 20, 1, '2022-01-12 12:09:27', NULL, 0),
(101, 'R Waxing Full arms Lipo', 300, 40, 30, 1, '2022-01-12 12:12:07', NULL, 0),
(102, 'R Waxing Half arms regular', 100, 30, 10, 1, '2022-01-12 12:12:30', NULL, 0),
(103, 'R Waxing Half arms Lipo', 300, 30, 30, 1, '2022-01-12 12:13:09', NULL, 0),
(104, 'R Waxing Full legs Regular', 400, 60, 40, 1, '2022-01-12 12:13:38', NULL, 0),
(105, 'R Waxing Full legs lipo', 600, 60, 60, 1, '2022-01-12 12:14:03', NULL, 0),
(106, 'R Waxing Half legs regular', 200, 40, 20, 1, '2022-01-12 12:14:40', NULL, 0),
(107, 'R Waxing Half legs Lipo', 300, 40, 30, 1, '2022-01-12 12:15:01', NULL, 0),
(108, 'R Waxing full front regular', 200, 40, 20, 1, '2022-01-12 12:15:35', NULL, 0),
(109, 'R Waxing Full front lipo', 400, 40, 40, 1, '2022-01-12 12:16:11', NULL, 0),
(110, 'R Waxing Half front regular', 100, 30, 10, 1, '2022-01-12 12:16:39', NULL, 0),
(111, 'R Waxing Half front Lipo', 200, 30, 20, 1, '2022-01-12 12:17:22', NULL, 0),
(112, 'R Waxing Full back regular', 200, 40, 20, 1, '2022-01-12 12:19:17', NULL, 0),
(113, 'R Waxing Full back Lipo', 400, 40, 40, 1, '2022-01-12 12:19:41', NULL, 0),
(114, 'R Waxing Half back regular', 100, 30, 10, 1, '2022-01-12 12:20:07', NULL, 0),
(115, 'R Waxing Half back Lipo', 200, 30, 20, 1, '2022-01-12 12:20:27', NULL, 0),
(116, 'R Waxing Stomach regular', 100, 40, 10, 1, '2022-01-12 12:21:30', NULL, 0),
(117, 'R Waxing Stomach lipo', 200, 40, 20, 1, '2022-01-12 12:21:53', NULL, 0),
(118, 'R Waxing B wax regular', 600, 20, 60, 1, '2022-01-12 12:23:27', NULL, 0),
(119, 'R Waxing B wax lipo', 1000, 20, 100, 1, '2022-01-12 12:23:49', NULL, 0),
(120, 'R Waxing B Wax brazilian', 1000, 20, 100, 1, '2022-01-12 12:24:27', NULL, 0),
(121, 'R Waxing Full body regular', 1000, 90, 100, 1, '2022-01-12 12:24:55', NULL, 0),
(122, 'R Waxing full body Lipo ', 2000, 90, 200, 1, '2022-01-12 12:25:26', NULL, 0),
(123, 'Waxing Brazilian Upper lips', 50, 10, 5, 1, '2022-01-12 12:26:30', NULL, 0),
(124, 'Waxing Brazilian Chin', 50, 10, 5, 1, '2022-01-12 12:26:49', NULL, 0),
(125, 'Waxing Brazilian Face', 400, 40, 40, 1, '2022-01-12 12:27:22', NULL, 0),
(126, 'Waxing Brazilian Jaw line', 50, 10, 5, 1, '2022-01-12 12:28:16', NULL, 0),
(127, 'Waxing Brazilian Side locks', 100, 15, 10, 1, '2022-01-12 12:28:35', NULL, 0),
(128, 'Threading Eyebrow', 50, 20, 5, 1, '2022-01-12 12:29:06', NULL, 0),
(129, 'Threading Upper lips', 10, 10, 1, 1, '2022-01-12 12:29:53', NULL, 0),
(130, 'Threading Chin', 10, 10, 1, 1, '2022-01-12 12:30:10', NULL, 0),
(131, 'Threading Forehead', 20, 10, 2, 1, '2022-01-12 12:30:29', NULL, 0),
(132, 'Threading Jawline', 40, 10, 4, 1, '2022-01-12 12:30:48', NULL, 0),
(133, 'Threading Sidelocks', 20, 15, 2, 1, '2022-01-12 12:31:12', NULL, 0),
(134, 'Threading Full face', 100, 40, 10, 1, '2022-01-12 12:31:33', NULL, 0),
(135, 'A Director Cut', 150, 45, 15, 1, '2022-01-16 06:31:31', NULL, 0),
(136, 'A MASTER CUT', 120, 45, 12, 1, '2022-01-16 06:32:45', NULL, 0),
(137, 'A SHAVING', 50, 20, 5, 1, '2022-01-16 06:36:04', NULL, 0),
(138, 'A PREMIUM SHAVING', 80, 20, 8, 1, '2022-01-16 06:36:41', NULL, 0),
(139, 'A BEARD SET', 60, 20, 6, 1, '2022-01-16 06:37:08', NULL, 0),
(140, 'A PREMIUM BEARD SET ', 80, 25, 8, 1, '2022-01-16 06:37:39', NULL, 0),
(141, 'A CLEANSING HAIRBATH', 50, 12, 5, 1, '2022-01-16 06:39:07', '2022-06-30 13:05:42', 15),
(142, 'A RELAXING HAIRBATH', 100, 12, 10, 1, '2022-01-16 06:39:44', NULL, 0),
(143, 'A STYLING', 50, 10, 5, 1, '2022-01-16 06:40:03', NULL, 0),
(144, 'A FACE WASH', 50, 5, 5, 1, '2022-01-16 06:40:27', '2022-06-30 13:05:55', 25),
(145, 'A STANDARD HEAD MASSAGE', 200, 15, 20, 1, '2022-01-16 06:41:46', NULL, 0),
(146, 'A PREMIUM HEAD MASSAGE', 400, 30, 40, 1, '2022-01-16 06:42:19', NULL, 0),
(147, 'A STANDARD HAIRSPA', 500, 30, 50, 1, '2022-01-16 06:43:04', NULL, 0),
(148, 'A PREMIUM HAIRSPA', 1000, 45, 100, 1, '2022-01-16 06:43:28', NULL, 0),
(149, 'prnv', 2, 1, 3, 1, '2022-06-13 10:30:50', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `stocklist`
--

CREATE TABLE `stocklist` (
  `id` int(11) NOT NULL,
  `sname` varchar(50) NOT NULL,
  `sprice` int(10) NOT NULL,
  `sserialnumber` int(20) NOT NULL,
  `squality` int(10) NOT NULL,
  `stype` varchar(50) NOT NULL,
  `sdealername` varchar(50) NOT NULL,
  `sdealercontact` int(10) NOT NULL,
  `sdealdate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `role` varchar(50) NOT NULL,
  `isactive` tinyint(1) NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `in_time` datetime DEFAULT NULL,
  `out_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `email`, `password`, `role`, `isactive`, `status`, `in_time`, `out_time`) VALUES
(1, 'ptlshubham@gmail.com', '22b596cc89584ab9a7a82ebf015ab43b763dc7b6', 'Customer', 1, 1, '2022-06-25 00:09:04', '2022-06-09 14:39:51'),
(2, 'admin@gmail.com', '22b596cc89584ab9a7a82ebf015ab43b763dc7b6', 'Admin', 1, 0, '2022-08-04 15:52:05', '2022-08-05 10:51:15'),
(12, 'test@parents.com', '22b596cc89584ab9a7a82ebf015ab43b763dc7b6', 'Parents', 1, 1, '2022-01-13 11:10:37', '2022-01-06 17:23:57'),
(17, 'prnv@gmail.com', '22b596cc89584ab9a7a82ebf015ab43b763dc7b6', 'Sub-Admin', 1, 0, '2022-01-07 16:26:13', '2022-01-13 11:16:27'),
(27, 'test@students.com', '22b596cc89584ab9a7a82ebf015ab43b763dc7b6', 'Customer', 1, 0, '2022-07-21 17:15:59', '2022-07-21 17:17:50'),
(148, 'ptlshubham@hotmail.com', '22b596cc89584ab9a7a82ebf015ab43b763dc7b6', 'Customer', 1, 0, '2022-08-04 14:54:41', '2022-08-04 14:57:45');

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `id` int(11) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `gst` varchar(25) NOT NULL,
  `contact` varchar(25) NOT NULL,
  `whatsapp` varchar(15) NOT NULL,
  `address` varchar(150) NOT NULL,
  `city` varchar(50) NOT NULL,
  `pincode` int(15) NOT NULL,
  `isactive` tinyint(1) NOT NULL,
  `createdate` datetime NOT NULL,
  `updatedate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`id`, `fname`, `gst`, `contact`, `whatsapp`, `address`, `city`, `pincode`, `isactive`, `createdate`, `updatedate`) VALUES
(5, 'RUSHI', '01AAAAA0000A1Z2', '4646464646', '4646464646', '979797SVVSVnjj', 'fggf', 646464, 1, '2022-06-15 17:19:26', '2022-06-16 11:59:54'),
(6, 'test', '01AAAAA0000A1Z2', '4646464646', '6464646464', 'thetdhedh', 'adhdch', 344334, 1, '2022-06-15 19:13:24', '2022-06-16 10:58:14'),
(7, 'test', '01AAAAA0000A1Z2', '5464646464', '6464646464', 'vgjcvjvjv', 'fggf', 344334, 1, '2022-06-15 19:51:54', '2022-06-15 19:51:54');

-- --------------------------------------------------------

--
-- Table structure for table `webbanners`
--

CREATE TABLE `webbanners` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `bannersimage` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `webbanners`
--

INSERT INTO `webbanners` (`id`, `name`, `bannersimage`, `status`) VALUES
(9, 'Top', '/images/banners/c149114d-cd50-4681-9966.png', 1),
(10, 'Top', '/images/banners/7accdf6c-3f8f-434a-a38c.png', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cartlist`
--
ALTER TABLE `cartlist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `custservices`
--
ALTER TABLE `custservices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `emppoints`
--
ALTER TABLE `emppoints`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `empservices`
--
ALTER TABLE `empservices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `enquiry`
--
ALTER TABLE `enquiry`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logintime`
--
ALTER TABLE `logintime`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `membership`
--
ALTER TABLE `membership`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `membershipappointment`
--
ALTER TABLE `membershipappointment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `membershipservices`
--
ALTER TABLE `membershipservices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `offer`
--
ALTER TABLE `offer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `offerappointment`
--
ALTER TABLE `offerappointment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `offerservices`
--
ALTER TABLE `offerservices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderlist`
--
ALTER TABLE `orderlist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `otp`
--
ALTER TABLE `otp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `point`
--
ALTER TABLE `point`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchasedmembership`
--
ALTER TABLE `purchasedmembership`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchasedoffer`
--
ALTER TABLE `purchasedoffer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `salary`
--
ALTER TABLE `salary`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empid` (`empid`);

--
-- Indexes for table `serviceslist`
--
ALTER TABLE `serviceslist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stocklist`
--
ALTER TABLE `stocklist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `webbanners`
--
ALTER TABLE `webbanners`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cartlist`
--
ALTER TABLE `cartlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=982;

--
-- AUTO_INCREMENT for table `custservices`
--
ALTER TABLE `custservices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `emppoints`
--
ALTER TABLE `emppoints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `empservices`
--
ALTER TABLE `empservices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `enquiry`
--
ALTER TABLE `enquiry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `logintime`
--
ALTER TABLE `logintime`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `membership`
--
ALTER TABLE `membership`
  MODIFY `id` int(70) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `membershipappointment`
--
ALTER TABLE `membershipappointment`
  MODIFY `id` int(70) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `membershipservices`
--
ALTER TABLE `membershipservices`
  MODIFY `id` int(70) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `offer`
--
ALTER TABLE `offer`
  MODIFY `id` int(70) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `offerappointment`
--
ALTER TABLE `offerappointment`
  MODIFY `id` int(70) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `offerservices`
--
ALTER TABLE `offerservices`
  MODIFY `id` int(70) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orderlist`
--
ALTER TABLE `orderlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `otp`
--
ALTER TABLE `otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `point`
--
ALTER TABLE `point`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `purchasedmembership`
--
ALTER TABLE `purchasedmembership`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchasedoffer`
--
ALTER TABLE `purchasedoffer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `salary`
--
ALTER TABLE `salary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `serviceslist`
--
ALTER TABLE `serviceslist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;

--
-- AUTO_INCREMENT for table `stocklist`
--
ALTER TABLE `stocklist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `webbanners`
--
ALTER TABLE `webbanners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `salary`
--
ALTER TABLE `salary`
  ADD CONSTRAINT `salary_ibfk_1` FOREIGN KEY (`empid`) REFERENCES `employee` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
