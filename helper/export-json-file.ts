import fs from 'fs';

export async function exportJsonFile(jsonObject: object, outputFile: string) {
    const rootFolder = outputFile.split("/")[0];
    if (!fs.existsSync(rootFolder)){
        fs.mkdirSync(rootFolder);
    }
    const jsonString = JSON.stringify(jsonObject);
    console.log(jsonString);
    fs.writeFile(outputFile, jsonString, err => {
        if (err) {
            console.log(err);
        }
    });
}