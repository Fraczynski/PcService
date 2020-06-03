--
-- Dumping data for table `__efmigrationshistory`
--

LOCK TABLES `__efmigrationshistory` WRITE;
INSERT INTO `__efmigrationshistory` VALUES ('20200417090414_CreateRequiredEntities','3.1.2'),('20200529075127_AddInvoiceIdToEquipmentsEntity','3.1.2');
UNLOCK TABLES;

--
-- Dumping data for table `aspnetroleclaims`
--

LOCK TABLES `aspnetroleclaims` WRITE;
UNLOCK TABLES;

--
-- Dumping data for table `aspnetroles`
--

LOCK TABLES `aspnetroles` WRITE;
INSERT INTO `aspnetroles` VALUES (1,'Client','CLIENT','df90d8dc-d3f0-4cdc-ab8a-d7cf9089db34'),(2,'Salesman','SALESMAN','f1bde6d6-1147-47e5-85a0-d75ddbcabcf6'),(3,'Serviceman','SERVICEMAN','f239f679-465b-465d-94ef-4d2cb2b2802b'),(4,'Administrator','ADMINISTRATOR','0ec00e04-f059-4e9d-8411-c78d357ad231');
UNLOCK TABLES;

--
-- Dumping data for table `aspnetuserroles`
--

LOCK TABLES `aspnetuserroles` WRITE;
INSERT INTO `aspnetuserroles` VALUES (1,1),(2,1),(3,1),(5,1),(6,1),(8,1),(9,1),(10,1),(12,2),(7,3),(13,3),(11,4);
UNLOCK TABLES;

--
-- Dumping data for table `aspnetusers`
--

LOCK TABLES `aspnetusers` WRITE;
INSERT INTO `aspnetusers` VALUES (1,'Lola','LOLA','lola@gmail.com','LOLA@GMAIL.COM',0,'AQAAAAEAACcQAAAAENrsThb8KiOCL2hLhQvi/VMi0TNC1D2ozzBlNHRsKceDZgMPIXebBH1d7oiGJkiX9w==','ORXTC5K2EDKN3AXDBUU74H2MV2FFTLL5','1c170a20-c89a-4243-8895-047415745664',NULL,0,0,NULL,1,0,NULL,NULL),(2,'Dorothy','DOROTHY',NULL,NULL,0,'AQAAAAEAACcQAAAAEPNvPMJt8NAz1Csq0ZcctPXS423pb7cf7JBIlVoCwijvFYZMkufB9OjXl1rQgyJXyQ==','PRM4WFAX2Y2YYMHA3UWEEIY47DLP4W37','ac79c279-1d78-4092-85a1-7bc4532bf573',NULL,0,0,NULL,1,0,NULL,NULL),(3,'Reba','REBA',NULL,NULL,0,'AQAAAAEAACcQAAAAEPhTrT+xI/keOSxr2qSv2rLhZ6JnkiXfzmuHwYiW4k5poLKM8tioVy6+7zGB/JaL8A==','2KFYF5N26SAD6JDJKN74ZUUAZLDPBE3M','bd91e385-578a-44b2-83b2-b9507a153b73',NULL,0,0,NULL,1,0,NULL,NULL),(4,'Annmarie','ANNMARIE',NULL,NULL,0,'AQAAAAEAACcQAAAAEFQYetQ3TwhOmMdilcWuttJCYIh+fy/rXeq90472yxr1csG0m+V1LSfmN8HhiQX53Q==','JEBZHKW4BWSQTQXEHXY3IJLASJFFZAO5','de4f0ee8-871b-4759-8bf3-8e89f99e666c',NULL,0,0,NULL,1,0,NULL,NULL),(5,'Ashley','ASHLEY',NULL,NULL,0,'AQAAAAEAACcQAAAAED7o4AKku2U3H1HolRm4Y9GqC7VRYq5Qe+/0JWdlEWZPNUXUGfXqSCcvjrrv+gOp2A==','CZSGONLYQIVIHWN5XZ2XXGJKNLNU3POE','782a790a-d41e-4e65-ad98-1f09de48f8d0',NULL,0,0,NULL,1,0,NULL,NULL),(6,'Roy','ROY',NULL,NULL,0,'AQAAAAEAACcQAAAAEDV9IBocMvT1lsw5zm9QVLJC2itu4FPpcJSVp596lN0LaCkd+Yt1brpayAZfoiVYTg==','7I6MCXK3O4ZSQVZO4EIYBMW6SUXJIXRW','0584b672-39a8-45c1-b2a1-cfa2fc8ad91c',NULL,0,0,NULL,1,0,NULL,NULL),(7,'Duke','DUKE',NULL,NULL,0,'AQAAAAEAACcQAAAAEPZEGgX38UidUiZKEAt0+jPDMmx7uFeBrZnHh5H91NUHjjaWBwE7nPnJm+Unvdx3oA==','UT7U6REB7I6BF2MKKFUSZOGIGSRS7AGE','938c8fad-f9f5-427f-b853-1003e52f8d9f',NULL,0,0,NULL,1,0,NULL,NULL),(8,'Lloyd','LLOYD',NULL,NULL,0,'AQAAAAEAACcQAAAAEF2G+ln45YDUxVohJcHzbxB8lv4+LYSWXj8J40v/LsLXk+4Vxs+ve7XnR0TS/I9yPg==','DVCCYLFOW6FDLBI3QRAP57V63MKLAADQ','6a9be3d2-c413-4224-b62a-006cbf837e5d',NULL,0,0,NULL,1,0,NULL,NULL),(9,'Larsen','LARSEN',NULL,NULL,0,'AQAAAAEAACcQAAAAEAdLeyR325UPaIZVmNFvjG3f3BjKeTrPucoAtVwIDQ4JhvqzopuBQyioNm/S+T2AUg==','FMTVGLQOYLDXR2P5NTZC2BOKWPVFDMW2','a946aca1-7c66-4ef0-981c-f3c66e428ee1',NULL,0,0,NULL,1,0,NULL,NULL),(10,'Simon','SIMON',NULL,NULL,0,'AQAAAAEAACcQAAAAEAgzt6rVNy4edkCNHQojz6TLCpLx6tJ02QkuECzBqwNvKI01bSUNCVHHKRrtt/HmzA==','N2ZYGKSRY23E4HUR6AAAC5N2GS2SCJ3K','121944db-8c43-4bdf-a49b-6be375dd6d3c',NULL,0,0,NULL,1,0,NULL,NULL),(11,'Admin','ADMIN',NULL,NULL,0,'AQAAAAEAACcQAAAAEASZouEr9JFTCwLjFcifpOncR7YvSMfWJaofmKDweyvyWYRMIZdVU1qglMtVRfVKZA==','3FNGJEONXDSWQNV4G47AUI2YIYW5F56N','da8fdbd8-315a-4df9-86a4-ee8eae6e1d51',NULL,0,0,NULL,1,0,NULL,NULL),(12,'ekspedient','EKSPEDIENT','kowalski@gmail.com','KOWALSKI@GMAIL.COM',0,'AQAAAAEAACcQAAAAEGLb4iSwspyfw/lhH8rmSbaMY3cNXzhKZpZ9/druLQAy+eZk9JiATAKzTFnrhy8CSg==','CRITLKHRLPXUNQ2N7T5CDAPAAJRQQM3R','cd2bc9b5-f4e8-4139-8a39-20803bd06d3b','789789789',0,0,NULL,1,0,'Jan','Kowalski'),(13,'Serwisant','SERWISANT','nowak@gmail.com','NOWAK@GMAIL.COM',0,'AQAAAAEAACcQAAAAEBVFF1hPOy7Esa/4tGqwpLPuYJmqaECp+Lbo4mdHzBq3W5X1q41JPsw0wCG8b2uzJw==','W75DYDSMFFRRJICBZNVP7A53I6BWK62U','d677260b-b288-42ca-b804-bb26a4c17459','789789789',0,0,NULL,1,0,'Adam','Nowak');
UNLOCK TABLES;

