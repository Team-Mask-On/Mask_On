from os import path
from os import system

BASE_DIR = path.abspath("../ai/yolov5")

dectect_func = path.join(BASE_DIR, "detect.py")
weights = path.join(BASE_DIR, "weights/best.pt")

result = path.abspath("./")

def detect(image_path):
    try:
        cmd = f'python3 {dectect_func} --weights {weights} --save-txt --conf 0.4 --source {image_path} --name res --exist-ok --project {result}'
        system(cmd)

        json_path, extension = path.splitext(path.basename(image_path))
        result_path = path.join(result, "res", json_path)
        return result_path
    except:
        return False

if __name__ == '__main__':
    detect()