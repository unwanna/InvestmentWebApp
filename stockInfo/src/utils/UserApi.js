export async function getUser(username, pswd) {
  const url = `http://localhost:3001/users/user/${username}/${pswd}`
  const response = await fetch(url) 
  const data = response.json()
  return data;
}

export async function createUser(uname, pswd) {
  const url = `http://localhost:3001/users/newUser/`
  const obj = {username: uname, password: pswd}
  const response = await fetch(url, {method: 'post', body:JSON.stringify(obj)})
  const data = response.json()
  return data;
}

export async function updateFavorites(uname, pswd, favorite){
  const url = `http://localhost:3001/users/updateFavorites/`
  const obj = {username: uname, password: pswd, favorites: favorite}
  const response = await fetch(url, {method: 'put', body:JSON.stringify(obj)})
  const data = response.json()
  return data;
}

export async function deleteUser(uname) {
  const url = `http://localhost:3001/users/updateFavorites/`
  const obj = { username: uname }
  const response = await fetch(url, {method: 'delete', body:JSON.stringify(obj)})
  const data = response.json()
  return data;
}
