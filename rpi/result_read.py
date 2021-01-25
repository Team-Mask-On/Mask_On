import json
from os import path

def result_json_read(result_path):
    json_path = result_path + ".json"
    masked = 0
    unmasked = 0
    with open(json_path, 'r') as f:
        json_data = json.load(f)
        masked = int(json_data["With_Mask"])
        unmasked = int(json_data["Without_Mask"] + json_data["Incorrect_Mask"])
    return masked, unmasked

if __name__ == '__main__':
    result_json_read()