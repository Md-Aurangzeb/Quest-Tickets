


#include <SPI.h>
#include <MFRC522.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <Servo.h>



#define SS_PIN D8
#define RST_PIN D3
#define BUZZER_PIN D1 
Servo servo;
/* Create an instance of MFRC522 */
MFRC522 mfrc522(SS_PIN, RST_PIN);
/* Create an instance of MIFARE_Key */
MFRC522::MIFARE_Key key;

/* Set the block to which we want to write data */
/* Be aware of Sector Trailer Blocks */
int blockNum = 2;

/* Create another array to read data from Block */
/* Legthn of buffer should be 2 Bytes more than the size of Block (16 Bytes) */
byte bufferLen = 18;
byte readBlockData[18];

MFRC522::StatusCode status;
String URL = "http://139.59.37.218/api/v1/machine/login";
String LOGIN = "{\"machineId\":\"Machine_id_2001\",\"password\":\"Abcde12345#\"}";
HTTPClient http;
WiFiClient client;
bool loginStatus = false;
String token;
// wifi connection details
String ssid = "Redmi Note 4";
String password = "@123456&";
void setup() {
  /* Initialize serial communications with the PC */
  Serial.begin(115200);
  /* Initialize SPI bus */
  SPI.begin();
  /* Initialize MFRC522 Module */
  mfrc522.PCD_Init();
  servo.attach(D2);
  servo.write(0);
  Serial.println("Scan a MIFARE 1K Tag to write data...");
  WiFi.begin(ssid, password);
  Serial.println("[-] Connecting To Wifi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("[+] Connected To Wifi");


  if (WiFi.status() == WL_CONNECTED) {
    http.begin(client, URL);
    http.addHeader("Content-Type", "application/json");
    int responseCode = http.POST(LOGIN);
    String response = http.getString();
    Serial.println(responseCode);
    // Serial.println(response);

    if (responseCode == HTTP_CODE_OK) {
      Serial.println("HTTP POST request successful");
      loginStatus = true;
      // Parse JSON response
      String response = http.getString();
      DynamicJsonDocument jsonDoc(512);  // Adjust the size based on your JSON response
      deserializeJson(jsonDoc, response);

      // Extract data from JSON
      token = String(jsonDoc["token"]);


    } else {
      Serial.print("Error code: ");
      Serial.println(responseCode);
    }
  }
  http.end();
  pinMode(BUZZER_PIN, OUTPUT);         
  digitalWrite(BUZZER_PIN, LOW);       
}


String output = "";  // Initialize an empty string





void loop() {

  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;
  }
  /* Look for new cards */
  /* Reset the loop if no new card is present on RC522 Reader */
  if (!mfrc522.PICC_IsNewCardPresent()) {
    return;
  }

  /* Select one of the cards */
  if (!mfrc522.PICC_ReadCardSerial()) {
    return;
  }

  Serial.print("\n");
  Serial.println("**Card Detected**");




  // Read data from the same block
  Serial.print("\n");
  Serial.println("Reading from Data Block...");

  // Authenticate before reading from the block
  status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, blockNum, &key, &(mfrc522.uid));
  if (status != MFRC522::STATUS_OK) {
    Serial.print("Authentication failed for Read: ");
    Serial.println(mfrc522.GetStatusCodeName(status));
    return;
  } else {
    Serial.println("Authentication success");
  }

  // Read data from the block
  status = mfrc522.MIFARE_Read(blockNum, readBlockData, &bufferLen);
  if (status != MFRC522::STATUS_OK) {
    Serial.print("Reading from Block failed: ");
    Serial.println(mfrc522.GetStatusCodeName(status));
    return;
  } else {
    Serial.println("Data read from Block successfully");

    Serial.print(blockNum);
    Serial.print(": ");
    char data[] = "";
    // Assuming data is declared as char[] data = new char[bufferLen];

    // Assuming data is declared as char[] data = new char[bufferLen];


    for (byte i = 0; i < bufferLen; i++) {
      if (readBlockData[i] == '#') {
        break;
      }
      data[i] = (char)readBlockData[i];
      output += data[i];
    }




    http.begin(client, "http://139.59.37.218/api/v1/userinfo?token=" + token + "&" + "cardno=" + output);

    int responseCode = http.GET();
    if (responseCode == HTTP_CODE_OK) {
      Serial.println("[+] Money Diposited");
      servo.write(180);
    } else {
      Serial.println("[-] Check Card");
      digitalWrite(BUZZER_PIN, HIGH); 
      delay(1000);                     
      digitalWrite(BUZZER_PIN, LOW);   
    }

    Serial.println("Concatenated data: " + output);
  }
  delay(5000);
  servo.write(0);
  ESP.restart();
}


void WriteDataToBlock(int blockNum, byte blockData[]) {
  /* Authenticating the desired data block for write access using Key A */
  status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, blockNum, &key, &(mfrc522.uid));
  if (status != MFRC522::STATUS_OK) {
    Serial.print("Authentication failed for Write: ");
    Serial.println(mfrc522.GetStatusCodeName(status));
    return;
  } else {
    Serial.println("Authentication success");
  }


  /* Write data to the block */
  status = mfrc522.MIFARE_Write(blockNum, blockData, 16);
  if (status != MFRC522::STATUS_OK) {
    Serial.print("Writing to Block failed: ");
    Serial.println(mfrc522.GetStatusCodeName(status));
    return;
  } else {
    Serial.println("Data was written into Block successfully");
  }
}

void ReadDataFromBlock(int blockNum, byte readBlockData[]) {
  /* Authenticating the desired data block for Read access using Key A */
  status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, blockNum, &key, &(mfrc522.uid));

  if (status != MFRC522::STATUS_OK) {
    Serial.print("Authentication failed for Read: ");
    Serial.println(mfrc522.GetStatusCodeName(status));
    return;
  } else {
    Serial.println("Authentication success");
  }

  /* Reading data from the Block */
  status = mfrc522.MIFARE_Read(blockNum, readBlockData, &bufferLen);
  if (status != MFRC522::STATUS_OK) {
    Serial.print("Reading failed: ");
    Serial.println(mfrc522.GetStatusCodeName(status));
    return;
  } else {
    Serial.println("Block was read successfully");
  }
}
