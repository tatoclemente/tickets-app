

export const getLast = async () => {
  try {
    const resp = await fetch('http://localhost:8080/last')
    const data = await resp.json()
    
    if (data.last.lenght < 0) {
      return []
    }
    return data.last;
    
  } catch (error) {
    console.log(error.message);
  }
}