import cv2
import time
from os import path

def takePicture():
    cap = cv2.VideoCapture(0) #0 or -1
    if cap.isOpened():
        ret, img = cap.read()
        if ret:
            curTime = time.strftime('%Y%m%d_%H%M%S', time.localtime(time.time()))
            filePath = path.abspath("./captured_images") + "/"+ curTime + ".jpg"
            cv2.imwrite(filePath, img)
        else:
            filePath = 0

    else:
        print('no camera!')
        filePath = 0
    cap.release()
    cv2.destroyAllWindows()
    return filePath

if __name__ == '__main__':
    takePicture()