--
-- Dumping data for table `aspnetusertokens`
--

LOCK TABLES `aspnetusertokens` WRITE;
UNLOCK TABLES;

--
-- Dumping data for table `elementnames`
--

LOCK TABLES `elementnames` WRITE;
INSERT INTO `elementnames` VALUES (1,'Ekran'),(2,'Głośnik'),(3,'Klawiatura'),(4,'Mysz');
UNLOCK TABLES;

--
-- Dumping data for table `elements`
--

LOCK TABLES `elements` WRITE;
INSERT INTO `elements` VALUES (1,1,NULL,1,1,'Wymiana matrycy',1,50,40,NULL),(2,2,NULL,1,1,'Wymiana matrycy',0,50,60,'2020-04-09 18:26:42.000000'),(3,2,7,2,2,'Wymiana głośnika tylnego',1,10,780,'2020-05-07 20:00:00.000000'),(6,4,NULL,1,1,'Wymiana taśmy zasilającej ekran',0,80,50,'1969-12-31 22:00:00.000000'),(7,4,13,3,2,'Wymiana przycisków',0,50,130,'1970-01-01 00:00:00.000000');
UNLOCK TABLES;

--
-- Dumping data for table `elementstatuses`
--

LOCK TABLES `elementstatuses` WRITE;
INSERT INTO `elementstatuses` VALUES (1,'Zgłoszony do naprawy'),(2,'Naprawiany'),(3,'Naprawiony');
UNLOCK TABLES;

--
-- Dumping data for table `equipments`
--

LOCK TABLES `equipments` WRITE;
INSERT INTO `equipments` VALUES (1,1,12,'Laptop Asus',4,'Nie działa ekran','2020-04-17 11:50:14.841605','2020-04-23 09:48:18.011766',NULL),(2,1,12,'Telefon Samsung',4,'Nie działa głośnik','2020-04-20 13:08:23.234279','2020-04-27 23:53:32.231088',NULL),(4,1,12,'Komputer Macintosh',4,'Nie działa ekran oraz klawiatura','2020-05-18 14:37:39.501009','2020-05-18 15:10:30.720249',NULL),(5,1,12,'Telefon',1,'Nie działa ekran','2020-05-18 15:25:48.552151',NULL,NULL),(6,1,12,'Telefon 2',1,'Nie działa głośnik','2020-05-18 15:26:38.643218',NULL,NULL);
UNLOCK TABLES;

--
-- Dumping data for table `equipmentstatuses`
--

LOCK TABLES `equipmentstatuses` WRITE;
INSERT INTO `equipmentstatuses` VALUES (1,'Zgłoszony do naprawy'),(2,'Naprawiany'),(3,'Naprawiony'),(4,'Wydany');
UNLOCK TABLES;

-- Dump completed on 2020-06-03 10:06:13
