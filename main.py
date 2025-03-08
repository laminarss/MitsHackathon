import pyttsx3
import speech_recognition as sr

engine = pyttsx3.init()

def speak(text):
    engine.say(text)
    engine.runAndWait()

def listen():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        audio = recognizer.listen(source)
        try:
            text = recognizer.recognize_google(audio)
            print(f"You said: {text}")
            return text
        except sr.UnknownValueError:
            print("Sorry, I could not understand that.")
            return None
        except sr.RequestError:
            print("Could not request results from Google Speech Recognition.")
            return None

def main():
    while True:
        text = listen()
        if text:
            if "stop" in text.lower():
                speak("Goodbye!")
                break
            speak(f"You said: {text}")

if __name__ == "__main__":
    main()
