#include <SoftwareSerial.h>
SoftwareSerial MyBlue(2, 3); // RX | TX
String flag = "1";
int LED = 7;
#include <dht.h>
dht DHT;
#define DHT11_PIN 8
//const int LED = 4;


void setup() {
  MyBlue.begin(9600);
  Serial.begin(9600);
  pinMode(LED, OUTPUT);
  Serial.println("Ready to connect\nDefualt password is 1234 or 000");
  MyBlue.println("Ready to connect\nDefualt password is 1234 or 000");
}

void loop(){
  if (New.available() > 0){
    flag = (MyBlue.readString());

    if (flag == "0")
    {
      MyBlue.flush();
      digitalWrite(LED, HIGH);
      //MyBlue.println("LED On");
    }
    else if (flag == "1")
    {
      MyBlue.flush();
      digitalWrite(LED, LOW);
      //MyBlue.println("LED Off");
    }
    else if (flag == "temp"){
      int chk = DHT.read11(DHT11_PIN);
      float temp = DHT.humidity;
      MyBlue.println(temp);
      MyBlue.flush();
      serialFlush();
      flag = "0";
      Serial.println(temp);
      delay(5000);
    }

  } 
}

void serialFlush(){
  while(MyBlue.available() > 0) {
    char t = MyBlue.read();
  }
} 
