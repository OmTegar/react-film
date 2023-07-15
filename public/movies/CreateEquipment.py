import os
import json

# Tentukan direktori folder film
movies_directory = os.path.dirname(__file__)

# Fungsi untuk membuat isi file equipment.txt


def create_equipment_data():
    data = {
        "genre": ["Action", "Adventure", "Fantasy"],
        "description": [
            "Oono Akira merupakan orang biasa yang bekerja pada sebuah perusahaan game online, hari ini merupakan penutupan server untuk game yang bernama Infinity Game, Akira juga merupakan salah satu admin yang menciptakan game tersebut. Disana ia bermain dengan karakter yang bernama Kunai Hakuto atau yang sering dipanggil dengan Maou (Raja iblis).",
            "Tapi saat malam terakhir game tersebut, tiba-tiba saja Akira terseret ke dunia lain, terlebih lagi dirinya berubah menjadi Kunai, karakter game yang ia mainkan. Ia bertemu dengan seorang gadis yang cacat kaki bernama Aku dan memutuskan untuk mengajaknya pergi bersama karena Akira tak memiliki banyak informasi di dunia baru ini.",
            "Sebagai seorang Maou (Raja Iblis) tentu saja banyak negara dan orang-orang suci dari berbagai tempat mengincar dirinya. Dimanapun Raja Iblis berada, pasti ada kekacauan yang menunggu mereka disana.",
            "Bagaimanakah kisah selanjutnya petualangan Maou & Aku?",
        ],
        "studios": ["EKACHI EPILKA"],
        "release_date": ["4 Juli 2019"], # Format: "tanggal bulan tahun", contoh: "1 Januari 2021"
        "scores": ["6.51"],
        "duration": ["23 min. per episode"],
        "quality": ["720p"]
    }
    return data


# Dapatkan daftar folder di dalam movies_directory
folder_list = [folder for folder in os.listdir(
    movies_directory) if os.path.isdir(os.path.join(movies_directory, folder))]

# Pilih folder yang ingin Anda buat file equipment.txt
# Ganti dengan folder yang ingin Anda pilih
selected_folder = "Maou-sama Retry!"

# Periksa apakah folder yang dipilih ada di daftar folder
if selected_folder in folder_list:
    folder_path = os.path.join(movies_directory, selected_folder)
    equipment_data = create_equipment_data()

    # Buat file equipment.txt di dalam folder yang dipilih
    try:
        with open(os.path.join(folder_path, "equipment.txt"), "w") as file:
            file.write(json.dumps(equipment_data))
        print(
            f"File equipment.txt berhasil dibuat di folder '{selected_folder}'.")
        print(f"Data equipment.txt:")
        print(equipment_data)
    except Exception as e:
        print(
            f"File equipment.txt gagal dibuat di folder '{selected_folder}'!")
        print(str(e))
else:
    print(f"Folder '{selected_folder}' tidak ditemukan dalam daftar folder.")

print("Proses selesai.")
