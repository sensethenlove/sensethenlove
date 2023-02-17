export default (file: Blob): void => {
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    throw new Error(`Uploading the file type "${ file.type }" is not supported. Upload a file with the extension .png .jpg or .jpeg please!`)
  }
}
