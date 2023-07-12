import os

folder_path = r"D:\project\react-film-v2\public\movies\Sword Art Online Season 1"

for filename in os.listdir(folder_path):
    if filename.endswith(".mkv"):
        file_path = os.path.join(folder_path, filename)
        new_filename = os.path.splitext(filename)[0] + ".mp4"
        new_file_path = os.path.join(folder_path, new_filename)
        os.rename(file_path, new_file_path)
        print(f"Renamed '{filename}' to '{new_filename}'")
