import os

# Tentukan direktori folder film
movies_directory = os.path.dirname(__file__)

# Fungsi untuk menghapus file "genre.txt" dari setiap folder
def remove_genre_files(folder_path):
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file == "equipment.txt":
                file_path = os.path.join(root, file)
                try:
                    os.remove(file_path)
                    print(f"File 'genre.txt' berhasil dihapus dari folder '{root}'.")
                except Exception as e:
                    print(f"Gagal menghapus file 'genre.txt' dari folder '{root}'!")
                    print(str(e))

# Panggil fungsi untuk menghapus file "genre.txt" dari setiap folder di movies_directory
remove_genre_files(movies_directory)

print("Proses selesai.")
