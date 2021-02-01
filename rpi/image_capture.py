import cv2
import time
from os import path

def takePicture():
    cap = cv2.VideoCapture(0) #0 or -1
    if cap.isOpened():
        ret, img = cap.read()
        if ret:
            curTime = time.strftime('%Y%m%d_%H%M%S', time.localtime(time.time()))
            image_path = path.abspath("./captured_images") + "/"+ curTime + ".jpg"
            cv2.imwrite(image_path, img)
        else:
            image_path = False

    else:
        print('no camera!')
        image_path = False
    cap.release()
    cv2.destroyAllWindows()
    return image_path

if __name__ == '__main__':
    takePicture()