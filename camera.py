# -*- coding: utf-8 -*-

# ref: https://stackoverflow.com/questions/34588464/python-how-to-capture-image-from-webcam-on-click-using-opencv
import sys
import cv2
from datetime import datetime
import os
import rgb_lcd
import temperature_humidity_sensor
import time,sys
import requests

os.environ['DISPLAY'] = ':0'

def capture_camera():
    """Capture video from camera"""
    # カメラをキャプチャする
    cam = cv2.VideoCapture(0)
    cv2.namedWindow("opencv frame {}".format(datetime_to_int()))

    ret, frame = cam.read()
    if not ret:
        print('not found camera')
        return
    k = cv2.waitKey(1)

    # mkdir if not exists
    path = ensure_dir(date_to_int())
    img_name = "opencv_frame_{}.png".format(datetime_to_int())
    cv2.imwrite(path + "/" + img_name, frame)
    print("{} written!".format(path + "/" + img_name))

    cam.release()

    cv2.destroyAllWindows() 

def datetime_to_int():
    return datetime.now().strftime('%Y%m%d%H%M%S')

def date_to_int():
    return datetime.now().strftime('%Y%m%d')

def ensure_dir(intdate):
    path = "/home/pi/Documents/git/plant_diary/" + intdate
    directory = os.path.dirname(path)
    try:
        os.makedirs(path)
    except FileExistsError:
        # directory already exists
        pass
    return path

def lcd_show(text):
    rgb_lcd.setText(text)
    rgb_lcd.setRGB(0,128,64)
    time.sleep(5)
    rgb_lcd.setRGB(0,0,0)
    rgb_lcd.setText("")

def google_say(text):
    try:
        response = requests.post('http://localhost:8091/google-home-notifier', data={'text': text})
    except:
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    capture_camera()
    lcd_show("Finish capture\n" + datetime.now().strftime('%Y/%m/%d %H:%M:%S'))
    clima = temperature_humidity_sensor.get_clima()
    lcd_show("Temp :" + str(clima["temp"]) + "\nhum :" + str(clima["humidity"]))
    google_say('キャプチャが完了しました')
