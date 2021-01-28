from os import path

def result_text_read(text_file_name="maksssksksss7"):
    text_path = path.abspath("../ai/yolov5/runs/detect/res/labels") + "/" + text_file_name + ".txt"
    masked = 0
    unmasked = 0
    with open(text_path, 'r') as f:
        for line in f:
            if line[0] == "0":
                masked +=1
            else:
                unmasked +=1
    return masked, unmasked

if __name__ == '__main__':
    result_text_read()