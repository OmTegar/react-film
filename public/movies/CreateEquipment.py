import os
import json

# Tentukan direktori folder film
movies_directory = os.path.dirname(__file__)

# Fungsi untuk membuat isi file equipment.txt


def create_equipment_data():
    data = {
        "genre": [""],
        "description": [
            "",
        ],
        "studios": [""],
        "release_date": [""],
        "scores": ["..../10"],
        "duration": [""],
        "quality": ["720p"]
    }
    return data


# Dapatkan daftar folder di dalam movies_directory
folder_list = [folder for folder in os.listdir(
    movies_directory) if os.path.isdir(os.path.join(movies_directory, folder))]

# Pilih folder yang ingin Anda buat file equipment.txt
# Ganti dengan folder yang ingin Anda pilih
selected_folder = "Tensei shitara Ken Deshita"

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
