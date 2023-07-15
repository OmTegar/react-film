import os
import re

folder_path = os.path.join(os.path.dirname(__file__), "Maou-sama Retry!")

# Mendapatkan daftar file di dalam folder
files = os.listdir(folder_path)

# Mengurutkan file berdasarkan nomor urutan dalam nama file
sorted_files = sorted(files, key=lambda x: int(re.findall(r"\d+", x)[0]) if re.findall(r"\d+", x) else float('inf'))

# Mengubah nama file
for i, filename in enumerate(sorted_files):
    file_extension = os.path.splitext(filename)[1]
    if file_extension.lower() == ".mp4":
        # Format nama yang diharapkan: "Episode-[urutan].mp4"
        expected_name = f"TDFILM-MsR-Episode-{i+1}.mp4"

        if filename != expected_name:
            # Path lama dan baru dari file
            old_path = os.path.join(folder_path, filename)
            new_path = os.path.join(folder_path, expected_name)

            # Cek apakah file dengan nama yang diharapkan sudah ada
            if os.path.exists(new_path):
                print(f"Skipped: {filename} (already in the expected format)")
            else:
                # Melakukan rename file
                os.rename(old_path, new_path)
                print(f"Renamed: {filename} -> {expected_name}")
        else:
            print(f"Skipped: {filename} (already in the expected format)")
    else:
        print(f"Skipped: {filename} (not an .mp4 file)")
