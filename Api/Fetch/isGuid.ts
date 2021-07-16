export const isGuid = (value: string) => {
  var regex = /[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}/i
  var match = regex.exec(value)
  return match != null
}
