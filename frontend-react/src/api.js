//Object with functions to export and use them somewhere else
//api client or module to make api calls, put all urls in one file inside of react

//Create request function to make api calls
//will have url, but needs options in case of posting
//fetch will go to the url, get or post or update with the options, and will give me a response.

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options, //if we receive options we spread them, if not code will ignore it

    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    }, //if in the options we send extra headers, we want to extract them into our headers
  });

  //Ensure we receiving JSON objects PARSE
  const data = await response.json().catch(() => {}); //catch is just for this convertion to json

  if (!response.ok) {
    throw new Error(data.error || "Request Failed");
    //if the response is not ok, we throw an error with the data.error or a default message
  }

  return data;
}

export const api = {
  checkHealth: () => request("/api/health"),
  listProducts: () => request("/api/products"),
  getProduct: (id) => request(`/api/products/${id}`),
  listStockProducts: (userId) => request(`/api/profiles/${userId}/stock`),
};
