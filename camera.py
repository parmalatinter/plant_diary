# ref: https://stackoverflow.com/questions/34588464/python-how-to-capture-image-from-webcam-on-click-using-opencv
import sys
import cv2
from datetime import datetime

def capture_camera():
    """Capture video from camera"""
    # カメラをキャプチャする
    cam = cv2.VideoCapture(0)
    cv2.namedWindow("opencv frame {}".format(date_to_int()))

    ret, frame = cam.read()
    if not ret:
        print('not found camera')
        return
    k = cv2.waitKey(1)

    img_name = "opencv_frame_{}.png".format(date_to_int())
    cv2.imwrite(img_name, frame)
    print("{} written!".format(img_name))

    cam.release()

    cv2.destroyAllWindows()

def date_to_int():
    return datetime.now().strftime('%Y%m%d%H%M%S')

if __name__ == '__main__':
    print(date_to_int())
    capture_camera()