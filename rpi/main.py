from os import path
from time import sleep

from get_serial_number import getserial
from image_capture import takePicture
from image_detect import detect
from result_read import result_json_read
from sender import send_data

sleep_time = 10 # 촬영 간격 적어주기
count = 0

while True:
    if count != 0:
        print("이미지 촬영 대기중...")
        sleep(sleep_time)
    
    print("이미지 촬영을 시작합니다...")
    image_path = takePicture()
    print("이미지 촬영이 완료되었습니다.")

    if path.exists(image_path):
        print("이미지를 확인했습니다. 분석 시작...")
        result_path = detect(image_path)
        if result_path == False:
            print("이미지 분석 실패")

        else:
            print("이미지 분석 완료")
            masked, unmasked = result_json_read(result_path)
            print("결과값 파일 분석 시작...")
            serial_number = getserial()
            print("결과값 파일 전송 시작...")
            send_data(serial_number, masked, unmasked)
            print("결과값 파일 전송 완료.")
            count += 1

    else:
        print("이미지가 없습니다.")

