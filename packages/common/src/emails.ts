export function isEmail(email: string) {
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email))
}

export function assertEmail(email: string, errorClass: any = Error) {
  if (!isEmail(email)) {
    throw new errorClass('Email is invalid')
  }
  return email.toLowerCase()
}