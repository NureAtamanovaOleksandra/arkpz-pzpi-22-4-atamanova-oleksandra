#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// Піни для підключення RGB світлодіода
#define RED_PIN 23
#define GREEN_PIN 22
#define BLUE_PIN 21

// Налаштування WiFi мережі
const char* ssid = "Wokwi-GUEST";
const char* password = "";

// URL-адреси для взаємодії з сервером
const char* baseUrl = "http://bbdb-46-150-86-71.ngrok-free.app/api";
const char* statusUrl = "http://bbdb-46-150-86-71.ngrok-free.app/api/iot/status";
const char* statisticsUrl = "http://bbdb-46-150-86-71.ngrok-free.app/api/iot/statistics";

// Функція встановлення кольору світлодіода
void setColor(bool red, bool green, bool blue) {
  digitalWrite(RED_PIN, red ? LOW : HIGH);
  digitalWrite(GREEN_PIN, green ? LOW : HIGH);
  digitalWrite(BLUE_PIN, blue ? LOW : HIGH);
}
// Підключення до WiFi мережі
void setup_wifi() {
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nWiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

// Розрахунок та відображення ефективності роботи системи
void calculateEfficiency(float successRate) {
    Serial.print("Processing success rate: ");
    Serial.print(successRate);
    Serial.println("%");
    
    if (successRate >= 80) {
        setColor(false, true, false);
        Serial.println("High efficiency - GREEN");
    } 
    else if (successRate >= 50) {
        setColor(true, true, false);
        Serial.println("Medium efficiency - YELLOW");
    }
    else {
        setColor(true, false, false);
        Serial.println("Low efficiency - RED");
    }
}

// Перевірка та відображення статусу поточного замовлення
void checkOrderStatus() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    
    Serial.print("Checking order status at: ");
    Serial.println(statusUrl);
    
    http.begin(statusUrl);
    http.addHeader("Accept", "application/json");
    
    int httpCode = http.GET();
    Serial.print("Status HTTP Response code: ");
    Serial.println(httpCode);

    if (httpCode == HTTP_CODE_OK) {
      String response = http.getString();
      Serial.print("Status response: ");
      Serial.println(response);

      // Зміна кольору світлодіода відповідно до статусу
      if (response.indexOf("\"status\":\"rejected\"") >= 0) {
        setColor(true, false, false);
        Serial.println("Order Status: REJECTED (RED)");
      } 
      else if (response.indexOf("\"status\":\"accepted\"") >= 0) {
        setColor(false, true, false);
        Serial.println("Order Status: ACCEPTED (GREEN)");
      }
      else if (response.indexOf("\"status\":\"processing\"") >= 0) {
        setColor(false, false, true);
        Serial.println("Order Status: PROCESSING (BLUE)");
      }
      else if (response.indexOf("\"status\":\"preparing\"") >= 0) {
        setColor(true, true, false);
        Serial.println("Order Status: PREPARING (YELLOW)");
      }
      else if (response.indexOf("\"status\":\"ready\"") >= 0) {
        setColor(true, true, true);
        Serial.println("Order Status: READY (WHITE)");
      }
    }

    http.end();
    Serial.println("--------------------");
  }
}

// Перевірка статистики та ефективності системи
void checkStatistics() {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        
        Serial.print("Checking statistics at: ");
        Serial.println(statisticsUrl);
        
        http.begin(statisticsUrl);
        http.addHeader("Accept", "application/json");
        
        int httpCode = http.GET();
        Serial.print("Statistics HTTP Response code: ");
        Serial.println(httpCode);
        
        if (httpCode == HTTP_CODE_OK) {
            String response = http.getString();
            Serial.print("Statistics response: ");
            Serial.println(response);
            
            DynamicJsonDocument doc(1024);
            DeserializationError error = deserializeJson(doc, response);
            
            if (!error) {
                float successRate = doc["successRate"];
                float avgProcessingTime = doc["averageProcessingTime"];
                
                calculateEfficiency(successRate);
                
                Serial.print("Average Processing Time: ");
                Serial.print(avgProcessingTime);
                Serial.println(" seconds");
            } else {
                Serial.print("JSON parsing failed: ");
                Serial.println(error.c_str());
            }
        }
        
        http.end();
        Serial.println("--------------------");
    }
}

// Ініціалізація пристрою
void setup() {
  Serial.begin(115200);
  Serial.println("Starting setup...");
  
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
  
  Serial.println("LED Test Sequence:");
  
  Serial.println("Testing RED");
  setColor(true, false, false);
  delay(1000);
  
  Serial.println("Testing GREEN");
  setColor(false, true, false);
  delay(1000);
  
  Serial.println("Testing BLUE");
  setColor(false, false, true);
  delay(1000);
  
  Serial.println("Testing OFF");
  setColor(false, false, false);
  
  Serial.println("LED test completed");
  
  setup_wifi();
}

// Головний цикл роботи
void loop() {
    checkOrderStatus();
    delay(2500);
    checkStatistics();
    delay(2500);
}