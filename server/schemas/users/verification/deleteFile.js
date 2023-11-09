import fs from 'fs';

export async function deleteFile(path) {
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }  