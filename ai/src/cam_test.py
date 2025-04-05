from __future__ import absolute_import, division, print_function, \
    unicode_literals
import time
import datetime as dt
import os
import cv2
import traceback
import threading

# Example usage
rtsp_url = "rtsp://offflow:offflow1234@192.168.219.104/stream1"
image_folder = "images"
video_folder = "./videos"
capture_interval = 30  # seconds

error_log_file = "./webcamerror.log"

blur1_x = 0  # X-coordinate of the top-left corner of the blur region
blur1_y = 1000  # Y-coordinate of the top-left corner of the blur region
blur1_width = 200  # Width of the blur region
blur1_height = 80  # Height of the blur region

blur2_x = 254  # X-coordinate of the top-left corner of the blur region
blur2_y = 936  # Y-coordinate of the top-left corner of the blur region
blur2_width = 30  # Width of the blur region
blur2_height = 50  # Height of the blur region

blur3_x = 519  # X-coordinate of the top-left corner of the blur region
blur3_y = 936  # Y-coordinate of the top-left corner of the blur region
blur3_width = 52  # Width of the blur region
blur3_height = 80  # Height of the blur region

blur4_x = 598  # X-coordinate of the top-left corner of the blur region
blur4_y = 936  # Y-coordinate of the top-left corner of the blur region
blur4_width = 52  # Width of the blur region
blur4_height = 80  # Height of the blur region

blur5_x = 684  # X-coordinate of the top-left corner of the blur region
blur5_y = 936  # Y-coordinate of the top-left corner of the blur region
blur5_width = 52  # Width of the blur region
blur5_height = 80  # Height of the blur region

cap = None


def blur_region(frame, x, y, width, height):
    # Create a region of interest (ROI) for blurring
    roi = frame[y:y + height, x:x + width]

    # Apply Gaussian blur to the ROI
    blurred_roi = cv2.GaussianBlur(roi, (99, 99), 0)

    # Replace the ROI with the blurred version
    frame[y:y + height, x:x + width] = blurred_roi

    return frame


def get_image():
    print("Opening video stream")
    cap = cv2.VideoCapture(rtsp_url)

    # Check if the video stream is opened successfully
    if cap.isOpened():

        # Get the original frame size
        frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

        # Calculate the crop coordinates
        crop_x = 0
        crop_y = 0
        crop_width = min(frame_width, 1920)
        crop_height = min(frame_height, 1080)

        # Read the current frame from the video stream
        ret, frame = cap.read()

        # Check if the frame was read successfully
        if ret:
            # Crop the frame
            frame = frame[crop_y:crop_y + crop_height, crop_x:crop_x + crop_width]

            # Blur the specified region of the frame
            frame = blur_region(frame, blur1_x, blur1_y, blur1_width, blur1_height)
            frame = blur_region(frame, blur2_x, blur2_y, blur2_width, blur2_height)
            frame = blur_region(frame, blur3_x, blur3_y, blur3_width, blur3_height)
            frame = blur_region(frame, blur4_x, blur4_y, blur4_width, blur4_height)
            frame = blur_region(frame, blur5_x, blur5_y, blur5_width, blur5_height)

            # Save the frame as a JPEG image
            timestamp = time.strftime("%Y%m%d%H%M%S")

            filename = f"{image_folder}/webcam-{timestamp}.jpeg"
            cv2.imwrite(filename, frame, [cv2.IMWRITE_JPEG_QUALITY, 95])
            print(f"Saved frame {filename}")

        else:
            print("Error reading frame")

        cap.release()
    else:
        print("Error opening video stream")

    restart_thread()


def restart_thread():
    st = threading.Timer(capture_interval, get_image)
    st.daemon = True
    st.start()


def main():
    '''
    Main program function
    '''
    global cap

    get_image()

    while (True):
        time.sleep(1)


if __name__ == "__main__":
    main()
