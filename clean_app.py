import os
import shutil

def clean_app_files():
    """
    Elimina los archivos generados al compilar la aplicación con PyInstaller
    (carpetas 'build', 'dist' y el archivo '.spec').
    """
    items_to_delete = ['build', 'dist', 'AppKegels.spec']
    
    for item in items_to_delete:
        if os.path.exists(item):
            try:
                if os.path.isdir(item):
                    shutil.rmtree(item)
                    print(f"Carpeta eliminada exitosamente: {item}")
                else:
                    os.remove(item)
                    print(f"Archivo eliminado exitosamente: {item}")
            except Exception as e:
                print(f"Error al eliminar {item}: {e}")
        else:
            print(f"El elemento no existe (ya estaba limpio): {item}")

if __name__ == '__main__':
    print("Iniciando limpieza de la aplicación compilada...")
    clean_app_files()
    print("Limpieza finalizada.")
