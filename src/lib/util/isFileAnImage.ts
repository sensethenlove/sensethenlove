export default (file: Blob): { error: string | null } => {
  if (['image/jpeg', 'image/png'].includes(file.type)) return { error: null }
  else return { error: `Uploading the file type "${ file.type }" is not supported. Upload a file with the extension .png .jpg or .jpeg please!` }
}
