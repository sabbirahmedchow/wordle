<?php
    class Config {
		private $server = 'localhost';
		private $dbname = 'omnisour_wordle';
		private $user = 'omnisour_worUser';
		private $pass = 'WordlePass1234';

		public function connect() {
			try {
				$conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch (\Exception $e) {
				echo "Database Error: " . $e->getMessage();
			}
		}
    }
?>