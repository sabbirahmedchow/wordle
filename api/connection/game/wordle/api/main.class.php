<?php
//error_reporting(1);

require_once('./connection/config.php');

$url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];

//SimpleConfig::setFile('D:/xampp/htdocs/bells&whistles/connection/config.php');

    
     //SimpleConfig::setFile('E:/wamp/www/milesoil/html_new1/connection/config.php');
     
    class mainClass {

        public $connection;
        public $db;
        public $config;
        protected $dbConn;

        private static $instance;
        
        /**
         * 
         */
        private function __construct(){
          $db = new Config;
          $this->dbConn = $db->connect();
        } // __construct

        /**
         *
         * @return type 
         */
        public static function getInstance(){
            if (!isset(self::$instance)) {
                self::$instance = new mainClass;
            }
            return self::$instance;
        } // getInstance

        /**
         * 
         */
        public function closeConnection(){
            //mysql_close($this->connection);
        }
        
         function generateRegistrationCode($length=9, $strength=8) {
            $vowels = 'aeuy';
            $consonants = 'bdghjmnpqrstvz';
            if ($strength & 1) {
                    $consonants .= 'BDGHJLMNPQRSTVWXZ';
            }
            if ($strength & 2) {
                    $vowels .= "AEUY";
            }
            if ($strength & 4) {
                    $consonants .= '23456789';
            }
            if ($strength & 8) {
                    $consonants .= '@#$%';
            }

            $code = '';
            $alt = time() % 2;
            for ($i = 0; $i < $length; $i++) {
                    if ($alt == 1) {
                            $code .= $consonants[(rand() % strlen($consonants))];
                            $alt = 0;
                    } else {
                            $code .= $vowels[(rand() % strlen($vowels))];
                            $alt = 1;
                    }
            }
            return $code;
        }
        
        
         public function getWordofTheDay(){
            //$rows = array(); 
            $sql = "select word from words ORDER BY rand() LIMIT 1";
            //pc_debug("SQL = $sql",__FILE__,__LINE__);
            $result = $this->dbConn->prepare($sql);
            $result->execute();
            $data = $result->fetch(PDO::FETCH_ASSOC);
            //$full_name = $res['first_name']." ".$res['last_name'];
            //array_push($rows,$res);
            return $data;
        }
        
		
		
     }
?>
