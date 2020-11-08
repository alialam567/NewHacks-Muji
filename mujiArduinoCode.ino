#include <SoftwareSerial.h>
SoftwareSerial MyBlue(2, 3); // RX | TX
const byte DATA_MAX_SIZE = 32;
char data[DATA_MAX_SIZE];   // an array to store the received data
const int STATES = 64;
bool state[STATES] = {false};
String flag = "1";
int LED = 7;
#include <dht.h>
dht DHT;
#define DHT11_PIN 8
//const int LED = 4;

String x;

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


/*String receiveData(){
  static char endMarker = '\n'; // message separator
  char receivedChar;     // read char from serial port
  int ndx = 0;          // current index of data buffer
  // clean data buffer
  memset(data, 32, sizeof(data));
  // read while we have data available and we are
  // still receiving the same message.
  while(MyBlue.available() > 0) {
    receivedChar = MyBlue.read();
    if (receivedChar == endMarker) {
      data[ndx] = '\0'; // end current message
      String state = data;
      return state;
    }
    // looks like a valid message char, so append it and
    // increment our index
    data[ndx] = receivedChar;
    ndx++;
    // if the message is larger than our max size then
    // stop receiving and clear the data buffer.
    if (ndx >= DATA_MAX_SIZE) {
      break;
    }
  }
  // no more available bytes to read from serial and we
  // did not receive the separato. it's an incomplete message!
  MyBlue.println("error: incomplete message");
  MyBlue.println(data);
  memset(data, 32, sizeof(data));
}
*/
