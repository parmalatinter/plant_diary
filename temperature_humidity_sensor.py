import grovepi
import math
# Connect the Grove Temperature & Humidity Sensor Pro to digital port D4
# This example uses the blue colored sensor.
# SIG,NC,VCC,GND
sensor = 4  # The Sensor goes on digital port 4.
 
# temp_humidity_sensor_type
# Grove Base Kit comes with the blue sensor.
blue = 0    # The Blue colored sensor.
white = 1   # The White colored sensor.
 
def display():
	while True:
	    try:
	        # This example uses the blue colored sensor.
	        # The first parameter is the port, the second parameter is the type of sensor.
	        [temp,humidity] = grovepi.dht(sensor,blue)  
	        if math.isnan(temp) == False and math.isnan(humidity) == False:
	            print("{ \"temp\" : %.02f, \"humidity\" : %.02f}"%(temp, humidity))
	            exit()
	 
	    except IOError:
	        print ("Error")

def get_clima():
	while True:
	    try:
	        # This example uses the blue colored sensor.
	        # The first parameter is the port, the second parameter is the type of sensor.
	        [temp,humidity] = grovepi.dht(sensor,blue)  
	        if math.isnan(temp) == False and math.isnan(humidity) == False:
	            return { "temp" : temp, "humidity" : humidity}
	 
	    except IOError:
	        print ("Error")

if __name__=="__main__":
    display()
    exit()