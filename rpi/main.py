from os import path
from time import sleep

from get_serial_number import getserial
from image_capture import takePicture
from image_detect import detect
from result_read import result_json_read
from time_generator import get_time
from sender import send_data

URL = "http://3.35.82.17:8000/api/logs/log-data" # URL 설정

# Do not change
capture_count = 0 
sleep_time = 0

def sleep_time_input():
    while True:
        try:
            sleep_time = int(input("촬영 간격을 입력하시오: "))
            break
        except ValueError:
            print("정수를 입력하세요.")
    return sleep_time

def main():
    global sleep_time
    global capture_count
    global URL
    sleep_time = sleep_time_input()
    while True:
        if capture_count != 0:
            print("이미지 촬영 대기중...")
            sleep(sleep_time)
        
        print("이미지 촬영을 시작합니다...")
        image_path = takePicture()
        if image_path:
            print("이미지 촬영이 완료되었습니다.")
        else:
            print("이미지 촬영을 실패하였습니다.")

        if path.exists(image_path):
            print("이미지를 확인했습니다. 분석 시작...")
            result_path = detect(image_path)
            if result_path:
                print("이미지 분석 완료")
                print("결과값 파일 분석 시작...")
                masked, unmasked, is_true = result_json_read(result_path)
                if is_true:
                    print("결과값 파일 분석 완료.")
                else:
                    print("결과값 파일 분석 실패.")
                serial_number = getserial()
                if serial_number == "ERROR000000000":
                    print("센서 고유번호 받아오기 실패.")
                time = get_time(sleep_time)
                print("결과값 파일 전송 시작...")
                send_result = send_data(URL, serial_number, masked, unmasked, time)
                if send_result:
                    print("결과값 파일 전송 완료.")
                else:
                    print("결과값 파일 전송 실패.")
                capture_count += 1

            else:
                print("이미지 분석 실패")

        else:
            print("이미지가 없습니다.")

if __name__ == '__main__':
    main()