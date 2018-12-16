export function context() {
  return {
    headers: {
      authorization: localStorage.getItem("accessToken")
    }
  };
}
