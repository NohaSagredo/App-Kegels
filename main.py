import eel
import os
import sys

def get_current_dir():
    # PyInstaller creates a temp folder and stores path in _MEIPASS
    if getattr(sys, 'frozen', False):
        return sys._MEIPASS
    return os.path.dirname(os.path.abspath(__file__))

if __name__ == '__main__':
    # Initialize eel with the current directory
    eel.init(get_current_dir())
    
    # Start the app
    try:
        eel.start('index.html', size=(400, 700))
    except (SystemExit, MemoryError, KeyboardInterrupt):
        pass
